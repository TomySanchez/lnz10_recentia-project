import { Accion } from './Accion';

export const Acciones = ({ entityType, item, onInfo, onEdit }) => {
  return (
    <div className='Acciones'>
      <Accion type='info' onClick={() => onInfo(item)} />
      <Accion type='edit' onClick={() => onEdit(item)} />
      {entityType === 'recorridos' && <Accion type='cancel' />}
      {(entityType === 'entregas' ||
        entityType === 'pedidos' ||
        entityType === 'productos') && <Accion type='delete' />}
    </div>
  );
};
