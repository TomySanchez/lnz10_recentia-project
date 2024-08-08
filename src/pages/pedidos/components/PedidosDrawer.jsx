import { useContext, useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  DatePicker,
  Descriptions,
  Drawer,
  Form,
  InputNumber,
  Select
} from 'antd';
import { DataContext } from '../../../contexts';
import dayjs from 'dayjs';
import { AiOutlineMinusCircle, AiOutlinePlus } from 'react-icons/ai';

export const PedidosDrawer = ({ open, setOpen, pedido, mode = 'add' }) => {
  const { clientes, productos } = useContext(DataContext);

  const [esRecurrente, setEsRecurrente] = useState(false);

  const [pedidoForm] = Form.useForm();

  const clientesOptions = clientes
    .map((cliente) => ({
      label: cliente.nombre,
      value: cliente.id
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const productosOptions = productos
    .map((producto) => ({
      label: producto.nombre,
      value: producto.id
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  useEffect(() => {
    if (open && pedido && mode === 'edit') {
      pedidoForm.setFieldsValue({
        fechaRegistro: dayjs(pedido.fechaRegistro),
        cliente: pedido.idCliente,
        esRecurrente: pedido.esRecurrente,
        cantSemanas: pedido.cantSemanas
      });
    } else {
      pedidoForm.resetFields();
    }
  }, [open, pedido, pedidoForm, mode]);

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
        return 'Añadir pedido';
      case 'edit':
        return 'Editar pedido';
      case 'view':
        return 'Información de pedido';
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
            onClick={() => pedidoForm.submit()}
          >
            Guardar
          </Button>
        )
      }
    >
      {isViewMode ? (
        <PedidoInfo pedido={pedido} />
      ) : (
        <Form
          form={pedidoForm}
          name='pedidosForm'
          layout='vertical'
          onFinish={handleFinish}
          requiredMark='optional'
        >
          <Form.Item
            name='fechaRegistro'
            label='Fecha de registro'
            rules={[
              {
                required: true,
                message: 'Fecha requerida'
              }
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name='cliente'
            label='Cliente'
            rules={[{ required: true, message: 'Cliente requerido' }]}
          >
            <Select options={clientesOptions} showSearch={true} />
          </Form.Item>

          <div className='pedidos-drawer-detalles-container'>
            <span className='pedidos-drawer-detalles-title'>
              Detalles de pedidos
            </span>
            <Form.List name='detalles'>
              {(fields, { add, remove }) => (
                <div style={{ margin: '12px 0' }}>
                  {fields.map(({ key, name, ...restField }) => (
                    <div className='pedidos-drawer-detalle-container' key={key}>
                      <Form.Item
                        {...restField}
                        name={[name, 'producto']}
                        rules={[
                          {
                            required: true,
                            message: 'Producto requerido'
                          }
                        ]}
                      >
                        <Select
                          style={{ width: 200 }}
                          options={productosOptions}
                          placeholder='Producto'
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'cantidad']}
                        rules={[
                          {
                            required: true,
                            message: 'Cantidad requerida'
                          }
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
            <Checkbox onChange={(e) => setEsRecurrente(e.target.checked)}>
              Es recurrente
            </Checkbox>
          </Form.Item>

          {esRecurrente && (
            <div className='pedidos-add-form-delivery-frequency'>
              <span>Cada</span>
              <Form.Item
                name='cantSemanas'
                noStyle
                rules={[
                  {
                    required: esRecurrente,
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
        </Form>
      )}
    </Drawer>
  );
};

const PedidoInfo = ({ pedido }) => {
  if (!pedido) return null;

  const pedidoItems = [
    { label: 'Tipo de pedido', children: pedido.esRecurrente.toString() },
    { label: 'Fecha de registro', children: pedido.fechaRegistro },
    { label: 'Cliente', children: pedido.idCliente },
    { label: 'Recurrencia', children: pedido.cantSemanas }
  ];

  return <Descriptions column={1} items={pedidoItems} />;
};
