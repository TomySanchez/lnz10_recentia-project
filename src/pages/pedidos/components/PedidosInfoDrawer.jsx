import { Descriptions, List, Tag, Tooltip } from 'antd';
import { getItemById } from '../../../utils/getItemById';
import { getFrecuenciaEntrega } from '../../../utils/getFrecuenciaEntrega';
import { getDetalles } from '../../../utils/getDetalles';
import { useContext } from 'react';
import { DataContext } from '../../../contexts';

const { Item } = Descriptions;

export const PedidosInfoDrawer = ({ pedido }) => {
  const { clientes } = useContext(DataContext);

  const detallesDePedido = getDetalles(pedido.id, 'pedidos');

  const colorTagTipoPedido = pedido.esRecurrente ? 'gold' : 'pink';

  function getColorTagEstado() {
    switch (pedido.estado) {
      case 'Activo':
        return 'blue';
      case 'Cancelado':
        return 'red';
      case 'Realizado':
        return 'green';
      case 'Pendiente':
        return 'gold';
    }
  }

  const componentsDetallesDePedido = detallesDePedido.map((detalle) => (
    <DetallesDePedido key={detalle.id} detalle={detalle} />
  ));

  return (
    <>
      <Descriptions column={1} labelStyle={{ color: '#000000aa' }}>
        <Item label='Tipo de pedido'>
          <Tag color={colorTagTipoPedido}>
            {pedido.esRecurrente ? 'Recurrente' : 'No recurrente'}
          </Tag>
        </Item>

        <Item label='Estado'>
          <Tag color={getColorTagEstado()}>{pedido.estado}</Tag>
        </Item>

        <Item label='Fecha de registro'>{pedido.fechaRegistro}</Item>

        <Item label='Cliente'>
          {getItemById(pedido.idCliente, clientes).nombre}
        </Item>

        <Item label='Frecuencia de entrega'>
          {getFrecuenciaEntrega(pedido.cantSemanas)}
        </Item>
      </Descriptions>

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
    </>
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
