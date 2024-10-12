import { useNavigate } from 'react-router-dom';
import { Drawer } from '../../../components/drawers/Drawer';
import { PedidosAddOrEditDrawer } from './PedidosAddOrEditDrawer';
import { PedidosInfoDrawer } from './PedidosInfoDrawer';
import { useContext, useState } from 'react';
import { DataContext } from '../../../contexts';
import { Form } from 'antd';
import { addPedido, editPedido } from '../../../services/pedidos';

export const PedidosDrawer = ({ mode, pedido, open, setOpen }) => {
  const { setPedidos } = useContext(DataContext);

  const [loadingGuardarCambios, setLoadingGuardarCambios] = useState(false);

  const navigateTo = useNavigate();

  const [pedidoForm] = Form.useForm();

  if (!pedido) {
    return <div>No se encontraron datos del pedido</div>;
  }

  function goToListaEntregas() {
    navigateTo(`lista-de-entregas`, { state: { pedido } });
  }

  function handleAddPedido() {
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

    setLoadingGuardarCambios(true);
    addPedido(formattedValues)
      .then(() => {
        setPedidos((prevPedidos) => {
          const newPedidos = [...prevPedidos];
          newPedidos.push(formattedValues);

          return newPedidos;
        });

        setOpen(false);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingGuardarCambios(false));
  }

  const { detallesPedido } = pedido;

  function handleEditPedido() {
    const values = pedidoForm.getFieldsValue();

    const { detallesPedido: newDetallesPedido } = values;

    const formattedValues = {
      pedido: {
        id: pedido.id,
        fechaRegistro: values.fechaRegistro,
        esRecurrente: values.esRecurrente,
        cantSemanas: values.cantSemanas || null,
        estado: values.estado || 'Pendiente', // TODO 'Pendiente' es temporal
        idCliente: values.cliente
      }
    };

    formattedValues.detallesPedido = newDetallesPedido?.map((detalle) => {
      const newDetalle = {
        idProducto: detalle.producto,
        cantidad: detalle.cantidad
      };

      const originalDetallePedido = detallesPedido.find(
        (d) => d.idProducto == detalle.producto
      );

      if (originalDetallePedido) {
        newDetalle.idDetallePedido = originalDetallePedido.idDetallePedido;
      }

      return newDetalle;
    });

    setLoadingGuardarCambios(true);
    editPedido(formattedValues)
      .then(() => {
        setPedidos((prevPedidos) => {
          const newPedidos = [...prevPedidos];

          const index = newPedidos.findIndex(
            (pedido) => pedido.id == formattedValues.pedido.id
          );

          if (index !== -1) {
            newPedidos[index] = {
              ...formattedValues
            };
          }

          return newPedidos;
        });
        setOpen(false);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingGuardarCambios(false));
  }

  function getOnExtraButtonClick() {
    if (mode === 'info') {
      return goToListaEntregas;
    } else if (mode === 'add') {
      return handleAddPedido;
    } else if (mode === 'edit') {
      return handleEditPedido;
    } else {
      return null;
    }
  }

  return (
    <Drawer
      itemType='pedido'
      mode={mode}
      item={pedido}
      open={open}
      setOpen={setOpen}
      onExtraButtonClick={getOnExtraButtonClick()}
      extraButtonText={mode === 'info' && 'Entregas'}
      loadingCambios={loadingGuardarCambios}
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
