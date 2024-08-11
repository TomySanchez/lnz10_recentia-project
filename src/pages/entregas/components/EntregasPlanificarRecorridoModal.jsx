import { useContext, useState } from 'react';
import { DatePicker, Form, Modal, Table } from 'antd';
import { DataContext } from '../../../contexts';
import { getItemById } from '../../../utils';

export const EntregasPlanificarRecorridoModal = ({ open, setOpen }) => {
  const { entregas } = useContext(DataContext);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [planificadorForm] = Form.useForm();

  const entregasNoProgramadas = entregas.filter(
    (entrega) => entrega.estado === 'Sin programar'
  );

  const entregasNoProgramadasColumns = [
    {
      dataIndex: 'idPedido',
      title: 'Cliente',
      render: (text) => {
        const pedido = getItemById(text, 'pedido');
        const cliente = getItemById(pedido.idCliente, 'cliente');

        return cliente.nombre;
      }
    }
  ];

  function handleOk() {
    setOpen(false);
  }

  function handleCancel() {
    setOpen(false);
  }

  return (
    <Modal
      title='Planificar recorrido'
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Crear recorrido'
      destroyOnClose
    >
      <Form form={planificadorForm} name='planificadorForm' layout='vertical'>
        <Form.Item
          name='fecha'
          label='Fecha del recorrido'
          rules={[
            {
              required: true,
              message: 'Fecha requerida'
            }
          ]}
        >
          <DatePicker />
        </Form.Item>
      </Form>

      <Table
        rowKey='id'
        size='small'
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys
        }}
        columns={entregasNoProgramadasColumns}
        dataSource={entregasNoProgramadas}
        pagination={false}
      />
    </Modal>
  );
};
