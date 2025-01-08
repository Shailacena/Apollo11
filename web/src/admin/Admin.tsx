import { Space, Table, Button, Modal, Form, Input, message, Card, Divider, Popconfirm } from 'antd';
import type { FormProps, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { IAdmin, AdminRegisterReq, useApis } from '../api/api';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import AdminUpdateModal from './modal/AdminUpdateModal';

interface DataType extends IAdmin {
  key: number;
}

type FieldType = {
  username?: string;
  nickname?: string;
  remark?: string;
};

function Admin() {
  const [list, setList] = useState<DataType[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [messageApi, _] = message.useMessage();
  let { listAdmin, adminRegister, adminResetPassword, adminDelete, adminEnable } = useApis()
  const [chooseData, setChooseData] = useState<FieldType>({});

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
      fixed: 'right', // 固定最右边，配合Table的scroll={{ x: 'max-content' }}使用
      render: (_, d) => (
        <Space size="middle">
          <Button type="primary" size='small' danger={d.enable === 1} onClick={() => enableAdmin(d.username, d.enable)}>{d.enable === 1 ? '冻结' : '启用'}</Button>
          <Button type="primary" size='small' onClick={() => {
            setChooseData(d)
            setIsUpdateModalOpen(true)
          }}>修改</Button>
          <Popconfirm title="警告" description="请确认是否删除该管理员"
            onConfirm={() => deleteAdmin(d.username)}
          // onOpenChange={() => console.log('open change')}
          >
            <Button type="primary" size='small' danger >删除</Button>
          </Popconfirm>

          <Button type="primary" size='small' danger onClick={() => resetPassword(d.username)}>重置密码</Button>
        </Space>
      ),
    },
  ];

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

  const addSuccess = (password: string) => {
    Modal.success({
      content: `添加成功, 密位为${password}`,
    });
  };

  const deleteSuccess = () => {
    Modal.success({
      content: `已删除`,
    });
  };

  const enableSuccess = (enable: number) => {
    if (enable === 1) {
      Modal.success({
        content: `已启用`,
      });
    } else if (enable === 2) {
      Modal.success({
        content: `已冻结`,
      });
    }
  };

  const updateSuccess = () => {
    fetchListAdmin()
    setIsUpdateModalOpen(false)
  };

  const onFinish: FormProps<AdminRegisterReq>['onFinish'] = async (value) => {
    try {
      let { data } = await adminRegister(value)
      fetchListAdmin()
      addSuccess(data.password);
      setIsAddModalOpen(false);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && messageApi.open({
          type: 'error',
          content: msg,
        });
      }
    }
  };

  const resetPassword = async (username: string) => {
    try {
      console.log(username);
      let { data } = await adminResetPassword({ username })
      console.log(data)
      addSuccess(data.password);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && messageApi.open({
          type: 'error',
          content: msg,
        });
      }
    }
  };

  const deleteAdmin = async (username: string) => {
    try {
      console.log(username);
      let { data } = await adminDelete({ username })
      console.log(data)
      fetchListAdmin()
      deleteSuccess();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && messageApi.open({
          type: 'error',
          content: msg,
        });
      }
    }
  };

  const enableAdmin = async (username: string, enable: number) => {
    try {
      console.log(username, enable);
      if (enable == 1) {
        console.log(enable);
        enable = 2
      } else {
        enable = 1
      }
      console.log(enable)
      let { data } = await adminEnable({ username, enable })
      console.log(data)
      fetchListAdmin()
      enableSuccess(enable);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && messageApi.open({
          type: 'error',
          content: msg,
        });
      }
    }
  };

  return (
    <>
      <Card>
        <Button type="primary" onClick={() => { setIsAddModalOpen(true) }}>新增管理员</Button>
        <Divider />
        <Table<DataType> bordered columns={columns} dataSource={list} />

        <Modal title="新增管理员" footer={null} open={isAddModalOpen} onCancel={() => { setIsAddModalOpen(false) }} style={{ maxWidth: 480 }} destroyOnClose>
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

        <AdminUpdateModal isUpdateModalOpen={isUpdateModalOpen} callback={updateSuccess} username={chooseData.username} nickname={chooseData.nickname} remark={chooseData.remark} />
      </Card>
    </>
  )
}

export default Admin