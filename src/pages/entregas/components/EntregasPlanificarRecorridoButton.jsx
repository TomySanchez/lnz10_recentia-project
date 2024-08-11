import { Button } from 'antd';

export const EntregasPlanificarRecorridoButton = ({ setOpen }) => {
  function handleClick() {
    setOpen(true);
  }

  return (
    <Button
      className='EntregasPlanificarRecorridoButton'
      type='primary'
      onClick={handleClick}
    >
      Planificar recorrido
    </Button>
  );
};
