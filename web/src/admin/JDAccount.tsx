import { useEffect, useState } from 'react';
import { Modal, Form, Table, Input, Button, Card, Divider, message, Space, Select, DatePicker } from 'antd';
import type { FormProps, TableProps } from 'antd';
import { useApis } from '../api/api';
import { IJDAccount, IJDAccountCreate, JDAccountCreateReq } from '../api/types';
import axios from 'axios';
import { getDataFormat } from '../utils/Tool';
import { isEnable } from '../utils/util';
import { EnableStatus } from '../utils/constant';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

interface DataType extends IJDAccount {
  key: string;
}

type FieldType = {
  accounts: string;
};

enum OnlineStatus {
  Online = 1,
  Offline = 2
}

enum RealNameStatus {
  RealName = 1,
  NotRealName = 2
}

function JDAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState<DataType[]>([])
  let { listJDAccount, jdAccountCreate, jdAccountEnable } = useApis()

  const isOnline = (onlineStatus: number) => {
    return onlineStatus === OnlineStatus.Online
  }

  const isRealName = (realNameStatus: number) => {
    return realNameStatus === RealNameStatus.RealName
  }

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
      render: (_, d) => (
        isRealName(d.onlineStatus) ? '已实名' : '未实名'
      )
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
      key: 'onlineStatus',
      dataIndex: 'onlineStatus',
      render: (_, d) => (
        isOnline(d.onlineStatus) ? '在线' : '离线'
      )
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
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      render: (_, d) => {
        let enable = isEnable(d.enable)
        return (
          <Space size="middle">
            <Button
              type="primary"
              size='small'
              danger={enable}
              onClick={() => {
                enableAcount(d.id, enable ? EnableStatus.Disabled : EnableStatus.Enabled)
              }}>
              {enable ? '禁用' : '启用'}
            </Button>
          </Space>
        )
      }
    }
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const enableAcount = async (id: number, enable: number) => {
    try {
      await jdAccountEnable({ id, enable })
      fetchJDAccountList()
      message.success(isEnable(enable) ? '启用成功' : '禁用成功')
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && message.error(msg);
      }
    }
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

      fetchJDAccountList()
      setIsModalOpen(false);
      message.success('导入成功')
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && message.error(msg)
      }
    }
  };

  const fetchJDAccountList = async () => {
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
    fetchJDAccountList()
  }, [])

  return (
    <>
      <Card>
        <Form className="inline_search_form" name="inline_search_form" layout="inline" onFinish={onFinish}>
          <Form.Item
            name="id"
          >
            <Input placeholder="ID" />
          </Form.Item>

          <Form.Item
            name="account"
          >
            <Input placeholder="账号" />
          </Form.Item>

          <Form.Item
            name="totalOrderCount"
          >
            <Input placeholder="总下单数" />
          </Form.Item>

          <Form.Item
            name="abnormal"
          >
            <Input placeholder="异常模糊搜索" />
          </Form.Item>

          <Form.Item
            name="enable"
          >
            <Select placeholder="状态">
              <Option value="1">启用</Option>
              <Option value="2">禁用</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="onlineStatus"
          >
            <Select placeholder="在线状态">
              <Option value="1">在线</Option>
              <Option value="2">离线</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="realNameStatus"
          >
            <Select placeholder="实名状态">
              <Option value="1">已实名</Option>
              <Option value="2">未实名</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="startTime"
          >
            <DatePicker placeholder="起始日期" />
          </Form.Item>

          <Form.Item
            name="endTime"
          >
            <DatePicker placeholder="截止日期" />
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
              >
                搜索
              </Button>
            )}
          </Form.Item>
        </Form>
        <Divider />
        <Button type="primary" onClick={showModal}>批量导入京东账号</Button>
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