import { Button } from 'antd';

export const DrawerButton = ({ text, onClick }) => {
  return (
    <Button
      className='DrawerButton'
      type='primary'
      size='small'
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
