import { Tooltip } from 'antd';
import { AiOutlineEdit, AiOutlineFileSearch } from 'react-icons/ai';

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
