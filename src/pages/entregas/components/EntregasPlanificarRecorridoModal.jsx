import { Modal } from 'antd';

export const EntregasPlanificarRecorridoModal = ({ open, setOpen }) => {
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
      destroyOnClose
    ></Modal>
  );
};
