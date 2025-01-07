import { useEffect, useState } from 'react';
import { Modal, Form, Table, Input, Button, Card, Divider } from 'antd';
import type { TableProps } from 'antd';
import { listRealNameAccount } from '../api/api';

const { TextArea } = Input;

interface DataType {
  key: string
}

type FieldType = {
  accounts: string
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

function RealNameAccount() {
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

  const fetchListRealNameAccount = async () => {
    const { data } = await listRealNameAccount()
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
    fetchListRealNameAccount()
  }, [])

  return (
    <>
      <Card>
        <div className='mr-10'>
          <Button type="primary" onClick={showModal}>批量导入实名资料</Button>
        </div>
        <Table<DataType> bordered columns={columns} dataSource={list} />

        <Modal title="导入实名资料" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
          <Divider />
          <Form
            name="basic"
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="accounts"
              label="账号"
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button size="large" block type="primary" htmlType="submit" style={{ width: 100 }}>
                  提交
                </Button>
              </div>
            </Form.Item>
          </Form >
        </Modal>
      </Card>
    </>
  )
}

export default RealNameAccount