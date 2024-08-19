import { useContext } from 'react';
import { Table } from '../../../../components/tables/Table';
import { DataContext } from '../../../../contexts';
import { getFrecuenciaEntrega } from '../../../../utils/getFrecuenciaEntrega';
import { Acciones } from '../../../../components/tables/Acciones';

export const RegistrosPedidos = ({ cliente }) => {
  const { pedidos } = useContext(DataContext);

  const filteredPedidos = pedidos.filter(
    (pedido) => pedido.idCliente == cliente.id
  );

  const pedidosColumns = [
    {
      dataIndex: 'fechaRegistro',
      title: 'Fecha de registro',
      align: 'center'
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
      render: (record) => <Acciones item={record} />
    }
  ];

  return <Table columns={pedidosColumns} dataSource={filteredPedidos} />;
};
