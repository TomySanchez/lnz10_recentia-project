import { Descriptions, List, Tag, Tooltip } from 'antd';
import { getItemById } from '../../../utils/getItemById';
import { getDetalles } from '../../../utils/getDetalles';

const { Item } = Descriptions;

export const EntregasInfoDrawer = ({ entrega }) => {
  const detallesDeEntrega = getDetalles(entrega.id, 'entregas');

  function getCliente() {
    const pedido = getItemById(entrega.idPedido, 'pedido');
    const cliente = getItemById(pedido.idCliente, 'cliente');

    return cliente;
  }

  function getColorTagEstado() {
    switch (entrega.estado) {
      case 'Realizada':
        return 'green';
      case 'Pendiente':
        return 'gold';
      case 'Cancelada':
        return 'red';
    }
  }

  const componentsDetallesDeEntrega = detallesDeEntrega.map((detalle) => (
    <DetallesDeEntrega key={detalle.id} detalle={detalle} />
  ));

  return (
    <>
      <Descriptions column={1}>
        <Item label='Cliente'>{getCliente().nombre}</Item>

        <Item label='Estado'>
          <Tag color={getColorTagEstado()}>{entrega.estado}</Tag>
        </Item>

        <Item label='Recorrido'>
          {getItemById(entrega.idRecorrido, 'recorrido').fecha || '-'}
        </Item>
      </Descriptions>

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
