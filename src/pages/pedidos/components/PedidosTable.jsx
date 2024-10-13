import { useContext } from 'react';
import { Table } from '../../../components/tables/Table';
import { DataContext } from '../../../contexts';
import { Acciones } from '../../../components/tables/Acciones';
import { getItemById } from '../../../utils/getItemById';
import { getFrecuenciaEntrega } from '../../../utils/getFrecuenciaEntrega';
import dayjs from 'dayjs';
import { AiOutlineCalendar, AiOutlineSearch } from 'react-icons/ai';
import { SelectFechaTabla } from '../../../components/tables/SelectFechaTabla';
import { BuscadorTabla } from '../../../components/tables/BuscadorTabla';
import { Tag } from 'antd';

export const PedidosTable = ({ onInfo, onEdit }) => {
  const { clientes, pedidos, loadingPedidos } = useContext(DataContext);

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
        <SelectFechaTabla
          setSelectedKeys={setSelectedKeys}
          selectedKeys={selectedKeys}
          confirm={confirm}
          clearFilters={clearFilters}
        />
      ),
      onFilter: (value, record) => {
        const fechaRegistro = dayjs(record.fechaRegistro, 'DD/MM/YY');
        return fechaRegistro.isSame(dayjs(value, 'DD/MM/YY'));
      }
    },
    {
      dataIndex: 'idCliente',
      title: 'Cliente',
      render: (text) => getItemById(text, clientes)?.nombre,
      sorter: (rowA, rowB) => {
        const clienteA = getItemById(rowA.idCliente, clientes)?.nombre;
        const clienteB = getItemById(rowB.idCliente, clientes)?.nombre;

        return clienteA.localeCompare(clienteB);
      },
      filterIcon: () => <AiOutlineSearch />,
      onFilter: (value, record) => {
        const cliente = getItemById(record.idCliente, clientes)?.nombre;
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
        <BuscadorTabla
          setSelectedKeys={setSelectedKeys}
          selectedKeys={selectedKeys}
          confirm={confirm}
          clearFilters={clearFilters}
        />
      )
    },
    {
      dataIndex: 'cantSemanas',
      title: 'Frecuencia de entrega',
      align: 'center',
      render: (text) => getFrecuenciaEntrega(text)
    },
    {
      dataIndex: 'estado',
      title: 'Estado',
      align: 'center',
      render: (text) => {
        function getColorTag() {
          switch (text) {
            case 'Pendiente':
              return 'gold';
            case 'Realizado':
              return 'green';
            case 'Activo':
              return 'blue';
            case 'Cancelado':
              return 'red';
            default:
              return 'black';
          }
        }

        return <Tag color={getColorTag()}>{text}</Tag>;
      }
    },
    {
      dataIndex: '',
      title: '',
      align: 'center',
      render: (record) => (
        <Acciones
          entityType='pedidos'
          item={record}
          onInfo={onInfo}
          onEdit={onEdit}
        />
      )
    }
  ];

  return (
    <Table
      columns={pedidosColumns}
      dataSource={pedidos}
      loading={loadingPedidos}
    />
  );
};
