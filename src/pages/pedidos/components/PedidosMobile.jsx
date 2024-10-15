import { Button, Card, Input, Tooltip } from 'antd';
import { useContext, useState } from 'react';
import { DataContext } from '../../../contexts';
import {
  AiOutlineEdit,
  AiOutlineFileSearch,
  AiOutlinePlus
} from 'react-icons/ai';
import { getItemById } from '../../../utils/getItemById';
import dayjs from 'dayjs';

export const PedidosMobile = ({ onAdd, onInfo, onEdit }) => {
  const { clientes, pedidos } = useContext(DataContext);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPedidos = pedidos
    .filter((pedido) => {
      const cliente = getItemById(pedido.idCliente, clientes);
      const nombreCliente = cliente?.nombre?.toLowerCase() || '';
      const fechaRegistro = pedido.fechaRegistro.toLowerCase();
      const search = searchTerm.toLowerCase();

      return nombreCliente.includes(search) || fechaRegistro.includes(search);
    })
    .sort((a, b) => dayjs(b.fechaRegistro) - dayjs(a.fechaRegistro));

  return (
    <div>
      <div className='mobile-input-container'>
        <Input.Search
          placeholder='Buscar cliente o fecha'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type='primary' onClick={() => onAdd('mobile')}>
          <AiOutlinePlus size={20} />
        </Button>
      </div>

      {filteredPedidos.map((pedido, index) => (
        <Card key={index} className='mobile-card '>
          <div className='mobile-info-container'>
            <h4>{pedido.fechaRegistro}</h4>
            <p>{getItemById(pedido.idCliente, clientes).nombre}</p>
          </div>

          <div className='mobile-footer'>
            {/* {pedido.esRecurrente && (
              <Tag color={pedido.esRecurrente && 'gold'}>
                {pedido.esRecurrente && 'Recurrente'}
              </Tag>
            )} */}

            <div className='mobile-buttons-container'>
              <Tooltip title='Más información'>
                <span className='pointer'>
                  <AiOutlineFileSearch
                    size={24}
                    onClick={() => onInfo(pedido, 'mobile')}
                  />
                </span>
              </Tooltip>

              <Tooltip title='Editar'>
                <span className='pointer'>
                  <AiOutlineEdit
                    size={24}
                    onClick={() => onEdit(pedido, 'mobile')}
                  />
                </span>
              </Tooltip>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
