import { Tag } from 'antd';
import { getItemById } from '../../../utils/getItemById';
import { Acciones } from '../../../components/tables/Acciones';
import { Table } from '../../../components/tables/Table';
import { useContext } from 'react';
import { DataContext } from '../../../contexts';
import { calcularMontoTotalEntrega } from '../../../utils/calcularMontoTotalEntrega.js';

export const EntregasTable = ({ className, recorrido, onInfo, onEdit }) => {
  const { clientes, entregas, pagos, pedidos, precios } =
    useContext(DataContext);

  const entregasDelRecorrido = entregas?.filter(
    (e) => e.idRecorrido == recorrido.id
  );

  const entregasColumns = [
    {
      dataIndex: 'idPedido',
      title: 'Cliente',
      render: (item) => {
        const pedido = getItemById(item, pedidos);
        const cliente = getItemById(pedido.idCliente, clientes);

        return cliente?.nombre;
      }
    },
    {
      dataIndex: 'id',
      title: 'Monto total',
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
      }
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
      }
    },
    {
      dataIndex: '',
      title: '',
      align: 'center',
      render: (record) => (
        <Acciones
          entityType='entrega'
          item={record}
          onInfo={onInfo}
          onEdit={onEdit}
        />
      )
    }
  ];

  return (
    <Table
      className={className}
      size='small'
      columns={entregasColumns}
      dataSource={entregasDelRecorrido}
      pagination={false}
    />
  );
};
