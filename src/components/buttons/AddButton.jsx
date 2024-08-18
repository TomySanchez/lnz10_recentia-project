import { Button } from 'antd';

export const AddButton = ({ element, onAdd }) => {
  return (
    <Button className='AddButton' type='primary' onClick={onAdd}>
      Añadir {element}
    </Button>
  );
};
