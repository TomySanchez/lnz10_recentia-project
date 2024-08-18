import { Table as TableAntd } from 'antd';

export const Table = ({
  size,
  columns,
  dataSource,
  expandable,
  pagination
}) => {
  return (
    <TableAntd
      rowKey='id'
      size={size}
      columns={columns}
      dataSource={dataSource}
      expandable={expandable}
      pagination={pagination}
    />
  );
};
