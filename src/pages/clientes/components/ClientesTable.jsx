import { Table, Tooltip } from 'antd';
import { formatDireccion } from '../../../utils/formatDireccion';
import { useContext } from 'react';
import { DataContext } from '../../../contexts';
import { AiOutlineEdit, AiOutlineFileSearch } from 'react-icons/ai';

export const ClientesTable = ({ onInfo }) => {
  const { clientes } = useContext(DataContext);

  const clientesColumns = [
    {
      dataIndex: 'nombre',
      title: 'Nombre'
    },
    {
      dataIndex: 'idDireccion',
      title: 'Dirección',
      render: (_, record) => formatDireccion(record.direccion)
    },
    {
      dataIndex: 'barrio',
      title: 'Barrio',
      render: (_, record) =>
        `${record.barrio.nombre}, ${record.localidad.nombre}`
    },
    {
      dataIndex: 'observaciones',
      title: 'Observaciones'
    },
    {
      dataIndex: '',
      title: '',
      render: (record) => <Acciones cliente={record} onInfo={onInfo} />
    }
  ];

  return <Table rowKey='id' columns={clientesColumns} dataSource={clientes} />;
};

const Acciones = ({ cliente, onInfo }) => {
  return (
    <div className='Acciones'>
      <Accion type='info' onClick={() => onInfo(cliente)} />
      <Accion type='edit' />
    </div>
  );
};

const Accion = ({ type, onClick }) => {
  let accion = {
    icon: '',
    tooltipTitle: ''
  };
  switch (type) {
    case 'info':
      accion = {
        icon: AiOutlineFileSearch,
        tooltipTitle: 'Más información'
      };
      break;
    case 'edit':
      accion = {
        icon: AiOutlineEdit,
        tooltipTitle: 'Editar'
      };
  }

  const Icon = accion.icon;

  return (
    <Tooltip title={accion.tooltipTitle}>
      <span className='Accion'>
        <Icon size={18} onClick={onClick} />
      </span>
    </Tooltip>
  );
};
