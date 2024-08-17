import { Table as TableAntd } from 'antd';

export const Table = ({ columns, dataSource }) => {
  return <TableAntd rowKey='id' columns={columns} dataSource={dataSource} />;
};
