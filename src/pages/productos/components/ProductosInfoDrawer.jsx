import { Descriptions, List, Tag, Tooltip } from 'antd';
import { useContext } from 'react';
import { DataContext } from '../../../contexts';

const { Item } = Descriptions;

export const ProductosInfoDrawer = ({ producto }) => {
  const { precios } = useContext(DataContext);

  const preciosDelProducto = precios?.filter(
    (precio) => precio.idProducto == producto.id
  );

  const colorTag = producto.estado === 'Activo' ? 'blue' : 'orange';

  const componentsPrecios = preciosDelProducto.map((precio) => (
    <Precio key={precio.id} precio={precio} />
  ));

  return (
    <>
      <Descriptions column={1} labelStyle={{ color: '#000000aa' }}>
        <Item label='Nombre'>{producto.nombre}</Item>
        <Item label='Descripción'>{producto.descripcion || '-'}</Item>
        <Item label='Estado'>
          <Tag color={colorTag}>{producto.estado}</Tag>
        </Item>
      </Descriptions>
      {preciosDelProducto.length > 0 && (
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
