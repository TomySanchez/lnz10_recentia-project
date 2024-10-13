import { useContext, useState } from 'react';
import { disableCliente } from '../../services/clientes';
import { Accion } from './Accion';
import { Popconfirm } from 'antd';
import { MessageContext } from '../../contexts/MessageContext';
import { DataContext } from '../../contexts';

export const Acciones = ({ entityType, item, onInfo, onEdit }) => {
  const { setClientes } = useContext(DataContext);
  const { messageApi } = useContext(MessageContext);

  const [loadingEliminar, setLoadingEliminar] = useState(false);

  function handleDelete() {
    setLoadingEliminar(true);
    switch (entityType) {
      case 'cliente':
        disableCliente(item)
          .then(() => {
            setClientes((prevClientes) => {
              const newClientes = prevClientes.filter(
                (cliente) => cliente.id !== item.id
              );

              return newClientes;
            });

            messageApi.success('Cliente eliminado correctamente');
          })
          .catch((err) => {
            console.error(err);
            messageApi.error('No se pudo eliminar el cliente');
          })
          .finally(() => setLoadingEliminar(false));
        break;
      default:
        console.error(
          'ERROR: entityType no es válido para eliminar el elemento'
        );
    }
  }

  return (
    <div className='Acciones'>
      <Accion type='info' onClick={() => onInfo(item)} />
      <Accion type='edit' onClick={() => onEdit(item)} />
      {entityType === 'recorrido' && <Accion type='cancel' />}
      {(entityType === 'entrega' ||
        entityType === 'pedido' ||
        entityType === 'producto' ||
        entityType === 'cliente') && (
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
    </div>
  );
};
