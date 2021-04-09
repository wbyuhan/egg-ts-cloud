import React, { useState } from 'react';
import { Card, Space, Row, Col, Button, Descriptions } from 'antd';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import Pagin from './components/Pagin';

const list = ['a', 'b', 'c', 'd'];

// 路由跳转
const routh = (projectId: string) => {
  history.push({
    pathname: '/cloud/project-detail',
    query: {
      projectId,
    },
  });
};

function Cloud() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const total = 200;

  /**
   * @param pageNo
   */

  const pageOnchange = (pageNo: number) => {
    console.log('%c 🍥 pageNo: ', 'font-size:20px;background-color: #EA7E5C;color:#fff;', pageNo);
    setCurrentPage(pageNo);
  };

  return (
    <PageContainer>
      <Space direction="vertical" style={{ width: '100%' }}>
        {list.map((item) => (
          <Card key={item}>
            <Row justify="center">
              <Col span={20}>
                <Descriptions title="项目简介">
                  <Descriptions.Item label="项目名称">云医生{item}</Descriptions.Item>
                  <Descriptions.Item label="项目域名">手机号</Descriptions.Item>
                  <Descriptions.Item label="接口数量">接口数量</Descriptions.Item>
                  <Descriptions.Item label="开发人员">参与人员</Descriptions.Item>
                </Descriptions>
              </Col>
              <Col span={4} flex="0 1 300px" style={{ display: 'flex', alignItems: 'center' }}>
                <Button type="link" onClick={() => routh(item)}>
                  查看详情
                </Button>
              </Col>
            </Row>
          </Card>
        ))}
      </Space>
      <Pagin total={total} onChange={pageOnchange} current={currentPage} />
    </PageContainer>
  );
}

export default Cloud;
