import { MainContent } from '../../layouts/MainContent';
import { ClientesTable } from './components';
import { MdOutlineGroups } from 'react-icons/md';

export const Clientes = () => {
  return (
    <MainContent title='Clientes' icon={<MdOutlineGroups size={40} />}>
      <ClientesTable />
    </MainContent>
  );
};
