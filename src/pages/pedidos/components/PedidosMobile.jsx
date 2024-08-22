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

export const PedidosMobile = () => {
  const { pedidos } = useContext(DataContext);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPedidos = pedidos
    .filter((pedido) => {
      const cliente = getItemById(pedido.idCliente, 'cliente');
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
          placeholder='Buscar cliente o fecha de registro'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type='primary'>
          <AiOutlinePlus size={20} />
        </Button>
      </div>

      {filteredPedidos.map((pedido, index) => (
        <Card key={index} className='mobile-card pedidos-mobile-card'>
          <div>
            <h4>{pedido.fechaRegistro}</h4>
            <p>{getItemById(pedido.idCliente, 'cliente').nombre}</p>
          </div>

          <div className='pedidos-mobile-footer'>
            {/* {pedido.esRecurrente && (
              <Tag color={pedido.esRecurrente && 'gold'}>
                {pedido.esRecurrente && 'Recurrente'}
              </Tag>
            )} */}

            <div className='pedidos-mobile-buttons-container'>
              <Tooltip title='Más información'>
                <span className='pointer'>
                  <AiOutlineFileSearch size={24} />
                </span>
              </Tooltip>

              <Tooltip title='Editar'>
                <span className='pointer'>
                  <AiOutlineEdit size={24} />
                </span>
              </Tooltip>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
