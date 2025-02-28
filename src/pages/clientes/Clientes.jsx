import { useContext, useState } from 'react';
import { MainContent } from '../../layouts/MainContent';
import { MdOutlineGroups } from 'react-icons/md';
import { ClientesTable } from './components/ClientesTable';
import { ClientesDrawer } from './components/ClientesDrawer';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { ClientesMobile } from './components/ClientesMobile';
import { MobileContent } from '../../layouts/MobileContent';
import { ClientesExtra } from './components/ClientesExtra';

export const Clientes = () => {
  const windowWidth = useContext(ResponsiveContext);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedClientesType, setSelectedClientesType] = useState('Activos');
  const [drawerMode, setDrawerMode] = useState('add');
  const [device, setDevice] = useState('computer');

  function handleInfo(cliente, device) {
    setOpenDrawer(true);
    setSelectedCliente(cliente);
    setDrawerMode('info');
    setDevice(device);
  }

  function handleAdd(device) {
    setOpenDrawer(true);
    setDrawerMode('add');
    setDevice(device);
  }

  function handleEdit(cliente, device) {
    setOpenDrawer(true);
    setSelectedCliente(cliente);
    setDrawerMode('edit');
    setDevice(device);
  }

  return (
    <>
      {windowWidth > 700 ? (
        <MainContent
          title='Clientes'
          icon={<MdOutlineGroups size={40} />}
          extra={
            <ClientesExtra
              handleAdd={handleAdd}
              selectedClientesType={selectedClientesType}
              setSelectedClientesType={setSelectedClientesType}
            />
          }
        >
          <ClientesTable
            onInfo={handleInfo}
            onEdit={handleEdit}
            selectedClientesType={selectedClientesType}
          />
        </MainContent>
      ) : (
        <MobileContent title='Clientes' icon={<MdOutlineGroups size={50} />}>
          <ClientesMobile
            onInfo={handleInfo}
            onEdit={handleEdit}
            onAdd={handleAdd}
          />
        </MobileContent>
      )}

      <ClientesDrawer
        device={device}
        mode={drawerMode}
        cliente={selectedCliente}
        open={openDrawer}
        setOpen={setOpenDrawer}
      />
    </>
  );
};
