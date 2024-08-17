import { MainContent } from '../../layouts/MainContent';
import { MdOutlineGroups } from 'react-icons/md';
import { ClientesTable } from './components/ClientesTable';

export const Clientes = () => {
  return (
    <MainContent title='Clientes' icon={<MdOutlineGroups size={40} />}>
      <ClientesTable />
    </MainContent>
  );
};
