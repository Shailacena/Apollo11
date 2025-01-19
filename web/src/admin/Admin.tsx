import { Space, Table, Button, message, Card, Divider, Popconfirm, QRCode, Typography, Modal } from 'antd';
import type { TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { useApis } from '../api/api';
import axios from 'axios';
import AdminCreateModal, { FieldType } from './modal/AdminCreateModal';
import { getRoleName, isSuperAdmin } from './role';
import { IAdmin } from '../api/types';
import { EnableStatus } from '../utils/constant';
import { isEnable } from '../utils/util';

const { Text } = Typography;
interface DataType extends IAdmin {
  key: number;
}

function Admin() {
  const [list, setList] = useState<DataType[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  let { listAdmin, adminResetPassword, adminDelete, adminEnable, adminResetVerifiCode } = useApis()
  const [selectedData, setSelectedData] = useState<FieldType>(null!);

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
      title: '角色',
      key: 'role',
      dataIndex: 'role',
      render: (_, d) => (
        getRoleName(d.role)
      )
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
        isEnable(d.enable) ? '启动' : '禁用'
      )
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      render: (_, d) => {
        let isSuper = isSuperAdmin(d.role)
        let enable = isEnable(d.enable)
        return (
          <Space size="middle">
            {
              !isSuper &&
              <Button
                type="primary"
                size='small'
                danger={enable}
                onClick={
                  () => enableAdmin(d.username, enable ? EnableStatus.Disabled : EnableStatus.Enabled)
                }>
                {enable ? '冻结' : '启用'}
              </Button>
            }
            <Button type="primary" size='small' onClick={() => { openModal(d, true) }}>修改</Button>
            {
              !isSuper &&
              <Popconfirm title="警告" description="请确认是否删除该管理员" onConfirm={() => deleteAdmin(d.username)} >
                <Button type="primary" size='small' danger >删除</Button>
              </Popconfirm>
            }
            <Button type="primary" size='small' danger onClick={() => resetPassword(d.username)}>重置密码</Button>
            <Button type="primary" size='small' onClick={() => resetVerifiCode(d.id)}>重新生成</Button>
            <Popconfirm
              title="验证码"
              icon={null}
              description={
                d?.urlKey ?
                  <QRCode value={d?.urlKey} size={320} /> :
                  <div>
                    <Text>无二维码，点击</Text>
                    <Text type="success">重新生成</Text>
                  </div>
              }
              showCancel={false}
              okText="关闭"
            >
              <Button type="primary" size='small'>
                二维码
              </Button>
            </Popconfirm>
          </Space>
        )
      }
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
        msg && showErrorMsg(msg);
      }
    }
  }

  const onSuccess = () => {
    fetchListAdmin()
    setIsModalOpen(false)
  };

  const openModal = (selectedData: DataType | null = null, isOpen: boolean = false) => {
    setSelectedData(selectedData!)
    setIsModalOpen(isOpen)
  }

  const showSuccessMsg = (text: string) => {
    message.success(text)
  }

  const showErrorMsg = (text: string) => {
    message.error(text)
  }

  const resetPassword = async (username: string) => {
    try {
      let { data } = await adminResetPassword({ username })
      Modal.success({
        content: `重置密码成功, 密位为${data.password}`,
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && showErrorMsg(msg);
      }
    }
  };

  const resetVerifiCode = async (id: number) => {
    try {
      await adminResetVerifiCode({ id })
      fetchListAdmin()
      showSuccessMsg(`重置验证码成功, 查看二维码`)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && showErrorMsg(msg);
      }
    }
  };

  const deleteAdmin = async (username: string) => {
    try {
      await adminDelete({ username })
      fetchListAdmin()
      showSuccessMsg('删除成功');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && showErrorMsg(msg);
      }
    }
  };

  const enableAdmin = async (username: string, enable: number) => {
    try {
      await adminEnable({ username, enable })
      fetchListAdmin()
      showSuccessMsg(isEnable(enable) ? '启用成功' : '冻结成功')
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && showErrorMsg(msg);
      }
    }
  };

  return (
    <>
      <Card>
        <Button type="primary" onClick={() => { setIsModalOpen(true) }}>新增管理员</Button>
        <Divider />
        <Table<DataType> bordered columns={columns} dataSource={list} />

        {
          isModalOpen &&
          <AdminCreateModal info={selectedData} isModalOpen={isModalOpen} onOk={onSuccess} onCancel={() => openModal()} />
        }
      </Card>
    </>
  )
}

export default Admin