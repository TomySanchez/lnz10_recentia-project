import { Drawer as DrawerAntd } from 'antd';
import { DrawerButton } from './DrawerButton';

export const Drawer = ({
  itemType,
  mode,
  open,
  setOpen,
  extraButtonText,
  children
}) => {
  function handleClose() {
    setOpen(false);
  }

  let propsDrawer = {
    title: '',
    extra: '',
    children: ''
  };
  switch (mode) {
    case 'add':
      propsDrawer = {
        title: `Nuevo ${itemType}`,
        extra: <DrawerButton text='Añadir' />
      };
      break;
    case 'info':
      propsDrawer = {
        title: `Información de ${itemType}`,
        extra: extraButtonText && <DrawerButton text={extraButtonText} />
      };
      break;
    case 'edit':
      propsDrawer = {
        title: `Editar ${itemType}`,
        extra: <DrawerButton text='Guardar' />
      };
  }

  return (
    <DrawerAntd
      width={480}
      title={propsDrawer.title}
      open={open}
      onClose={handleClose}
      extra={propsDrawer.extra}
      destroyOnClose
    >
      {children}
    </DrawerAntd>
  );
};
