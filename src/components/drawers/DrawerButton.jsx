import { Button } from 'antd';

export const DrawerButton = ({ text, onClick, loading, disabled }) => {
  return (
    <Button
      className='DrawerButton'
      type='primary'
      size='small'
      onClick={onClick}
      loading={loading}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};
