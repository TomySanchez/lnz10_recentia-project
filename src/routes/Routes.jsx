import { Navigate, Route, Routes as RoutesRR } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { isAuthenticated } from './isAuthenticated';
import { MainLayout } from '../layouts/MainLayout';
import { Clientes } from '../pages/clientes/Clientes';
import { Pedidos } from '../pages/pedidos/Pedidos';
import { Login } from '../pages/login/Login';
import { Entregas } from '../pages/entregas/Entregas';
import { ClientesRegistros } from '../pages/clientes/components/registros/ClientesRegistros';
import { PedidosListaEntregas } from '../pages/pedidos/components/listaEntregas/PedidosListaEntregas';
import { Productos } from '../pages/productos/Productos';

export const Routes = () => {
  return (
    <RoutesRR>
      <Route path='/inicio' element={<Login />} />
      <Route
        path='/'
        element={
          isAuthenticated() ? (
            <Navigate replace to='/clientes' />
          ) : (
            <Navigate replace to='/inicio' />
          )
        }
      />
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path='clientes' element={<Clientes />} />
        <Route path='clientes/registros' element={<ClientesRegistros />} />
        <Route path='pedidos' element={<Pedidos />} />
        <Route
          path='pedidos/lista-de-entregas'
          element={<PedidosListaEntregas />}
        />
        <Route path='entregas' element={<Entregas />} />
        {/* <Route path='pagos' element={<Pagos />} /> */}
        <Route path='productos' element={<Productos />} />
        {/* <Route path='configuracion' element={<Configuracion />} /> */}
      </Route>
      {/* <Route path='*' element={<NotFound />} /> */}
    </RoutesRR>
  );
};
