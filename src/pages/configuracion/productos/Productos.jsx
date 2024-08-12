import { useState } from 'react';
import { ButtonAdd } from '../../../components/buttons';
import { ConfiguracionContent } from '../components/ConfiguracionContent';
import { ProductosTable } from './components/ProductosTable';
import { ProductosAddDrawer } from './components/ProductosAddDrawer';
import { ProductosEditDrawer } from './components/ProductosEditDrawer';

export const Productos = () => {
  const [openAddDrawer, setOpenAddDrawer] = useState(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(false);

  function handleEdit(pedido) {
    setOpenEditDrawer(true);
    setSelectedProducto(pedido);
  }

  return (
    <ConfiguracionContent
      title='Productos'
      extra={<ButtonAdd element='producto' setOpen={setOpenAddDrawer} />}
    >
      <ProductosTable onEdit={handleEdit} />
      <ProductosAddDrawer open={openAddDrawer} setOpen={setOpenAddDrawer} />
      <ProductosEditDrawer
        producto={selectedProducto}
        open={openEditDrawer}
        setOpen={setOpenEditDrawer}
      />
    </ConfiguracionContent>
  );
};
