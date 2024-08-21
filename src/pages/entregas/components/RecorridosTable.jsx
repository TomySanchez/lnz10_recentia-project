import { useContext } from 'react';
import { Table } from '../../../components/tables/Table';
import { DataContext } from '../../../contexts';
import { Tag } from 'antd';
import { getMultipleItemsById } from '../../../utils/getMultipleItemsById';
import { Acciones } from '../../../components/tables/Acciones';
import { EntregasTable } from './EntregasTable';
import { getMontoTotalRecorrido } from '../../../utils/getMontoTotalRecorrido';
import dayjs from 'dayjs';
import { AiOutlineCalendar } from 'react-icons/ai';
import { SelectFechaTabla } from '../../../components/tables/SelectFechaTabla';

export const RecorridosTable = ({
  onInfoRecorrido,
  onEditRecorrido,
  onInfoEntrega,
  onEditEntrega
}) => {
  const { recorridos } = useContext(DataContext);

  const recorridosColumns = [
    {
      dataIndex: 'fecha',
      title: 'Fecha',
      align: 'center',
      sorter: (rowA, rowB) => {
        const fechaA = dayjs(rowA.fecha, 'DD/MM/YY');
        const fechaB = dayjs(rowB.fecha, 'DD/MM/YY');

        return fechaA - fechaB;
      },
      defaultSortOrder: 'descend',
      filterIcon: () => <AiOutlineCalendar />,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      }) => (
        <SelectFechaTabla
          setSelectedKeys={setSelectedKeys}
          selectedKeys={selectedKeys}
          confirm={confirm}
          clearFilters={clearFilters}
        />
      )
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
      render: (text) => getMontoTotalRecorrido(text)
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
      },
      filters: [
        {
          text: 'Pendiente',
          value: 'Pendiente'
        },
        {
          text: 'Realizado',
          value: 'Realizado'
        },
        {
          text: 'Cancelado',
          value: 'Cancelado'
        }
      ],
      onFilter: (value, record) => record.estado === value
    },
    {
      dataIndex: '',
      title: '',
      align: 'center',
      render: (record) => (
        <Acciones
          item={record}
          onInfo={onInfoRecorrido}
          onEdit={onEditRecorrido}
        />
      )
    }
  ];

  return (
    <Table
      columns={recorridosColumns}
      dataSource={recorridos}
      expandable={{
        expandedRowRender: (record) => (
          <EntregasTable
            recorrido={record}
            onInfo={onInfoEntrega}
            onEdit={onEditEntrega}
          />
        )
      }}
    />
  );
};
