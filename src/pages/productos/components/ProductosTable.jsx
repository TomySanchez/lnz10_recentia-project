import { useContext } from 'react';
import { DataContext } from '../../../contexts';
import { Table } from '../../../components/tables/Table';
import { Tag } from 'antd';
import { Acciones } from '../../../components/tables/Acciones';

export const ProductosTable = ({ onInfo, onEdit }) => {
  const { productos } = useContext(DataContext);

  const productosColumns = [
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
      render: (record) => (
        <Acciones
          entityType='productos'
          item={record}
          onInfo={onInfo}
          onEdit={onEdit}
        />
      )
    }
  ];

  return <Table columns={productosColumns} dataSource={productos} />;
};
