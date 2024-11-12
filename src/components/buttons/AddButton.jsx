import { Button } from 'antd';

export const AddButton = ({ element, onAdd, disabled }) => {
  return (
    <Button
      className='AddButton'
      type='primary'
      onClick={() => onAdd('computer')}
      disabled={disabled}
    >
      Añadir {element}
    </Button>
  );
};
