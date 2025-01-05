import { useEffect, useState } from 'react';
import { Modal, Form, Table, Select, Input, Button, Card } from 'antd';
import type { TableProps } from 'antd';
import { listJDAccount } from '../api/api';
import CurrentLocation from '../components/CurrentLocation';
import { routes } from './routes';

const { TextArea } = Input;

interface DataType {
  key: string;
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
    title: '账号',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '实名状态',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '总下单数',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: '总成功数',
    key: 'action',
  },
  {
    title: '当日下单数',
    key: 'action',
  },

  {
    title: '备注',
    key: 'action',
  },
  {
    title: '登录状态',
    key: 'action',
  },
  {
    title: '禁用状态',
    key: 'action',
  },
  {
    title: '创建时间',
    key: 'action',
  },

  {
    title: '修改时间',
    key: 'action',
  },
];

function JDAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState<DataType[]>([])

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

  const fetchListJDAccount = async () => {
    const { data } = await listJDAccount()
    let d: DataType[] = data?.list?.map((item, index) => {
      let newItem: DataType = {
        key: index.toString(),
        ...item
      }
      return newItem
    })
    setList(d)
  }

  useEffect(() => {
    fetchListJDAccount()
  }, [])

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <CurrentLocation routeconfigs={routes} />
      </div>
      <Card>
        <div className='mr-10'>
          <Button type="primary" onClick={showModal}>批量导入京东账号</Button>
        </div>
        <Table<DataType> bordered columns={columns} dataSource={list} />

        <Modal title="导入京东账号" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
      </Card>
    </>
  )
}

export default JDAccount