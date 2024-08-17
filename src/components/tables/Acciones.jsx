import { Accion } from './Accion';

export const Acciones = ({ item, onInfo, onEdit }) => {
  return (
    <div className='Acciones'>
      <Accion type='info' onClick={() => onInfo(item)} />
      <Accion type='edit' onClick={() => onEdit(item)} />
    </div>
  );
};
