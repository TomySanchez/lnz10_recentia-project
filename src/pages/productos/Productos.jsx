import { useState } from 'react';
import { AddButton } from '../../components/buttons/AddButton';
import { MainContent } from '../../layouts/MainContent';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { ProductosTable } from './components/ProductosTable';
import { ProductosDrawer } from './components/ProductosDrawer';

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
    <MainContent
      title='Productos'
      icon={<MdOutlineShoppingBag size={40} />}
      extra={<AddButton element='producto' onAdd={handleAdd} disabled />}
      isWip
    >
      <ProductosTable onInfo={handleInfo} onEdit={handleEdit} />
      <ProductosDrawer
        mode={drawerMode}
        producto={selectedProducto}
        open={openDrawer}
        setOpen={setOpenDrawer}
      />
    </MainContent>
  );
};
