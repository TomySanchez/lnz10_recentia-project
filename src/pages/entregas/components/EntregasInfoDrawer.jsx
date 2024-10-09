import { Descriptions, List, Tag, Tooltip } from 'antd';
import { getItemById } from '../../../utils/getItemById';
import { getDetalles } from '../../../utils/getDetalles';
import { useContext } from 'react';
import { DataContext } from '../../../contexts';
import { getMontoTotal } from '../../../utils/getMontoTotal';

const { Item } = Descriptions;

export const EntregasInfoDrawer = ({ entrega }) => {
  const { clientes, pagos, pedidos } = useContext(DataContext);

  const detallesDeEntrega = getDetalles(entrega.id, 'entregas');

  function getCliente() {
    const pedido = getItemById(entrega.idPedido, pedidos);
    const cliente = getItemById(pedido.idCliente, clientes);

    return cliente;
  }

  const pago = pagos.find((pago) => pago.idEntrega == entrega.id);

  function getColorTagEstado(estado) {
    switch (estado) {
      case 'Realizada':
        return 'green';
      case 'Pagado':
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
      <Descriptions column={1} labelStyle={{ color: '#000000aa' }}>
        <Item label='Cliente'>{getCliente().nombre}</Item>

        <Item label='Estado de la entrega'>
          <Tag color={getColorTagEstado(entrega.estado)}>{entrega.estado}</Tag>
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

      <div className='entregas-pago-info-container'>
        <h3>Pago</h3>
        <Descriptions column={1} labelStyle={{ color: '#000000aa' }}>
          <Item label='Estado del pago'>
            <Tag color={getColorTagEstado(pago.estado)}>{pago.estado}</Tag>
          </Item>

          {/* <Item label='CUIT/CUIL'>{getCliente().cuit_cuil || '-'}</Item> */}

          <Item label='Fecha de pago'>{pago.fechaPago || '-'}</Item>

          <Item label='Método de pago'>
            {getItemById(pago.idMetodoDePago, 'metodoDePago')?.nombre || '-'}
          </Item>

          <Item label='Importe total'>
            {`$ ${getMontoTotal(pago.id)}` || '-'}
          </Item>
        </Descriptions>
      </div>
    </>
  );
};

const DetallesDeEntrega = ({ detalle }) => {
  const { detallesDePagos } = useContext(DataContext);

  const detalleDePago = detallesDePagos.find(
    (detallePago) => detallePago.idDetalleDeEntrega == detalle.id
  );

  return (
    <div className='DetallesDePedido'>
      <Tooltip title='Producto'>
        <span>{getItemById(detalle.idProducto, 'producto').nombre}</span>
      </Tooltip>

      <Tooltip title='Cantidad'>
        <span>{detalle.cantidad}</span>
      </Tooltip>

      <Tooltip title='Precio por unidad'>
        <span>$ {getItemById(detalleDePago.idPrecio, 'precio').valor}</span>
      </Tooltip>
    </div>
  );
};
