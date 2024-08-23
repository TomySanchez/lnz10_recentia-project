import { Tag } from 'antd';
import { getItemById } from '../../../utils/getItemById';
import { Acciones } from '../../../components/tables/Acciones';
import { Table } from '../../../components/tables/Table';
import { getMultipleItemsById } from '../../../utils/getMultipleItemsById';
import { getDetalles } from '../../../utils/getDetalles';
import { useContext } from 'react';
import { DataContext } from '../../../contexts';

export const EntregasTable = ({ className, recorrido, onInfo, onEdit }) => {
  const { pagos } = useContext(DataContext);

  const entregasColumns = [
    {
      dataIndex: 'idPedido',
      title: 'Cliente',
      render: (item) => {
        const pedido = getItemById(item, 'pedido');
        const cliente = getItemById(pedido.idCliente, 'cliente');

        return cliente.nombre;
      }
    },
    {
      dataIndex: 'id',
      title: 'Monto total',
      render: (text) => {
        const pagoDeEntrega = pagos.find((pago) => pago.idEntrega == text);
        const detallesDePago = getDetalles(pagoDeEntrega.id, 'pagos');
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
      dataIndex: 'id',
      title: 'Estado de pago',
      align: 'center',
      render: (text) => {
        const pagoDeEntrega = pagos.find((pago) => pago.idEntrega == text);

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
          entityType='entregas'
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
      dataSource={getMultipleItemsById(recorrido.id, 'entregas')}
      pagination={false}
    />
  );
};
