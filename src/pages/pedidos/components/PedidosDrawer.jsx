import { useNavigate } from 'react-router-dom';
import { Drawer } from '../../../components/drawers/Drawer';
import { PedidosAddOrEditDrawer } from './PedidosAddOrEditDrawer';
import { PedidosInfoDrawer } from './PedidosInfoDrawer';
import { useContext } from 'react';
import { DataContext } from '../../../contexts';
import { Form } from 'antd';
import { addPedido } from '../../../services/pedidos';

export const PedidosDrawer = ({ mode, pedido, open, setOpen }) => {
  const { setPedidos } = useContext(DataContext);

  const navigateTo = useNavigate();

  const [pedidoForm] = Form.useForm();

  function goToListaEntregas() {
    navigateTo(`lista-de-entregas`, { state: { pedido } });
  }

  function addItem() {
    const values = pedidoForm.getFieldsValue();

    const { detallesPedido } = values;

    const formattedValues = {
      pedido: {
        fechaRegistro: values.fechaRegistro,
        esRecurrente: values.esRecurrente,
        cantSemanas: values.cantSemanas || null,
        estado: 'Pendiente',
        idCliente: values.cliente
      }
    };

    formattedValues.detallesPedido = detallesPedido?.map((detalle) => ({
      idProducto: detalle.producto,
      cantidad: detalle.cantidad
    }));

    addPedido(formattedValues)
      .then(() => {
        setPedidos((prevPedidos) => {
          const newPedidos = [...prevPedidos];
          newPedidos.push(formattedValues);

          return newPedidos;
        });

        setOpen(false);
      })
      .catch((err) => console.error(err));
  }

  return (
    <Drawer
      itemType='pedido'
      mode={mode}
      item={pedido}
      open={open}
      setOpen={setOpen}
      onExtraButtonClick={
        mode === 'info'
          ? goToListaEntregas
          : mode === 'add'
          ? addItem
          : () => console.error('Error')
      }
      extraButtonText={mode === 'info' && 'Entregas'}
    >
      {mode === 'info' ? (
        <PedidosInfoDrawer pedido={pedido} />
      ) : (
        <PedidosAddOrEditDrawer
          editMode={mode === 'edit'}
          pedido={pedido || {}}
          pedidoForm={pedidoForm}
        />
      )}
    </Drawer>
  );
};
