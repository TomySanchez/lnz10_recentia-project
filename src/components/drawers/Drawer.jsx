import { Drawer as DrawerAntd } from 'antd';
import { DrawerButton } from './DrawerButton';

export const Drawer = ({
  width,
  itemType,
  mode,
  open,
  setOpen,
  extraButtonText,
  onExtraButtonClick,
  loadingCambios,
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
        extra: (
          <DrawerButton
            text='Añadir'
            onClick={onExtraButtonClick}
            loading={loadingCambios}
          />
        )
      };
      break;
    case 'info':
      propsDrawer = {
        title: `Información de ${itemType}`,
        extra: extraButtonText && (
          <DrawerButton text={extraButtonText} onClick={onExtraButtonClick} />
        )
      };
      break;
    case 'edit':
      propsDrawer = {
        title: `Editar ${itemType}`,
        extra: (
          <DrawerButton
            text='Guardar'
            onClick={onExtraButtonClick}
            loading={loadingCambios}
          />
        )
      };
  }

  return (
    <DrawerAntd
      width={width || 480}
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
