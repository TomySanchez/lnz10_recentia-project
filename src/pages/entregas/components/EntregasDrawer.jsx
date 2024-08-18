import { Drawer } from '../../../components/drawers/Drawer';
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
      <EntregasInfoDrawer entrega={entrega} />
    </Drawer>
  );
};
