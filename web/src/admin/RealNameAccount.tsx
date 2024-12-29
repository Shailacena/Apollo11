import { useState } from 'react';
import { Modal, Form, Table, Select, Input, Button } from 'antd';
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
    title: 'id',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '名称',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '实名次数',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '状态',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: '备注',
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

function RealNameAccount() {
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

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>批量导入实名资料</Button>
      <Table<DataType> columns={columns} dataSource={data} />

      <Modal title="导入实名资料" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          autoComplete="off"
        >
          <Form.Item<FieldType>
            name="username"
            label="类型"
          >
            <Select onChange={handleChange} options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            name="username"
            label="账号"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button size="large" block type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form >
      </Modal>
    </>
  )
}

export default RealNameAccount