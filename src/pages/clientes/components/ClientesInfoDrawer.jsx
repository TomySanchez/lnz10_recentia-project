import { Descriptions, Drawer } from 'antd';
import { formatDireccion } from '../../../utils';

export const ClientesInfoDrawer = ({ open, setOpen, cliente }) => {
  function handleClose() {
    setOpen(false);
  }

  if (!cliente) {
    return null;
  }

  const clientesItems = [
    {
      key: 1,
      label: 'Nombre',
      children: cliente.nombre
    },
    {
      key: 2,
      label: 'Dirección',
      children: `${formatDireccion(cliente.direccion)}, ${
        cliente.barrio.nombre
      }, ${cliente.localidad.nombre}`
    },
    {
      key: 3,
      label: 'Teléfono',
      children: cliente.telefono || '-'
    },
    {
      key: 4,
      label: 'CUIT/CUIL',
      children: cliente.cuit_cuil || '-'
    },
    {
      key: 5,
      label: 'Observaciones',
      children: cliente.observaciones || '-'
    }
  ];

  return (
    <Drawer
      title='Información de cliente'
      open={open}
      onClose={handleClose}
      destroyOnClose
    >
      <Descriptions column={1} items={clientesItems} />
    </Drawer>
  );
};
