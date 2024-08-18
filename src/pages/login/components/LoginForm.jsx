import { Button, Form, Input } from 'antd';
import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const navigateTo = useNavigate();

  const [loginForm] = Form.useForm();

  function handleFinish() {
    console.log('Formulario enviado');
    navigateTo('/');
  }

  function handleClick() {
    loginForm.submit();
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
        <Form.Item name='user' required>
          <Input
            size='large'
            placeholder='Usuario'
            prefix={<AiOutlineUser />}
          />
        </Form.Item>

        <Form.Item name='password' required>
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
          onClick={handleClick}
        >
          Ingresar
        </Button>
      </Form.Item>
    </Form>
  );
};
