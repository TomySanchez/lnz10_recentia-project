import { useContext, useState } from 'react';
import { disableCliente, unarchiveCliente } from '../../services/clientes';
import { Accion } from './Accion';
import { Popconfirm, Tooltip } from 'antd';
import { MessageContext } from '../../contexts/MessageContext';
import { DataContext } from '../../contexts';
import { disablePedido } from '../../services/pedidos';
import { MdOutlineUnarchive } from 'react-icons/md';

export const Acciones = ({ entityType, item, onInfo, onEdit, isArchived }) => {
  const { setActiveClientes, setInactiveClientes, setPedidos } =
    useContext(DataContext);
  const { messageApi } = useContext(MessageContext);

  const [loadingEliminar, setLoadingEliminar] = useState(false);
  const [loadingDesarchivar, setLoadingDesarchivar] = useState(false);

  function handleDelete() {
    setLoadingEliminar(true);
    switch (entityType) {
      case 'cliente':
        disableCliente(item)
          .then(() => {
            setActiveClientes((prevClientes) => {
              const newClientes = prevClientes.filter(
                (cliente) => cliente.id !== item.id
              );

              return newClientes;
            });

            setInactiveClientes((prevClientes) => {
              return [...prevClientes, item];
            });

            messageApi.success('Cliente eliminado correctamente');
          })
          .catch((err) => {
            console.error(err);
            messageApi.error('No se pudo eliminar el cliente');
          })
          .finally(() => setLoadingEliminar(false));
        break;
      case 'pedido':
        disablePedido(item)
          .then(() => {
            setPedidos((prevPedidos) => {
              const newPedidos = prevPedidos.filter(
                (pedido) => pedido.id !== item.id
              );

              return newPedidos;
            });

            messageApi.success('Pedido eliminado correctamente');
          })
          .catch((err) => {
            console.error(err);
            messageApi.error('No se pudo eliminar el pedido');
          })
          .finally(() => setLoadingEliminar(false));
        break;
      default:
        console.error(
          'ERROR: entityType no es válido para eliminar el elemento'
        );
    }
  }

  function handleUnarchive() {
    setLoadingDesarchivar(true);
    unarchiveCliente(item)
      .then(() => {
        setActiveClientes((prevClientes) => {
          return [...prevClientes, item];
        });

        setInactiveClientes((prevClientes) => {
          const newClientes = prevClientes.filter(
            (cliente) => cliente.id !== item.id
          );

          return newClientes;
        });

        messageApi.success('Cliente desarchivado correctamente');
      })
      .catch((err) => {
        console.error(err);
        messageApi.error('No se pudo desarchivar el cliente');
      })
      .finally(() => setLoadingDesarchivar(false));
  }

  return (
    <div className='Acciones'>
      <Accion type='info' onClick={() => onInfo(item)} />
      <Accion type='edit' onClick={() => onEdit(item)} />
      {entityType === 'recorrido' && <Accion type='cancel' />}
      {(entityType === 'entrega' ||
        entityType === 'pedido' ||
        entityType === 'producto' ||
        (entityType === 'cliente' && !isArchived)) && (
        <Popconfirm
          title={`¿Eliminar ${entityType}?`}
          okText='Eliminar'
          onConfirm={handleDelete}
          okButtonProps={{
            loading: loadingEliminar
          }}
        >
          <Accion type='delete' />
        </Popconfirm>
      )}
      {isArchived && (
        <Popconfirm
          title={`Desarchivar ${entityType}?`}
          okText='Desarchivar'
          onConfirm={handleUnarchive}
          okButtonProps={{
            loading: loadingDesarchivar
          }}
        >
          <Tooltip title='Desarchivar'>
            <span className='Accion'>
              <MdOutlineUnarchive size={18} />
            </span>
          </Tooltip>
        </Popconfirm>
      )}
    </div>
  );
};
