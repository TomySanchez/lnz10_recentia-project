import { LoginForm } from './components/LoginForm';
import logo from '/assets/images/logo-recentia.png';

export const Login = () => {
  return (
    <div className='Login'>
      <div className='login-brand'>
        <img className='login-brand-logo' src={logo} alt='Logo de Recentia' />
      </div>
      <LoginForm />
    </div>
  );
};
