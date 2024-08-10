import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../contexts';
import {
  Button,
  Checkbox,
  DatePicker,
  Descriptions,
  Drawer,
  Form,
  Input,
  InputNumber,
  List,
  Select,
  Tag
} from 'antd';
import dayjs from 'dayjs';
import { ButtonSave } from '../buttons';
import { AiOutlineMinusCircle, AiOutlinePlus } from 'react-icons/ai';
import { formatDireccion, getDetallesDePedido, getItemById } from '../../utils';

export const DrawerForm = ({ open, setOpen, item, mode, type }) => {
  const { clientes, productos, barrios, localidades } = useContext(DataContext);

  const [form] = Form.useForm();
  const [isRecurrent, setIsRecurrent] = useState(false);

  const clientOptions = clientes
    .map((client) => ({
      label: client.nombre,
      value: client.id
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const productOptions = productos
    .map((product) => ({
      label: product.nombre,
      value: product.id
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const barrioOptions = barrios.map((barrio) => ({
    label: barrio.nombre,
    value: barrio.id
  }));

  const localidadOptions = localidades.map((localidad) => ({
    label: localidad.nombre,
    value: localidad.id
  }));

  useEffect(() => {
    if (open && item && mode === 'edit') {
      if (type === 'client') {
        form.setFieldsValue({
          nombre: item.nombre,
          calle: item.direccion.calle,
          numero: item.direccion.numero,
          piso: item.direccion.piso,
          departamento: item.direccion.departamento,
          localidad: item.localidad.id,
          barrio: item.barrio.id,
          telefono: item.telefono,
          cuit_cuil: item.cuit_cuil,
          observaciones: item.observaciones
        });
      } else if (type === 'order') {
        form.setFieldsValue({
          fechaRegistro: dayjs(item.fechaRegistro),
          cliente: item.idCliente,
          esRecurrente: item.esRecurrente,
          cantSemanas: item.cantSemanas
        });
      }
    } else {
      form.resetFields();
    }
  }, [open, item, form, mode, type]);

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
        return `Añadir ${type}`;
      case 'edit':
        return `Editar ${type}`;
      case 'view':
        return `Información de ${type}`;
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
        !isViewMode &&
        (type === 'client' ? (
          <ButtonSave form={form} />
        ) : (
          item?.esRecurrente && <Tag color='gold'>Recurrente</Tag>
        ))
      }
    >
      {isViewMode ? (
        type === 'client' ? (
          <ClientInfo client={item} />
        ) : (
          <OrderInfo order={item} />
        )
      ) : (
        <Form
          form={form}
          name={`${type}sForm`}
          layout='vertical'
          onFinish={handleFinish}
          requiredMark='optional'
        >
          {type === 'client' ? (
            <>
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
                      showSearch
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
                      showSearch
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
            </>
          ) : (
            <>
              <Form.Item
                name='fechaRegistro'
                label='Fecha de registro'
                rules={[{ required: true, message: 'Fecha requerida' }]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                name='cliente'
                label='Cliente'
                rules={[{ required: true, message: 'Cliente requerido' }]}
              >
                <Select options={clientOptions} showSearch />
              </Form.Item>

              <div className='pedidos-drawer-detalles-container'>
                <span className='pedidos-drawer-detalles-title'>
                  Detalles de pedidos
                </span>
                <Form.List name='detalles'>
                  {(fields, { add, remove }) => (
                    <div style={{ margin: '12px 0' }}>
                      {fields.map(({ key, name, ...restField }) => (
                        <div
                          className='pedidos-drawer-detalle-container'
                          key={key}
                        >
                          <Form.Item
                            {...restField}
                            name={[name, 'producto']}
                            rules={[
                              { required: true, message: 'Producto requerido' }
                            ]}
                          >
                            <Select
                              style={{ width: 200 }}
                              options={productOptions}
                              placeholder='Producto'
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'cantidad']}
                            rules={[
                              { required: true, message: 'Cantidad requerida' }
                            ]}
                          >
                            <InputNumber placeholder='Cantidad' />
                          </Form.Item>
                          <AiOutlineMinusCircle
                            className='pointer'
                            size={20}
                            onClick={() => remove(name)}
                          />
                        </div>
                      ))}
                      <Form.Item>
                        <Button
                          type='dashed'
                          onClick={() => add()}
                          block
                          icon={<AiOutlinePlus />}
                        >
                          Añadir detalle
                        </Button>
                      </Form.Item>
                    </div>
                  )}
                </Form.List>
              </div>

              <Form.Item name='esRecurrente' valuePropName='checked'>
                <Checkbox onChange={(e) => setIsRecurrent(e.target.checked)}>
                  Es recurrente
                </Checkbox>
              </Form.Item>

              {isRecurrent && (
                <div className='pedidos-add-form-delivery-frequency'>
                  <span>Cada</span>
                  <Form.Item
                    name='cantSemanas'
                    noStyle
                    rules={[
                      {
                        required: isRecurrent,
                        message: 'Cantidad de semanas requerido'
                      }
                    ]}
                  >
                    <InputNumber
                      className='pedidos-add-form-delivery-frequency-number-of-weeks'
                      min={1}
                    />
                  </Form.Item>
                  <span>semana(s)</span>
                </div>
              )}
            </>
          )}
        </Form>
      )}
    </Drawer>
  );
};

const ClientInfo = ({ client }) => {
  if (!client) return null;

  const clientItems = [
    { label: 'Nombre', children: client.nombre },
    {
      label: 'Dirección',
      children: `${formatDireccion(client.direccion)}, ${
        client.barrio.nombre
      }, ${client.localidad.nombre}`
    },
    { label: 'Teléfono', children: client.telefono || '-' },
    { label: 'CUIT/CUIL', children: client.cuit_cuil || '-' },
    { label: 'Observaciones', children: client.observaciones || '-' }
  ];

  return <Descriptions column={1} items={clientItems} />;
};

const OrderInfo = ({ order }) => {
  const detallesDeOrden = getDetallesDePedido(order.id);

  if (!order) return null;

  const orderItems = [
    { label: 'Fecha de registro', children: order.fechaRegistro },
    { label: 'Cliente', children: order.idCliente },
    {
      label: 'Recurrencia',
      children:
        order.cantSemanas === 1
          ? 'Cada semana'
          : order.cantSemanas
          ? `Cada ${order.cantSemanas} semanas`
          : '-'
    }
  ];

  const orderDetailsComponents = detallesDeOrden.map((detail) => (
    <OrderDetail key={detail.id} detail={detail} />
  ));

  return (
    <div>
      <Descriptions column={1} items={orderItems} />
      {detallesDeOrden.length > 0 && (
        <List
          className='pedidos-info-detalles-list'
          header={
            <span className='pedidos-info-detalles-list-title'>
              Detalles de pedido
            </span>
          }
          dataSource={orderDetailsComponents}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      )}
    </div>
  );
};

const OrderDetail = ({ detail }) => {
  return (
    <div className='DetallesDePedido'>
      <span>{getItemById(detail.idProducto, 'producto').nombre}</span>
      <span>{detail.cantidad}</span>
    </div>
  );
};
