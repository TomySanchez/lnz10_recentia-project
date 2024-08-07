import { Button } from 'antd';

export const ClientesAddButton = ({ setOpen }) => {
  function handleAddClick() {
    setOpen(true);
  }

  return (
    <Button
      className='ClientesAddButton'
      type='primary'
      onClick={handleAddClick}
    >
      Añadir cliente
    </Button>
  );
};
