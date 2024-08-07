import { useContext } from 'react';
import { Button, Drawer, Form, Input, Select } from 'antd';
import { DataContext } from '../../../contexts';

export const ClientesAddDrawer = ({ open, setOpen }) => {
  const { barrios, localidades } = useContext(DataContext);

  const [addClienteForm] = Form.useForm();

  const barrioOptions = barrios.map((barrio) => ({
    label: barrio.nombre,
    value: barrio.id
  }));

  const localidadOptions = localidades.map((localidad) => ({
    label: localidad.nombre,
    value: localidad.id
  }));

  function handleFinish(values) {
    console.log('Formulario enviado', values);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Drawer
      title='Añadir cliente'
      open={open}
      onClose={handleClose}
      destroyOnClose
      extra={
        <Button
          className='clientes-add-save-button'
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
        form={addClienteForm}
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

        <div className='clientes-add-address-container'>
          <p className='clientes-add-address-title'>Dirección</p>

          <div className='clientes-add-address-row'>
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

          <div className='clientes-add-address-row'>
            <Form.Item name='piso' label='Piso'>
              <Input />
            </Form.Item>

            <Form.Item name='departamento' label='Departamento'>
              <Input />
            </Form.Item>
          </div>

          <div className='clientes-add-address-row'>
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
