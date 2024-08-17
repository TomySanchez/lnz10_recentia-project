import { useState } from 'react';
import { MainContent } from '../../layouts/MainContent';
import { MdOutlineGroups } from 'react-icons/md';
import { ClientesTable } from './components/ClientesTable';
import { ClientesDrawer } from './components/ClientesDrawer';
import { ClientesAddButton } from './components/ClientesAddButton';

export const Clientes = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [drawerMode, setDrawerMode] = useState('add');

  function handleInfo(cliente) {
    setOpenDrawer(true);
    setSelectedCliente(cliente);
    setDrawerMode('info');
  }

  function handleAdd() {
    setOpenDrawer(true);
    setDrawerMode('add');
  }

  return (
    <MainContent
      title='Clientes'
      icon={<MdOutlineGroups size={40} />}
      extra={<ClientesAddButton onAdd={handleAdd} />}
    >
      <ClientesTable onInfo={handleInfo} />
      <ClientesDrawer
        mode={drawerMode}
        cliente={selectedCliente}
        open={openDrawer}
        setOpen={setOpenDrawer}
      />
      {/* <ClientesInfoDrawer
        cliente={selectedCliente}
        open={openInfo}
        setOpen={setOpenInfo}
      /> */}
    </MainContent>
  );
};
