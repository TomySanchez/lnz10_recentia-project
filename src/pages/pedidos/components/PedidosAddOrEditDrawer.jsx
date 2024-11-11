import { Button, Checkbox, DatePicker, Form, InputNumber, Select } from 'antd';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { getItemById } from '../../../utils/getItemById';
import { DataContext } from '../../../contexts';
import { AiOutlineMinusCircle, AiOutlinePlus } from 'react-icons/ai';
import { colorsPalette } from '../../../utils/colorsPalette';

export const PedidosAddOrEditDrawer = ({ editMode, pedido, pedidoForm }) => {
  const { activeClientes, productos } = useContext(DataContext);

  const [esRecurrente, setEsRecurrente] = useState(
    pedido?.esRecurrente || false
  );
  const [estadoOptions, setEstadoOptions] = useState({});
  const [selectedProductos, setSelectedProductos] = useState([]);

  const { detallesPedido } = pedido || {};

  const clientesOptions = activeClientes
    .map((cliente) => ({
      label: cliente.nombre,
      value: cliente.id
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  useEffect(() => {
    const newOpcionesEstado = esRecurrente
      ? [
          { label: 'Pendiente', value: 'Pendiente' },
          { label: 'Cancelado', value: 'Cancelado' },
          { label: 'Activo', value: 'Activo' }
        ]
      : [
          { label: 'Pendiente', value: 'Pendiente' },
          { label: 'Cancelado', value: 'Cancelado' },
          { label: 'Realizado', value: 'Realizado' }
        ];
    setEstadoOptions(newOpcionesEstado);
  }, [esRecurrente]);

  const productosOptions = productos
    .map((producto) => ({
      label: producto.nombre,
      value: producto.id
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  useEffect(() => {
    if (open && pedido && editMode) {
      const detalles = detallesPedido.map((detalle) => ({
        producto: detalle.idProducto,
        cantidad: detalle.cantidad
      }));

      setSelectedProductos(detalles.map((detalle) => detalle.producto));

      pedidoForm.setFieldsValue({
        fechaRegistro: dayjs(pedido.fechaRegistro, 'DD/MM/YY'),
        cliente: getItemById(pedido.idCliente, activeClientes).id,
        estado: pedido.estado,
        esRecurrente: pedido.esRecurrente,
        cantSemanas: pedido.cantSemanas,
        detallesPedido: detalles
      });
    } else {
      pedidoForm.resetFields();
      pedidoForm.setFieldsValue({
        fechaRegistro: dayjs(),
        estado: 'Pendiente'
      });
    }
  }, [pedido, pedidoForm, editMode, activeClientes, detallesPedido]);

  const handleProductoChange = (value, name) => {
    const newSelectedProducts = [...selectedProductos];
    newSelectedProducts[name] = value; // Reemplaza el producto en la posición adecuada
    setSelectedProductos(newSelectedProducts);
  };

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
        <DatePicker format='DD/MM/YY' />
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

      <Form.Item
        name='estado'
        label='Estado'
        required
        rules={[
          {
            required: true,
            message: 'Requerido'
          }
        ]}
      >
        <Select options={estadoOptions} />
      </Form.Item>

      <div className='pedidos-drawer-detalles-container'>
        <span className='pedidos-drawer-detalles-title'>
          Detalles de pedidos
        </span>
        <Form.List name='detallesPedido'>
          {(fields, { add, remove }) => (
            <div style={{ margin: '12px 0' }}>
              {fields.map(({ key, name, ...restField }, index) => (
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
                      placeholder='Producto'
                      options={productosOptions.filter(
                        (option) =>
                          !selectedProductos.includes(option.value) ||
                          selectedProductos[index] === option.value
                      )} // Filtra los productos ya seleccionados
                      onChange={(value) => handleProductoChange(value, index)}
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
                    <InputNumber placeholder='Cantidad' min={1} />
                  </Form.Item>
                  <AiOutlineMinusCircle
                    color={colorsPalette.darkMediumColor}
                    className='pointer'
                    size={20}
                    onClick={() => {
                      const updatedSelectedProducts = [...selectedProductos];
                      updatedSelectedProducts.splice(index, 1);
                      setSelectedProductos(updatedSelectedProducts);
                      remove(name);
                    }}
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
