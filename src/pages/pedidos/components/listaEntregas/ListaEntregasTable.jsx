import { Tag } from 'antd';
import { Table } from '../../../../components/tables/Table';
import { Acciones } from '../../../../components/tables/Acciones';
import { getItemById } from '../../../../utils/getItemById';
import { getDetalles } from '../../../../utils/getDetalles';
import { useContext } from 'react';
import { DataContext } from '../../../../contexts';

export const ListaEntregasTable = ({ pedido }) => {
  const { entregas, pagos } = useContext(DataContext);

  const filteredEntregas = entregas.filter(
    (entrega) => entrega.idPedido == pedido.id
  );

  const entregasColumns = [
    {
      dataIndex: 'idRecorrido',
      title: 'Fecha de entrega',
      align: 'center',
      render: (text) => getItemById(text, 'recorrido')?.fecha || '-'
    },
    {
      dataIndex: 'id',
      title: 'Monto total',
      align: 'center',
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
      render: (record) => <Acciones item={record} />
    }
  ];

  return <Table columns={entregasColumns} dataSource={filteredEntregas} />;
};
