import { Button } from 'antd';

export const ClientesAddButton = ({ onAdd }) => {
  return (
    <Button className='ClientesAddButton' type='primary' onClick={onAdd}>
      Añadir cliente
    </Button>
  );
};
