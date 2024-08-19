import { useNavigate } from 'react-router-dom';
import { Drawer } from '../../../components/drawers/Drawer';
import { ClientesAddOrEditDrawer } from './ClientesAddOrEditDrawer';
import { ClientesInfoDrawer } from './ClientesInfoDrawer';

export const ClientesDrawer = ({ mode, cliente, open, setOpen }) => {
  const navigateTo = useNavigate();

  function goToRegistros() {
    navigateTo(`registros`, { state: { cliente } });
  }

  return (
    <Drawer
      itemType='cliente'
      mode={mode}
      item={cliente}
      open={open}
      setOpen={setOpen}
      onExtraButtonClick={mode === 'info' && goToRegistros}
      extraButtonText={mode === 'info' && 'Registros'}
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
