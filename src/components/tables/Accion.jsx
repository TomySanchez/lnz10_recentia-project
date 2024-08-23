import { Tooltip } from 'antd';
import {
  AiOutlineEdit,
  AiOutlineFileSearch,
  AiOutlineStop,
  AiOutlineDelete
} from 'react-icons/ai';

export const Accion = ({ type, onClick }) => {
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
      break;
    case 'cancel':
      accion = {
        icon: AiOutlineStop,
        tooltipTitle: 'Cancelar'
      };
      break;
    case 'delete':
      accion = {
        icon: AiOutlineDelete,
        tooltipTitle: 'Eliminar'
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
