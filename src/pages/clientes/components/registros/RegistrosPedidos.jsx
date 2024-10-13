import { useContext } from 'react';
import { Table } from '../../../../components/tables/Table';
import { DataContext } from '../../../../contexts';
import { getFrecuenciaEntrega } from '../../../../utils/getFrecuenciaEntrega';
import { Acciones } from '../../../../components/tables/Acciones';
import dayjs from 'dayjs';
import { AiOutlineCalendar } from 'react-icons/ai';
import { SelectFechaTabla } from '../../../../components/tables/SelectFechaTabla';

export const RegistrosPedidos = ({ cliente }) => {
  const { pedidos } = useContext(DataContext);

  const filteredPedidos = pedidos.filter(
    (pedido) => pedido.idCliente == cliente.id
  );

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
      dataIndex: 'cantSemanas',
      title: 'Frecuencia de entrega',
      align: 'center',
      render: (text) => getFrecuenciaEntrega(text)
    },
    {
      dataIndex: '',
      title: '',
      align: 'center',
      render: (record) => <Acciones entityType='pedido' item={record} />
    }
  ];

  return <Table columns={pedidosColumns} dataSource={filteredPedidos} />;
};
