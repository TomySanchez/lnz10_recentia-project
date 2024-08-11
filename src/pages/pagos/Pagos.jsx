import { useState } from 'react';
import { MdOutlinePayments } from 'react-icons/md';
import { MainContent } from '../../layouts/MainContent';
import { PagosTable } from './components/PagosTable';
import { PagosDrawer } from './components/PagosDrawer';

export const Pagos = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerMode, setDrawerMode] = useState('view');
  const [selectedPago, setSelectedPago] = useState({});

  function handleInfo(pago) {
    setDrawerMode('view');
    setSelectedPago(pago);
    setOpenDrawer(true);
  }

  function handleEdit(pago) {
    setDrawerMode('edit');
    setSelectedPago(pago);
    setOpenDrawer(true);
  }

  return (
    <MainContent title='Pagos' icon={<MdOutlinePayments size={40} />}>
      <PagosTable onInfo={handleInfo} onEdit={handleEdit} />
      <PagosDrawer
        open={openDrawer}
        setOpen={setOpenDrawer}
        pago={selectedPago}
        mode={drawerMode}
      />
    </MainContent>
  );
};
