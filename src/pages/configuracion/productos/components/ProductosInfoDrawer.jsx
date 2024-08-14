import { Descriptions, Drawer, List, Tag, Tooltip } from 'antd';
import { getPrecios } from '../../../../utils';

export const ProductosInfoDrawer = ({ producto, open, setOpen }) => {
  if (!producto) {
    return null;
  }

  const precios = getPrecios(producto.id);

  const productoItems = [
    {
      label: 'Nombre',
      children: producto.nombre
    },
    {
      label: 'Descripción',
      children: producto.descripcion
    }
  ];

  function handleClose() {
    setOpen(false);
  }

  const tagColor = producto.estado === 'Activo' ? 'blue' : 'orange';

  const componentsPrecios = precios.map((precio) => (
    <Precio key={precio.id} precio={precio} />
  ));

  return (
    <Drawer
      title={'Información de producto'}
      open={open}
      onClose={handleClose}
      destroyOnClose
      extra={<Tag color={tagColor}>{producto.estado}</Tag>}
    >
      <Descriptions column={1} items={productoItems} />
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
    </Drawer>
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
