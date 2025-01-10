import { Space, Table, Button, message, Card, Divider, Popconfirm } from 'antd';
import type { TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { IAdmin, useApis } from '../api/api';
import axios from 'axios';
import AdminCreateModal from './modal/AdminCreateModal';

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
  let { listAdmin, adminResetPassword, adminDelete, adminEnable } = useApis()
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
      fixed: 'right',
      render: (_, d) => (
        <Space size="middle">
          <Button type="primary" size='small' danger={d.enable === 1} onClick={() => enableAdmin(d.username, d.enable)}>{d.enable === 1 ? '冻结' : '启用'}</Button>
          <Button type="primary" size='small' onClick={() => {
            openModal(d, true)
          }}>修改</Button>
          <Popconfirm title="警告" description="请确认是否删除该管理员"
            onConfirm={() => deleteAdmin(d.username)}
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
        msg && showErrorMsg(msg);
      }
    }
  }

  const addSuccess = () => {
    fetchListAdmin()
    setIsAddModalOpen(false)
  };

  const openModal = (selectedData: DataType | null = null, isOpen: boolean = false) => {
    console.log("selectedData", selectedData);
    setSelectedData(selectedData!)
    setIsAddModalOpen(isOpen)
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
      showSuccessMsg(`重置成功, 密位为 ${data.password}`)
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
      if (enable == 1) {
        enable = 2
      } else {
        enable = 1
      }
      await adminEnable({ username, enable })
      fetchListAdmin()
      enableSuccess(enable);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && showErrorMsg(msg);
      }
    }
  };

  const enableSuccess = (enable: number) => {
    let content = '';
    switch (enable) {
      case 1:
        content = '启用成功';
        break;

      case 2:
        content = '冻结成功';
        break;
    }
    content && showSuccessMsg(content)
  };

  return (
    <>
      <Card>
        <Button type="primary" onClick={() => { setIsAddModalOpen(true) }}>新增管理员</Button>
        <Divider />
        <Table<DataType> bordered columns={columns} dataSource={list} />

        <AdminCreateModal info={selectedData} isModalOpen={isAddModalOpen} onOk={addSuccess} onCancel={() => openModal()} />
      </Card>
    </>
  )
}

export default Admin