import { Table } from 'antd';
import { formatDireccion } from '../../../utils/formatDireccion';
import { useContext } from 'react';
import { DataContext } from '../../../contexts';

export const ClientesTable = () => {
  const { clientes } = useContext(DataContext);

  const clientesColumns = [
    {
      dataIndex: 'nombre',
      title: 'Nombre'
    },
    {
      dataIndex: 'idDireccion',
      title: 'Dirección',
      render: (_, record) => formatDireccion(record.direccion)
    },
    {
      dataIndex: 'barrio',
      title: 'Barrio',
      render: (_, record) =>
        `${record.barrio.nombre}, ${record.localidad.nombre}`
    },
    {
      dataIndex: 'observaciones',
      title: 'Observaciones'
    }
  ];

  return <Table rowKey='id' columns={clientesColumns} dataSource={clientes} />;
};
