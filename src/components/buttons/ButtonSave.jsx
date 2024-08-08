import { Button } from 'antd';

export const ButtonSave = ({ form }) => {
  return (
    <Button
      className='ButtonSave'
      type='primary'
      size='small'
      onClick={() => form.submit()}
    >
      Guardar
    </Button>
  );
};
