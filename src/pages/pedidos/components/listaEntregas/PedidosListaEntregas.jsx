import { MdOutlineLocalShipping } from 'react-icons/md';
import { MainContent } from '../../../../layouts/MainContent';
import { getItemById } from '../../../../utils/getItemById';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ListaEntregasTable } from './ListaEntregasTable';
import { useContext } from 'react';
import { DataContext } from '../../../../contexts';

export const PedidosListaEntregas = () => {
  const { clientes } = useContext(DataContext);

  const navigateTo = useNavigate();
  const location = useLocation();
  const pedido = location.state?.pedido;

  if (!pedido) {
    return null;
  }

  return (
    <MainContent
      title={'Lista de entregas'}
      icon={<MdOutlineLocalShipping size={40} />}
      extra={
        <Button
          className='clientes-registros-volver-button'
          // size='large'
          // type='primary'
          onClick={() => navigateTo('/pedidos')}
        >
          Volver
        </Button>
      }
      isWip
    >
      <h3 className='recorridos-title'>
        Pedido de {getItemById(pedido.idCliente, clientes).nombre} -{' '}
        {pedido.fechaRegistro}
      </h3>

      <ListaEntregasTable pedido={pedido} />
    </MainContent>
  );
};
