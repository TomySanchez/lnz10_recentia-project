import { MdOutlineLocalShipping } from 'react-icons/md';
import { MainContent } from '../../layouts/MainContent';
import { RecorridosTable } from './components/RecorridosTable';
import { RecorridosPlanificarButton } from './components/RecorridosPlanificarButton';
import { useState } from 'react';
import { RecorridosPlanificarModal } from './components/RecorridosPlanificarModal';
import { RecorridosDrawer } from './components/RecorridosDrawer';
import { EntregasDrawer } from './components/EntregasDrawer';

export const Entregas = () => {
  const [openPlanificarRecorridoModal, setOpenPlanificarRecorridoModal] =
    useState(false);
  const [drawerModeRecorrido, setDrawerModeRecorrido] = useState('info');
  const [openDrawerRecorrido, setOpenDrawerRecorrido] = useState(false);
  const [selectedRecorrido, setSelectedRecorrido] = useState(null);
  const [drawerModeEntrega, setDrawerModeEntrega] = useState('info');
  const [openDrawerEntrega, setOpenDrawerEntrega] = useState(false);
  const [selectedEntrega, setSelectedEntrega] = useState(null);

  function handleInfoRecorrido(recorrido) {
    setOpenDrawerRecorrido(true);
    setSelectedRecorrido(recorrido);
    setDrawerModeRecorrido('info');
  }

  function handleInfoEntrega(entrega) {
    setOpenDrawerEntrega(true);
    setSelectedEntrega(entrega);
    setDrawerModeEntrega('info');
  }

  function handleEditEntrega(entrega) {
    setOpenDrawerEntrega(true);
    setSelectedEntrega(entrega);
    setDrawerModeEntrega('edit');
  }

  return (
    <MainContent
      title='Entregas'
      icon={<MdOutlineLocalShipping size={40} />}
      extra={
        <RecorridosPlanificarButton setOpen={setOpenPlanificarRecorridoModal} />
      }
    >
      <h3 className='recorridos-title'>Tabla de recorridos</h3>
      <RecorridosTable
        onInfoRecorrido={handleInfoRecorrido}
        onInfoEntrega={handleInfoEntrega}
        onEditEntrega={handleEditEntrega}
      />
      <RecorridosPlanificarModal
        open={openPlanificarRecorridoModal}
        setOpen={setOpenPlanificarRecorridoModal}
      />
      <RecorridosDrawer
        mode={drawerModeRecorrido}
        recorrido={selectedRecorrido}
        open={openDrawerRecorrido}
        setOpen={setOpenDrawerRecorrido}
        onInfoEntrega={handleInfoEntrega}
        onEditEntrega={handleEditEntrega}
      />
      <EntregasDrawer
        mode={drawerModeEntrega}
        entrega={selectedEntrega}
        open={openDrawerEntrega}
        setOpen={setOpenDrawerEntrega}
      />
    </MainContent>
  );
};
