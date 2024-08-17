import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './isAuthenticated';

export const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate replace to='/inicio' />;
  }
  return children;
};
