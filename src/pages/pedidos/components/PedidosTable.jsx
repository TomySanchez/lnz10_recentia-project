import { Table } from 'antd';
import { TableActions } from '../../../components/tables';
import { getItemById } from '../../../utils';
import { useContext } from 'react';
import { DataContext } from '../../../contexts';

export const PedidosTable = ({ onEdit, onInfo }) => {
  const { pedidos } = useContext(DataContext);

  const pedidosColumns = [
    {
      dataIndex: 'fechaRegistro',
      title: 'Fecha de registro',
      align: 'center'
    },
    {
      dataIndex: 'idCliente',
      title: 'Cliente',
      render: (text) => getItemById(text, 'cliente').nombre
    },
    {
      dataIndex: 'cantSemanas',
      title: 'Recurrencia',
      render: (text) => (text ? text : '-'),
      align: 'center'
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

  return <Table rowKey='id' columns={pedidosColumns} dataSource={pedidos} />;
};
