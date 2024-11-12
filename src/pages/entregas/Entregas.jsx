import { MdOutlineLocalShipping } from 'react-icons/md';
import { MainContent } from '../../layouts/MainContent';
import { RecorridosTable } from './components/RecorridosTable';
import { RecorridosPlanificarButton } from './components/RecorridosPlanificarButton';
import { useContext, useState } from 'react';
import { RecorridosPlanificarModal } from './components/RecorridosPlanificarModal';
import { RecorridosDrawer } from './components/RecorridosDrawer';
import { EntregasDrawer } from './components/EntregasDrawer';
import { EntregasMobile } from './components/EntregasMobile';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { MobileContent } from '../../layouts/MobileContent';

export const Entregas = () => {
  const windowWidth = useContext(ResponsiveContext);

  const [openPlanificarRecorridoModal, setOpenPlanificarRecorridoModal] =
    useState(false);
  const [drawerModeRecorrido, setDrawerModeRecorrido] = useState('info');
  const [openDrawerRecorrido, setOpenDrawerRecorrido] = useState(false);
  const [selectedRecorrido, setSelectedRecorrido] = useState(null);
  const [drawerModeEntrega, setDrawerModeEntrega] = useState('info');
  const [openDrawerEntrega, setOpenDrawerEntrega] = useState(false);
  const [selectedEntrega, setSelectedEntrega] = useState(null);
  const [planificadorRecorridoMode, setPlanificadorRecorridoMode] =
    useState('add');

  function handleAddRecorrido() {
    setOpenPlanificarRecorridoModal(true);
    setPlanificadorRecorridoMode('add');
  }

  function handleInfoRecorrido(recorrido) {
    setOpenDrawerRecorrido(true);
    setSelectedRecorrido(recorrido);
    setDrawerModeRecorrido('info');
  }

  function handleEditRecorrido(recorrido) {
    setOpenPlanificarRecorridoModal(true);
    setSelectedRecorrido(recorrido);
    setPlanificadorRecorridoMode('edit');
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
    <>
      {windowWidth > 700 ? (
        <MainContent
          title='Entregas'
          icon={<MdOutlineLocalShipping size={40} />}
          extra={
            <RecorridosPlanificarButton onAdd={handleAddRecorrido} disabled />
          }
          isWip
        >
          <h3 className='recorridos-title'>Tabla de recorridos</h3>
          <RecorridosTable
            onInfoRecorrido={handleInfoRecorrido}
            onEditRecorrido={handleEditRecorrido}
            onInfoEntrega={handleInfoEntrega}
            onEditEntrega={handleEditEntrega}
          />
          <RecorridosPlanificarModal
            mode={planificadorRecorridoMode}
            recorrido={selectedRecorrido}
            openModal={openPlanificarRecorridoModal}
            setOpenModal={setOpenPlanificarRecorridoModal}
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
      ) : (
        <MobileContent
          title='Entregas'
          icon={<MdOutlineLocalShipping size={50} />}
        >
          <EntregasMobile />
        </MobileContent>
      )}
    </>
  );
};
