import { Tag } from 'antd';
import { Table } from '../../../../components/tables/Table';
import { Acciones } from '../../../../components/tables/Acciones';
import { getItemById } from '../../../../utils/getItemById';
import { useContext } from 'react';
import { DataContext } from '../../../../contexts';
import dayjs from 'dayjs';
import { AiOutlineCalendar } from 'react-icons/ai';
import { SelectFechaTabla } from '../../../../components/tables/SelectFechaTabla';
import { calcularMontoTotalEntrega } from '../../../../utils/calcularMontoTotalEntrega';

export const ListaEntregasTable = ({ pedido }) => {
  const { entregas, pagos, precios, recorridos } = useContext(DataContext);

  const filteredEntregas = entregas.filter(
    (entrega) => entrega.idPedido == pedido.id
  );

  const entregasColumns = [
    {
      dataIndex: 'idRecorrido',
      title: 'Fecha de entrega',
      align: 'center',
      render: (text) => getItemById(text, recorridos)?.fecha || '-',
      sorter: (rowA, rowB) => {
        const fechaA = dayjs(
          getItemById(rowA.idRecorrido, recorridos)?.fecha,
          'DD/MM/YY'
        );
        const fechaB = dayjs(
          getItemById(rowB.idRecorrido, recorridos)?.fecha,
          'DD/MM/YY'
        );

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
      )
    },
    {
      dataIndex: 'id',
      title: 'Monto total',
      align: 'center',
      render: (text) => {
        const total = calcularMontoTotalEntrega(text, entregas, pagos, precios);

        return total;
      }
    },
    {
      dataIndex: 'estado',
      title: 'Estado de entrega',
      align: 'center',
      render: (text) => {
        let colorTag;
        switch (text) {
          case 'Pendiente':
            colorTag = 'gold';
            break;
          case 'Cancelada':
            colorTag = 'red';
            break;
          case 'Realizada':
            colorTag = 'green';
            break;
          default:
            colorTag = '';
        }

        return <Tag color={colorTag}>{text}</Tag>;
      },
      filters: [
        {
          text: 'Pendiente',
          value: 'Pendiente'
        },
        {
          text: 'Realizada',
          value: 'Realizada'
        },
        {
          text: 'Cancelada',
          value: 'Cancelada'
        },
        {
          text: 'Sin programar',
          value: 'Sin programar'
        }
      ],
      onFilter: (value, record) => record.estado === value
    },
    {
      dataIndex: 'idPago',
      title: 'Estado de pago',
      align: 'center',
      render: (text) => {
        const pagoDeEntrega = pagos.find((pago) => pago.id == text);

        let colorTag;
        switch (pagoDeEntrega.estado) {
          case 'Pendiente':
            colorTag = 'gold';
            break;
          case 'Pagado':
            colorTag = 'green';
            break;
          default:
            colorTag = '';
        }

        return <Tag color={colorTag}>{pagoDeEntrega.estado}</Tag>;
      },
      filters: [
        {
          text: 'Pendiente',
          value: 'Pendiente'
        },
        {
          text: 'Pagado',
          value: 'Pagado'
        }
      ],
      onFilter: (value, record) => {
        const pagoDeEntrega = pagos.find((pago) => pago.idEntrega == record.id);
        return pagoDeEntrega.estado === value;
      }
    },
    {
      dataIndex: '',
      title: '',
      align: 'center',
      render: (record) => <Acciones entityType='entrega' item={record} />
    }
  ];

  return <Table columns={entregasColumns} dataSource={filteredEntregas} />;
};
