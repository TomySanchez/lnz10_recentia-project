import { formatDireccion } from '../../../utils/formatDireccion';
import { useContext } from 'react';
import { DataContext } from '../../../contexts';
import { Table } from '../../../components/tables/Table';
import { Acciones } from '../../../components/tables/Acciones';
import { AiOutlineSearch } from 'react-icons/ai';
import { BuscadorTabla } from '../../../components/tables/BuscadorTabla';

export const ClientesTable = ({ onInfo, onEdit, selectedClientesType }) => {
  const { activeClientes, inactiveClientes, loadingClientes, barrios } =
    useContext(DataContext);

  const clientesColumns = [
    {
      dataIndex: 'nombre',
      title: 'Nombre',
      sorter: (rowA, rowB) => rowA.nombre.localeCompare(rowB.nombre),
      filterIcon: () => <AiOutlineSearch />,
      onFilter: (value, record) =>
        record.nombre.toLowerCase().trim().includes(value.toLowerCase().trim()),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      }) => (
        <BuscadorTabla
          setSelectedKeys={setSelectedKeys}
          selectedKeys={selectedKeys}
          confirm={confirm}
          clearFilters={clearFilters}
        />
      )
    },
    {
      dataIndex: 'direccion',
      title: 'Dirección',
      render: (text) => formatDireccion(text),
      sorter: (rowA, rowB) =>
        rowA.direccion.calle.localeCompare(rowB.direccion.calle),
      filterIcon: () => <AiOutlineSearch />,
      onFilter: (value, record) =>
        formatDireccion(record.direccion)
          .toLowerCase()
          .trim()
          .includes(value.toLowerCase().trim()),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      }) => (
        <BuscadorTabla
          setSelectedKeys={setSelectedKeys}
          selectedKeys={selectedKeys}
          confirm={confirm}
          clearFilters={clearFilters}
        />
      )
    },
    {
      dataIndex: '',
      title: 'Barrio',
      render: (_, record) =>
        `${record.direccion.barrio}, ${record.direccion.localidad}`,
      sorter: (rowA, rowB) =>
        rowA.direccion.barrio.localeCompare(rowB.direccion.barrio),
      filters: barrios.map((barrio) => ({
        text: barrio.nombre,
        value: barrio.nombre
      })),
      onFilter: (value, record) => record.direccion.barrio === value
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
        <Acciones
          entityType='cliente'
          item={record}
          onInfo={onInfo}
          onEdit={onEdit}
          isArchived={selectedClientesType === 'Archivados'}
        />
      )
    }
  ];

  return (
    <Table
      columns={clientesColumns}
      dataSource={
        selectedClientesType === 'Archivados'
          ? inactiveClientes
          : activeClientes
      }
      loading={loadingClientes}
    />
  );
};
