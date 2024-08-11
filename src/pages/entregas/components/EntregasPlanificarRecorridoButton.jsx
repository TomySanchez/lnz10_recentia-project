import { Button } from 'antd';

export const EntregasPlanificarRecorridoButton = () => {
  function handleClick() {
    console.log('click');
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
