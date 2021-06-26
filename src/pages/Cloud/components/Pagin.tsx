import React from 'react';
import { Card, Pagination } from 'antd';

interface PaginProps {
  pageSize?: number;
  current?: number;
  defaultCurrent?: number;
  total: number;
  onChange: (pageNo: number) => void;
}
/**
 *
 * @param  defaultCurrent
 * @param  defaultPageSize
 * @param  hideOnSinglePage
 * @param  pageSize
 * @param  pageSizeOptions
 * @param  showQuickJumper
 * @param  size
 * @param  total
 * @returns
 */

function Pagin(props: PaginProps) {
  console.log('%c 🥓 props: ', 'font-size:20px;background-color: #465975;color:#fff;', props);
  const { onChange, defaultCurrent = 1, current = 1, pageSize = 10, total = 10 } = props;
  return (
    <Card>
      <Pagination
        style={{ textAlign: 'center' }}
        onChange={onChange}
        defaultCurrent={defaultCurrent}
        pageSize={pageSize}
        current={current}
        total={total}
      />
    </Card>
  );
}

export default Pagin;
