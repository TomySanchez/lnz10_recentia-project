import { Descriptions, Tag } from 'antd';
import { getMultipleItemsById } from '../../../utils/getMultipleItemsById';
import { getMontoTotal } from '../../../utils/getMontoTotal';
import { EntregasTable } from './EntregasTable';

const { Item } = Descriptions;

export const RecorridosInfoDrawer = ({ recorrido, onInfoEntrega }) => {
  function getColorTagEstado() {
    switch (recorrido.estado) {
      case 'Realizado':
        return 'green';
      case 'Pendiente':
        return 'gold';
      case 'Cancelado':
        return 'red';
    }
  }

  return (
    <>
      <Descriptions column={1}>
        <Item label='Fecha'>{recorrido.fecha}</Item>

        <Item label='Estado'>
          <Tag color={getColorTagEstado()}>{recorrido.estado}</Tag>
        </Item>

        <Item label='Cantidad de entregas'>
          {getMultipleItemsById(recorrido.id, 'entregas').length}
        </Item>

        <Item label='Monto total'>{getMontoTotal(recorrido.id)}</Item>
      </Descriptions>

      <EntregasTable
        className='recorridos-drawer-entregas-table'
        recorrido={recorrido}
        onInfo={onInfoEntrega}
      />
    </>
  );
};
