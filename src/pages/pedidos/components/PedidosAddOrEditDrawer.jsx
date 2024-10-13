import { Button, Checkbox, DatePicker, Form, InputNumber, Select } from 'antd';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { getItemById } from '../../../utils/getItemById';
import { DataContext } from '../../../contexts';
import { AiOutlineMinusCircle, AiOutlinePlus } from 'react-icons/ai';
import { colorsPalette } from '../../../utils/colorsPalette';

export const PedidosAddOrEditDrawer = ({ editMode, pedido, pedidoForm }) => {
  const { clientes, productos } = useContext(DataContext);

  const [esRecurrente, setEsRecurrente] = useState(
    pedido?.esRecurrente || false
  );

  const { detallesPedido } = pedido;

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
    if (open && pedido && editMode) {
      pedidoForm.setFieldsValue({
        fechaRegistro: dayjs(pedido.fechaRegistro),
        cliente: getItemById(pedido.idCliente, clientes).id,
        esRecurrente: pedido.esRecurrente,
        cantSemanas: pedido.cantSemanas,
        detallesPedido: detallesPedido.map((detalle) => {
          return {
            producto: getItemById(detalle.idProducto, 'producto').id,
            cantidad: detalle.cantidad
          };
        })
      });
    } else {
      pedidoForm.resetFields();
    }
  }, [pedido, pedidoForm, editMode]);

  return (
    <Form
      form={pedidoForm}
      name='pedidosForm'
      layout='vertical'
      requiredMark='optional'
    >
      <Form.Item
        name='fechaRegistro'
        label='Fecha de registro'
        required
        rules={[
          {
            required: true,
            message: 'Requerido'
          }
        ]}
      >
        <DatePicker format='DD/MM/YY' defaultValue={dayjs()} />
      </Form.Item>

      <Form.Item
        name='cliente'
        label='Cliente'
        required
        rules={[
          {
            required: true,
            message: 'Requerido'
          }
        ]}
      >
        <Select options={clientesOptions} showSearch optionFilterProp='label' />
      </Form.Item>

      <div className='pedidos-drawer-detalles-container'>
        <span className='pedidos-drawer-detalles-title'>
          Detalles de pedidos
        </span>
        <Form.List name='detallesPedido'>
          {(fields, { add, remove }) => (
            <div style={{ margin: '12px 0' }}>
              {fields.map(({ key, name, ...restField }) => (
                <div className='pedidos-drawer-detalle-container' key={key}>
                  <Form.Item
                    {...restField}
                    name={[name, 'producto']}
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Requerido'
                      }
                    ]}
                  >
                    <Select
                      style={{ width: 260 }}
                      options={productosOptions}
                      placeholder='Producto'
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'cantidad']}
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Requerido'
                      },
                      {
                        type: 'number',
                        min: 1,
                        message: ''
                      },
                      {
                        validator: (_, value) =>
                          Number.isInteger(value)
                            ? Promise.resolve()
                            : Promise.reject()
                      }
                    ]}
                  >
                    <InputNumber placeholder='Cantidad' />
                  </Form.Item>
                  <AiOutlineMinusCircle
                    color={colorsPalette.darkMediumColor}
                    className='pointer'
                    size={20}
                    onClick={() => remove(name)}
                  />
                </div>
              ))}
              <Form.Item style={{ marginInline: '8px' }}>
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
  );
};
