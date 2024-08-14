import { Table } from 'antd';
import {
  TableActions,
  TableBuscador,
  TableSelectFecha
} from '../../../components/tables';
import { getItemById } from '../../../utils';
import { useContext } from 'react';
import { DataContext } from '../../../contexts';
import { AiOutlineCalendar, AiOutlineSearch } from 'react-icons/ai';
import dayjs from 'dayjs';

export const PedidosTable = ({ onEdit, onInfo }) => {
  const { pedidos } = useContext(DataContext);

  const pedidosColumns = [
    {
      dataIndex: 'fechaRegistro',
      title: 'Fecha de registro',
      align: 'center',
      sorter: (rowA, rowB) => {
        const fechaA = dayjs(rowA.fechaRegistro, 'DD/MM/YY');
        const fechaB = dayjs(rowB.fechaRegistro, 'DD/MM/YY');

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
        <TableSelectFecha
          setSelectedKeys={setSelectedKeys}
          selectedKeys={selectedKeys}
          confirm={confirm}
          clearFilters={clearFilters}
        />
      )
    },
    {
      dataIndex: 'idCliente',
      title: 'Cliente',
      render: (text) => getItemById(text, 'cliente').nombre,
      sorter: (rowA, rowB) => {
        const clienteA = getItemById(rowA.idCliente, 'cliente').nombre;
        const clienteB = getItemById(rowB.idCliente, 'cliente').nombre;

        return clienteA.localeCompare(clienteB);
      },
      filterIcon: () => <AiOutlineSearch />,
      onFilter: (value, record) => {
        const cliente = getItemById(record.idCliente, 'cliente').nombre;
        return cliente
          .toLowerCase()
          .trim()
          .includes(value.toLowerCase().trim());
      },
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      }) => (
        <TableBuscador
          setSelectedKeys={setSelectedKeys}
          selectedKeys={selectedKeys}
          confirm={confirm}
          clearFilters={clearFilters}
        />
      )
    },
    {
      dataIndex: 'cantSemanas',
      title: 'Recurrencia',
      render: (text) =>
        text ? (text === 1 ? 'Cada semana' : `Cada ${text} semanas`) : '-',
      align: 'center',
      filters: [
        {
          text: 'Sí',
          value: true
        },
        {
          text: 'No',
          value: false
        }
      ],
      onFilter: (value, record) => record.esRecurrente === value
    },
    {
      dataIndex: '',
      title: '',
      align: 'center',
      render: (_, record) => (
        <TableActions record={record} onEdit={onEdit} onInfo={onInfo} />
      )
    }
  ];

  return (
    <Table
      rowKey='id'
      columns={pedidosColumns}
      dataSource={pedidos}
      scroll={{ x: 'max-content' }}
    />
  );
};
