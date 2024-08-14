import { Popconfirm } from 'antd';

export const ProductosDeletePopover = ({ producto, open, setOpen }) => {
  function handleConfirm() {
    setOpen(false);
  }

  function handleCancel() {
    setOpen(false);
  }

  return (
    <Popconfirm
      title='Eliminar producto'
      description={`¿Eliminar ${producto.nombre}?`}
      open={open}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    ></Popconfirm>
  );
};
