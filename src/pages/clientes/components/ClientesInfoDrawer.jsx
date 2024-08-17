import { Button, Descriptions, Drawer } from 'antd';
import { formatDireccion } from '../../../utils/formatDireccion';

const { Item } = Descriptions;

export const ClientesInfoDrawer = ({ cliente, open, setOpen }) => {
  if (!cliente) {
    return null;
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Drawer
      title='Información de cliente'
      open={open}
      onClose={handleClose}
      extra={<RegistrosButton />}
      destroyOnClose
    >
      <Descriptions column={1}>
        <Item label='Nombre'>{cliente.nombre}</Item>
        <Item label='Dirección'>{`${formatDireccion(cliente.direccion)}, ${
          cliente.barrio.nombre
        }, ${cliente.localidad.nombre}`}</Item>
        <Item label='Teléfono'>{cliente.telefono || '-'}</Item>
        <Item label='CUIT/CUIL'>{cliente.cuit_cuil || '-'}</Item>
        <Item label='Observaciones'>{cliente.observaciones || '-'}</Item>
      </Descriptions>
    </Drawer>
  );
};

const RegistrosButton = () => {
  return (
    <Button className='RegistrosButton' type='primary' size='small'>
      Registros
    </Button>
  );
};
