import { MdOutlinePayments } from 'react-icons/md';
import { MainContent } from '../../layouts/MainContent';
import { PagosTable } from './components/PagosTable';

export const Pagos = () => {
  return (
    <MainContent title='Pagos' icon={<MdOutlinePayments size={40} />}>
      <PagosTable />
    </MainContent>
  );
};
