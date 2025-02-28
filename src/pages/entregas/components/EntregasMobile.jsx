import { Button } from 'antd';
import { useContext, useState } from 'react';
import { DataContext } from '../../../contexts';
import { getItemById } from '../../../utils/getItemById';
import { Table } from '../../../components/tables/Table';
import { Acciones } from '../../../components/tables/Acciones';

export const EntregasMobile = () => {
  const { clientes, entregas, pedidos, recorridos } = useContext(DataContext);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const recorridoActual = recorridos[7];

  const entregasActuales = entregas?.filter(
    (e) => e.idRecorrido == recorridoActual.id
  );

  const datosEntrega = entregasActuales.map((entrega) => {
    const pedido = getItemById(entrega.idPedido, pedidos);
    const cliente = getItemById(pedido.idCliente, clientes);

    return {
      nombreCliente: cliente.nombre
    };
  });

  const entregasColumns = [
    {
      dataIndex: 'nombreCliente',
      title: 'Nombre'
    },
    {
      dataIndex: '',
      title: '',
      render: () => <Acciones entityType='entrega' />
    }
  ];

  return (
    <div className='EntregasMobile'>
      <div className='entregas-mobile-title'>
        <h3>Recorrido de hoy</h3>
        <h3>({recorridoActual.fecha})</h3>
      </div>

      {/* <Button className='entregas-mobile-button' size='large' type='primary'>
        Iniciar recorrido
      </Button> */}

      {/* {datosEntrega.map((entrega, index) => (
        <Checkbox key={index}>{entrega.nombreCliente}</Checkbox>
      ))} */}

      <Table
        className='entregas-mobile-table'
        // size='small'
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys
        }}
        columns={entregasColumns}
        dataSource={datosEntrega}
        pagination={false}
      />

      <Button className='entregas-mobile-button' size='large' type='primary'>
        Finalizar recorrido
      </Button>
    </div>
  );
};
