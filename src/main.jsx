import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './contexts';
import './index.css';
import './components/components.css';
import './layouts/layouts.css';
import './pages/clientes/clientes.css';
import './pages/configuracion/configuracion.css';
import './pages/entregas/entregas.css';
import './pages/login/login.css';
import './pages/pedidos/pedidos.css';
import { MessageProvider } from './contexts/MessageContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <MessageProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </MessageProvider>
  </Router>
);
