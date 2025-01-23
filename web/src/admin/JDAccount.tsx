import { useEffect, useState } from 'react';
import { Form, Table, Input, Button, Card, Divider, message, Space, Select, DatePicker, Flex, ConfigProvider } from 'antd';
import type { FormProps, TableProps } from 'antd';
import { useApis } from '../api/api';
import { IJDAccount, JDAccountSearchParams, ListJDAccountReq } from '../api/types';
import axios from 'axios';
import { getDataFormat } from '../utils/Tool';
import { isEnable } from '../utils/util';
import { EnableStatus } from '../utils/constant';
import JDAccountCreateModal from './modal/JDAccountCreateModal';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

interface DataType extends IJDAccount {
  key: string;
}

enum OnlineStatus {
  Online = 1,
  Offline = 2
}

enum RealNameStatus {
  RealName = 1,
  NotRealName = 2
}

const isOnline = (onlineStatus: number) => {
  return onlineStatus === OnlineStatus.Online
}

const isRealName = (realNameStatus: number) => {
  return realNameStatus === RealNameStatus.RealName
}

function JDAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState<DataType[]>([])
  let { listJDAccount, jdAccountEnable, jdAccountDelete, jdAccountResetStatus, jdAccountReset } = useApis()
  const [searchParams, setSearchParams] = useState<JDAccountSearchParams>({})

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
    fetchJDAccountList()
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

  const fetchJDAccountList = async () => {
    const params: ListJDAccountReq = { ...handleSearchParams() }
    const { data } = await listJDAccount(params)
    let d: DataType[] = data?.list?.map((item, index) => {
      let newItem: DataType = {
        key: index.toString(),
        ...item
      }
      return newItem
    })
    setList(d)
  }

  const onSearch: FormProps<JDAccountSearchParams>['onFinish'] = async (value) => {
    setSearchParams((pre) => ({ ...pre, ...value }))
  }

  const handleSearchParams = (): JDAccountSearchParams => {
    return {
      ...searchParams,
      id: searchParams.id ? +searchParams.id : undefined,
      startAt: searchParams.startAt?.valueOf(),
      endAt: searchParams.endAt?.valueOf(),
    }
  }

  const remove = async (isAll: boolean) => {
    const params: JDAccountSearchParams = handleSearchParams()
    await jdAccountDelete({ ...params, isAll })
    fetchJDAccountList()
    message.success('删除成功')
  }

  const resetStatus = async (isTransitionStatus: boolean = false, isLoginExpirationStatus: boolean = false) => {
    try {
      await jdAccountResetStatus({ isTransitionStatus, isLoginExpirationStatus })
      fetchJDAccountList()
      message.success('重置成功')
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && message.error(msg);
      }
    }
  };

  const reset = async () => {
    const params: JDAccountSearchParams = handleSearchParams()
    try {
      await jdAccountReset({ ...params })
      fetchJDAccountList()
      message.success('重置成功')
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && message.error(msg);
      }
    }
  };

  useEffect(() => {
    fetchJDAccountList()
  }, [searchParams])

  return (
    <>
      <Card>
        <Form className="inline_search_form" name="inline_search_form" layout="inline" onFinish={onSearch}>
          <Form.Item<ListJDAccountReq>
            name="id"
          >
            <Input type="number" placeholder="ID" />
          </Form.Item>

          <Form.Item<ListJDAccountReq>
            name="account"
          >
            <Input placeholder="账号" />
          </Form.Item>

          <Form.Item<ListJDAccountReq>
            name="totalOrderCount"
          >
            <Input type="number" placeholder="总下单数" />
          </Form.Item>

          {/* <Form.Item<ListJDAccountReq>
            name="abnormal"
          >
            <Input placeholder="异常模糊搜索" />
          </Form.Item> */}

          <Form.Item<ListJDAccountReq>
            name="enable"
          >
            <Select placeholder="状态">
              <Option value="1">启用</Option>
              <Option value="2">禁用</Option>
            </Select>
          </Form.Item>

          <Form.Item<ListJDAccountReq>
            name="onlineStatus"
          >
            <Select placeholder="在线状态">
              <Option value="1">在线</Option>
              <Option value="2">离线</Option>
            </Select>
          </Form.Item>

          <Form.Item<ListJDAccountReq>
            name="realNameStatus"
          >
            <Select placeholder="实名状态">
              <Option value="1">已实名</Option>
              <Option value="2">未实名</Option>
            </Select>
          </Form.Item>

          <Form.Item<ListJDAccountReq>
            name="startAt"
          >
            <DatePicker placeholder="起始日期" />
          </Form.Item>

          <Form.Item<ListJDAccountReq>
            name="endAt"
          >
            <DatePicker placeholder="截止日期" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" icon={<SearchOutlined />} htmlType="submit"></Button>
          </Form.Item>
        </Form>

        <Divider />
        <ConfigProvider>
          <Flex gap="small" wrap>
            <Button type="primary" onClick={showModal}>批量导入京东账号</Button>
            <Button variant="solid" color="green" onClick={() => { resetStatus(true) }}>重置转换失败ck</Button>
            <Button variant="solid" color="orange" onClick={() => { resetStatus(false, true) }}>重置登录过期ck</Button>
            <Button variant="solid" color="magenta" onClick={reset}>重置指定搜索条件小号ck</Button>
            <Button type="primary" danger onClick={() => { remove(false) }}>删除指定搜索条件小号ck</Button>
            <Button variant="solid" color="purple">导出指定搜索条件小号ck</Button>
            <Button type="primary" danger onClick={() => { remove(true) }}>全部删除</Button>
          </Flex>
        </ConfigProvider>
        <Divider />
        <Table<DataType> bordered columns={columns} dataSource={list} />

        {
          isModalOpen &&
          <JDAccountCreateModal isModalOpen={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
        }
      </Card>
    </>
  )
}

export default JDAccount