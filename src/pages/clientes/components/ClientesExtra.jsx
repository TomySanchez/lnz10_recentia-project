import { Segmented } from 'antd';
import { AddButton } from '../../../components/buttons/AddButton';

export const ClientesExtra = ({
  handleAdd,
  selectedClientesType,
  setSelectedClientesType
}) => {
  return (
    <div className='ClientesExtra'>
      <Segmented
        // size='large'
        options={['Activos', 'Archivados']}
        value={selectedClientesType}
        onChange={(value) => setSelectedClientesType(value)}
      />
      <AddButton element='cliente' onAdd={handleAdd} />
    </div>
  );
};
