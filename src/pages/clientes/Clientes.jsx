import { useContext, useState } from 'react';
import { MainContent } from '../../layouts/MainContent';
import { MdOutlineGroups } from 'react-icons/md';
import { ClientesTable } from './components/ClientesTable';
import { ClientesDrawer } from './components/ClientesDrawer';
import { AddButton } from '../../components/buttons/AddButton';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { ClientesMobile } from './components/ClientesMobile';

export const Clientes = () => {
  const windowWidth = useContext(ResponsiveContext);

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
      extra={
        windowWidth > 700 && <AddButton element='cliente' onAdd={handleAdd} />
      }
    >
      {windowWidth > 700 ? (
        <ClientesTable onInfo={handleInfo} onEdit={handleEdit} />
      ) : (
        <ClientesMobile />
      )}

      <ClientesDrawer
        mode={drawerMode}
        cliente={selectedCliente}
        open={openDrawer}
        setOpen={setOpenDrawer}
      />
    </MainContent>
  );
};
