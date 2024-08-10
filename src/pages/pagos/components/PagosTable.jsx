import { useContext } from 'react';
import { Table, Tag } from 'antd';
import { AiOutlineCalendar, AiOutlineSearch } from 'react-icons/ai';
import {
  TableActions,
  TableBuscador,
  TableSelectFecha
} from '../../../components/tables';
import { DataContext } from '../../../contexts';
import { getDetallesDePago, getItemById } from '../../../utils';

export const PagosTable = () => {
  const { pagos } = useContext(DataContext);

  const pagosColumns = [
    {
      dataIndex: 'fechaPago',
      title: 'Fecha de pago',
      align: 'center',
      render: (text) => (text ? text : '-'),
      sorter: (rowA, rowB) => rowA.fechaPago - rowB.fechaPago,
      filterIcon: () => <AiOutlineCalendar />,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      }) => (
        <TableSelectFecha
          setSelectedKeys={setSelectedKeys}
          selectedKeys={selectedKeys}
          confirm={confirm}
          clearFilters={clearFilters}
        />
      )
    },
    {
      dataIndex: 'idEntrega',
      title: 'Cliente',
      render: (text) => {
        const entrega = getItemById(text, 'entrega');
        const pedido = getItemById(entrega.idPedido, 'pedido');
        const cliente = getItemById(pedido.idCliente, 'cliente');
        return cliente.nombre;
      },
      sorter: (rowA, rowB) => {
        const entregaA = getItemById(rowA.idEntrega, 'entrega');
        const entregaB = getItemById(rowB.idEntrega, 'entrega');
        const pedidoA = getItemById(entregaA.idPedido, 'pedido');
        const pedidoB = getItemById(entregaB.idPedido, 'pedido');
        const clienteA = getItemById(pedidoA.idCliente, 'cliente').nombre;
        const clienteB = getItemById(pedidoB.idCliente, 'cliente').nombre;

        return clienteA.localeCompare(clienteB);
      },
      filterIcon: () => <AiOutlineSearch />,
      onFilter: (value, record) => {
        const entrega = getItemById(record.idEntrega, 'entrega');
        const pedido = getItemById(entrega.idPedido, 'pedido');
        const cliente = getItemById(pedido.idCliente, 'cliente').nombre;
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
        <TableBuscador
          setSelectedKeys={setSelectedKeys}
          selectedKeys={selectedKeys}
          confirm={confirm}
          clearFilters={clearFilters}
        />
      )
    },
    {
      dataIndex: 'id',
      title: 'Importe total',
      render: (text) => {
        const detallesDePago = getDetallesDePago(text);
        const importes = detallesDePago.map((detalle) => {
          const precio = getItemById(detalle.idPrecio, 'precio').valor;
          const cantidad = getItemById(
            detalle.idDetalleDeEntrega,
            'detalleDeEntrega'
          ).cantidad;

          return precio * cantidad;
        });
        const importeTotal = importes.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );

        return `$ ${importeTotal}`;
      },
      sorter: (rowA, rowB) => {
        const detallesDePagoA = getDetallesDePago(rowA.id);
        const importesA = detallesDePagoA.map((detalle) => {
          const precioA = getItemById(detalle.idPrecio, 'precio').valor;
          const cantidadA = getItemById(
            detalle.idDetalleDeEntrega,
            'detalleDeEntrega'
          ).cantidad;

          return precioA * cantidadA;
        });
        const importeTotalA = importesA.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );

        const detallesDePagoB = getDetallesDePago(rowB.id);
        const importesB = detallesDePagoB.map((detalle) => {
          const precioB = getItemById(detalle.idPrecio, 'precio').valor;
          const cantidadB = getItemById(
            detalle.idDetalleDeEntrega,
            'detalleDeEntrega'
          ).cantidad;

          return precioB * cantidadB;
        });
        const importeTotalB = importesB.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );

        return importeTotalA - importeTotalB;
      }
    },
    {
      dataIndex: 'estado',
      title: 'Estado',
      render: (text) => (
        <Tag color={text === 'Pagado' ? 'green' : 'red'}>{text}</Tag>
      ),
      sorter: (rowA, rowB) => rowA.estado.localeCompare(rowB.estado),
      filters: [
        { text: 'Pagado', value: 'Pagado' },
        { text: 'Pendiente', value: 'Pendiente' }
      ],
      onFilter: (value, record) => record.estado === value
    },
    {
      dataIndex: '',
      title: '',
      align: 'center',
      render: (_, record) => <TableActions record={record} />
    }
  ];

  return <Table rowKey='id' columns={pagosColumns} dataSource={pagos} />;
};
