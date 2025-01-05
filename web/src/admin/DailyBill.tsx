import { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { listStatisticsBill } from '../api/api';


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
      <Table<DataType> columns={columns} dataSource={list} />
    </>
  )
}

export default DailyBill