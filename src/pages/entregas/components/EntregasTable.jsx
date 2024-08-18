import { Tag } from 'antd';
import { getItemById } from '../../../utils/getItemById';
import { Acciones } from '../../../components/tables/Acciones';
import { Table } from '../../../components/tables/Table';
import { getMultipleItemsById } from '../../../utils/getMultipleItemsById';

export const EntregasTable = ({ record }) => {
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
      render: (record) => <Acciones />
    }
  ];

  return (
    <Table
      size='small'
      columns={entregasColumns}
      dataSource={getMultipleItemsById(record.id, 'entregas')}
      pagination={false}
    />
  );
};
