import { useState } from 'react';
import { MdOutlinePerson } from 'react-icons/md';
import { MainContent } from '../../../../layouts/MainContent';
import { useLocation, useNavigate } from 'react-router-dom';
import { ClientesChangeRegistro } from './ClientesChangeRegistro';
import { RegistrosPedidos } from './RegistrosPedidos';
import { RegistrosEntregas } from './RegistrosEntregas';
import { Button } from 'antd';
import { PedidosDrawer } from '../../../pedidos/components/PedidosDrawer';

export const ClientesRegistros = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const cliente = location.state?.cliente;

  const [selectedRegistros, setSelectedRegistros] = useState('Pedidos');

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [drawerMode, setDrawerMode] = useState('info');

  if (!cliente) {
    return null;
  }

  function handleInfo(pedido) {
    setOpenDrawer(true);
    setSelectedPedido(pedido);
    setDrawerMode('info');
  }

  function handleEdit(pedido) {
    setOpenDrawer(true);
    setSelectedPedido(pedido);
    setDrawerMode('edit');
  }

  return (
    <MainContent
      title={`Registros de ${cliente.nombre}`}
      icon={<MdOutlinePerson size={40} />}
      extra={
        <div className='clientes-registros-extra-container'>
          <ClientesChangeRegistro
            selectedRegistros={selectedRegistros}
            setSelectedRegistros={setSelectedRegistros}
          />

          <Button
            className='clientes-registros-volver-button'
            // size='large'
            // type='primary'
            onClick={() => navigateTo('/clientes')}
          >
            Volver
          </Button>
        </div>
      }
    >
      {selectedRegistros === 'Pedidos' ? (
        <RegistrosPedidos
          cliente={cliente}
          onInfo={handleInfo}
          onEdit={handleEdit}
        />
      ) : (
        <RegistrosEntregas cliente={cliente} />
      )}

      <PedidosDrawer
        mode={drawerMode}
        pedido={selectedPedido}
        open={openDrawer}
        setOpen={setOpenDrawer}
      />
    </MainContent>
  );
};
