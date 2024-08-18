import { Drawer } from '../../../components/drawers/Drawer';
import { ClientesAddOrEditDrawer } from './ClientesAddOrEditDrawer';
import { ClientesInfoDrawer } from './ClientesInfoDrawer';

export const ClientesDrawer = ({ mode, cliente, open, setOpen }) => {
  return (
    <Drawer
      itemType='cliente'
      mode={mode}
      item={cliente}
      open={open}
      setOpen={setOpen}
      extraButtonText={mode === 'info' && 'Registros'}
    >
      {mode === 'info' ? (
        <ClientesInfoDrawer cliente={cliente} />
      ) : (
        <ClientesAddOrEditDrawer
          editMode={mode === 'edit'}
          cliente={cliente}
          setOpen={setOpen}
        />
      )}
    </Drawer>
  );
};
