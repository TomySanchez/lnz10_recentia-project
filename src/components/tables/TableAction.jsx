import { Tooltip } from 'antd';
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFileSearch
} from 'react-icons/ai';
import { ProductosDeletePopover } from '../../pages/configuracion/productos/components/ProductosDeletePopover';

const icons = {
  edit: AiOutlineEdit,
  info: AiOutlineFileSearch,
  delete: AiOutlineDelete
};

// Todo lo relacionado al popover de Eliminar producto es temporal

export const TableAction = ({
  type,
  tooltipTitle,
  onClick,
  producto,
  open,
  setOpen
}) => {
  const Icon = icons[type];

  const iconElement = (
    <span>
      <Icon size={18} onClick={onClick} />
    </span>
  );

  return (
    <>
      {type === 'delete' ? (
        <ProductosDeletePopover
          producto={producto}
          open={open}
          setOpen={setOpen}
        >
          <Tooltip title={tooltipTitle}>
            <span className='TableAction'>{iconElement}</span>
          </Tooltip>
        </ProductosDeletePopover>
      ) : (
        <Tooltip title={tooltipTitle}>
          <span className='TableAction'>{iconElement}</span>
        </Tooltip>
      )}
    </>
  );
};
