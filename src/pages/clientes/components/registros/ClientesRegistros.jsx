import { useState } from 'react';
import { MdOutlinePerson } from 'react-icons/md';
import { MainContent } from '../../../../layouts/MainContent';
import { useLocation, useNavigate } from 'react-router-dom';
import { ClientesChangeRegistro } from './ClientesChangeRegistro';
import { RegistrosPedidos } from './RegistrosPedidos';
import { RegistrosEntregas } from './RegistrosEntregas';
import { Button } from 'antd';

export const ClientesRegistros = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const cliente = location.state?.cliente;

  const [selectedRegistros, setSelectedRegistros] = useState('Pedidos');

  if (!cliente) {
    return null;
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
        <RegistrosPedidos cliente={cliente} />
      ) : (
        <RegistrosEntregas cliente={cliente} />
      )}
    </MainContent>
  );
};
