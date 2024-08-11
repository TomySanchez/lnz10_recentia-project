import { Button, Form, Input } from 'antd';
import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai';

export const LoginForm = () => {
  function handleFinish() {
    console.log('Formulario enviado');
  }

  return (
    <Form className='LoginForm' name='loginForm' onFinish={handleFinish}>
      <span className='login-brand-name'>recentia</span>

      <div>
        <Form.Item
          name='user'
          rules={[
            {
              required: true,
              message: 'Usuario requerido'
            }
          ]}
        >
          <Input
            size='large'
            placeholder='Usuario'
            prefix={<AiOutlineUser />}
          />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Contraseña requerida'
            }
          ]}
        >
          <Input.Password
            size='large'
            placeholder='Contraseña'
            prefix={<AiOutlineLock />}
          />
        </Form.Item>
      </div>

      <Form.Item>
        <Button type='primary' className='login-form-submit' size='large'>
          Ingresar
        </Button>
      </Form.Item>
    </Form>
  );
};
