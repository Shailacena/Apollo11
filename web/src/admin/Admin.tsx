import { Space, Table, Button, Modal, Form, Input, message, Card, Divider } from 'antd';
import type { FormProps, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { listAdmin, IAdmin, AdminRegisterReq, adminRegister } from '../api/api';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import CurrentLocation from '../components/CurrentLocation';
import { routes } from './routes';

interface DataType extends IAdmin {
  key: number;
}

type FieldType = {
  username?: string;
  nickname?: string;
  remark?: string;
};

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '账号',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
  },
  {
    title: '备注',
    key: 'remark',
    dataIndex: 'remark',
  },
  {
    title: '状态',
    key: 'enable',
    dataIndex: 'enable',
    render: (_, d) => (
      d.enable === 1 ? '启动' : '禁用'
    )
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Button disabled type="primary" size='small'>修改</Button>
        <Button disabled type="primary" size='small' danger >删除</Button>
      </Space>
    ),
  },
];

function Admin() {
  const [list, setList] = useState<DataType[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, _] = message.useMessage();

  useEffect(() => {
    fetchListAdmin();
  }, [])

  const fetchListAdmin = async () => {
    try {
      const { data } = await listAdmin()
      let d: DataType[] = data?.list?.map((item, index) => {
        let newItem: DataType = {
          key: index,
          ...item
        }
        return newItem
      })
      setList(d)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && messageApi.open({
          type: 'error',
          content: msg,
        });
      }
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const success = (password: string) => {
    Modal.success({
      content: `添加成功, 密位为${password}`,
    });
  };

  const onFinish: FormProps<AdminRegisterReq>['onFinish'] = async (value) => {
    try {
      console.log(value);
      let { data } = await adminRegister(value)
      console.log(data)
      fetchListAdmin()
      success(data.password);
      setIsModalOpen(false);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && messageApi.open({
          type: 'error',
          content: msg,
        });
      }
    }
  }

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <CurrentLocation routeconfigs={routes} />
      </div>
      <Card>
        <Button  className='mr-10' type="primary" onClick={showModal}>新增管理员</Button>
        <Table<DataType> bordered columns={columns} dataSource={list} />

        <Modal title="新增管理员" footer={null} open={isModalOpen} onCancel={handleCancel} style={{ maxWidth: 480 }} destroyOnClose>
          <Divider />
          <div style={{ display: 'flex', marginTop: 20, alignItems: 'center' }}>
            <Form
              labelCol={{ span: 8 }}
              name="basic"
              autoComplete="off"
              onFinish={onFinish}
            >
              <Form.Item<FieldType>
                name="username"
                label="帐号"
                required
              >
                <Input style={{ width: 250 }} />
              </Form.Item>

              <Form.Item<FieldType>
                name="nickname"
                label="昵称"
                required
              >
                <Input style={{ width: 250 }} />
              </Form.Item>
              <Form.Item<FieldType>
                name="remark"
                label="备注"
              >
                <TextArea rows={4} style={{ width: 250 }} />
              </Form.Item>

              <Form.Item label={null} style={{ marginTop: 30 }}>
                <Button style={{ width: 100 }} size="large" block type="primary" htmlType="submit">
                  确定
                </Button>
              </Form.Item>
            </Form >
          </div>
        </Modal>
      </Card>
    </>
  )
}

export default Admin