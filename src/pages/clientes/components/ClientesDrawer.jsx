import { useNavigate } from 'react-router-dom';
import { Drawer } from '../../../components/drawers/Drawer';
import { ClientesAddOrEditDrawer } from './ClientesAddOrEditDrawer';
import { ClientesInfoDrawer } from './ClientesInfoDrawer';
import { useContext } from 'react';
import { ResponsiveContext } from '../../../contexts/ResponsiveContext';
import { Form } from 'antd';
import { addCliente } from '../../../services/clientes';
import { DataContext } from '../../../contexts';
import { getItemById } from '../../../utils/getItemById';

export const ClientesDrawer = ({
  mode,
  device = 'computer',
  cliente,
  open,
  setOpen
}) => {
  const { setClientes, setDirecciones } = useContext(DataContext);
  const windowWidth = useContext(ResponsiveContext);

  const navigateTo = useNavigate();

  const [clienteForm] = Form.useForm();

  function goToRegistros() {
    navigateTo(`registros`, { state: { cliente } });
  }

  function addItem() {
    const values = clienteForm.getFieldsValue();

    const formattedValues = {
      cliente: {
        nombre: values.nombre,
        telefono: values.telefono,
        cuit_cuil: values.cuit_cuil,
        observaciones: values.observaciones
      },
      direccion: {
        calle: values.calle,
        numero: values.numero,
        piso: values.piso,
        departamento: values.departamento,
        idBarrio: values.barrio
      }
    };

    addCliente(formattedValues)
      .then((res) => {
        setDirecciones((prevDirecciones) => {
          const newDirecciones = [...prevDirecciones];
          newDirecciones.push(formattedValues.direccion);

          return newDirecciones;
        });

        const barrio = getItemById(values.barrio, 'barrio');
        const localidad = getItemById(barrio?.idLocalidad, 'localidad');

        setClientes((prevClientes) => {
          const newClientes = [...prevClientes];
          newClientes.push({
            id: res.clienteId,
            nombre: values.nombre,
            telefono: values.telefono,
            cuit_cuil: values.cuit_cuil,
            observaciones: values.observaciones,
            activo: 1,
            direccion: {
              idDireccion: res.direccionId,
              calle: values.calle,
              numero: values.numero,
              piso: values.piso,
              departamento: values.departamento,
              idBarrio: values.barrio,
              barrio: barrio?.nombre,
              idLocalidad: barrio?.idLocalidad,
              localidad: localidad?.nombre
            }
          });

          return newClientes;
        });
        setOpen(false);
      })
      .catch((err) => console.error(err));
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
        mode === 'info' && device === 'computer'
          ? goToRegistros
          : mode === 'add'
          ? addItem
          : () => console.error('Error')
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
          clienteForm={clienteForm}
        />
      )}
    </Drawer>
  );
};
