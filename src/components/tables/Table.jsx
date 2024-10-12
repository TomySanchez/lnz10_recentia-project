import { LoadingOutlined } from '@ant-design/icons';
import { Table as TableAntd } from 'antd';

export const Table = ({
  className,
  size,
  columns,
  dataSource,
  expandable,
  rowSelection,
  pagination,
  loading
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
      loading={
        loading
          ? {
              indicator: <LoadingOutlined style={{ fontSize: 48 }} spin />
            }
          : false
      }
    />
  );
};
