import { useState } from 'react';
import { MainContent } from '../../layouts/MainContent';
import { MdOutlineGroups } from 'react-icons/md';
import { ClientesTable } from './components/ClientesTable';
import { ClientesInfoDrawer } from './components/ClientesInfoDrawer';

export const Clientes = () => {
  const [openInfo, setOpenInfo] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  function handleInfo(cliente) {
    setOpenInfo(true);
    setSelectedCliente(cliente);
  }

  return (
    <MainContent title='Clientes' icon={<MdOutlineGroups size={40} />}>
      <ClientesTable onInfo={handleInfo} />
      <ClientesInfoDrawer
        cliente={selectedCliente}
        open={openInfo}
        setOpen={setOpenInfo}
      />
    </MainContent>
  );
};
