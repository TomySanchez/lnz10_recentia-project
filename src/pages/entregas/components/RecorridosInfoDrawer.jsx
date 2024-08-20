import { Descriptions, Tag } from 'antd';
import { getMultipleItemsById } from '../../../utils/getMultipleItemsById';
import { EntregasTable } from './EntregasTable';
import { getMontoTotalRecorrido } from '../../../utils/getMontoTotalRecorrido';

const { Item } = Descriptions;

export const RecorridosInfoDrawer = ({
  recorrido,
  onInfoEntrega,
  onEditEntrega
}) => {
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

        <Item label='Monto total'>{getMontoTotalRecorrido(recorrido.id)}</Item>
      </Descriptions>

      <EntregasTable
        className='recorridos-drawer-entregas-table'
        recorrido={recorrido}
        onInfo={onInfoEntrega}
        onEdit={onEditEntrega}
      />
    </>
  );
};
