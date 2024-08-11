import { useState } from 'react';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { MainContent } from '../../layouts/MainContent';
import { EntregasPlanificarRecorridoButton } from './components/EntregasPlanificarRecorridoButton';
import { EntregasPlanificarRecorridoModal } from './components/EntregasPlanificarRecorridoModal';
import { EntregasRecorridosTable } from './components/EntregasRecorridosTable';

export const Entregas = () => {
  const [openPlanificarRecorridoModal, setOpenPlanificarRecorridoModal] =
    useState(false);

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
      <EntregasRecorridosTable />

      <EntregasPlanificarRecorridoModal
        open={openPlanificarRecorridoModal}
        setOpen={setOpenPlanificarRecorridoModal}
      />
    </MainContent>
  );
};
