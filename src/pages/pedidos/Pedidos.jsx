import { MdOutlineReceiptLong } from 'react-icons/md';
import { MainContent } from '../../layouts/MainContent';
import { PedidosTable } from './components/PedidosTable';
import { PedidosDrawer } from './components/PedidosDrawer';
import { useContext, useState } from 'react';
import { AddButton } from '../../components/buttons/AddButton';
import { PedidosMobile } from './components/PedidosMobile';
import { MobileContent } from '../../layouts/MobileContent';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';

export const Pedidos = () => {
  const windowWidth = useContext(ResponsiveContext);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [drawerMode, setDrawerMode] = useState('add');
  const [device, setDevice] = useState('computer');

  function handleInfo(pedido, device) {
    setOpenDrawer(true);
    setSelectedPedido(pedido);
    setDrawerMode('info');
    setDevice(device);
  }

  function handleAdd(device) {
    setOpenDrawer(true);
    setDrawerMode('add');
    setDevice(device);
  }

  function handleEdit(pedido, device) {
    setOpenDrawer(true);
    setSelectedPedido(pedido);
    setDrawerMode('edit');
    setDevice(device);
  }

  return (
    <>
      {windowWidth > 700 ? (
        <MainContent
          title='Pedidos'
          icon={<MdOutlineReceiptLong size={40} />}
          extra={<AddButton element='pedido' onAdd={handleAdd} />}
        >
          <PedidosTable onInfo={handleInfo} onEdit={handleEdit} />
        </MainContent>
      ) : (
        <MobileContent
          title='Pedidos'
          icon={<MdOutlineReceiptLong size={50} />}
        >
          <PedidosMobile
            onAdd={handleAdd}
            onInfo={handleInfo}
            onEdit={handleEdit}
          />
        </MobileContent>
      )}

      <PedidosDrawer
        device={device}
        mode={drawerMode}
        pedido={selectedPedido}
        open={openDrawer}
        setOpen={setOpenDrawer}
      />
    </>
  );
};
