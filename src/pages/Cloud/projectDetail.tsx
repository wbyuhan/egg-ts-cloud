import React, { useState } from 'react';
import { history } from 'umi';
import { Card, Space, Row, Col, List, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

// customComponents
import Pagin from './components/Pagin';
import Info from './components/Info';

interface ListContentProps {
  api: string;
  version: string;
  name: string;
  moduleName: string;
  method: string;
  changeTime: string;
}

const list = [
  {
    api: 'https://coe.99bill.com/coral/business/orgInfo/getTrustbrandInfo',
    version: '1.0',
    name: '产品信息查询',
    moduleName: '模块名称',
    method: 'post',
    changeTime: '2020-09-09 16:15',
  },
];

// 路由跳转

const routh = (apiId: string) => {
  history.push({
    pathname: '/cloud/project-detail/api-detail',
    query: {
      apiId,
    },
  });
};

const ListContent = (data: ListContentProps) => {
  const { api, version, name, moduleName, method, changeTime } = data;

  return (
    <Row>
      <Col>{name}</Col>
      <Col>{api}</Col>
      <Col>{version}</Col>
      <Col>{moduleName}</Col>
      <Col>{method}</Col>
      <Col>{changeTime}</Col>
    </Row>
  );
};

function ProjectDetail() {
  // let [stateName, setStateName] = useState(initialValue);
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
      <Space direction="vertical">
        <Card bordered={false}>
          <Row>
            <Col sm={8} xs={24}>
              <Info title="我的待办" value="8个任务" bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="本周任务平均处理时间" value="32分钟" bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="本周完成任务数" value="24个任务" />
            </Col>
          </Row>
        </Card>
        <Card bordered={false}>
          <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus">
            添加
          </Button>
          <List
            size="large"
            rowKey="id"
            // loading={loading}
            // pagination={paginationProps}
            dataSource={list}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="link" onClick={() => routh('123')}>
                    查看详情
                  </Button>,
                ]}
              >
                <List.Item.Meta description={item.api} />
                <ListContent {...item} />
              </List.Item>
            )}
          />
        </Card>
      </Space>
      <Pagin total={total} onChange={pageOnchange} current={currentPage} />
    </PageContainer>
  );
}

export default ProjectDetail;
