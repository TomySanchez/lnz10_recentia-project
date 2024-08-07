import { Button } from 'antd';

export const PedidosAddButton = ({ setOpen }) => {
  function handleAddClick() {
    setOpen(true);
  }

  return (
    <Button
      className='ClientesAddButton'
      type='primary'
      onClick={handleAddClick}
    >
      Añadir pedido
    </Button>
  );
};
