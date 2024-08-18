import { MdOutlineLocalShipping } from 'react-icons/md';
import { MainContent } from '../../layouts/MainContent';
import { RecorridosTable } from './components/RecorridosTable';
import { RecorridosPlanificarButton } from './components/RecorridosPlanificarButton';
import { useState } from 'react';
import { RecorridosPlanificarModal } from './components/RecorridosPlanificarModal';

export const Entregas = () => {
  const [openPlanificarRecorridoModal, setOpenPlanificarRecorridoModal] =
    useState(false);

  return (
    <MainContent
      title='Entregas'
      icon={<MdOutlineLocalShipping size={40} />}
      extra={
        <RecorridosPlanificarButton setOpen={setOpenPlanificarRecorridoModal} />
      }
    >
      <h3 className='recorridos-title'>Tabla de recorridos</h3>
      <RecorridosTable />
      <RecorridosPlanificarModal
        open={openPlanificarRecorridoModal}
        setOpen={setOpenPlanificarRecorridoModal}
      />
    </MainContent>
  );
};
