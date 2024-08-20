import { useNavigate } from 'react-router-dom';
import { Drawer } from '../../../components/drawers/Drawer';
import { PedidosAddOrEditDrawer } from './PedidosAddOrEditDrawer';
import { PedidosInfoDrawer } from './PedidosInfoDrawer';

export const PedidosDrawer = ({ mode, pedido, open, setOpen }) => {
  const navigateTo = useNavigate();

  function goToListaEntregas() {
    navigateTo(`lista-de-entregas`, { state: { pedido } });
  }

  return (
    <Drawer
      itemType='pedido'
      mode={mode}
      item={pedido}
      open={open}
      setOpen={setOpen}
      onExtraButtonClick={mode === 'info' && goToListaEntregas}
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
