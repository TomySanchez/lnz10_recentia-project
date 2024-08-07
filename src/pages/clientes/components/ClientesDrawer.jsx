import { useContext, useEffect } from 'react';
import { Button, Descriptions, Drawer, Form, Input, Select } from 'antd';
import { DataContext } from '../../../contexts';
import { formatDireccion } from '../../../utils';

export const ClientesDrawer = ({ open, setOpen, cliente, mode = 'add' }) => {
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
    if (open && cliente && mode === 'edit') {
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
  }, [open, cliente, clienteForm, mode]);

  function handleFinish(values) {
    console.log('Formulario enviado', values);
    setOpen(false);
  }

  function handleClose() {
    setOpen(false);
  }

  function getTitle() {
    switch (mode) {
      case 'add':
        return 'Añadir cliente';
      case 'edit':
        return 'Editar cliente';
      case 'view':
        return 'Información de cliente';
      default:
        return '';
    }
  }

  const isViewMode = mode === 'view';

  return (
    <Drawer
      title={getTitle()}
      open={open}
      onClose={handleClose}
      destroyOnClose
      extra={
        !isViewMode && (
          <Button
            className='clientes-drawer-save-button'
            type='primary'
            size='small'
            onClick={() => clienteForm.submit()}
          >
            Guardar
          </Button>
        )
      }
    >
      {isViewMode ? (
        <ClienteInfo cliente={cliente} />
      ) : (
        <Form
          form={clienteForm}
          name='clientesForm'
          layout='vertical'
          onFinish={handleFinish}
          requiredMark='optional'
        >
          <Form.Item
            name='nombre'
            label='Nombre'
            rules={[{ required: true, message: 'Nombre requerido' }]}
          >
            <Input />
          </Form.Item>

          <div className='clientes-drawer-address-container'>
            <p className='clientes-drawer-address-title'>Dirección</p>

            <div className='clientes-drawer-address-row'>
              <Form.Item
                name='calle'
                label='Calle'
                rules={[{ required: true, message: 'Calle requerida' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name='numero'
                label='Número'
                rules={[
                  { required: true, message: 'Número de calle requerido' }
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
                rules={[{ required: true, message: 'Localidad requerida' }]}
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
                rules={[{ required: true, message: 'Barrio requerido' }]}
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
      )}
    </Drawer>
  );
};

const ClienteInfo = ({ cliente }) => {
  if (!cliente) return null;

  const clientesItems = [
    { label: 'Nombre', children: cliente.nombre },
    {
      label: 'Dirección',
      children: `${formatDireccion(cliente.direccion)}, ${
        cliente.barrio.nombre
      }, ${cliente.localidad.nombre}`
    },
    { label: 'Teléfono', children: cliente.telefono || '-' },
    { label: 'CUIT/CUIL', children: cliente.cuit_cuil || '-' },
    { label: 'Observaciones', children: cliente.observaciones || '-' }
  ];

  return <Descriptions column={1} items={clientesItems} />;
};
