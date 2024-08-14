import { TableAction } from './TableAction';

export const TableActions = ({
  type,
  record,
  onEdit,
  onInfo,
  open,
  setOpen,
  producto
}) => {
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

  if (type && type === 'producto') {
    actions.push({
      type: 'delete',
      tooltipTitle: 'Eliminar',
      onClick: () => setOpen(true)
    });
  }

  return (
    <div className='TableActions'>
      {actions.map((action) => (
        <TableAction
          key={action.type}
          {...action}
          producto={producto}
          open={open}
          setOpen={setOpen}
        />
      ))}
    </div>
  );
};
