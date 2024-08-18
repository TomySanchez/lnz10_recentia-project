import { Drawer } from '../../../../components/drawers/Drawer';
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
      extraButtonText={mode === 'info' && 'Registros'}
    >
      {mode === 'info' ? (
        <ProductosInfoDrawer producto={producto} />
      ) : (
        <ProductosAddOrEditDrawer
          editMode={mode === 'edit'}
          producto={producto}
          setOpen={setOpen}
        />
      )}
    </Drawer>
  );
};
