import { Tooltip } from 'antd';
import { AiOutlineEdit, AiOutlineFileSearch } from 'react-icons/ai';

const icons = {
  edit: AiOutlineEdit,
  info: AiOutlineFileSearch
};

export const TableAction = ({ type, tooltipTitle, onClick }) => {
  const Icon = icons[type];

  const iconElement = (
    <span>
      <Icon size={18} onClick={onClick} />
    </span>
  );

  return (
    <Tooltip title={tooltipTitle}>
      <span className='TableAction'>{iconElement}</span>
    </Tooltip>
  );
};
