import { useState } from 'react';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { MainContent } from '../../layouts/MainContent';
import { EntregasPlanificarRecorridoButton } from './components/EntregasPlanificarRecorridoButton';
import { EntregasPlanificarRecorridoModal } from './components/EntregasPlanificarRecorridoModal';
import { EntregasRecorridosTable } from './components/EntregasRecorridosTable';
import { EntregasDrawer } from './components/EntregasDrawer';
import { RecorridosDrawer } from './components/RecorridosDrawer';

export const Entregas = () => {
  const [openPlanificarRecorridoModal, setOpenPlanificarRecorridoModal] =
    useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [openDrawerRecorrido, setOpenDrawerRecorrido] = useState(false);
  const [openDrawerEntrega, setOpenDrawerEntrega] = useState(false);
  const [drawerModeRecorrido, setDrawerModeRecorrido] = useState('view');
  const [drawerModeEntrega, setDrawerModeEntrega] = useState('view');
  const [selectedRecorrido, setSelectedRecorrido] = useState({});
  const [selectedEntrega, setSelectedEntrega] = useState({});

  function handleInfoRecorrido(recorrido) {
    setDrawerModeRecorrido('view');
    setSelectedRecorrido(recorrido);
    setOpenDrawerRecorrido(true);
  }

  function handleEditRecorrido(recorrido) {
    setModalMode('edit');
    setSelectedRecorrido(recorrido);
    setOpenPlanificarRecorridoModal(true);
  }

  /* function handleAddRecorrido() {
    setModalMode('add');
    setOpenPlanificarRecorridoModal(true);
  } */

  function handleInfoEntrega(entrega) {
    setDrawerModeEntrega('view');
    setSelectedEntrega(entrega);
    setOpenDrawerEntrega(true);
  }

  function handleEditEntrega(entrega) {
    setDrawerModeEntrega('edit');
    setSelectedEntrega(entrega);
    setOpenDrawerEntrega(true);
  }

  return (
    <MainContent
      title='Entregas'
      icon={<MdOutlineLocalShipping size={40} />}
      extra={
        <EntregasPlanificarRecorridoButton
          setOpen={setOpenPlanificarRecorridoModal}
        />
      }
    >
      <EntregasRecorridosTable
        onInfoRecorrido={handleInfoRecorrido}
        onEditRecorrido={handleEditRecorrido}
        onInfoEntrega={handleInfoEntrega}
        onEditEntrega={handleEditEntrega}
      />

      <EntregasPlanificarRecorridoModal
        open={openPlanificarRecorridoModal}
        setOpen={setOpenPlanificarRecorridoModal}
        recorrido={selectedRecorrido}
        mode={modalMode}
      />
      <RecorridosDrawer
        open={openDrawerRecorrido}
        setOpen={setOpenDrawerRecorrido}
        recorrido={selectedRecorrido}
        mode={drawerModeRecorrido}
      />
      <EntregasDrawer
        open={openDrawerEntrega}
        setOpen={setOpenDrawerEntrega}
        entrega={selectedEntrega}
        mode={drawerModeEntrega}
      />
    </MainContent>
  );
};
