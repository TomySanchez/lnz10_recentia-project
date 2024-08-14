import { useContext } from 'react';
import { DataContext } from '../../../../contexts';
import { Table, Tag } from 'antd';
import { TableActions } from '../../../../components/tables';

export const ProductosTable = ({ onInfo, onEdit, open, setOpen, producto }) => {
  const { productos } = useContext(DataContext);

  const productsColumns = [
    {
      dataIndex: 'nombre',
      title: 'Nombre'
    },
    {
      dataIndex: 'descripcion',
      title: 'Descripción'
    },
    {
      dataIndex: 'estado',
      title: 'Estado',
      render: (text) => {
        const colorTag = text === 'Activo' ? 'blue' : 'orange';

        return <Tag color={colorTag}>{text}</Tag>;
      }
    },
    {
      key: '',
      dataIndex: '',
      title: '',
      align: 'center',
      render: (_, record) => (
        <TableActions
          type='producto'
          record={record}
          onInfo={onInfo}
          onEdit={onEdit}
          open={open}
          setOpen={setOpen}
          producto={producto}
        />
      )
    }
  ];

  return <Table rowKey='id' columns={productsColumns} dataSource={productos} />;
};
