import { Table as TableAntd } from 'antd';

export const Table = ({
  size,
  columns,
  dataSource,
  expandable,
  rowSelection,
  pagination
}) => {
  return (
    <TableAntd
      rowKey='id'
      size={size}
      columns={columns}
      dataSource={dataSource}
      expandable={expandable}
      rowSelection={rowSelection}
      pagination={pagination}
    />
  );
};
