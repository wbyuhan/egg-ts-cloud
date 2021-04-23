import React, { useState, useEffect } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import ProField from '@ant-design/pro-field';
import ProCard from '@ant-design/pro-card';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  key?: string;
  value?: string;
  state?: string;
  created_at?: string;
  format?: string;
  children?: DataSourceType[];
};
type JsonType = {
  key?: string;
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    key: 'souce',
    value: '这个活动真好玩',
    format: 'string',
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
  },
  {
    id: 624691229,
    key: 'test',
    value: '这个活动真好玩',
    format: 'string',
    state: 'closed',
    created_at: '2020-05-26T08:19:22Z',
  },
];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  const [json, setJson] = useState<JsonType[] | any>([]);
  const [newRecord, setNewRecord] = useState({
    id: (Math.random() * 1000000).toFixed(0),
  });

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'key',
      dataIndex: 'key',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 2 ? [{ required: true, message: '此项为必填项' }] : [],
        };
      },
    },
    {
      title: 'value',
      dataIndex: 'value',
      fieldProps: (from, { rowKey, rowIndex }) => {
        if (from.getFieldValue([rowKey || '', 'title']) === '不好玩') {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },
    {
      title: '类型',
      key: 'format',
      dataIndex: 'format',
      valueType: 'select',
      valueEnum: {
        all: { text: 'String', status: 'String' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: 'String',
          status: 'String',
        },
      },
    },

    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  useEffect(() => {
    const jsons = {};
    dataSource.forEach((item) => {
      jsons[`${item.key}`] = item.value;
    });
    setJson(jsons);
    return () => {};
  }, [dataSource]);
  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="数据格式"
        maxLength={5}
        recordCreatorProps={{
          record: newRecord,
        }}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async () => {
            await waitTime(2000);
            setNewRecord({
              id: (Math.random() * 1000000).toFixed(0),
            });
          },
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title="JSON查看" headerBordered collapsible defaultCollapsed>
        <ProField
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(json)}
        />
      </ProCard>
    </>
  );
};
