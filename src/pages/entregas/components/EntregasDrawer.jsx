import { Drawer } from '../../../components/drawers/Drawer';
import { EntregasEditDrawer } from './EntregasEditDrawer';
import { EntregasInfoDrawer } from './EntregasInfoDrawer';

export const EntregasDrawer = ({ mode, entrega, open, setOpen }) => {
  return (
    <Drawer
      itemType='entrega'
      mode={mode}
      item={entrega}
      open={open}
      setOpen={setOpen}
    >
      {mode === 'info' ? (
        <EntregasInfoDrawer entrega={entrega} />
      ) : (
        <EntregasEditDrawer entrega={entrega} setOpen={setOpen} />
      )}
    </Drawer>
  );
};
