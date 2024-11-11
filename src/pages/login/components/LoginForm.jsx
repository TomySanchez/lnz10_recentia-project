import { Button, Form, Input } from 'antd';
import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../routes/isAuthenticated';

export const LoginForm = () => {
  const navigateTo = useNavigate();
  const [loginForm] = Form.useForm();

  async function handleFinish(values) {
    const { user, password } = values;

    if (login(user, password)) {
      navigateTo('/clientes');
    } else {
      loginForm.setFields([
        { name: 'user', errors: [''] },
        { name: 'password', errors: ['Credenciales incorrectas'] }
      ]);
    }
  }

  return (
    <Form
      className='LoginForm'
      form={loginForm}
      name='loginForm'
      onFinish={handleFinish}
    >
      <span className='login-brand-name'>recentia</span>

      <div>
        <Form.Item
          name='user'
          rules={[{ required: true, message: 'Por favor ingresa el usuario' }]}
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
            { required: true, message: 'Por favor ingresa la contraseña' }
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
        <Button
          type='primary'
          className='login-form-submit'
          size='large'
          onClick={() => loginForm.submit()}
        >
          Ingresar
        </Button>
      </Form.Item>
    </Form>
  );
};
