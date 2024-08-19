import { Segmented } from 'antd';

export const ClientesChangeRegistro = ({
  selectedRegistros,
  setSelectedRegistros
}) => {
  return (
    <Segmented
      size='large'
      options={['Pedidos', 'Entregas', 'Pagos']}
      value={selectedRegistros}
      onChange={(value) => setSelectedRegistros(value)}
    />
  );
};
