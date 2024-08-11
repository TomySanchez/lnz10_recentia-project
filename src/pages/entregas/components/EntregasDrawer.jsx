import { Descriptions, Drawer, Form, List, Tag, Tooltip } from 'antd';
import { ButtonSave } from '../../../components/buttons';
import { getDetallesDeEntrega, getItemById } from '../../../utils';

export const EntregasDrawer = ({ open, setOpen, entrega, mode = 'view' }) => {
  const [entregaForm] = Form.useForm();

  const detallesDeEntrega = getDetallesDeEntrega(entrega.id);

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
        return 'Editar entrega';
      case 'view':
        return 'Información de entrega';
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
          <ButtonSave form={entregaForm} />
        ) : (
          <Tag color={entrega.estado === 'Realizada' ? 'green' : 'gold'}>
            {entrega.estado}
          </Tag>
        )
      }
    >
      {isViewMode ? (
        <EntregaInfo entrega={entrega} detallesDeEntrega={detallesDeEntrega} />
      ) : (
        <></>
      )}
    </Drawer>
  );
};

const EntregaInfo = ({ entrega, detallesDeEntrega }) => {
  const pedido = getItemById(entrega.idPedido, 'pedido');
  const cliente = getItemById(pedido.idCliente, 'cliente');

  if (!entrega) return null;

  const entregaItems = [
    { label: 'Fecha', children: entrega.fechaEntrega || '-' },
    { label: 'Cliente', children: cliente.nombre },
    { label: 'Recorrido', children: <a>Ir a recorrido</a> || '-' }
  ];

  return (
    <div>
      <Descriptions column={1} items={entregaItems} />
      <DetallesDeEntregaList detallesDeEntrega={detallesDeEntrega} />
    </div>
  );
};

const DetallesDeEntregaList = ({ detallesDeEntrega }) => {
  const componentsDetallesDeEntrega = detallesDeEntrega.map((detalle) => (
    <DetallesDeEntrega key={detalle.id} detalle={detalle} />
  ));

  return (
    <>
      {detallesDeEntrega.length > 0 && (
        <List
          className='pedidos-info-detalles-list'
          header={
            <span className='pedidos-info-detalles-list-title'>
              Detalles de entrega
            </span>
          }
          dataSource={componentsDetallesDeEntrega}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      )}
    </>
  );
};

const DetallesDeEntrega = ({ detalle }) => {
  const producto = getItemById(detalle.idProducto, 'producto');

  return (
    <div className='DetallesDePedido'>
      <Tooltip title='Producto'>
        <span>{producto.nombre}</span>
      </Tooltip>

      <Tooltip title='Cantidad'>
        <span>{detalle.cantidad}</span>
      </Tooltip>
    </div>
  );
};
