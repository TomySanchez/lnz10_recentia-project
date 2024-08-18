import { MdOutlineLocalShipping } from 'react-icons/md';
import { MainContent } from '../../layouts/MainContent';
import { RecorridosTable } from './components/RecorridosTable';
import { RecorridosPlanificarButton } from './components/RecorridosPlanificarButton';
import { useState } from 'react';
import { RecorridosPlanificarModal } from './components/RecorridosPlanificarModal';
import { RecorridosDrawer } from './components/RecorridosDrawer';

export const Entregas = () => {
  const [openPlanificarRecorridoModal, setOpenPlanificarRecorridoModal] =
    useState(false);
  const [drawerMode, setDrawerMode] = useState('info');
  const [openDrawerRecorrido, setOpenDrawerRecorrido] = useState(false);
  const [selectedRecorrido, setSelectedRecorrido] = useState(null);

  function handleInfoRecorrido(recorrido) {
    setOpenDrawerRecorrido(true);
    setSelectedRecorrido(recorrido);
    setDrawerMode('info');
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
      <RecorridosTable onInfo={handleInfoRecorrido} />
      <RecorridosPlanificarModal
        open={openPlanificarRecorridoModal}
        setOpen={setOpenPlanificarRecorridoModal}
      />
      <RecorridosDrawer
        mode={drawerMode}
        recorrido={selectedRecorrido}
        open={openDrawerRecorrido}
        setOpen={setOpenDrawerRecorrido}
      />
    </MainContent>
  );
};
