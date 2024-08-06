import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '/assets/images/logo-recentia.png';
import {
  MdOutlineGroups,
  MdOutlineLocalShipping,
  MdOutlineLogout,
  MdOutlinePayments,
  MdOutlineReceiptLong,
  MdOutlineSettings
} from 'react-icons/md';

export const Sidebar = ({ isCollapsed }) => {
  const navigateTo = useNavigate();
  const location = useLocation();

  const itemsMenu = [
    {
      key: '/clientes',
      label: 'Clientes',
      icon: <MdOutlineGroups />
    },
    {
      key: '/pedidos',
      label: 'Pedidos',
      icon: <MdOutlineReceiptLong />
    },
    {
      key: '/entregas',
      label: 'Entregas',
      icon: <MdOutlineLocalShipping />
    },
    {
      key: '/pagos',
      label: 'Pagos',
      icon: <MdOutlinePayments />
    },
    {
      key: '/configuracion',
      label: 'Configuración',
      icon: <MdOutlineSettings />
    },
    {
      key: '/inicio',
      label: 'Cerrar sesión',
      icon: <MdOutlineLogout />
    }
  ];

  function handleMenuClick(e) {
    navigateTo(e.key);
  }

  return (
    <div className='Sidebar'>
      <div className='sidebar-brand'>
        <img className='sidebar-brand-logo' src={logo} alt='Logo de Recentia' />
        {!isCollapsed && <span className='sidebar-brand-name'>recentia</span>}
      </div>

      <div className='sidebar-menu-container'>
        <Menu
          className='sidebar-menu'
          mode='inline'
          items={itemsMenu}
          defaultSelectedKeys={[location.pathname]}
          onClick={handleMenuClick}
        />
      </div>
    </div>
  );
};
