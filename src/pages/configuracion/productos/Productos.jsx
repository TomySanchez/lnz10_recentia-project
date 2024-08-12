import { ConfiguracionContent } from '../components/ConfiguracionContent';
import { ProductosTable } from './components/ProductosTable';

export const Productos = () => {
  return (
    <ConfiguracionContent title='Productos'>
      <ProductosTable />
    </ConfiguracionContent>
  );
};
