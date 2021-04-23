import React, { useState } from 'react';
import { history } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
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
  apiId?: string | number;
}

const list = [
  {
    api: 'https://coe.99bill.com/coral/business/orgInfo/getTrustbrandInfo',
    version: '1.0',
    name: '产品信息查询',
    moduleName: '模块名称',
    method: 'post',
    changeTime: '2020-09-09 16:15',
    apiId: 2,
  },
  {
    api: 'https://coe.99bill.com/coral/business/orgInfo/getTrustbrandInfo',
    version: '1.0',
    name: '产品信息查询',
    moduleName: '模块名称',
    method: 'post',
    changeTime: '2020-09-09 16:15',
    apiId: 2,
  },
  {
    api: 'https://coe.99bill.com/coral/business/orgInfo/getTrustbrandInfo',
    version: '1.0',
    name: '产品信息查询',
    moduleName: '模块名称',
    method: 'post',
    changeTime: '2020-09-09 16:15',
    apiId: 4,
  },
  {
    api: 'https://coe.99bill.com/coral/business/orgInfo/getTrustbrandInfo',
    version: '1.0',
    name: '产品信息查询',
    moduleName: '模块名称',
    method: 'post',
    changeTime: '2020-09-09 16:15',
    apiId: 5,
  },
  {
    api: 'https://coe.99bill.com/coral/business/orgInfo/getTrustbrandInfo',
    version: '1.0',
    name: '产品信息查询',
    moduleName: '模块名称',
    method: 'post',
    changeTime: '2020-09-09 16:15',
    apiId: 6,
  },
  {
    api: 'https://coe.99bill.com/coral/business/orgInfo/getTrustbrandInfo',
    version: '1.0',
    name: '产品信息查询',
    moduleName: '模块名称',
    method: 'post',
    changeTime: '2020-09-09 16:15',
    apiId: 7,
  },
  {
    api: 'https://coe.99bill.com/coral/business/orgInfo/getTrustbrandInfo',
    version: '1.0',
    name: '产品信息查询',
    moduleName: '模块名称',
    method: 'post',
    changeTime: '2020-09-09 16:15',
    apiId: 7,
  },
  {
    api: 'https://coe.99bill.com/coral/business/orgInfo/getTrustbrandInfo',
    version: '1.0',
    name: '产品信息查询',
    moduleName: '模块名称',
    method: 'post',
    changeTime: '2020-09-09 16:15',
    apiId: 8,
  },
  {
    api: 'https://coe.99bill.com/coral/business/orgInfo/getTrustbrandInfo',
    version: '1.0',
    name: '产品信息查询',
    moduleName: '模块名称',
    method: 'post',
    changeTime: '2020-09-09 16:15',
    apiId: 9,
  },
];
const title = [
  {
    api: '接口地址',
    version: '版本',
    name: '接口名称',
    moduleName: '模块名称',
    method: '请求方法',
    changeTime: '修改时间',
  },
];

const colRest = {
  sm: 4,
  xs: 24,
};

// 路由跳转

const routh = (apiId: string | number | any) => {
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
    <Row style={{ flex: 1 }} align="middle">
      <Col {...colRest} sm={2}>
        {name}
      </Col>
      <Col {...colRest} sm={13}>
        {api}
      </Col>
      <Col {...colRest} sm={1}>
        {version}
      </Col>
      <Col {...colRest} sm={2}>
        {moduleName}
      </Col>
      <Col {...colRest} sm={2}>
        {method}
      </Col>
      <Col {...colRest} sm={4}>
        {changeTime}
      </Col>
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
    setCurrentPage(pageNo);
  };
  return (
    <PageContainer>
      <Space direction="vertical" style={{ width: '100%' }}>
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
        <Card bordered={false} style={{ marginTop: '24px' }}>
          <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon={<PlusOutlined />}>
            添加
          </Button>
          <List
            size="large"
            rowKey="id"
            // loading={loading}
            // pagination={paginationProps}
            dataSource={title}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="link" style={{ color: '#000000' }}>
                    操作 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Button>,
                ]}
              >
                <ListContent {...item} />
              </List.Item>
            )}
          />
          <List
            size="large"
            rowKey="id"
            // loading={loading}
            // pagination={paginationProps}
            dataSource={list}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="link" onClick={() => routh(item.apiId)}>
                    查看详情
                  </Button>,
                ]}
              >
                {/* <List.Item.Meta description={item.name} /> */}
                <ListContent {...item} />
              </List.Item>
            )}
          />
        </Card>
      </Space>
      <br />
      <br />
      <br />
      <Pagin total={total} onChange={pageOnchange} current={currentPage} />
    </PageContainer>
  );
}

export default ProjectDetail;
