import { useState } from 'react';
import { Modal, Form, Table, Input, Button } from 'antd';
import type { TableProps } from 'antd';

const { TextArea } = Input;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

type FieldType = {
  username?: string;
  password?: string;
  googleCode?: string;
};

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '合作商名称',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '授信额度',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '每日限额',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: '优先级',
    key: 'action',
  },
  {
    title: '上级代理',
    key: 'action',
  },
  {
    title: '等级',
    key: 'action',
  },
  {
    title: '剩余库存金额',
    key: 'action',
  },
  {
    title: '今日订单数',
    key: 'action',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

function Partner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <Button type="primary" onClick={showModal}>新增</Button>
      <Table<DataType> columns={columns} dataSource={data} />

      <Modal title="新增" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          labelCol={{ span: 4 }}
          name="basic"
          autoComplete="off"
        >
          <Form.Item<FieldType>
            name="username"
            label="名称"
            required
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            name="username"
            label="优先级"
            required
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            name="username"
            label="每日限额"
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            name="username"
            label="白名单IP"
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            name="username"
            label="充值时间"
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            name="username"
            label="私钥"
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            name="username"
            label="备注"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button size="large" block type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form >
      </Modal>
    </>
  )
}

export default Partner