import { useContext } from 'react';
import { Table } from '../../../../components/tables/Table';
import { DataContext } from '../../../../contexts';

export const RegistrosPagos = ({ cliente }) => {
  const { pagos } = useContext(DataContext);

  return <Table columns={pagosColumns} dataSource={filteredPagos} />;
};
