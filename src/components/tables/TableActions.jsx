import { TableAction } from './TableAction';

export const TableActions = ({ record, onEdit, onInfo }) => {
  const actions = [
    {
      type: 'info',
      tooltipTitle: 'Más información',
      onClick: () => onInfo(record)
    }
  ];

  // Si no es un recorrido. TEMPORAL
  if (!record.fecha) {
    actions.push({
      type: 'edit',
      tooltipTitle: 'Editar',
      onClick: () => onEdit(record)
    });
  }

  return (
    <div className='TableActions'>
      {actions.map((action) => (
        <TableAction key={action.type} {...action} />
      ))}
    </div>
  );
};
