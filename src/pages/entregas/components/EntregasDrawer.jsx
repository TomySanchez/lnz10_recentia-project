import { Descriptions, Drawer, Form, List, Tag, Tooltip } from 'antd';
import { ButtonSave } from '../../../components/buttons';
import { getEntregas } from '../../../utils';

export const EntregasDrawer = ({
  open,
  setOpen,
  item,
  mode = 'viewEntrega'
}) => {
  const [itemForm] = Form.useForm();

  const entregas = getEntregas(item.id);

  function handleFinish(values) {
    console.log('Formulario enviado', values);
    setOpen(false);
  }

  function handleClose() {
    setOpen(false);
  }

  function getTitle() {
    switch (mode) {
      case 'editRecorrido':
        return 'Editar recorrido';
      case 'viewRecorrido':
        return 'Información de recorrido';
      case 'editEntrega':
        return 'Editar entrega';
      case 'viewEntrega':
        return 'Información de entrega';
      default:
        return '';
    }
  }

  const isViewMode = mode === 'viewRecorrido' || mode === 'viewEntrega';

  return (
    <Drawer
      title={getTitle()}
      open={open}
      onClose={handleClose}
      destroyOnClose
      extra={
        !isViewMode ? (
          <ButtonSave form={itemForm} />
        ) : (
          <Tag
            color={
              item.estado === 'Realizado' || item.estado === 'Realizada'
                ? 'green'
                : 'gold'
            }
          >
            {item.estado}
          </Tag>
        )
      }
    >
      {isViewMode ? <ItemInfo item={item} entregas={entregas} /> : <></>}
    </Drawer>
  );
};

const ItemInfo = ({ recorrido, entregas }) => {
  if (!recorrido) return null;

  const recorridoItems = [{ label: 'Fecha', children: recorrido.fecha }];

  return (
    <div>
      <Descriptions column={1} items={recorridoItems} />
      <EntregasList entregas={entregas} />
    </div>
  );
};

const EntregasList = ({ entregas }) => {
  const componentsEntregas = entregas.map((entrega) => (
    <EntregaItem key={entrega.id} entrega={entrega} />
  ));

  return (
    <>
      {entregas.length > 0 && (
        <List
          className='pedidos-info-detalles-list'
          header={
            <span className='pedidos-info-detalles-list-title'>Entregas</span>
          }
          dataSource={componentsEntregas}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      )}
    </>
  );
};

const EntregaItem = ({ entrega }) => {
  return (
    <div className='DetallesDePedido'>
      <Tooltip title=''>
        <span></span>
      </Tooltip>
      <span className='barra-vertical'>|</span>
      <Tooltip title=''>
        <span></span>
      </Tooltip>
      <span className='barra-vertical'>|</span>
      <Tooltip title='Precio por unidad'>
        <span></span>
      </Tooltip>
      <span className='barra-vertical'>|</span>
      <Tooltip title=''>
        <span></span>
      </Tooltip>
    </div>
  );
};
