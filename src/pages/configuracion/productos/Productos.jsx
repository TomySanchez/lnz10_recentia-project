import { useState } from 'react';
import { ButtonAdd } from '../../../components/buttons';
import { ConfiguracionContent } from '../components/ConfiguracionContent';
import { ProductosTable } from './components/ProductosTable';
import { ProductosAddDrawer } from './components/ProductosAddDrawer';
import { ProductosEditDrawer } from './components/ProductosEditDrawer';
import { ProductosDeletePopover } from './components/ProductosDeletePopover';
import { ProductosInfoDrawer } from './components/ProductosInfoDrawer';

export const Productos = () => {
  const [openAddDrawer, setOpenAddDrawer] = useState(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [openInfoDrawer, setOpenInfoDrawer] = useState(false);
  const [openDeletePopover, setOpenDeletePopover] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(false);

  function handleEdit(producto) {
    setOpenEditDrawer(true);
    setSelectedProducto(producto);
  }

  function handleInfo(producto) {
    setOpenInfoDrawer(true);
    setSelectedProducto(producto);
  }

  /* function handleDelete(producto) {
    setOpenDeletePopover(true);
    setSelectedProducto(producto);
  } */

  return (
    <ConfiguracionContent
      title='Productos'
      extra={<ButtonAdd element='producto' setOpen={setOpenAddDrawer} />}
    >
      <ProductosTable
        onInfo={handleInfo}
        onEdit={handleEdit}
        open={openDeletePopover}
        setOpen={setOpenDeletePopover}
        producto={selectedProducto}
      />
      <ProductosAddDrawer open={openAddDrawer} setOpen={setOpenAddDrawer} />
      <ProductosInfoDrawer
        producto={selectedProducto}
        open={openInfoDrawer}
        setOpen={setOpenInfoDrawer}
      />
      <ProductosEditDrawer
        producto={selectedProducto}
        open={openEditDrawer}
        setOpen={setOpenEditDrawer}
      />
      <ProductosDeletePopover
        producto={selectedProducto}
        open={openDeletePopover}
        setOpenDeletePopover={setOpenDeletePopover}
      />
    </ConfiguracionContent>
  );
};
