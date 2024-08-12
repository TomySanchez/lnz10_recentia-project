import { MainContent } from '../../layouts/MainContent';
import { MdOutlineSettings, MdOutlineShoppingBag } from 'react-icons/md';
import { Tabs } from 'antd';
import { Productos } from './productos/Productos';

export const Configuracion = () => {
  const tabItems = [
    {
      key: 'products',
      label: 'Productos',
      icon: <MdOutlineShoppingBag />,
      children: <Productos />
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
