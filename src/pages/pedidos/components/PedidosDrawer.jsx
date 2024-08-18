import { Drawer } from '../../../components/drawers/Drawer';
import { PedidosAddOrEditDrawer } from './PedidosAddOrEditDrawer';
import { PedidosInfoDrawer } from './PedidosInfoDrawer';

export const PedidosDrawer = ({ mode, pedido, open, setOpen }) => {
  return (
    <Drawer
      itemType='pedido'
      mode={mode}
      item={pedido}
      open={open}
      setOpen={setOpen}
      extraButtonText={mode === 'info' && 'Entregas'}
    >
      {mode === 'info' ? (
        <PedidosInfoDrawer pedido={pedido} />
      ) : (
        <PedidosAddOrEditDrawer
          editMode={mode === 'edit'}
          pedido={pedido}
          setOpen={setOpen}
        />
      )}
    </Drawer>
  );
};
