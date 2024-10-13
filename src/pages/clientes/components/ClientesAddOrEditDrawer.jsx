import { useContext, useEffect } from 'react';
import { DataContext } from '../../../contexts';
import { Form, Input, Select } from 'antd';
import { getItemById } from '../../../utils/getItemById';

export const ClientesAddOrEditDrawer = ({ editMode, cliente, clienteForm }) => {
  const { barrios } = useContext(DataContext);

  const barrioOptions = barrios.map((barrio) => ({
    label: `${barrio.nombre} (${
      getItemById(barrio.idLocalidad, 'localidad')?.nombre
    })`,
    value: barrio.id
  }));

  useEffect(() => {
    if (open && cliente && editMode) {
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
        observaciones: cliente.observaciones
      });
    } else {
      clienteForm.resetFields();
    }
  }, [cliente, clienteForm, editMode]);

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
              },
              {
                pattern: /^[0-9]+$/,
                message: 'Solo se permiten números enteros'
              }
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
