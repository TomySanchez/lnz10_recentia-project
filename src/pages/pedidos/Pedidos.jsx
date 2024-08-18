import { MdOutlineReceiptLong } from 'react-icons/md';
import { MainContent } from '../../layouts/MainContent';
import { PedidosTable } from './components/PedidosTable';
import { PedidosDrawer } from './components/PedidosDrawer';
import { useState } from 'react';
import { AddButton } from '../../components/buttons/AddButton';

export const Pedidos = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [drawerMode, setDrawerMode] = useState('add');

  function handleInfo(pedido) {
    setOpenDrawer(true);
    setSelectedPedido(pedido);
    setDrawerMode('info');
  }

  function handleAdd() {
    setOpenDrawer(true);
    setDrawerMode('add');
  }

  function handleEdit(pedido) {
    setOpenDrawer(true);
    setSelectedPedido(pedido);
    setDrawerMode('edit');
  }

  return (
    <MainContent
      title='Pedidos'
      icon={<MdOutlineReceiptLong size={40} />}
      extra={<AddButton element='pedido' onAdd={handleAdd} />}
    >
      <PedidosTable onInfo={handleInfo} onEdit={handleEdit} />

      <PedidosDrawer
        mode={drawerMode}
        pedido={selectedPedido}
        open={openDrawer}
        setOpen={setOpenDrawer}
      />
    </MainContent>
  );
};
