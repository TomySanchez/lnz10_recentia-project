import { Segmented } from 'antd';

export const ClientesChangeRegistro = ({
  selectedRegistros,
  setSelectedRegistros
}) => {
  return (
    <Segmented
      size='large'
      options={['Pedidos', 'Entregas']}
      value={selectedRegistros}
      onChange={(value) => setSelectedRegistros(value)}
    />
  );
};
