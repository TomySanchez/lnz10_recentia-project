import { Button } from 'antd';

export const DrawerButton = ({ text }) => {
  return (
    <Button className='DrawerButton' type='primary' size='small'>
      {text}
    </Button>
  );
};
