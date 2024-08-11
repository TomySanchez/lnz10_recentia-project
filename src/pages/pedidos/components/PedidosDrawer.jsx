import { useContext, useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
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
import { DataContext } from '../../../contexts';
import dayjs from 'dayjs';
import { AiOutlineMinusCircle, AiOutlinePlus } from 'react-icons/ai';
import { getDetallesDePedido, getItemById } from '../../../utils';
import { ButtonSave } from '../../../components/buttons';

export const PedidosDrawer = ({ open, setOpen, pedido, mode = 'add' }) => {
  const { clientes, productos } = useContext(DataContext);

  const [esRecurrente, setEsRecurrente] = useState(false);

  const [pedidoForm] = Form.useForm();

  const clientesOptions = clientes
    .map((cliente) => ({
      label: cliente.nombre,
      value: cliente.id
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const productosOptions = productos
    .map((producto) => ({
      label: producto.nombre,
      value: producto.id
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  useEffect(() => {
    if (open && pedido && mode === 'edit') {
      pedidoForm.setFieldsValue({
        fechaRegistro: dayjs(pedido.fechaRegistro),
        cliente: getItemById(pedido.idCliente, 'cliente').nombre,
        esRecurrente: pedido.esRecurrente,
        cantSemanas: pedido.cantSemanas
      });
    } else {
      pedidoForm.resetFields();
    }
  }, [open, pedido, pedidoForm, mode]);

  function handleFinish(values) {
    console.log('Formulario enviado', values);
    setOpen(false);
  }

  function handleClose() {
    setOpen(false);
  }

  function getTitle() {
    switch (mode) {
      case 'add':
        return 'Añadir pedido';
      case 'edit':
        return 'Editar pedido';
      case 'view':
        return 'Información de pedido';
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
          <ButtonSave form={pedidoForm} />
        ) : (
          pedido.esRecurrente && <Tag color='gold'>Recurrente</Tag>
        )
      }
    >
      {isViewMode ? (
        <PedidoInfo pedido={pedido} />
      ) : (
        <Form
          form={pedidoForm}
          name='pedidosForm'
          layout='vertical'
          onFinish={handleFinish}
          requiredMark='optional'
        >
          <Form.Item
            name='fechaRegistro'
            label='Fecha de registro'
            rules={[
              {
                required: true,
                message: 'Fecha requerida'
              }
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name='cliente'
            label='Cliente'
            rules={[{ required: true, message: 'Cliente requerido' }]}
          >
            <Select options={clientesOptions} showSearch={true} />
          </Form.Item>

          <div className='pedidos-drawer-detalles-container'>
            <span className='pedidos-drawer-detalles-title'>
              Detalles de pedidos
            </span>
            <Form.List name='detalles'>
              {(fields, { add, remove }) => (
                <div style={{ margin: '12px 0' }}>
                  {fields.map(({ key, name, ...restField }) => (
                    <div className='pedidos-drawer-detalle-container' key={key}>
                      <Form.Item
                        {...restField}
                        name={[name, 'producto']}
                        rules={[
                          {
                            required: true,
                            message: 'Producto requerido'
                          }
                        ]}
                      >
                        <Select
                          style={{ width: 200 }}
                          options={productosOptions}
                          placeholder='Producto'
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'cantidad']}
                        rules={[
                          {
                            required: true,
                            message: 'Cantidad requerida'
                          }
                        ]}
                      >
                        <InputNumber placeholder='Cantidad' />
                      </Form.Item>
                      <AiOutlineMinusCircle
                        className='pointer'
                        size={20}
                        onClick={() => remove(name)}
                      />
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type='dashed'
                      onClick={() => add()}
                      block
                      icon={<AiOutlinePlus />}
                    >
                      Añadir detalle
                    </Button>
                  </Form.Item>
                </div>
              )}
            </Form.List>
          </div>

          <Form.Item name='esRecurrente' valuePropName='checked'>
            <Checkbox onChange={(e) => setEsRecurrente(e.target.checked)}>
              Es recurrente
            </Checkbox>
          </Form.Item>

          {esRecurrente && (
            <div className='pedidos-add-form-delivery-frequency'>
              <span>Cada</span>
              <Form.Item
                name='cantSemanas'
                noStyle
                rules={[
                  {
                    required: esRecurrente,
                    message: 'Cantidad de semanas requerido'
                  }
                ]}
              >
                <InputNumber
                  className='pedidos-add-form-delivery-frequency-number-of-weeks'
                  min={1}
                />
              </Form.Item>
              <span>semana(s)</span>
            </div>
          )}
        </Form>
      )}
    </Drawer>
  );
};

const PedidoInfo = ({ pedido }) => {
  const detallesDePedido = getDetallesDePedido(pedido.id);

  if (!pedido) return null;

  const pedidoItems = [
    { label: 'Fecha de registro', children: pedido.fechaRegistro },
    {
      label: 'Cliente',
      children: getItemById(pedido.idCliente, 'cliente').nombre
    },
    {
      label: 'Recurrencia',
      children:
        pedido.cantSemanas === 1
          ? 'Cada semana'
          : pedido.cantSemanas
          ? `Cada ${pedido.cantSemanas} semanas`
          : '-'
    }
  ];

  const componentsDetallesDePedido = detallesDePedido.map((detalle) => (
    <DetallesDePedido key={detalle.id} detalle={detalle} />
  ));

  return (
    <div>
      <Descriptions column={1} items={pedidoItems} />
      {detallesDePedido.length > 0 && (
        <List
          className='pedidos-info-detalles-list'
          header={
            <span className='pedidos-info-detalles-list-title'>
              Detalles de pedido
            </span>
          }
          dataSource={componentsDetallesDePedido}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      )}
    </div>
  );
};

const DetallesDePedido = ({ detalle }) => {
  return (
    <div className='DetallesDePedido'>
      <Tooltip title='Producto'>
        <span>{getItemById(detalle.idProducto, 'producto').nombre}</span>
      </Tooltip>

      <Tooltip title='Cantidad'>
        <span>{detalle.cantidad}</span>
      </Tooltip>
    </div>
  );
};
