import { useEffect, useState } from 'react';
import { Modal, Form, Table, Input, Button, Card, Divider, message } from 'antd';
import type { FormProps, TableProps } from 'antd';
import { BaseRealNameAccount, IRealNameAccount, RealNameAccountCreateReq, useApis } from '../api/api';
import axios from 'axios';

const { TextArea } = Input;

interface DataType extends IRealNameAccount {
  key: string
}

type FieldType = {
  accounts: string
};

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'idNumber',
    key: 'idNumber',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '实名次数',
    dataIndex: 'realNameCount',
    key: 'realNameCount',
  },
  {
    title: '状态',
    key: 'enable',
    dataIndex: 'enable',
  },
  {
    title: '备注',
    key: 'remark',
    dataIndex: 'remark',
  },
];

function RealNameAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState<DataType[]>([])
  let { listRealNameAccount, realNameAccountCreate } = useApis()

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (value) => {
    try {
      let accountList: BaseRealNameAccount[] = []
      if (value.accounts) {
        let list = value.accounts.split(/[(\r\n)\r\n]+/)

        list?.forEach((line: string) => {
          line = line.trim().replace(/\s+/, ",")
          let accounts = line.split(",")
          if (accounts.length > 1) {
            accountList.push({
              idNumber: accounts[0],
              name: accounts[accounts.length - 1],
            })
          }
        })
      }

      let data: RealNameAccountCreateReq = {
        accountList: accountList,
        remark: ""
      }

      await realNameAccountCreate(data)

      fetchListRealNameAccount()
      setIsModalOpen(false);
      message.success('导入成功')
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && message.error(msg)
      }
    }
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
        <div>
          <Button type="primary" onClick={showModal}>批量导入实名资料</Button>
        </div>
        <Divider />
        <Table<DataType> bordered columns={columns} dataSource={list} />

        <Modal title="导入实名资料" destroyOnClose open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
          <Divider />
          <Form
            name="basic"
            autoComplete="off"
            onFinish={onFinish}
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