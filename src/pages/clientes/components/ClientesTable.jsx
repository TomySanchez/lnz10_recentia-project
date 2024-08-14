import { useContext } from 'react';
import { Table } from 'antd';
import { AiOutlineSearch } from 'react-icons/ai';
import { TableActions, TableBuscador } from '../../../components/tables';
import { DataContext } from '../../../contexts';
import { formatDireccion } from '../../../utils';

export const ClientesTable = ({ onInfo, onEdit }) => {
  const { clientes, barrios } = useContext(DataContext);

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
        <TableBuscador
          setSelectedKeys={setSelectedKeys}
          selectedKeys={selectedKeys}
          confirm={confirm}
          clearFilters={clearFilters}
        />
      )
    },
    {
      dataIndex: 'idDireccion',
      title: 'Dirección',
      render: (_, record) => formatDireccion(record.direccion),
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
        <TableBuscador
          setSelectedKeys={setSelectedKeys}
          selectedKeys={selectedKeys}
          confirm={confirm}
          clearFilters={clearFilters}
        />
      )
    },
    {
      dataIndex: 'barrio',
      title: 'Barrio',
      render: (_, record) =>
        `${record.barrio.nombre}, ${record.localidad.nombre}`,
      sorter: (rowA, rowB) =>
        rowA.barrio.nombre.localeCompare(rowB.barrio.nombre),
      filters: barrios.map((barrio) => ({
        text: barrio.nombre,
        value: barrio.nombre
      })),
      onFilter: (value, record) => record.barrio.nombre === value
    },
    {
      dataIndex: 'observaciones',
      title: 'Observaciones'
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
      columns={clientesColumns}
      dataSource={clientes}
      scroll={{ x: 'max-content' }}
    />
  );
};
