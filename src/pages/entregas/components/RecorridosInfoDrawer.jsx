import { Descriptions, Tag } from 'antd';
import { EntregasTable } from './EntregasTable';
import { useContext } from 'react';
import { DataContext } from '../../../contexts';
import { calcularMontoTotalRecorrido } from '../../../utils/calcularMontoTotalRecorrido';

const { Item } = Descriptions;

export const RecorridosInfoDrawer = ({
  recorrido,
  onInfoEntrega,
  onEditEntrega
}) => {
  const { entregas, pagos, precios } = useContext(DataContext);

  const entregasDelRecorrido = entregas?.filter(
    (e) => e.idRecorrido == recorrido?.id
  );

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
      <Descriptions column={1} labelStyle={{ color: '#000000aa' }}>
        <Item label='Fecha'>{recorrido.fecha}</Item>

        <Item label='Estado'>
          <Tag color={getColorTagEstado()}>{recorrido.estado}</Tag>
        </Item>

        <Item label='Cantidad de entregas'>{entregasDelRecorrido.length}</Item>

        <Item label='Monto total'>
          {calcularMontoTotalRecorrido(recorrido?.id, entregas, pagos, precios)}
        </Item>
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
