import { useContext } from 'react';
import { Table } from '../../../components/tables/Table';
import { DataContext } from '../../../contexts';
import { Tag } from 'antd';
import { getMultipleItemsById } from '../../../utils/getMultipleItemsById';
import { getMontoTotal } from '../../../utils/getMontoTotal';
import { Acciones } from '../../../components/tables/Acciones';
import { EntregasTable } from './EntregasTable';

export const RecorridosTable = ({ onInfoRecorrido, onInfoEntrega }) => {
  const { recorridos } = useContext(DataContext);

  const recorridosColumns = [
    {
      dataIndex: 'fecha',
      title: 'Fecha',
      align: 'center'
    },
    {
      dataIndex: 'id',
      title: 'Cantidad de entregas',
      align: 'center',
      render: (text) => getMultipleItemsById(text, 'entregas').length
    },
    {
      dataIndex: 'id',
      title: 'Monto total',
      align: 'center',
      render: (text) => getMontoTotal(text)
    },
    {
      dataIndex: 'estado',
      title: 'Estado',
      align: 'center',
      render: (text) => {
        let colorTag;
        switch (text) {
          case 'Pendiente':
            colorTag = 'gold';
            break;
          case 'Cancelado':
            colorTag = 'red';
            break;
          case 'Realizado':
            colorTag = 'green';
            break;
          default:
            colorTag = '';
        }

        return <Tag color={colorTag}>{text}</Tag>;
      }
    },
    {
      dataIndex: '',
      title: '',
      align: 'center',
      render: (record) => <Acciones item={record} onInfo={onInfoRecorrido} />
    }
  ];

  return (
    <Table
      columns={recorridosColumns}
      dataSource={recorridos}
      expandable={{
        expandedRowRender: (record) => (
          <EntregasTable recorrido={record} onInfo={onInfoEntrega} />
        )
      }}
    />
  );
};
