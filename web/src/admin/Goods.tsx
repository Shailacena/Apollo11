import { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { listGoods } from '../api/api';

interface DataType {
  key: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '合作商单号',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '合作商',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '订单类型',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '今日交易额',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: '每日限额',
    key: 'action',
  },
  {
    title: '店铺',
    key: 'action',
  },
  {
    title: 'skuId',
    key: 'action',
  },
  {
    title: '商品金额',
    key: 'action',
  },
  {
    title: '商品实际金额',
    key: 'action',
  },
  {
    title: '充值金额',
    key: 'action',
  },
  {
    title: '已充值',
    key: 'action',
  },
  {
    title: '订单状态',
    key: 'action',
  },
  {
    title: '冻结状态',
    key: 'action',
  },
  {
    title: '充值状态',
    key: 'action',
  },
  {
    title: '回调状态',
    key: 'action',
  },
  {
    title: '受理时间',
    key: 'action',
  },
  {
    title: '通知时间',
    key: 'action',
  },
  {
    title: '备注',
    key: 'action',
  },
];

function Goods() {

  const [list, setList] = useState<DataType[]>([])
  
  const fetchListGoods = async () => {
    
    const { data } = await listGoods()
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
    fetchListGoods()
  }, [])

  return (
    <>
      <Table<DataType> columns={columns} dataSource={list} scroll={{ x: 'max-content' }} />
    </>
  )
}

export default Goods