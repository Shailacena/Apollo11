import { useState, useEffect } from 'react';
import { Space, Table, Button, message, Card, Divider } from 'antd';
import type { TableProps } from 'antd';
import { IPartner, useApis } from '../api/api';
import { useAppContext } from '../AppProvider';
import PartnerSearchForm from './searchform/PartnerSearchForm';
import PartnerCreateModal from './modal/PartnerCreateModal';

interface DataType extends IPartner {
  key: number;
}

type FieldType = {
  username?: string;
  nickname?: string;
  remark?: string;
};

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '合作商名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '授信额度',
    dataIndex: 'creditAmount',
    key: 'creditAmount',
  },
  {
    title: '每日限额',
    key: 'dailyLimit',
    dataIndex: 'dailyLimit',
  },
  {
    title: '优先级',
    key: 'priority',
    dataIndex: 'priority',
  },
  {
    title: '上级代理',
    key: 'superiorAgent',
    dataIndex: 'superiorAgent',
  },
  {
    title: '等级',
    key: 'level',
    dataIndex: 'level',
  },
  {
    title: '剩余库存金额',
    key: 'stockAmount',
    dataIndex: 'stockAmount',
  },
  {
    title: '今日订单数',
    key: 'stockAmount',
    dataIndex: 'stockAmount',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Button type="primary" size='small'>开启派单</Button>
        <Button type="primary" size='small'>修改</Button>
        <Button type="primary" size='small' danger >删除</Button>
        <Button type="primary" size='small'>授信额度</Button>
        <Button type="primary" size='small' danger >重置密码</Button>
      </Space>
    ),
  },
];

function Partner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState<DataType[]>([])
  const [messageApi, contextHolder] = message.useMessage();
  let ctx = useAppContext();
  let { partnerRegister, listPartner } = useApis();
  const [selectedData, setSelectedData] = useState<FieldType>(null!);

  const onSuccess = () => {
    fetchListPartner()
    setIsModalOpen(false)
  };

  const openModal = (selectedData: DataType | null = null, isOpen: boolean = false) => {
    console.log("selectedData", selectedData);
    setSelectedData(selectedData!)
    setIsModalOpen(isOpen)
  }

  const fetchListPartner = async () => {
    const { data } = await listPartner()
    console.log(data.list)
    console.log(ctx)
    ctx.partnerList = data.list;
    let d: DataType[] = data?.list?.map((item, index) => {
      let newItem: DataType = {
        key: index,
        ...item
      }
      return newItem
    })
    setList(d)
  }

  useEffect(() => {
    fetchListPartner()
  }, [])

  return (
    <>
      {contextHolder}
      <Card>
        <div style={{display: 'flex'}}>
          <Button type="primary" onClick={() => { setIsModalOpen(true) }} >新增</Button>
          <Divider type="vertical" style={{height: '32px', textAlign: 'center', alignContent: 'center', marginLeft: '20px', marginRight: '20px'}} />
          <PartnerSearchForm />
        </div>
        
        <Divider />
        <Table<DataType> bordered columns={columns} dataSource={list} scroll={{ x: 'max-content' }} />
        <PartnerCreateModal info={selectedData} isModalOpen={isModalOpen} onOk={onSuccess} onCancel={() => openModal()} />
      </Card>
    </>
  )
}

export default Partner