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
    dataIndex: 'partnerId',
    key: 'partnerId',
  },
  {
    title: '用户类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '变更金额',
    dataIndex: 'changeMoney',
    key: 'changeMoney',
  },
  {
    title: '当前余额',
    key: 'money',
    dataIndex: 'money',
  },
  {
    title: '备注',
    key: 'remark',
  },
  {
    title: '时间',
    key: 'createAt',
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