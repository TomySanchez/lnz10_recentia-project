import { useState } from 'react';
import { ConfiguracionContent } from '../components/ConfiguracionContent';
import { ProductosTable } from './components/ProductosTable';
import { ProductosDrawer } from './components/ProductosDrawer';
import { AddButton } from '../../../components/buttons/AddButton';

export const Productos = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [drawerMode, setDrawerMode] = useState('add');

  function handleInfo(producto) {
    setOpenDrawer(true);
    setSelectedProducto(producto);
    setDrawerMode('info');
  }

  function handleAdd() {
    setOpenDrawer(true);
    setDrawerMode('add');
  }

  function handleEdit(producto) {
    setOpenDrawer(true);
    setSelectedProducto(producto);
    setDrawerMode('edit');
  }

  return (
    <ConfiguracionContent
      title='Productos'
      extra={<AddButton element='producto' onAdd={handleAdd} />}
    >
      <ProductosTable onInfo={handleInfo} onEdit={handleEdit} />
      <ProductosDrawer
        mode={drawerMode}
        producto={selectedProducto}
        open={openDrawer}
        setOpen={setOpenDrawer}
      />
    </ConfiguracionContent>
  );
};
