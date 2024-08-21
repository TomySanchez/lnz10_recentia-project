import { Drawer } from '../../../components/drawers/Drawer';
import { ProductosAddOrEditDrawer } from './ProductosAddOrEditDrawer';
import { ProductosInfoDrawer } from './ProductosInfoDrawer';

export const ProductosDrawer = ({ mode, producto, open, setOpen }) => {
  return (
    <Drawer
      itemType='producto'
      mode={mode}
      item={producto}
      open={open}
      setOpen={setOpen}
    >
      {mode === 'info' ? (
        <ProductosInfoDrawer producto={producto} />
      ) : (
        <ProductosAddOrEditDrawer
          mode={mode}
          producto={producto}
          setOpen={setOpen}
        />
      )}
    </Drawer>
  );
};
