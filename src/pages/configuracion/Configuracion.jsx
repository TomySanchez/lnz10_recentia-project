import { Tabs } from 'antd';
import { MdOutlineSettings, MdOutlineShoppingBag } from 'react-icons/md';
import { MainContent } from '../../layouts/MainContent';

export const Configuracion = () => {
  const tabItems = [
    {
      key: 'products',
      label: 'Productos',
      icon: <MdOutlineShoppingBag />
    }
  ];

  return (
    <MainContent
      className='Configuracion'
      title='Configuración'
      icon={<MdOutlineSettings size={40} />}
    >
      <Tabs size='large' tabPosition='left' items={tabItems} />
    </MainContent>
  );
};
