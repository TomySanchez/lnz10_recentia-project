import { Descriptions } from 'antd';
import { formatDireccion } from '../../../utils/formatDireccion';
import dayjs from 'dayjs';

const { Item } = Descriptions;

export const ClientesInfoDrawer = ({ cliente }) => {
  return (
    <Descriptions column={1} labelStyle={{ color: '#000000aa' }}>
      <Item label='Nombre'>{cliente.nombre}</Item>
      <Item label='Dirección'>{`${formatDireccion(cliente.direccion)}, ${
        cliente.direccion.barrio
      }, ${cliente.direccion.localidad}`}</Item>
      <Item label='Disponibilidad'>
        {cliente.disponibilidades && cliente.disponibilidades.length > 0 ? (
          <div>
            {cliente.disponibilidades.map((disp) => (
              <div key={disp.idDisponibilidad} style={{ marginBottom: 8 }}>
                {`${disp.diaSemana}: ${dayjs(
                  disp.horaInicio,
                  'HH:mm:ss'
                ).format('HH:mm')} - ${dayjs(disp.horaFin, 'HH:mm:ss').format(
                  'HH:mm'
                )}`}
              </div>
            ))}
          </div>
        ) : (
          '-'
        )}
      </Item>
      <Item label='Teléfono'>{cliente.telefono || '-'}</Item>
      <Item label='CUIT/CUIL'>{cliente.cuit_cuil || '-'}</Item>
      <Item label='Observaciones'>{cliente.observaciones || '-'}</Item>
    </Descriptions>
  );
};
