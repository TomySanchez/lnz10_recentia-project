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
        barrio: cliente.direccion.idbarrio,
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

        <Form.Item name='barrio' label='Barrio' required>
          <Select options={barrioOptions} showSearch={true} />
        </Form.Item>
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
