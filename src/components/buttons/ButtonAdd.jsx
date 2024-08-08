import { Button } from 'antd';

export const ButtonAdd = ({ element, setOpen }) => {
  function handleClick() {
    setOpen(true);
  }

  return (
    <Button className='ButtonAdd' type='primary' onClick={handleClick}>
      Añadir {element}
    </Button>
  );
};
