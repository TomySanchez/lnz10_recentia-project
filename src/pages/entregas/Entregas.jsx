import { MdOutlineLocalShipping } from 'react-icons/md';
import { MainContent } from '../../layouts/MainContent';
import { RecorridosTable } from './components/RecorridosTable';

export const Entregas = () => {
  return (
    <MainContent title='Entregas' icon={<MdOutlineLocalShipping size={40} />}>
      <h3 className='recorridos-title'>Tabla de recorridos</h3>
      <RecorridosTable />
    </MainContent>
  );
};
