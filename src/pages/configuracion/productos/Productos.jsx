import { useState } from 'react';
import { ButtonAdd } from '../../../components/buttons';
import { ConfiguracionContent } from '../components/ConfiguracionContent';
import { ProductosTable } from './components/ProductosTable';
import { ProductosAddDrawer } from './components/ProductosAddDrawer';

export const Productos = () => {
  const [openAddDrawer, setOpenAddDrawer] = useState(false);

  return (
    <ConfiguracionContent
      title='Productos'
      extra={<ButtonAdd element='producto' setOpen={setOpenAddDrawer} />}
    >
      <ProductosTable />
      <ProductosAddDrawer open={openAddDrawer} setOpen={setOpenAddDrawer} />
    </ConfiguracionContent>
  );
};
