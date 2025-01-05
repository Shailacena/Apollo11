import { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import type { TableProps } from 'antd';
import { listPartnerBill } from '../api/api';
import CurrentLocation from '../components/CurrentLocation';
import { routes } from './routes';


interface DataType {
  key: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '用户编号',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '用户类型',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '变更金额',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '当前余额',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: '备注',
    key: 'action',
  },
  {
    title: '时间',
    key: 'action',
  },
];

function PartnerBill() {
  const [list, setList] = useState<DataType[]>([])

  const fetchListPartnerBill = async () => {
    const { data } = await listPartnerBill()
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
    fetchListPartnerBill()
  }, [])

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <CurrentLocation routeconfigs={routes} />
      </div>
      <Card>
        <Table<DataType> bordered columns={columns} dataSource={list} />
      </Card>
    </>
  )
}

export default PartnerBill