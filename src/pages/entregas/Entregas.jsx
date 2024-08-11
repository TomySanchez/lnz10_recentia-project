import { MdOutlineLocalShipping } from 'react-icons/md';
import { MainContent } from '../../layouts/MainContent';
import { EntregasPlanificarRecorridoButton } from './components/EntregasPlanificarRecorridoButton';

export const Entregas = () => {
  return (
    <MainContent
      title='Entregas'
      icon={<MdOutlineLocalShipping size={40} />}
      extra={<EntregasPlanificarRecorridoButton />}
    ></MainContent>
  );
};
