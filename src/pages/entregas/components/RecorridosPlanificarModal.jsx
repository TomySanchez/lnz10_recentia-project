import { DatePicker, Form, Modal, Tag } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../contexts';
import { getItemById } from '../../../utils/getItemById';
import { Table } from '../../../components/tables/Table';
import dayjs from 'dayjs';

export const RecorridosPlanificarModal = ({
  mode,
  recorrido,
  open,
  setOpen
}) => {
  const { entregas } = useContext(DataContext);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [planificadorForm] = Form.useForm();

  useEffect(() => {
    if (open && recorrido && mode === 'edit') {
      planificadorForm.setFieldsValue({
        fecha: dayjs(recorrido.fecha)
      });
      const entregasSeleccionadas = entregasProgramadas.map(
        (entrega) => entrega.id
      );

      setSelectedRowKeys(entregasSeleccionadas);
    }
  }, [planificadorForm, open, recorrido, mode]);

  if (!recorrido) {
    return null;
  }

  const entregasProgramadas = entregas.filter(
    (entrega) => entrega.idRecorrido == recorrido.id
  );

  function getDataSource() {
    const entregasNoProgramadas = entregas.filter(
      (entrega) => entrega.estado === 'Sin programar'
    );

    if (mode === 'add') {
      return entregasNoProgramadas;
    } else {
      let entregasNoProgramadasYSeleccionadas = [];
      entregasNoProgramadasYSeleccionadas.concat(entregasNoProgramadas);
      entregasNoProgramadasYSeleccionadas.concat(entregasProgramadas);

      return [...entregasNoProgramadas, ...entregasProgramadas];
    }
  }

  function getColumns() {
    if (mode === 'add') {
      return [
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
    } else {
      return [
        {
          dataIndex: 'idPedido',
          title: 'Cliente',
          render: (text) => {
            const pedido = getItemById(text, 'pedido');
            const cliente = getItemById(pedido.idCliente, 'cliente');

            return cliente.nombre;
          }
        },
        {
          dataIndex: 'estado',
          title: 'Estado de entrega',
          align: 'center',
          render: (text) => {
            let colorTag;
            switch (text) {
              case 'Pendiente':
                colorTag = 'gold';
                break;
              case 'Cancelada':
                colorTag = 'red';
                break;
              case 'Realizada':
                colorTag = 'green';
                break;
              default:
                colorTag = '';
            }

            return <Tag color={colorTag}>{text}</Tag>;
          }
        }
      ];
    }
  }

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
      <Form
        form={planificadorForm}
        name='planificadorForm'
        layout='vertical'
        requiredMark={false}
        clearOnDestroy
      >
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
          <DatePicker format='DD/MM/YY' />
        </Form.Item>
      </Form>

      <Table
        size='small'
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys
        }}
        columns={getColumns()}
        dataSource={getDataSource()}
        pagination={false}
      />
    </Modal>
  );
};
