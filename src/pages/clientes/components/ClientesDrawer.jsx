import { useNavigate } from 'react-router-dom';
import { Drawer } from '../../../components/drawers/Drawer';
import { ClientesAddOrEditDrawer } from './ClientesAddOrEditDrawer';
import { ClientesInfoDrawer } from './ClientesInfoDrawer';
import { useContext, useState } from 'react';
import { ResponsiveContext } from '../../../contexts/ResponsiveContext';
import { Form } from 'antd';
import { addCliente, editCliente } from '../../../services/clientes';
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

  const [loadingGuardarCambios, setLoadingGuardarCambios] = useState(false);

  const navigateTo = useNavigate();

  const [clienteForm] = Form.useForm();

  function goToRegistros() {
    navigateTo(`registros`, { state: { cliente } });
  }

  function handleAddCliente() {
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

    setLoadingGuardarCambios(true);
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
      .catch((err) => console.error(err))
      .finally(() => setLoadingGuardarCambios(false));
  }

  function handleEditCliente() {
    const values = clienteForm.getFieldsValue();

    const formattedValues = {
      cliente: {
        id: cliente.id,
        nombre: values.nombre,
        telefono: values.telefono,
        cuit_cuil: values.cuit_cuil,
        observaciones: values.observaciones
      },
      direccion: {
        idDireccion: cliente.direccion.idDireccion,
        calle: values.calle,
        numero: values.numero,
        piso: values.piso,
        departamento: values.departamento,
        idBarrio: values.barrio
      }
    };

    setLoadingGuardarCambios(true);
    editCliente(formattedValues)
      .then(() => {
        setDirecciones((prevDirecciones) => {
          const newDirecciones = [...prevDirecciones];

          const index = newDirecciones.findIndex(
            (direccion) => direccion.id == formattedValues.direccion.idDireccion
          );

          if (index !== -1) {
            newDirecciones[index] = {
              ...newDirecciones[index],
              ...formattedValues.direccion
            };
          }

          return newDirecciones;
        });

        const barrio = getItemById(values.barrio, 'barrio');
        const localidad = getItemById(barrio?.idLocalidad, 'localidad');

        setClientes((prevClientes) => {
          const newClientes = [...prevClientes];

          const index = newClientes.findIndex(
            (cliente) => cliente.id == formattedValues.cliente.id
          );

          if (index !== -1) {
            newClientes[index] = {
              ...newClientes[index],
              ...formattedValues.cliente,
              direccion: {
                barrio: barrio?.nombre,
                idLocalidad: barrio?.idLocalidad,
                localidad: localidad?.nombre,
                ...formattedValues.direccion
              }
            };
          }

          return newClientes;
        });
        setOpen(false);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingGuardarCambios(false));
  }

  function getOnExtraButtonClick() {
    if (mode === 'info' && device === 'computer') {
      return goToRegistros;
    } else if (mode === 'add') {
      return handleAddCliente;
    } else if (mode === 'edit') {
      return handleEditCliente;
    } else {
      return null;
    }
  }

  return (
    <Drawer
      width={device === 'mobile' && windowWidth}
      itemType='cliente'
      mode={mode}
      item={cliente}
      open={open}
      setOpen={setOpen}
      onExtraButtonClick={getOnExtraButtonClick()}
      extraButtonText={mode === 'info' && device === 'computer' && 'Registros'}
      loadingCambios={loadingGuardarCambios}
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
