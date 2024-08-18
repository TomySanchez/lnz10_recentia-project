import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './contexts';
import './index.css';
import './components/components.css';
import './layouts/layouts.css';
import './pages/clientes/clientes.css';
import './pages/login/login.css';
import './pages/pedidos/pedidos.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <DataProvider>
        <App />
      </DataProvider>
    </Router>
  </React.StrictMode>
);
