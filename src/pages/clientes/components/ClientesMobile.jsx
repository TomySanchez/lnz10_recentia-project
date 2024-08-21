import { Button, Card, Input, Tooltip } from 'antd';
import { useContext, useState } from 'react';
import { DataContext } from '../../../contexts';
import { formatDireccion } from '../../../utils/formatDireccion';
import {
  AiOutlineEdit,
  AiOutlineFileSearch,
  AiOutlinePlus
} from 'react-icons/ai';

export const ClientesMobile = ({ onInfo, onEdit }) => {
  const { clientes } = useContext(DataContext);

  const [searchTerm, setSearchTerm] = useState('');

  function handleAdd() {
    console.log('add');
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
          <AiOutlinePlus size={20} />
        </Button>
      </div>

      {filteredClientes.map((cliente, index) => (
        <Card key={index} className='mobile-card'>
          <div>
            <h4>{cliente.nombre}</h4>
            <p>{formatDireccion(cliente.direccion)}</p>
          </div>

          <div className='mobile-buttons-container'>
            <Tooltip title='Más información'>
              <span className='pointer'>
                <AiOutlineFileSearch
                  size={24}
                  onClick={() => onInfo(cliente, 'mobile')}
                />
              </span>
            </Tooltip>

            <Tooltip title='Editar'>
              <span className='pointer'>
                <AiOutlineEdit
                  size={24}
                  onClick={() => onEdit(cliente, 'mobile')}
                />
              </span>
            </Tooltip>
          </div>
        </Card>
      ))}
    </div>
  );
};
