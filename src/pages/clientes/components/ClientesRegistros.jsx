import { useState } from 'react';
import { MdOutlinePerson } from 'react-icons/md';
import { MainContent } from '../../../layouts/MainContent';
import { useLocation } from 'react-router-dom';
import { ClientesChangeRegistro } from './ClientesChangeRegistro';
import { RegistrosPagos } from './registros/RegistrosPagos';
import { RegistrosPedidos } from './registros/RegistrosPedidos';
import { RegistrosEntregas } from './registros/RegistrosEntregas';

export const ClientesRegistros = () => {
  const location = useLocation();
  const cliente = location.state?.cliente;

  const [selectedRegistros, setSelectedRegistros] = useState('Pedidos');

  if (!cliente) {
    return <div>No se encontraron datos del cliente</div>;
  }

  return (
    <MainContent
      title={`Registros de ${cliente.nombre}`}
      icon={<MdOutlinePerson size={40} />}
      extra={
        <ClientesChangeRegistro
          selectedRegistros={selectedRegistros}
          setSelectedRegistros={setSelectedRegistros}
        />
      }
    >
      {selectedRegistros === 'Pedidos' ? (
        <RegistrosPedidos cliente={cliente} />
      ) : selectedRegistros === 'Entregas' ? (
        <RegistrosEntregas cliente={cliente} />
      ) : (
        <RegistrosPagos cliente={cliente} />
      )}
    </MainContent>
  );
};
