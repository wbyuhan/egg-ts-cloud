import React, { useEffect, useState } from 'react';
import { Card, Input, Select, Button, Tabs, Collapse } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import Params from './components/params';
import Headers from './components/headers';
import styles from './api.less';

const { Option } = Select;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const methods = ['POST', 'GET', 'PUT', 'DELECT', 'PATCH'];

const ApiDetail: React.FC = () => {
  const { begin, open, close } = styles;
  const [urlValue, setUrlValue] = useState('');
  const [headers, setHeaders] = useState<number>(8);
  console.log(
    '%c 🍤 setHeaders: ',
    'font-size:20px;background-color: #3F7CFF;color:#fff;',
    setHeaders,
  );
  const [activeKey, setActiveKey] = useState<string[]>([]);
  const [openStatus, setOpenStatus] = useState<string>('default');
  const [style, setStyle] = useState<string>(begin);
  // 选择请求方法
  const changeMethods = (val: string) => {
    console.log('%c 🥛 val: ', 'font-size:20px;background-color: #465975;color:#fff;', val);
  };
  useEffect(() => {
    console.log(
      '%c 🥗 urlValue: ',
      'font-size:20px;background-color: #2EAFB0;color:#fff;',
      urlValue,
    );
    return () => {};
  }, [urlValue]);

  // 切换面板
  const changeTab = (tab: string) => {
    console.log('%c 🌰 tab: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', tab);
  };
  // 切换手风琴
  const collTag = (val: string[] | string) => {
    console.log('%c 🍷 val: ', 'font-size:20px;background-color: #42b983;color:#fff;', val);
    setActiveKey([...val]);
  };
  const hanndle = () => {
    if (openStatus === 'default') {
      setOpenStatus('open');
    }
    if (openStatus === 'open') {
      setOpenStatus('closed');
    }
    if (openStatus === 'closed') {
      setOpenStatus('default');
    }
  };
  useEffect(() => {
    if (openStatus === 'default') {
      setStyle(begin);
    }
    if (openStatus === 'open') {
      setStyle(open);
    }
    if (openStatus === 'closed') {
      setStyle(close);
      setActiveKey([]);
      setTimeout(() => {
        setOpenStatus('default');
        setStyle(begin);
      }, 2000);
    }
    return () => {};
  }, [openStatus]);

  return (
    <PageContainer
      header={{
        ghost: true,
        extra: [<Headers onClick={hanndle} />],
      }}
    >
      <Card className={style} style={{ width: '100%' }}>
        <Input.Group compact>
          <Select defaultValue="POST" style={{ width: 120 }} onChange={changeMethods}>
            {methods.map((item) => (
              <Option value={item} key={item}>
                {item}
              </Option>
            ))}
          </Select>
          <Input
            style={{ width: '50%' }}
            defaultValue="Xihu District, Hangzhou"
            onChange={(e) => setUrlValue(e.target.value)}
            value={urlValue}
          />
          <Button>发送</Button>
        </Input.Group>
        <Collapse ghost activeKey={activeKey} onChange={collTag}>
          <Panel header="参数" key="1" forceRender>
            <Tabs defaultActiveKey="Params" onChange={changeTab}>
              <TabPane tab="Params" key="Params">
                <Params />
              </TabPane>
              <TabPane tab="Authorization" key="Authorization">
                Authorization
              </TabPane>
              <TabPane tab={`headers(${headers})`} key="headers">
                headers
              </TabPane>
              <TabPane tab="body" key="body">
                body
              </TabPane>
            </Tabs>
          </Panel>
          <Panel header="返回结果" key="3" forceRender>
            <Tabs defaultActiveKey="Body" onChange={changeTab}>
              <TabPane tab="Body" key="Body">
                Body
              </TabPane>
              <TabPane tab="Cookises" key="Authorization">
                Authorization
              </TabPane>
              <TabPane tab={`headers(${headers})`} key="headers">
                headers
              </TabPane>
            </Tabs>
          </Panel>
        </Collapse>
      </Card>
    </PageContainer>
  );
};

export default ApiDetail;
