import { useState } from 'react';
import { MdOutlineReceiptLong } from 'react-icons/md';
import { MainContent } from '../../layouts/MainContent';
import { PedidosTable } from './components/PedidosTable';
import { PedidosDrawer } from './components/PedidosDrawer';
import { ButtonAdd } from '../../components/buttons';

export const Pedidos = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerMode, setDrawerMode] = useState('add');
  const [selectedPedido, setSelectedPedido] = useState(null);

  function handleAdd() {
    setDrawerMode('add');
    setSelectedPedido(null);
    setOpenDrawer(true);
  }

  function handleInfo(pedido) {
    setDrawerMode('view');
    setSelectedPedido(pedido);
    setOpenDrawer(true);
  }

  function handleEdit(pedido) {
    setDrawerMode('edit');
    setSelectedPedido(pedido);
    setOpenDrawer(true);
  }

  return (
    <MainContent
      title='Pedidos'
      icon={<MdOutlineReceiptLong size={40} />}
      extra={<ButtonAdd element='pedido' setOpen={handleAdd} />}
    >
      <PedidosTable onInfo={handleInfo} onEdit={handleEdit} />
      <PedidosDrawer
        open={openDrawer}
        setOpen={setOpenDrawer}
        pedido={selectedPedido}
        mode={drawerMode}
      />
    </MainContent>
  );
};
