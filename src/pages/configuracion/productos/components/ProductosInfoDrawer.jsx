import { Descriptions, List, Tag, Tooltip } from 'antd';
import { getDetalles } from '../../../../utils/getDetalles';

const { Item } = Descriptions;

export const ProductosInfoDrawer = ({ producto }) => {
  const precios = getDetalles(producto.id, 'precios');

  const colorTag = producto.estado === 'Activo' ? 'blue' : 'orange';

  const componentsPrecios = precios.map((precio) => (
    <Precio key={precio.id} precio={precio} />
  ));

  return (
    <>
      <Descriptions column={1}>
        <Item label='Nombre'>{producto.nombre}</Item>
        <Item label='Descripción'>{producto.descripcion || '-'}</Item>
        <Item label='Estado'>
          <Tag color={colorTag}>{producto.estado}</Tag>
        </Item>
      </Descriptions>
      {precios.length > 0 && (
        <List
          className='pedidos-info-detalles-list'
          header={
            <span className='pedidos-info-detalles-list-title'>
              Lista de precios
            </span>
          }
          dataSource={componentsPrecios}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      )}
    </>
  );
};

const Precio = ({ precio }) => {
  return (
    <div className='DetallesDePedido'>
      <Tooltip title='Descripción'>
        <span>{precio.descripcion}</span>
      </Tooltip>

      <Tooltip title='Valor'>
        <span>$ {precio.valor}</span>
      </Tooltip>
    </div>
  );
};
