import { Descriptions } from 'antd';
import { formatDireccion } from '../../../utils/formatDireccion';

const { Item } = Descriptions;

export const ClientesInfoDrawer = ({ cliente }) => {
  return (
    <Descriptions column={1} labelStyle={{ color: '#000000aa' }}>
      <Item label='Nombre'>{cliente.nombre}</Item>
      <Item label='Dirección'>{`${formatDireccion(cliente.direccion)}, ${
        cliente.barrio.nombre
      }, ${cliente.localidad.nombre}`}</Item>
      <Item label='Teléfono'>{cliente.telefono || '-'}</Item>
      <Item label='CUIT/CUIL'>{cliente.cuit_cuil || '-'}</Item>
      <Item label='Observaciones'>{cliente.observaciones || '-'}</Item>
    </Descriptions>
  );
};
