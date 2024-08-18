import { Button } from 'antd';

export const RecorridosPlanificarButton = ({ setOpen }) => {
  function handleClick() {
    setOpen(true);
  }

  return (
    <Button
      className='RecorridosPlanificarButton'
      type='primary'
      onClick={handleClick}
    >
      Planificar recorrido
    </Button>
  );
};
