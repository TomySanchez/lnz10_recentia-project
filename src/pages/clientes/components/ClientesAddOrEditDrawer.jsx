import { useContext, useEffect } from 'react';
import { DataContext } from '../../../contexts';
import { Form, Input, Select } from 'antd';

export const ClientesAddOrEditDrawer = ({ editMode, cliente, setOpen }) => {
  const { barrios, localidades } = useContext(DataContext);

  const [clienteForm] = Form.useForm();

  const barrioOptions = barrios.map((barrio) => ({
    label: barrio.nombre,
    value: barrio.id
  }));

  const localidadOptions = localidades.map((localidad) => ({
    label: localidad.nombre,
    value: localidad.id
  }));

  useEffect(() => {
    if (open && cliente && editMode) {
      clienteForm.setFieldsValue({
        nombre: cliente.nombre,
        calle: cliente.direccion.calle,
        numero: cliente.direccion.numero,
        piso: cliente.direccion.piso,
        departamento: cliente.direccion.departamento,
        localidad: cliente.localidad.id,
        barrio: cliente.barrio.id,
        telefono: cliente.telefono,
        cuit_cuil: cliente.cuit_cuil,
        observaciones: cliente.observaciones
      });
    } else {
      clienteForm.resetFields();
    }
  }, [cliente, clienteForm, editMode]);

  function handleFinish(values) {
    console.log('Formulario enviado', values);
    setOpen(false);
  }

  return (
    <Form
      form={clienteForm}
      name='clientesForm'
      layout='vertical'
      onFinish={handleFinish}
      requiredMark='optional'
    >
      <Form.Item name='nombre' label='Nombre' required>
        <Input />
      </Form.Item>

      <div className='clientes-drawer-address-container'>
        <p className='clientes-drawer-address-title'>Dirección</p>

        <div className='clientes-drawer-address-row'>
          <Form.Item name='calle' label='Calle' required>
            <Input />
          </Form.Item>

          <Form.Item name='numero' label='Número' required>
            <Input />
          </Form.Item>
        </div>

        <div className='clientes-drawer-address-row'>
          <Form.Item name='piso' label='Piso'>
            <Input />
          </Form.Item>

          <Form.Item name='departamento' label='Departamento'>
            <Input />
          </Form.Item>
        </div>

        <div className='clientes-drawer-address-row'>
          <Form.Item name='localidad' label='Localidad' required>
            <Select
              options={localidadOptions}
              showSearch={true}
              popupMatchSelectWidth={200}
              defaultValue={1}
            />
          </Form.Item>

          <Form.Item name='barrio' label='Barrio' required>
            <Select
              options={barrioOptions}
              showSearch={true}
              popupMatchSelectWidth={200}
            />
          </Form.Item>
        </div>
      </div>

      <Form.Item name='telefono' label='Teléfono'>
        <Input />
      </Form.Item>

      <Form.Item name='cuit_cuil' label='CUIT/CUIL'>
        <Input />
      </Form.Item>

      <Form.Item name='observaciones' label='Observaciones'>
        <Input.TextArea autoSize={{ minRows: 2, maxRows: 2 }} />
      </Form.Item>
    </Form>
  );
};
