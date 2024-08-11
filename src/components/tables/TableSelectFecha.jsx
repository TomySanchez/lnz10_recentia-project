import { Button, DatePicker } from 'antd';
import dayjs from 'dayjs';

export const TableSelectFecha = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters
}) => {
  console.log('selectedKeys', selectedKeys);
  return (
    <div className='TableSelectFecha'>
      <DatePicker
        size='small'
        value={selectedKeys[0]}
        onChange={(event) => {
          setSelectedKeys(dayjs(event).format('DD/MM/YY'));
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
