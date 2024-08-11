import {
  DatePicker,
  Descriptions,
  Drawer,
  Form,
  InputNumber,
  List,
  Select,
  Tag,
  Tooltip
} from 'antd';
import { ButtonSave } from '../../../components/buttons';
import { getDetallesDePago, getItemById } from '../../../utils';
import { useContext, useEffect } from 'react';
import dayjs from 'dayjs';
import { DataContext } from '../../../contexts';

export const PagosDrawer = ({ open, setOpen, pago, mode = 'view' }) => {
  const { metodosDePago } = useContext(DataContext);

  const [pagoForm] = Form.useForm();

  const detallesDePago = getDetallesDePago(pago.id);
  const entrega = getItemById(pago?.idEntrega, 'entrega');
  const pedido = getItemById(entrega?.idPedido, 'pedido');
  const cliente = getItemById(pedido?.idCliente, 'cliente');
  const importes = detallesDePago.map((detalle) => {
    const precio = getItemById(detalle.idPrecio, 'precio').valor;
    const cantidad = getItemById(
      detalle.idDetalleDeEntrega,
      'detalleDeEntrega'
    ).cantidad;

    return precio * cantidad;
  });
  const importeTotal = importes.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  useEffect(() => {
    if (open && pago && mode === 'edit') {
      pagoForm.setFieldsValue({
        fechaPago: dayjs(pago.fechaPago),
        importeTotal: importeTotal
      });
    } else {
      pagoForm.resetFields();
    }
  }, [open, pago, pagoForm, mode, cliente]);

  const editPagoItems = [
    { label: 'Cliente', children: cliente?.nombre },
    { label: 'CUIT/CUIL', children: cliente?.cuit_cuil || '-' },
    { label: 'Detalles de pago', children: cliente?.nombre }
  ];

  const metodosDePagoOptions = metodosDePago.map((metodo) => ({
    label: metodo.nombre,
    value: metodo.id
  }));

  function handleFinish(values) {
    console.log('Formulario enviado', values);
    setOpen(false);
  }

  function handleClose() {
    setOpen(false);
  }

  function getTitle() {
    switch (mode) {
      case 'edit':
        return 'Editar pago';
      case 'view':
        return 'Información de pago';
      default:
        return '';
    }
  }

  const isViewMode = mode === 'view';

  return (
    <Drawer
      title={getTitle()}
      open={open}
      onClose={handleClose}
      destroyOnClose
      extra={
        !isViewMode ? (
          <ButtonSave form={pagoForm} />
        ) : (
          <Tag color={pago.estado === 'Pagado' ? 'green' : 'red'}>
            {pago.estado}
          </Tag>
        )
      }
    >
      {isViewMode ? (
        <PagoInfo pago={pago} detallesDePago={detallesDePago} />
      ) : (
        <Form
          form={pagoForm}
          name='pagosForm'
          layout='vertical'
          onFinish={handleFinish}
          requiredMark={false}
        >
          <Descriptions column={1} items={editPagoItems} />

          <DetallesDePagoList detallesDePago={detallesDePago} />

          <Form.Item name='fechaPago' label='Fecha de pago'>
            <DatePicker format='DD/MM/YY' />
          </Form.Item>

          <Form.Item name='importeTotal' label='Importe total'>
            <InputNumber formatter={(value) => `$ ${value}`} />
          </Form.Item>

          <Form.Item name='metodoDePago' label='Método de pago'>
            <Select options={metodosDePagoOptions} />
          </Form.Item>

          <Form.Item name='estado' label='Estado'>
            <Select
              options={[
                {
                  label: 'Pagado',
                  value: 'Pagado'
                },
                {
                  label: 'Pendiente',
                  value: 'Pendiente'
                }
              ]}
            />
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
};

const PagoInfo = ({ pago, detallesDePago }) => {
  const entrega = getItemById(pago.idEntrega, 'entrega');
  const pedido = getItemById(entrega.idPedido, 'pedido');
  const cliente = getItemById(pedido.idCliente, 'cliente');
  const importes = detallesDePago.map((detalle) => {
    const precio = getItemById(detalle.idPrecio, 'precio').valor;
    const cantidad = getItemById(
      detalle.idDetalleDeEntrega,
      'detalleDeEntrega'
    ).cantidad;

    return precio * cantidad;
  });
  const importeTotal = importes.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  if (!pago) return null;

  const pagoItems = [
    { label: 'Cliente', children: cliente.nombre },
    { label: 'CUIT/CUIL', children: cliente.cuit_cuil || '-' },
    { label: 'Fecha de pago', children: pago.fechaPago || '-' },
    {
      label: 'Método de pago',
      children: getItemById(pago.idMetodoDePago, 'metodoDePago').nombre || '-'
    },
    {
      label: 'Importe total',
      children: `$ ${importeTotal}`
    }
  ];

  return (
    <div>
      <Descriptions column={1} items={pagoItems} />
      <DetallesDePagoList detallesDePago={detallesDePago} />
    </div>
  );
};

const DetallesDePagoList = ({ detallesDePago }) => {
  const componentsDetallesDePago = detallesDePago.map((detalle) => (
    <DetallesDePago key={detalle.id} detalle={detalle} />
  ));

  return (
    <>
      {detallesDePago.length > 0 && (
        <List
          className='pedidos-info-detalles-list'
          header={
            <span className='pedidos-info-detalles-list-title'>
              Detalles de pago
            </span>
          }
          dataSource={componentsDetallesDePago}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      )}
    </>
  );
};

const DetallesDePago = ({ detalle }) => {
  const detalleDeEntrega = getItemById(
    detalle.idDetalleDeEntrega,
    'detalleDeEntrega'
  );
  const precio = getItemById(detalle.idPrecio, 'precio').valor;

  return (
    <div className='DetallesDePedido'>
      <Tooltip title='Producto'>
        <span>
          {getItemById(detalleDeEntrega.idProducto, 'producto').nombre}
        </span>
      </Tooltip>
      <span className='barra-vertical'>|</span>
      <Tooltip title='Cantidad'>
        <span>{detalleDeEntrega.cantidad}</span>
      </Tooltip>
      <span className='barra-vertical'>|</span>
      <Tooltip title='Precio por unidad'>
        <span>$ {precio}</span>
      </Tooltip>
      <span className='barra-vertical'>|</span>
      <Tooltip title='Subtotal'>
        <span>$ {detalleDeEntrega.cantidad * precio}</span>
      </Tooltip>
    </div>
  );
};
