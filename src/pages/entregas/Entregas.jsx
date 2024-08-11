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
    setDrawerModeRecorrido('edit');
    setSelectedRecorrido(recorrido);
    setOpenDrawerRecorrido(true);
  }

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
        onInfo={handleInfoRecorrido}
        onEdit={handleEditRecorrido}
      />

      <EntregasPlanificarRecorridoModal
        open={openPlanificarRecorridoModal}
        setOpen={setOpenPlanificarRecorridoModal}
      />
      <RecorridosDrawer
        open={openDrawerRecorrido}
        setOpen={setOpenDrawerRecorrido}
        recorrido={selectedRecorrido}
        mode={drawerModeRecorrido}
      />
    </MainContent>
  );
};
