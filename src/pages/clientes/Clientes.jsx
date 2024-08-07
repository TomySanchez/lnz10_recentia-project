import { useState } from 'react';
import { MdOutlineGroups } from 'react-icons/md';
import { MainContent } from '../../layouts/MainContent';
import { ClientesTable } from './components';
import { ClientesInfoDrawer } from './components/ClientesInfoDrawer';

export const Clientes = () => {
  const [openInfoDrawer, setOpenInfoDrawer] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  function handleInfo(cliente) {
    setSelectedCliente(cliente);
    setOpenInfoDrawer(true);
  }

  return (
    <MainContent title='Clientes' icon={<MdOutlineGroups size={40} />}>
      <ClientesTable onInfo={handleInfo} />
      <ClientesInfoDrawer
        open={openInfoDrawer}
        setOpen={setOpenInfoDrawer}
        cliente={selectedCliente}
      />
    </MainContent>
  );
};
