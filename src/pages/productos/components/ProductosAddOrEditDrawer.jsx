import { Button, Form, Input, InputNumber, Select } from 'antd';
import { AiOutlineMinusCircle, AiOutlinePlus } from 'react-icons/ai';
import { colorsPalette } from '../../../utils/colorsPalette';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../../contexts';

export const ProductosAddOrEditDrawer = ({ mode, producto, setOpen }) => {
  const { precios } = useContext(DataContext);

  const [productoForm] = Form.useForm();

  useEffect(() => {
    if (mode === 'edit' && producto) {
      const preciosDelProducto = precios?.filter(
        (precio) => producto.id == precio.idProducto
      );

      productoForm.setFieldsValue({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        estado: producto.estado,
        listaPrecios: preciosDelProducto.map((precio) => ({
          descripcion: precio.descripcion,
          valor: precio.valor
        }))
      });
    } else {
      productoForm.resetFields();
    }
  }, [mode, producto, productoForm, precios]);

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

      <Form.Item name='estado' label='Estado' required>
        <Select
          options={[
            {
              label: 'Activo',
              value: 'Activo'
            },
            {
              label: 'Descontinuado',
              value: 'Descontinuado'
            }
          ]}
        />
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
