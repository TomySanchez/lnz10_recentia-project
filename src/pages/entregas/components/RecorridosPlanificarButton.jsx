import { Button } from 'antd';

export const RecorridosPlanificarButton = ({ onAdd, disabled }) => {
  return (
    <Button
      className='RecorridosPlanificarButton'
      type='primary'
      onClick={onAdd}
      disabled={disabled}
    >
      Planificar recorrido
    </Button>
  );
};
