import { Button, Drawer } from 'antd';
import logo from '/assets/images/logo-recentia.png';
import { useNavigate } from 'react-router-dom';

export const MobileMenu = ({ open, setOpen }) => {
  const navigateTo = useNavigate();

  function handleNavigate(ruta) {
    navigateTo(ruta);
    setOpen(false);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Drawer
      className='MobileMenu'
      height={290}
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

      <MobileMenuButton onClick={() => handleNavigate('/clientes')}>
        Clientes
      </MobileMenuButton>
      <MobileMenuButton onClick={() => handleNavigate('/pedidos')}>
        Pedidos
      </MobileMenuButton>
      <MobileMenuButton onClick={() => handleNavigate('/entregas')}>
        Entregas
      </MobileMenuButton>
      <MobileMenuButton onClick={() => handleNavigate('/inicio')}>
        Cerrar sesión
      </MobileMenuButton>
    </Drawer>
  );
};

const MobileMenuButton = ({ onClick, children }) => {
  return (
    <Button size='large' type='text' onClick={onClick}>
      {children}
    </Button>
  );
};
