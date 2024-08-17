import { useContext } from 'react';
import { Table } from '../../../components/tables/Table';
import { DataContext } from '../../../contexts';
import { Acciones } from '../../../components/tables/Acciones';
import { getItemById } from '../../../utils/getItemById';

export const PedidosTable = () => {
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
      title: 'Frecuencia de entrega',
      align: 'center',
      render: (text) =>
        text ? (text === 1 ? 'Cada semana' : `Cada ${text} semanas`) : '-'
    },
    {
      dataIndex: '',
      title: '',
      align: 'center',
      render: (record) => <Acciones item={record} />
    }
  ];

  return <Table columns={pedidosColumns} dataSource={pedidos} />;
};
