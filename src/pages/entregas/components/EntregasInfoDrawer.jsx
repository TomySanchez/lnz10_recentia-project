import { Descriptions, List, Tag, Tooltip } from 'antd';
import { getItemById } from '../../../utils/getItemById';
import { useContext } from 'react';
import { DataContext } from '../../../contexts';
import { getMontoTotal } from '../../../utils/getMontoTotal';

const { Item } = Descriptions;

export const EntregasInfoDrawer = ({ entrega }) => {
  const { clientes, pagos, pedidos, recorridos, precios } =
    useContext(DataContext);

  const detallesDeEntrega = entrega.detallesEntrega;

  function getCliente() {
    const pedido = getItemById(entrega.idPedido, pedidos);
    const cliente = getItemById(pedido.idCliente, clientes);

    return cliente;
  }

  const recorridoAsociado = recorridos.find((r) => r.id == entrega.idRecorrido);

  const pagoAsociado = pagos.find((p) => p.id == entrega.idPago);

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

        <Item label='Recorrido'>{recorridoAsociado?.fecha || '-'}</Item>
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
            <Tag color={getColorTagEstado(pagoAsociado.estado)}>
              {pagoAsociado.estado}
            </Tag>
          </Item>

          {/* <Item label='CUIT/CUIL'>{getCliente().cuit_cuil || '-'}</Item> */}

          <Item label='Fecha de pago'>{pagoAsociado.fechaPago || '-'}</Item>

          <Item label='Método de pago'>
            {getItemById(pagoAsociado.idMetodoDePago, 'metodoDePago')?.nombre ||
              '-'}
          </Item>

          <Item label='Importe total'>
            {`$ ${getMontoTotal(pagoAsociado, precios, detallesDeEntrega)}` ||
              '-'}
          </Item>
        </Descriptions>
      </div>
    </>
  );
};

const DetallesDeEntrega = ({ detalle }) => {
  const { pagos, productos, precios } = useContext(DataContext);

  let detalleDePago = {};

  pagos?.forEach((pago) => {
    const newDetalleDePago = pago.detallesPago?.find(
      (dp) => dp.idDetalleDeEntrega == detalle.idDetalleEntrega
    );

    if (newDetalleDePago) {
      detalleDePago = newDetalleDePago;
    }
  });

  return (
    <div className='DetallesDePedido'>
      <Tooltip title='Producto'>
        <span>{getItemById(detalle.idProducto, productos)?.nombre}</span>
      </Tooltip>

      <Tooltip title='Cantidad'>
        <span>{detalle.cantidad}</span>
      </Tooltip>

      <Tooltip title='Precio por unidad'>
        <span>$ {getItemById(detalleDePago?.idPrecio, precios)?.valor}</span>
      </Tooltip>
    </div>
  );
};
