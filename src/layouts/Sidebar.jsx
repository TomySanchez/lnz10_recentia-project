import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '/assets/images/logo-recentia.png';
import {
  MdOutlineGroups,
  MdOutlineLocalShipping,
  MdOutlineLogout,
  MdOutlineReceiptLong,
  MdOutlineShoppingBag
} from 'react-icons/md';

export const Sidebar = ({ isCollapsed }) => {
  const navigateTo = useNavigate();
  const location = useLocation();

  const itemsMenuTop = [
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
    /* {
      key: '/pagos',
      label: 'Pagos',
      icon: <MdOutlinePayments />
    }, */
    {
      key: '/productos',
      label: 'Productos',
      icon: <MdOutlineShoppingBag />
    }
    /* {
      key: '/configuracion',
      label: 'Configuración',
      icon: <MdOutlineSettings />
    }, */
  ];

  const itemsMenuBottom = {
    key: '/inicio',
    label: 'Cerrar sesión',
    icon: <MdOutlineLogout />
  };

  function handleMenuClick(e) {
    navigateTo(e.key);
  }

  /* function handleNewClick() {
    console.log('Nuevo botón clickeado');
  } */

  return (
    <div className='Sidebar'>
      <div className='sidebar-brand'>
        <img className='sidebar-brand-logo' src={logo} alt='Logo de Recentia' />
        {!isCollapsed && <span className='sidebar-brand-name'>recentia</span>}
      </div>

      {/* <div className='sidebar-new-button-container'>
        <Popover trigger='click' placement='right' content={PopoverContent}>
          <Button
            className='sidebar-new-button'
            type='primary'
            icon={<MdAdd size={18} />}
            onClick={handleNewClick}
            block
          >
            {!isCollapsed && 'NUEVO'}
          </Button>
        </Popover>
      </div> */}

      <div className='sidebar-menu-container'>
        <Menu
          className='sidebar-menu'
          mode='inline'
          items={itemsMenuTop}
          defaultSelectedKeys={[location.pathname]}
          onClick={handleMenuClick}
        />
      </div>

      <div className='sidebar-logout-container'>
        <Menu
          className='sidebar-menu'
          mode='inline'
          items={[itemsMenuBottom]}
          onClick={handleMenuClick}
        />
      </div>
    </div>
  );
};

/* const PopoverContent = () => {
  return (
    <div className='PopoverContent'>
      <Button size='small'>Cliente</Button>
      <Button size='small'>Pedido</Button>
      <Button size='small'>Recorrido</Button>
    </div>
  );
}; */
