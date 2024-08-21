import { useNavigate } from 'react-router-dom';
import { Drawer } from '../../../components/drawers/Drawer';
import { ClientesAddOrEditDrawer } from './ClientesAddOrEditDrawer';
import { ClientesInfoDrawer } from './ClientesInfoDrawer';
import { useContext } from 'react';
import { ResponsiveContext } from '../../../contexts/ResponsiveContext';

export const ClientesDrawer = ({
  mode,
  device = 'computer',
  cliente,
  open,
  setOpen
}) => {
  const windowWidth = useContext(ResponsiveContext);

  const navigateTo = useNavigate();

  function goToRegistros() {
    navigateTo(`registros`, { state: { cliente } });
  }

  return (
    <Drawer
      width={device === 'mobile' && windowWidth}
      itemType='cliente'
      mode={mode}
      item={cliente}
      open={open}
      setOpen={setOpen}
      onExtraButtonClick={
        mode === 'info' && device === 'computer' && goToRegistros
      }
      extraButtonText={mode === 'info' && device === 'computer' && 'Registros'}
    >
      {mode === 'info' ? (
        <ClientesInfoDrawer cliente={cliente} />
      ) : (
        <ClientesAddOrEditDrawer
          editMode={mode === 'edit'}
          cliente={cliente}
          setOpen={setOpen}
        />
      )}
    </Drawer>
  );
};
