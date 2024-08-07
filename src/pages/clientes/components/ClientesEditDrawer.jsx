import { useContext, useEffect } from 'react';
import { Button, Drawer, Form, Input, Select } from 'antd';
import { DataContext } from '../../../contexts';

export const ClientesEditDrawer = ({ open, setOpen, cliente }) => {
  const { barrios, localidades } = useContext(DataContext);

  const [editClienteForm] = Form.useForm();

  const barrioOptions = barrios.map((barrio) => ({
    label: barrio.nombre,
    value: barrio.id
  }));

  const localidadOptions = localidades.map((localidad) => ({
    label: localidad.nombre,
    value: localidad.id
  }));

  useEffect(() => {
    if (open && cliente) {
      editClienteForm.setFieldsValue({
        nombre: cliente.nombre,
        calle: cliente.direccion.calle,
        numero: cliente.direccion.numero,
        piso: cliente.direccion.piso,
        departamento: cliente.direccion.departamento,
        telefono: cliente.telefono,
        cuit_cuil: cliente.cuit_cuil,
        observaciones: cliente.observaciones
      });
    }
  }, [open, cliente, editClienteForm]);

  function handleFinish(values) {
    console.log('Formulario enviado', values);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Drawer
      title='Editar cliente'
      open={open}
      onClose={handleClose}
      destroyOnClose
      extra={
        <Button
          className='clientes-drawer-save-button'
          type='primary'
          size='small'
          htmlType='submit'
          onClick={handleFinish}
        >
          Guardar
        </Button>
      }
    >
      <Form
        form={editClienteForm}
        name='clientesForm'
        layout='vertical'
        onFinish={handleFinish}
        clearOnDestroy
        requiredMark='optional'
      >
        <Form.Item
          name='nombre'
          label='Nombre'
          rules={[
            {
              required: true,
              message: 'Nombre requerido'
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
              rules={[
                {
                  required: true,
                  message: 'Calle requerida'
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name='numero'
              label='Número'
              rules={[
                {
                  required: true,
                  message: 'Número de calle requerido'
                }
              ]}
            >
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
            <Form.Item
              name='localidad'
              label='Localidad'
              rules={[
                {
                  required: true,
                  message: 'Localidad requerida'
                }
              ]}
            >
              <Select
                options={localidadOptions}
                showSearch={true}
                popupMatchSelectWidth={200}
              />
            </Form.Item>

            <Form.Item
              name='barrio'
              label='Barrio'
              rules={[
                {
                  required: true,
                  message: 'Barrio requerido'
                }
              ]}
            >
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
    </Drawer>
  );
};
