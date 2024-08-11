import { Descriptions, Drawer, Form, List, Tag, Tooltip } from 'antd';
import { ButtonSave } from '../../../components/buttons';
import {
  getDetallesDePago,
  getEntregas,
  getItemById,
  getPagos
} from '../../../utils';

export const RecorridosDrawer = ({
  open,
  setOpen,
  recorrido,
  mode = 'view'
}) => {
  const [recorridoForm] = Form.useForm();

  const entregas = getEntregas(recorrido.id);

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
        return 'Editar recorrido';
      case 'view':
        return 'Información de recorrido';
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
          <ButtonSave form={recorridoForm} />
        ) : (
          <Tag
            color={
              recorrido.estado === 'Realizado' ||
              recorrido.estado === 'Realizada'
                ? 'green'
                : 'gold'
            }
          >
            {recorrido.estado}
          </Tag>
        )
      }
    >
      {isViewMode ? (
        <RecorridoInfo recorrido={recorrido} entregas={entregas} />
      ) : (
        <></>
      )}
    </Drawer>
  );
};

const RecorridoInfo = ({ recorrido, entregas }) => {
  if (!recorrido) return null;

  const recorridoItems = [
    { label: 'Fecha', children: recorrido.fecha },
    {
      label: 'Cantidad de entregas',
      children: entregas.length
    },
    {
      label: 'Monto total',
      children: <MontoTotal entregas={entregas} />
    }
  ];

  return (
    <div>
      <Descriptions column={1} items={recorridoItems} />
      <EntregasList entregas={entregas} />
    </div>
  );
};

const EntregasList = ({ entregas }) => {
  const componentsEntregas = entregas.map((entrega) => (
    <EntregaItem key={entrega.id} entrega={entrega} />
  ));

  return (
    <>
      {entregas.length > 0 && (
        <List
          className='pedidos-info-detalles-list'
          header={
            <span className='pedidos-info-detalles-list-title'>Entregas</span>
          }
          dataSource={componentsEntregas}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      )}
    </>
  );
};

const EntregaItem = ({ entrega }) => {
  const pedido = getItemById(entrega.idPedido, 'pedido');
  const cliente = getItemById(pedido.idCliente, 'cliente');

  const colorTag = entrega.estado === 'Realizada' ? 'green' : 'gold';

  return (
    <div className='DetallesDePedido'>
      <Tooltip title='Cliente'>
        <span>{cliente.nombre}</span>
      </Tooltip>

      <Tooltip title='Estado'>
        <Tag color={colorTag}>{entrega.estado}</Tag>
      </Tooltip>
    </div>
  );
};

const MontoTotal = ({ entregas }) => {
  const importesEntregas = entregas.map((entrega) => {
    const pagos = getPagos(entrega.id);
    const importesPagos = pagos.map((pago) => {
      const detallesDePago = getDetallesDePago(pago.id);
      const importes = detallesDePago.map((detalle) => {
        const precio = getItemById(detalle.idPrecio, 'precio').valor;
        const cantidad = getItemById(
          detalle.idDetalleDeEntrega,
          'detalleDeEntrega'
        ).cantidad;

        return precio * cantidad;
      });
      return importes.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
    });
    return importesPagos.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  });

  const montoTotal = importesEntregas.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return <span>$ {montoTotal}</span>;
};
