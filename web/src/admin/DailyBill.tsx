import { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import type { TableProps } from 'antd';
import { useApis } from '../api/api';


interface DataType {
  key: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '成功总金额',
    dataIndex: 'totalMoney',
    key: 'totalMoney',
    align: 'center',
  },
  {
    title: '微信缴费',
    dataIndex: 'wxFee',
    key: 'wxFee',
    align: 'center',
  },
  {
    title: '支付宝缴费',
    key: 'aliFee',
    dataIndex: 'aliFee',
    align: 'center',
  },
  {
    title: '支付宝手动缴费',
    key: 'aliManualFee',
    dataIndex: 'aliManualFee',
    align: 'center',
  },
  {
    title: '微信手动缴费',
    key: 'wxManualFee',
    dataIndex: 'wxManualFee',
    align: 'center',
  },
  {
    title: '成功率',
    key: 'action',
    align: 'center',
  },
];

function DailyBill() {
  const [list, setList] = useState<DataType[]>([])
  let { listStatisticsBill } = useApis()

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
      <Card>
        <Table<DataType> bordered columns={columns} dataSource={list || []} />
      </Card>
    </>
  )
}

export default DailyBill