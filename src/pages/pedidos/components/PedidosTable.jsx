import { useContext } from 'react';
import { Table } from '../../../components/tables/Table';
import { DataContext } from '../../../contexts';
import { Acciones } from '../../../components/tables/Acciones';
import { getItemById } from '../../../utils/getItemById';
import { getFrecuenciaEntrega } from '../../../utils/getFrecuenciaEntrega';

export const PedidosTable = ({ onInfo, onEdit }) => {
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
      render: (text) => getFrecuenciaEntrega(text)
    },
    {
      dataIndex: '',
      title: '',
      align: 'center',
      render: (record) => (
        <Acciones item={record} onInfo={onInfo} onEdit={onEdit} />
      )
    }
  ];

  return <Table columns={pedidosColumns} dataSource={pedidos} />;
};
