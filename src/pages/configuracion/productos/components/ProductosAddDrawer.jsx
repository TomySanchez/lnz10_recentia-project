import { Button, Drawer, Form, Input, InputNumber } from 'antd';
import { ButtonSave } from '../../../../components/buttons';
import { AiOutlineMinusCircle, AiOutlinePlus } from 'react-icons/ai';

export const ProductosAddDrawer = ({ open, setOpen }) => {
  const [addProductoForm] = Form.useForm();

  function handleFinish(values) {
    console.log('Formulario enviado:', values);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Drawer
      title='Añadir producto'
      open={open}
      onClose={handleClose}
      extra={<ButtonSave form={addProductoForm} />}
    >
      <Form
        form={addProductoForm}
        name='pedidosForm'
        layout='vertical'
        onFinish={handleFinish}
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
        <Form.Item name='descripcion' label='Descripción'>
          <Input />
        </Form.Item>
        <Form.Item>
          <div className='pedidos-drawer-detalles-container'>
            <span className='pedidos-drawer-detalles-title'>
              Lista de precios
            </span>
            <Form.List name='listaPrecios'>
              {(fields, { add, remove }) => (
                <div style={{ margin: '12px 0' }}>
                  {fields.map(({ key, name, ...restField }) => (
                    <div className='pedidos-drawer-detalle-container' key={key}>
                      <Form.Item
                        {...restField}
                        name={[name, 'descripcion']}
                        rules={[
                          {
                            required: true,
                            message: 'Descripción requerida'
                          }
                        ]}
                      >
                        <Input placeholder='Descripción' />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'valor']}
                        rules={[
                          {
                            required: true,
                            message: 'Valor requerido'
                          }
                        ]}
                      >
                        <InputNumber placeholder='Valor' />
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
                      Añadir precio
                    </Button>
                  </Form.Item>
                </div>
              )}
            </Form.List>
          </div>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
