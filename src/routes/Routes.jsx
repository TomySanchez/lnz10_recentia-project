import { Navigate, Route, Routes as RoutesRR } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { isAuthenticated } from './isAuthenticated';
import { MainLayout } from '../layouts/MainLayout';
import { Clientes } from '../pages/clientes/Clientes';
import { Pedidos } from '../pages/pedidos/Pedidos';
import { Login } from '../pages/login/Login';
import { Configuracion } from '../pages/configuracion/Configuracion';
import { Entregas } from '../pages/entregas/Entregas';

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
        <Route path='pedidos' element={<Pedidos />} />
        <Route path='entregas' element={<Entregas />} />
        {/* <Route path='pagos' element={<Pagos />} /> */}
        <Route path='configuracion' element={<Configuracion />} />
      </Route>
      {/* <Route path='*' element={<NotFound />} /> */}
    </RoutesRR>
  );
};
