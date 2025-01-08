import { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import type { TableProps } from 'antd';
import { useApis } from '../api/api';


interface DataType {
  key: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '平台订单号',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '商户订单号',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '商户号',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '官方单号',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: '订单金额',
    key: 'action',
  },
  {
    title: '支付类型',
    key: 'action',
  },
  {
    title: '下单账号',
    key: 'action',
  },
  {
    title: '状态',
    key: 'action',
  },
  {
    title: 'skuId',
    key: 'action',
  },
  {
    title: '店铺',
    key: 'action',
  },
  {
    title: '下单时间',
    key: 'action',
  },
  {
    title: '地区',
    key: 'action',
  },
  {
    title: '回调状态',
    key: 'action',
  },
  {
    title: 'ip',
    key: 'action',
  },
  {
    title: '设备类型',
    key: 'action',
  },
  {
    title: '备注',
    key: 'action',
  },
];

function TradingRecord() {

  const [list, setList] = useState<DataType[]>([])
  let { listOrder } = useApis()

  const fetchListOrder = async () => {
    const { data } = await listOrder()
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
    fetchListOrder()
  }, [])

  return (
    <>
      <Card>
        <Table<DataType>
          bordered
          pagination={{ pageSize: 12 }} // 分页
          columns={columns} 
          dataSource={list} 
          scroll={{ x: 'max-content' }} />
      </Card>
    </>
  )
}

export default TradingRecord