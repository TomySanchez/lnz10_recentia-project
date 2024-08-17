import { formatDireccion } from '../../../utils/formatDireccion';
import { useContext } from 'react';
import { DataContext } from '../../../contexts';
import { Table } from '../../../components/tables/Table';
import { Acciones } from '../../../components/tables/Acciones';

export const ClientesTable = ({ onInfo, onEdit }) => {
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

  return <Table columns={clientesColumns} dataSource={clientes} />;
};
