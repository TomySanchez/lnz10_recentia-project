import { useContext } from 'react';
import { Table, Tag } from 'antd';
import { TableActions } from '../../../components/tables';
import { DataContext } from '../../../contexts';
import { getDetallesDePago, getEntregas, getItemById } from '../../../utils';
import { getPagos } from '../../../utils';
import dayjs from 'dayjs';

export const EntregasRecorridosTable = ({ onInfo, onEdit }) => {
  const { recorridos } = useContext(DataContext);

  const recorridosColumns = [
    {
      dataIndex: 'fecha',
      title: 'Fecha',
      align: 'center',
      sorter: (rowA, rowB) => {
        const fechaA = dayjs(rowA.fecha, 'DD/MM/YY');
        const fechaB = dayjs(rowB.fecha, 'DD/MM/YY');

        return fechaA - fechaB;
      },
      defaultSortOrder: 'descend'
    },
    {
      dataIndex: 'id',
      title: 'Cantidad de entregas',
      align: 'center',
      render: (text) => getEntregas(text).length
    },
    {
      dataIndex: 'id',
      title: 'Monto total',
      align: 'center',
      render: (text) => {
        const entregas = getEntregas(text);

        const importesEntregas = entregas.map((entrega) => {
          const pagos = getPagos(entrega.id);
          const importesPagos = pagos.map((pago) => {
            const detallesDePago = getDetallesDePago(pago.id);
            const importes = detallesDePago.map((detalle) => {
              const precio = getItemById(detalle.idPrecio, 'precio').valor;
              const cantidad = getItemById(
                detalle.idDetalleDeEntrega,
                'detalleDeEntrega'
              ).cantidad;

              return precio * cantidad;
            });
            return importes.reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            );
          });
          return importesPagos.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
        });

        const montoTotal = importesEntregas.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );

        return `$ ${montoTotal}`;
      }
    },
    {
      dataIndex: 'estado',
      title: 'Estado',
      align: 'center',
      render: (text) => {
        let colorTag;
        switch (text) {
          case 'Pendiente':
            colorTag = 'gold';
            break;
          case 'Cancelado':
            colorTag = 'red';
            break;
          case 'Realizado':
            colorTag = 'green';
            break;
          default:
            colorTag = '';
        }

        return <Tag color={colorTag}>{text}</Tag>;
      }
    },
    {
      dataIndex: '',
      title: '',
      align: 'center',
      render: (_, record) => (
        <TableActions record={record} onInfo={onInfo} onEdit={onEdit} />
      )
    }
  ];

  function expandedRowRender(record) {
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
        dataIndex: 'estado',
        title: 'Estado',
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
        dataIndex: '',
        title: '',
        align: 'center',
        render: (_, record) => (
          <TableActions record={record} onInfo={onInfo} onEdit={onEdit} />
        )
      }
    ];

    return (
      <Table
        rowKey='id'
        size='small'
        columns={entregasColumns}
        dataSource={getEntregas(record.id)}
        pagination={false}
      />
    );
  }

  return (
    <Table
      rowKey='id'
      columns={recorridosColumns}
      dataSource={recorridos}
      expandable={{
        expandedRowRender
      }}
    />
  );
};
