import { Drawer, Descriptions, Form, Input, Select, Button } from 'antd';
import { formatDireccion } from '../../../utils/formatDireccion';
import { useContext } from 'react';
import { DataContext } from '../../../contexts';

const { Item } = Descriptions;

export const ClientesDrawer = ({ mode, cliente, open, setOpen }) => {
  function handleClose() {
    setOpen(false);
  }

  let propsDrawer = {
    title: '',
    extra: '',
    children: ''
  };
  switch (mode) {
    case 'add':
      propsDrawer = {
        title: 'Nuevo cliente',
        extra: <DrawerButton text='Añadir' />,
        children: <AddDrawer setOpen={setOpen} />
      };
      break;
    case 'info':
      propsDrawer = {
        title: 'Información de cliente',
        extra: <DrawerButton text='Registros' />,
        children: <InfoDrawer cliente={cliente} />
      };
  }

  return (
    <Drawer
      width={500}
      title={propsDrawer.title}
      open={open}
      onClose={handleClose}
      extra={propsDrawer.extra}
      destroyOnClose
    >
      {propsDrawer.children}
    </Drawer>
  );
};

const InfoDrawer = ({ cliente }) => {
  return (
    <Descriptions column={1}>
      <Item label='Nombre'>{cliente.nombre}</Item>
      <Item label='Dirección'>{`${formatDireccion(cliente.direccion)}, ${
        cliente.barrio.nombre
      }, ${cliente.localidad.nombre}`}</Item>
      <Item label='Teléfono'>{cliente.telefono || '-'}</Item>
      <Item label='CUIT/CUIL'>{cliente.cuit_cuil || '-'}</Item>
      <Item label='Observaciones'>{cliente.observaciones || '-'}</Item>
    </Descriptions>
  );
};

const AddDrawer = ({ setOpen }) => {
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

const DrawerButton = ({ text }) => {
  return (
    <Button className='DrawerButton' type='primary' size='small'>
      {text}
    </Button>
  );
};
