import { useNavigate } from 'react-router-dom';
import { Drawer } from '../../../components/drawers/Drawer';
import { PedidosAddOrEditDrawer } from './PedidosAddOrEditDrawer';
import { PedidosInfoDrawer } from './PedidosInfoDrawer';
import { useContext, useState } from 'react';
import { DataContext } from '../../../contexts';
import { Form } from 'antd';
import { addPedido, editPedido } from '../../../services/pedidos';
import { MessageContext } from '../../../contexts/MessageContext';
import dayjs from 'dayjs';
import { ResponsiveContext } from '../../../contexts/ResponsiveContext';

export const PedidosDrawer = ({
  mode,
  pedido,
  open,
  setOpen,
  device = 'computer'
}) => {
  const { setPedidos } = useContext(DataContext);
  const windowWidth = useContext(ResponsiveContext);
  const { messageApi } = useContext(MessageContext);

  const [loadingGuardarCambios, setLoadingGuardarCambios] = useState(false);

  const navigateTo = useNavigate();

  const [pedidoForm] = Form.useForm();

  if (mode !== 'add' && !pedido) {
    return null;
  }

  function goToListaEntregas() {
    navigateTo(`lista-de-entregas`, { state: { pedido } });
  }

  function handleAddPedido() {
    pedidoForm
      .validateFields()
      .then((values) => {
        const { detallesPedido } = values;

        const formattedValues = {
          pedido: {
            fechaRegistro: values.fechaRegistro,
            esRecurrente: values.esRecurrente || false,
            cantSemanas: values.cantSemanas || null,
            estado: values.estado,
            idCliente: values.cliente
          }
        };

        formattedValues.detallesPedido = detallesPedido?.map((detalle) => ({
          idProducto: detalle.producto,
          cantidad: detalle.cantidad
        }));

        setLoadingGuardarCambios(true);
        addPedido(formattedValues)
          .then((res) => {
            setPedidos((prevPedidos) => {
              const newDetallesPedido = detallesPedido?.map(
                (detalle, index) => ({
                  idDetallePedido: res.data.detallesPedidoIds[index],
                  idProducto: detalle.producto,
                  cantidad: detalle.cantidad
                })
              );

              const newPedidos = [
                {
                  id: res.data.pedidoId,
                  fechaRegistro: dayjs(values.fechaRegistro).format('DD/MM/YY'),
                  esRecurrente: values.esRecurrente || false,
                  cantSemanas: values.cantSemanas || null,
                  estado: values.estado,
                  idCliente: values.cliente,
                  activo: 1,
                  detallesPedido: newDetallesPedido || []
                },
                ...prevPedidos
              ];

              return newPedidos;
            });
            messageApi.success('Pedido añadido correctamente');
            setOpen(false);
          })
          .catch((err) => {
            console.error(err);
            messageApi.error('No se pudo añadir el pedido');
          })
          .finally(() => setLoadingGuardarCambios(false));
      })
      .catch((err) => console.error(err));
  }

  const { detallesPedido } = pedido || { detallesPedido: [] };

  function handleEditPedido() {
    pedidoForm
      .validateFields()
      .then((values) => {
        const { detallesPedido: newDetallesPedido } = values;

        const formattedValues = {
          pedido: {
            id: pedido.id,
            fechaRegistro: values.fechaRegistro,
            esRecurrente: values.esRecurrente || false,
            cantSemanas: values.cantSemanas || null,
            estado: values.estado || 'Pendiente',
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
                (p) => p.id == formattedValues.pedido.id
              );

              if (index !== -1) {
                const updatedDetallesPedido = newDetallesPedido?.map(
                  (detalle) => ({
                    idDetallePedido: detallesPedido.find(
                      (d) => d.idProducto == detalle.producto
                    )?.idDetallePedido,
                    idProducto: detalle.producto,
                    cantidad: detalle.cantidad
                  })
                );

                newPedidos[index] = {
                  ...newPedidos[index],
                  id: pedido.id,
                  fechaRegistro: dayjs(values.fechaRegistro).format('DD/MM/YY'),
                  esRecurrente: values.esRecurrente || false,
                  cantSemanas: values.cantSemanas || null,
                  estado: values.estado,
                  idCliente: values.cliente,
                  activo: 1,
                  detallesPedido: updatedDetallesPedido || []
                };
              }

              return newPedidos;
            });
            messageApi.success('Pedido editado correctamente');
            setOpen(false);
          })
          .catch((err) => {
            console.error(err);
            messageApi.error('No se pudo editar el pedido');
          })
          .finally(() => setLoadingGuardarCambios(false));
      })
      .catch((err) => console.error(err));
  }

  function getOnExtraButtonClick() {
    if (mode === 'info' && device === 'computer') {
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
      width={device === 'mobile' && windowWidth}
      itemType='pedido'
      mode={mode}
      item={pedido}
      open={open}
      setOpen={setOpen}
      onExtraButtonClick={getOnExtraButtonClick()}
      extraButtonText={mode === 'info' && device === 'computer' && 'Entregas'}
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
