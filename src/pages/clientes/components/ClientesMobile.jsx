import { Button, Card, Input, Tooltip } from 'antd';
import { useContext, useState } from 'react';
import { DataContext } from '../../../contexts';
import { formatDireccion } from '../../../utils/formatDireccion';
import { AiOutlineEdit, AiOutlineFileSearch } from 'react-icons/ai';

export const ClientesMobile = () => {
  const { clientes } = useContext(DataContext);

  const [searchTerm, setSearchTerm] = useState('');

  function handleAdd() {
    console.log('add');
  }

  function handleInfo() {
    console.log('info');
  }

  function handleEdit() {
    console.log('edit');
  }

  const filteredClientes = clientes.filter((cliente) => {
    const nombreMatch = cliente.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const direccionMatch = formatDireccion(cliente.direccion)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return nombreMatch || direccionMatch;
  });

  return (
    <div>
      <div className='mobile-input-container'>
        <Input.Search
          placeholder='Buscar cliente o dirección'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type='primary' onClick={handleAdd}>
          +
        </Button>
      </div>

      {filteredClientes.map((cliente, index) => (
        <Card key={index} className='mobile-card'>
          <h4>{cliente.nombre}</h4>
          <p>{formatDireccion(cliente.direccion)}</p>

          <div className='mobile-buttons-container'>
            <Tooltip title='Más información'>
              <span className='pointer'>
                <AiOutlineFileSearch size={24} onClick={handleInfo} />
              </span>
            </Tooltip>

            <Tooltip title='Editar'>
              <span className='pointer'>
                <AiOutlineEdit size={24} onClick={handleEdit} />
              </span>
            </Tooltip>
          </div>
        </Card>
      ))}
    </div>
  );
};
