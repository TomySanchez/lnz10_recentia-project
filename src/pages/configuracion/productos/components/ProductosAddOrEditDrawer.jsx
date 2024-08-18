import { Button, Form, Input, InputNumber } from 'antd';
import { AiOutlineMinusCircle, AiOutlinePlus } from 'react-icons/ai';
import { colorsPalette } from '../../../../utils/colorsPalette';
import { useEffect } from 'react';

export const ProductosAddOrEditDrawer = ({ editMode, producto, setOpen }) => {
  const [productoForm] = Form.useForm();

  useEffect(() => {
    if (open && producto && editMode) {
      productoForm.setFieldsValue({
        nombre: producto.nombre,
        descripcion: producto.descripcion
      });
    } else {
      productoForm.resetFields();
    }
  }, [producto, productoForm, editMode]);

  function handleFinish(values) {
    console.log('Formulario enviado', values);
    setOpen(false);
  }

  return (
    <Form
      form={productoForm}
      name='productosForm'
      layout='vertical'
      onFinish={handleFinish}
      requiredMark='optional'
    >
      <Form.Item name='nombre' label='Nombre' required>
        <Input />
      </Form.Item>

      <Form.Item name='descripcion' label='Descripción'>
        <Input.TextArea autoSize={{ minRows: 2, maxRows: 2 }} />
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
                      required
                    >
                      <Input style={{ width: 260 }} placeholder='Descripción' />
                    </Form.Item>

                    <Form.Item {...restField} name={[name, 'valor']} required>
                      <InputNumber placeholder='Valor' />
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
                    Añadir precio
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form.List>
        </div>
      </Form.Item>
    </Form>
  );
};
