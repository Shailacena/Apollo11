import { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import type { TableProps } from 'antd';
import { listStatisticsBill } from '../api/api';
import CurrentLocation from '../components/CurrentLocation';
import { routes } from './routes';


interface DataType {
  key: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '日期',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '成功总金额',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '微信缴费',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '支付宝缴费',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: '支付宝手动缴费',
    key: 'action',
  },
  {
    title: '微信',
    key: 'action',
  },
  {
    title: '成功率',
    key: 'action',
  },
];

function DailyBill() {

  const [list, setList] = useState<DataType[]>([])

  const fetchListStatisticsBill = async () => {
    const { data } = await listStatisticsBill()
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
    fetchListStatisticsBill()
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

export default DailyBill