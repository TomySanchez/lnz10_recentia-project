import {
  Button,
  DatePicker,
  Descriptions,
  Form,
  InputNumber,
  Select
} from 'antd';
import { getItemById } from '../../../utils/getItemById';
import { AiOutlineMinusCircle, AiOutlinePlus } from 'react-icons/ai';
import { colorsPalette } from '../../../utils/colorsPalette';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../../contexts';
import { getDetalles } from '../../../utils/getDetalles';

const { Item } = Descriptions;

export const EntregasEditDrawer = ({ entrega, setOpen }) => {
  const { productos, metodosDePago, detallesDePagos } = useContext(DataContext);

  const [entregaForm] = Form.useForm();

  const detallesDeEntrega = getDetalles(entrega.id, 'entregas');

  const productosOptions = productos
    .map((producto) => ({
      label: producto.nombre,
      value: producto.id
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const metodosDePagoOptions = metodosDePago
    .map((metodo) => ({
      label: metodo.nombre,
      value: metodo.id
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  function getCliente() {
    const pedido = getItemById(entrega.idPedido, 'pedido');
    const cliente = getItemById(pedido.idCliente, 'cliente');

    return cliente;
  }

  useEffect(() => {
    if (open && entrega) {
      entregaForm.setFieldsValue({
        cliente: getCliente().nombre,
        recorrido: getItemById(entrega.idRecorrido, 'recorrido').fecha,
        estado: entrega.estado,
        detallesDeEntrega: detallesDeEntrega.map((detalle) => {
          const detalleDePago = detallesDePagos.find(
            (detallePago) => detallePago.idDetalleDeEntrega == detalle.id
          );

          const precio = getItemById(detalleDePago.idPrecio, 'precio');

          return {
            producto: getItemById(detalle.idProducto, 'producto').nombre,
            cantidad: detalle.cantidad,
            precio: precio.descripcion
          };
        })
      });
    } else {
      entregaForm.resetFields();
    }
  }, [entrega, entregaForm]);

  function handleFinish(values) {
    console.log('Formulario enviado', values);
    setOpen(false);
  }

  return (
    <Form
      form={entregaForm}
      name='pedidosForm'
      // layout='vertical'
      onFinish={handleFinish}
      requiredMark='optional'
    >
      <Descriptions column={1}>
        <Item label='Cliente'>{getCliente().nombre}</Item>
        <Item label='Recorrido'>
          {getItemById(entrega.idRecorrido, 'recorrido').fecha || '-'}
        </Item>
      </Descriptions>

      <Form.Item
        style={{ margin: '16px 0' }}
        label='Estado de la entrega'
        required
      >
        <Select
          options={[
            {
              label: 'Pendiente',
              value: 'Pendiente'
            },
            {
              label: 'Realizada',
              value: 'Realizada'
            },
            {
              label: 'Cancelada',
              value: 'Cancelada'
            }
          ]}
        />
      </Form.Item>

      <div className='pedidos-drawer-detalles-container'>
        <span className='pedidos-drawer-detalles-title'>
          Detalles de entrega
        </span>
        <Form.List name='detallesDeEntrega'>
          {(fields, { add, remove }) => (
            <div style={{ margin: '12px 0' }}>
              {fields.map(({ key, name, ...restField }) => (
                <div className='pedidos-drawer-detalle-container' key={key}>
                  <Form.Item {...restField} name={[name, 'producto']} required>
                    <Select
                      style={{ width: 150 }}
                      options={productosOptions}
                      placeholder='Producto'
                    />
                  </Form.Item>

                  <Form.Item {...restField} name={[name, 'cantidad']} required>
                    <InputNumber placeholder='Cantidad' />
                  </Form.Item>

                  <Form.Item {...restField} name={[name, 'precio']} required>
                    <Select
                      style={{ width: 100 }}
                      options={[
                        {
                          label: 'Mayorista',
                          value: 'mayorista'
                        },
                        {
                          label: 'Minorista',
                          value: 'minorista'
                        }
                      ]}
                      placeholder='Precio'
                    />
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

      <div className='entregas-pago-info-container'>
        <h3>Pago</h3>

        <Form.Item label='Estado del pago' required>
          <Select
            options={[
              {
                label: 'Pendiente',
                value: 'Pendiente'
              },
              {
                label: 'Pagado',
                value: 'Pagado'
              }
            ]}
          />
        </Form.Item>

        <Form.Item label='Fecha de pago'>
          <DatePicker format='DD/MM/YY' />
        </Form.Item>

        <Form.Item label='Método de pago'>
          <Select options={metodosDePagoOptions} />
        </Form.Item>

        <Descriptions column={1}>
          <Item label='Monto total'>$ 5000</Item>
        </Descriptions>
      </div>
    </Form>
  );
};
