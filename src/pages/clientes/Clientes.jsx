import { useState } from 'react';
import { MdOutlineGroups } from 'react-icons/md';
import { MainContent } from '../../layouts/MainContent';
import { ClientesTable } from './components';
import { ClientesDrawer } from './components/ClientesDrawer';
import { ButtonAdd } from '../../components/buttons';

export const Clientes = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerMode, setDrawerMode] = useState('add');
  const [selectedCliente, setSelectedCliente] = useState(null);

  function handleAdd() {
    setDrawerMode('add');
    setSelectedCliente(null);
    setOpenDrawer(true);
  }

  function handleInfo(cliente) {
    setDrawerMode('view');
    setSelectedCliente(cliente);
    setOpenDrawer(true);
  }

  function handleEdit(cliente) {
    setDrawerMode('edit');
    setSelectedCliente(cliente);
    setOpenDrawer(true);
  }

  return (
    <MainContent
      title='Clientes'
      icon={<MdOutlineGroups size={40} />}
      extra={<ButtonAdd element='cliente' setOpen={handleAdd} />}
    >
      <ClientesTable onInfo={handleInfo} onEdit={handleEdit} />
      <ClientesDrawer
        open={openDrawer}
        setOpen={setOpenDrawer}
        cliente={selectedCliente}
        mode={drawerMode}
      />
    </MainContent>
  );
};
