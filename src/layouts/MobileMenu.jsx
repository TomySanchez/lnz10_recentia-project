import { Button, Drawer } from 'antd';
import logo from '/assets/images/logo-recentia.png';

export const MobileMenu = ({ open, setOpen }) => {
  function handleClose() {
    setOpen(false);
  }

  return (
    <Drawer
      className='MobileMenu'
      height={250}
      placement='top'
      open={open}
      onClose={handleClose}
      destroyOnClose
      closeIcon={false}
    >
      <div className='mobile-menu-brand'>
        <img
          className='mobile-menu-brand-logo'
          src={logo}
          alt='Logo de Recentia'
        />
        <span className='mobile-menu-brand-name'>recentia</span>
      </div>

      <MobileMenuButton>Clientes</MobileMenuButton>
      <MobileMenuButton>Pedidos</MobileMenuButton>
      <MobileMenuButton>Entregas</MobileMenuButton>
      <MobileMenuButton>Cerrar sesión</MobileMenuButton>
    </Drawer>
  );
};

const MobileMenuButton = ({ children }) => {
  return (
    <Button size='large' type='text'>
      {children}
    </Button>
  );
};
