import { Button } from 'antd';

export const RecorridosPlanificarButton = ({ onAdd }) => {
  return (
    <Button
      className='RecorridosPlanificarButton'
      type='primary'
      onClick={onAdd}
    >
      Planificar recorrido
    </Button>
  );
};
