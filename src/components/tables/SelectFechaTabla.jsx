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
        value={selectedKeys[0] ? dayjs(selectedKeys[0], 'DD/MM/YY') : null}
        onChange={(date) => {
          setSelectedKeys(date ? [dayjs(date).format('DD/MM/YY')] : []);
          confirm();
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
