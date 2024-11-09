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
import { MessageContext } from '../../../contexts/MessageContext';
import dayjs from 'dayjs';

export const ClientesDrawer = ({
  mode,
  device = 'computer',
  cliente,
  open,
  setOpen
}) => {
  const { barrios, setClientes, diasSemana, setDirecciones } =
    useContext(DataContext);
  const windowWidth = useContext(ResponsiveContext);
  const { messageApi } = useContext(MessageContext);

  const [loadingGuardarCambios, setLoadingGuardarCambios] = useState(false);

  const navigateTo = useNavigate();

  const [clienteForm] = Form.useForm();

  function goToRegistros() {
    navigateTo(`registros`, { state: { cliente } });
  }

  function handleAddCliente() {
    clienteForm
      .validateFields()
      .then((values) => {
        const { disponibilidades } = values;

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
            piso: values.piso || null,
            departamento: values.departamento,
            idBarrio: values.barrio
          }
        };

        formattedValues.disponibilidades = disponibilidades?.map(
          (disponibilidad) => ({
            idDiaSemana: disponibilidad.diaSemana,
            horaInicio: disponibilidad.horas[0]?.format('HH:mm'),
            horaFin: disponibilidad.horas[1]?.format('HH:mm')
          })
        );

        setLoadingGuardarCambios(true);
        addCliente(formattedValues)
          .then((res) => {
            setDirecciones((prevDirecciones) => {
              const newDirecciones = [...prevDirecciones];
              newDirecciones.push(formattedValues.direccion);

              return newDirecciones;
            });

            const barrio = getItemById(values.barrio, barrios);
            const localidad = getItemById(barrio?.idLocalidad, 'localidad');

            setClientes((prevClientes) => {
              const newDisponibilidades = disponibilidades?.map(
                (disp, index) => ({
                  idDisponibilidad: res.data.disponibilidadesIds[index],
                  idDiaSemana: disp.diaSemana,
                  nroDiaSemana: disp.diaSemana,
                  diaSemana: diasSemana.find((d) => d.id === disp.diaSemana)
                    ?.nombre,
                  horaInicio: dayjs(disp.horas[0]).format('HH:mm:ss'),
                  horaFin: dayjs(disp.horas[1]).format('HH:mm:ss')
                })
              );

              const newClientes = [
                {
                  id: res.data.clienteId,
                  nombre: values.nombre,
                  telefono: values.telefono,
                  cuit_cuil: values.cuit_cuil,
                  observaciones: values.observaciones,
                  activo: 1,
                  direccion: {
                    idDireccion: res.data.direccionId,
                    calle: values.calle,
                    numero: values.numero,
                    piso: values.piso,
                    departamento: values.departamento,
                    idBarrio: values.barrio,
                    barrio: barrio?.nombre,
                    idLocalidad: barrio?.idLocalidad,
                    localidad: localidad?.nombre
                  },
                  disponibilidades: newDisponibilidades || []
                },
                ...prevClientes
              ];

              return newClientes;
            });
            messageApi.success('Cliente añadido correctamente');
            setOpen(false);
          })
          .catch((err) => {
            console.error(err);
            messageApi.error('No se pudo añadir el cliente');
          })
          .finally(() => setLoadingGuardarCambios(false));
      })
      .catch((err) => {
        const index = err.errorFields?.findIndex((e) =>
          e.errors.some((er) => er === 'Debe haber al menos una disponibilidad')
        );

        if (index !== -1) {
          messageApi.error('Debe haber al menos una disponibilidad');
        }

        console.error(err);
      });
  }

  function handleEditCliente() {
    clienteForm
      .validateFields()
      .then((values) => {
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
            piso: values.piso || null,
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
                (direccion) =>
                  direccion.id == formattedValues.direccion.idDireccion
              );

              if (index !== -1) {
                newDirecciones[index] = {
                  ...newDirecciones[index],
                  ...formattedValues.direccion
                };
              }

              return newDirecciones;
            });

            const barrio = getItemById(values.barrio, barrios);
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
            messageApi.success('Cliente editado correctamente');
            setOpen(false);
          })
          .catch((err) => {
            console.error(err);
            messageApi.error('No se pudo editar el cliente');
          })
          .finally(() => setLoadingGuardarCambios(false));
      })
      .catch((err) => console.error(err));
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
