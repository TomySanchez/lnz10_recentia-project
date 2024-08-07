import { useState } from 'react';
import { MdOutlineGroups } from 'react-icons/md';
import { MainContent } from '../../layouts/MainContent';
import { ClientesTable } from './components';
import { ClientesInfoDrawer } from './components/ClientesInfoDrawer';
import { ClientesAddDrawer } from './components/ClientesAddDrawer';
import { ClientesAddButton } from './components/ClientesAddButton';
import { ClientesEditDrawer } from './components/ClientesEditDrawer';

export const Clientes = () => {
  const [openAddDrawer, setOpenAddDrawer] = useState(false);
  const [openInfoDrawer, setOpenInfoDrawer] = useState(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  function handleInfo(cliente) {
    setSelectedCliente(cliente);
    setOpenInfoDrawer(true);
  }

  function handleEdit(cliente) {
    setSelectedCliente(cliente);
    setOpenEditDrawer(true);
  }

  return (
    <MainContent
      title='Clientes'
      icon={<MdOutlineGroups size={40} />}
      extra={<ClientesAddButton setOpen={setOpenAddDrawer} />}
    >
      <ClientesTable onInfo={handleInfo} onEdit={handleEdit} />
      <ClientesAddDrawer open={openAddDrawer} setOpen={setOpenAddDrawer} />
      <ClientesInfoDrawer
        open={openInfoDrawer}
        setOpen={setOpenInfoDrawer}
        cliente={selectedCliente}
      />
      <ClientesEditDrawer
        open={openEditDrawer}
        setOpen={setOpenEditDrawer}
        cliente={selectedCliente}
      />
    </MainContent>
  );
};
