import { useEffect, useState } from 'react';
import { Modal, Form, Table, Input, Button, Card, Divider, message } from 'antd';
import type { FormProps, TableProps } from 'antd';
import { IJDAccount, IJDAccountCreate, JDAccountCreateReq, useApis } from '../api/api';
import axios from 'axios';
import { getDataFormat } from '../utils/Tool';

const { TextArea } = Input;

interface DataType extends IJDAccount {
  key: string;
}

type FieldType = {
  accounts: string;
};

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '账号',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: '实名状态',
    dataIndex: 'realNameStatus',
    key: 'realNameStatus',
  },
  {
    title: '总下单数',
    key: 'totalOrderCount',
    dataIndex: 'totalOrderCount',
  },
  {
    title: '总成功数',
    key: 'totalSuccessOrderCount',
    dataIndex: 'totalSuccessOrderCount',
  },
  {
    title: '当日下单数',
    key: 'todayOrderCount',
    dataIndex: 'todayOrderCount',
  },

  {
    title: '备注',
    key: 'remark',
    dataIndex: 'remark',
  },
  {
    title: '登录状态',
    key: 'loginStatus',
    dataIndex: 'loginStatus',
  },
  {
    title: '禁用状态',
    key: 'enable',
    dataIndex: 'enable',
  },
  {
    title: '创建时间',
    key: 'createAt',
    dataIndex: 'createAt',
    render: (ts: number) => {
      return getDataFormat(new Date(ts * 1000))
    }
  },

  {
    title: '修改时间',
    key: 'updateAt',
    dataIndex: 'updateAt',
    render: (ts: number) => {
      return getDataFormat(new Date(ts * 1000))
    }
  },
];

function JDAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState<DataType[]>([])
  let { listJDAccount, jdAccountCreate } = useApis()

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
      let accountList: IJDAccountCreate[] = []
      if (value.accounts) {
        let pinReg = /pin=([\s\S]*?);/
        let keyReg = /wskey=([\s\S]*?);/

        let list = value.accounts.split(/[(\r\n)\r\n]+/)

        list?.forEach((line: string) => {
          let pinMatch = line.trim().match(pinReg)
          let pin = ''
          if (pinMatch && pinMatch.length > 1) {
            pin = pinMatch[1]
          }
          let keyMatch = line.trim().match(keyReg)
          let wsKey = ''
          if (keyMatch && keyMatch.length > 1) {
            wsKey = keyMatch[1]
          }

          if (pin && wsKey) {
            accountList.push({
              account: pin,
              wsKey: wsKey,
            })
          }
        })
      }

      let data: JDAccountCreateReq = {
        accountList: accountList,
        remark: ""
      }

      await jdAccountCreate(data)

      fetchListJDAccount()
      setIsModalOpen(false);
      message.success('导入成功')
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && message.error(msg)
      }
    }
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
      <Card>
        <div>
          <Button type="primary" onClick={showModal}>批量导入京东账号</Button>
        </div>
        <Divider />
        <Table<DataType> bordered columns={columns} dataSource={list} />

        <Modal title="导入京东账号" destroyOnClose open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
          <Divider />
          <Form
            name="basic"
            autoComplete="off"
            onFinish={onFinish}
          >
            {/* <Form.Item<FieldType>
              name="username"
              label="类型"
            >
              <Select onChange={handleChange} options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]} style={{ width: 200 }}>
              </Select>
            </Form.Item> */}

            <Form.Item<FieldType>
              name="accounts"
              label="账号"
            >
              <TextArea rows={8} />
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

export default JDAccount