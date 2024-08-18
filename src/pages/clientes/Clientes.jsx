import { useState } from 'react';
import { MainContent } from '../../layouts/MainContent';
import { MdOutlineGroups } from 'react-icons/md';
import { ClientesTable } from './components/ClientesTable';
import { ClientesDrawer } from './components/ClientesDrawer';
import { AddButton } from '../../components/buttons/AddButton';

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

  function handleEdit(cliente) {
    setOpenDrawer(true);
    setSelectedCliente(cliente);
    setDrawerMode('edit');
  }

  return (
    <MainContent
      title='Clientes'
      icon={<MdOutlineGroups size={40} />}
      extra={<AddButton element='cliente' onAdd={handleAdd} />}
    >
      <ClientesTable onInfo={handleInfo} onEdit={handleEdit} />
      <ClientesDrawer
        mode={drawerMode}
        cliente={selectedCliente}
        open={openDrawer}
        setOpen={setOpenDrawer}
      />
    </MainContent>
  );
};
