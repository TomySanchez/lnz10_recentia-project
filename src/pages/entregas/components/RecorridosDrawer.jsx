import { Drawer } from '../../../components/drawers/Drawer';
import { RecorridosInfoDrawer } from './RecorridosInfoDrawer';

export const RecorridosDrawer = ({ mode, recorrido, open, setOpen }) => {
  return (
    <Drawer
      itemType='recorrido'
      mode={mode}
      item={recorrido}
      open={open}
      setOpen={setOpen}
    >
      <RecorridosInfoDrawer recorrido={recorrido} />
    </Drawer>
  );
};
