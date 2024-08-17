import { MdOutlineReceiptLong } from 'react-icons/md';
import { MainContent } from '../../layouts/MainContent';
import { PedidosTable } from './components/PedidosTable';

export const Pedidos = () => {
  return (
    <MainContent title='Pedidos' icon={<MdOutlineReceiptLong size={40} />}>
      <PedidosTable />
    </MainContent>
  );
};
