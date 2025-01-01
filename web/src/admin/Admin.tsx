import { Space, Table, Button } from 'antd';
import type { TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { listAdmin, IAdmin } from '../api/api';

interface DataType extends IAdmin {
  key: number;
}

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
        <Button type="primary" size='small'>修改</Button>
        <Button type="primary" size='small' danger >删除</Button>
      </Space>
    ),
  },
];

function Admin() {
  const [list, setList] = useState<DataType[]>([])

  useEffect(() => {
    (async () => {
      const { data } = await listAdmin({})
      let d: DataType[] = data?.list?.map((item, index) => {
        let newItem: DataType = {
          key: index,
          ...item
        }
        return newItem
      })
      setList(d)
    })();
  }, [])

  return (
    <>
      <Table<DataType> columns={columns} dataSource={list} />
    </>
  )
}

export default Admin