import { Button } from 'antd';

export const DrawerButton = ({ text, onClick, loading }) => {
  return (
    <Button
      className='DrawerButton'
      type='primary'
      size='small'
      onClick={onClick}
      loading={loading}
    >
      {text}
    </Button>
  );
};
