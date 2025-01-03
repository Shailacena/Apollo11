import { Space, Table, Button, Modal, Form, Input, message } from 'antd';
import type { FormProps, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { listAdmin, IAdmin, AdminRegisterReq, adminRegister } from '../api/api';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';

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
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetchListAdmin();
  }, [])

  const fetchListAdmin = async () => {
    try {
      const { data } = await listAdmin({})
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
      content: `添加成功, 密位为${password}!`,
    });
  };

  const onFinish: FormProps<AdminRegisterReq>['onFinish'] = async (value) => {
    try {
      console.log(value);
      let resp = await adminRegister(value)
      console.log(resp)
      if (resp.code == 0) {
        fetchListAdmin()
        success(resp.data.username);
        setIsModalOpen(false);
      }
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
      <Button type="primary" onClick={showModal}>新增管理员</Button>
      <Table<DataType> columns={columns} dataSource={list} />

      <Modal title="新增管理员" footer={null} open={isModalOpen} onCancel={handleCancel} destroyOnClose>
        <Form
          labelCol={{ span: 4 }}
          name="basic"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item<FieldType>
            name="username"
            label="帐号"
            required
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            name="nickname"
            label="昵称"
            required
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            name="remark"
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

      <Modal title="" footer={null} open={isModalOpen} onCancel={handleCancel} destroyOnClose>
        <Form
          labelCol={{ span: 4 }}
          name="basic"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item<FieldType>
            name="username"
            label="帐号"
            required
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            name="nickname"
            label="昵称"
            required
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            name="remark"
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

export default Admin