import { MdOutlineReceiptLong } from 'react-icons/md';
import { MainContent } from '../../layouts/MainContent';

export const Pedidos = () => {
  return (
    <MainContent
      title='Pedidos'
      icon={<MdOutlineReceiptLong size={40} />}
    ></MainContent>
  );
};
