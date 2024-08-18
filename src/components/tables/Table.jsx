import { Table as TableAntd } from 'antd';

export const Table = ({
  className,
  size,
  columns,
  dataSource,
  expandable,
  rowSelection,
  pagination
}) => {
  return (
    <TableAntd
      className={className}
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
