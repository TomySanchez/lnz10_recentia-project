import { Button, Input } from 'antd';
import { AiOutlineSearch } from 'react-icons/ai';

export const TableBuscador = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters
}) => {
  return (
    <div className='TableBuscador'>
      <Input
        size='small'
        placeholder='Buscar...'
        value={selectedKeys[0]}
        onChange={(event) => {
          setSelectedKeys(event.target.value ? [event.target.value] : []);
          confirm(false);
        }}
        prefix={<AiOutlineSearch />}
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
