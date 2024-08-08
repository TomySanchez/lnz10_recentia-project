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
  const { clientes } = useContext(DataContext);

  const [esRecurrente, setEsRecurrente] = useState(false);

  const [pedidoForm] = Form.useForm();

  const clientesOptions = clientes
    .map((cliente) => ({
      label: cliente.nombre,
      value: cliente.id
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

          <Form.List name='detalles'>
            {(fields, { add, remove }, { errors }) => (
              <div>
                {fields.map((field, index) => (
                  <Form.Item
                    className='pedidos-drawer-detalle-container'
                    label={index === 0 ? 'Detalles de pedidos' : ''}
                    required={true}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Ingrese un producto o elimine este campo'
                        }
                      ]}
                      // noStyle
                    >
                      <Select />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <AiOutlineMinusCircle
                        className='dynamic-delete-button'
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type='dashed'
                    onClick={() => add()}
                    icon={<AiOutlinePlus />}
                  >
                    Añadir campo
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </div>
            )}
          </Form.List>

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
