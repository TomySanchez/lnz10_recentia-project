import { Button, DatePicker } from 'antd';
import dayjs from 'dayjs';

export const SelectFechaTabla = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters
}) => {
  return (
    <div className='SelectFechaTabla'>
      <DatePicker
        size='small'
        value={selectedKeys[0]}
        onChange={(event) => {
          setSelectedKeys(dayjs(event).format('DD/MM/YY').toString());
          confirm(false);
        }}
        format='DD/MM/YY'
      />

      <Button
        type='primary'
        size='small'
        onClick={() => clearFilters({ confirm: true, closeDropdown: true })}
      >
        Reiniciar
      </Button>
    </div>
  );
};
