import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../contexts';
import { Button, Form, Input, Select, TimePicker } from 'antd';
import { getItemById } from '../../../utils/getItemById';
import { AiOutlineMinusCircle, AiOutlinePlus } from 'react-icons/ai';
import { colorsPalette } from '../../../utils/colorsPalette';
import dayjs from 'dayjs';

const { RangePicker } = TimePicker;

export const ClientesAddOrEditDrawer = ({ editMode, cliente, clienteForm }) => {
  const { barrios, diasSemana } = useContext(DataContext);

  const [selectedDiasSemana, setSelectedDiasSemana] = useState([]);

  const barrioOptions = barrios.map((barrio) => ({
    label: `${barrio.nombre} (${
      getItemById(barrio.idLocalidad, 'localidad')?.nombre
    })`,
    value: barrio.id
  }));

  const diasSemanaOptions = diasSemana.map((diaSemana) => ({
    label: diaSemana.nombre,
    value: diaSemana.id
  }));

  useEffect(() => {
    if (open && cliente && editMode) {
      const disponibilidades = cliente?.disponibilidades.map((disp) => ({
        diaSemana: disp.idDiaSemana,
        horas: [
          dayjs(disp.horaInicio, 'HH:mm:ss'),
          dayjs(disp.horaFin, 'HH:mm:ss')
        ]
      }));

      clienteForm.setFieldsValue({
        nombre: cliente.nombre,
        calle: cliente.direccion.calle,
        numero: cliente.direccion.numero,
        piso: cliente.direccion.piso,
        departamento: cliente.direccion.departamento,
        localidad: cliente.direccion.idLocalidad,
        barrio: cliente.direccion.idBarrio,
        telefono: cliente.telefono,
        cuit_cuil: cliente.cuit_cuil,
        observaciones: cliente.observaciones,
        disponibilidades: disponibilidades
      });
    } else {
      clienteForm.resetFields();
    }
  }, [cliente, clienteForm, editMode]);

  const handleDiaSemanaChange = (value, name) => {
    const newSelectedDiasSemana = [...selectedDiasSemana];
    newSelectedDiasSemana[name] = value; // Reemplaza el día en la posición adecuada
    setSelectedDiasSemana(newSelectedDiasSemana);
  };

  return (
    <Form
      form={clienteForm}
      name='clientesForm'
      layout='vertical'
      requiredMark='optional'
    >
      <Form.Item
        name='nombre'
        label='Nombre'
        required
        rules={[
          {
            required: true,
            message: 'Requerido'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <div className='clientes-drawer-address-container'>
        <p className='clientes-drawer-address-title'>Dirección</p>

        <div className='clientes-drawer-address-row'>
          <Form.Item
            name='calle'
            label='Calle'
            required
            rules={[
              {
                required: true,
                message: 'Requerido'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='numero'
            label='Número'
            required
            rules={[
              {
                required: true,
                message: 'Requerido'
              },
              {
                pattern: /^[0-9]+$/,
                message: 'Solo se permiten números enteros'
              }
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className='clientes-drawer-address-row'>
          <Form.Item
            name='piso'
            label='Piso'
            rules={[
              {
                validator: (_, value) => {
                  const departamento =
                    clienteForm.getFieldValue('departamento');
                  if (value && !departamento) {
                    return Promise.reject(
                      'Si ingresas un Piso, Departamento es obligatorio'
                    );
                  }
                  return Promise.resolve();
                }
              }
              /* {
                pattern: /^[0-9]+$/,
                message: 'Solo se permiten números enteros'
              } */
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='departamento'
            label='Departamento'
            rules={[
              {
                validator: (_, value) => {
                  const piso = clienteForm.getFieldValue('piso');
                  if (value && !piso) {
                    return Promise.reject(
                      'Si ingresas un Departamento, Piso es obligatorio'
                    );
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <Form.Item
          name='barrio'
          label='Barrio'
          required
          rules={[
            {
              required: true,
              message: 'Requerido'
            }
          ]}
        >
          <Select
            options={barrioOptions}
            showSearch={true}
            optionFilterProp='label'
          />
        </Form.Item>
      </div>

      <div className='pedidos-drawer-detalles-container'>
        <span className='pedidos-drawer-detalles-title'>Disponibilidad</span>

        <Form.List
          name='disponibilidades'
          rules={[
            {
              validator: async (_, value) => {
                if (!value || value.length === 0) {
                  return Promise.reject(
                    new Error('Debe haber al menos una disponibilidad')
                  );
                }
              }
            }
          ]}
        >
          {(fields, { add, remove }) => (
            <div style={{ margin: '12px 0' }}>
              {fields.map(({ key, name, ...restField }, index) => (
                <div className='pedidos-drawer-detalle-container' key={key}>
                  <Form.Item
                    {...restField}
                    name={[name, 'diaSemana']}
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Requerido'
                      }
                    ]}
                  >
                    <Select
                      style={{ width: 100 }}
                      placeholder='Día'
                      options={diasSemanaOptions}
                      onChange={(value) => handleDiaSemanaChange(value, index)}
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'horas']}
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Requerido'
                      }
                    ]}
                  >
                    <RangePicker
                      style={{ width: 250 }}
                      placeholder={['Hora de inicio', 'Hora de fin']}
                      format='HH:mm'
                      secondStep={30}
                    />
                  </Form.Item>

                  <AiOutlineMinusCircle
                    color={colorsPalette.darkMediumColor}
                    className='pointer'
                    size={20}
                    onClick={() => {
                      const updatedSelectedDiasSemana = [...selectedDiasSemana];
                      updatedSelectedDiasSemana.splice(index, 1);
                      setSelectedDiasSemana(updatedSelectedDiasSemana);
                      remove(name);
                    }}
                  />
                </div>
              ))}

              <Form.Item style={{ marginInline: '8px' }}>
                <Button
                  type='dashed'
                  onClick={() => add()}
                  block
                  icon={<AiOutlinePlus />}
                >
                  Añadir disponibilidad
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>
      </div>

      <Form.Item
        name='telefono'
        label='Teléfono'
        rules={[
          {
            pattern: /^\d{9,13}$/,
            message: 'Debe tener entre 9 y 13 números'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='cuit_cuil'
        label='CUIT/CUIL'
        rules={[
          {
            pattern: /^\d{11}$/,
            message: 'Debe tener 11 numéros'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name='observaciones' label='Observaciones'>
        <Input.TextArea autoSize={{ minRows: 2, maxRows: 2 }} />
      </Form.Item>
    </Form>
  );
};
