import { useState, useEffect } from 'react';
import { Space, Table, Button, message, Card, Divider } from 'antd';
import type { TableProps } from 'antd';
import { IPartner, useApis } from '../api/api';
import { useAppContext } from '../AppProvider';
import PartnerSearchForm from './searchform/PartnerSearchForm';
import PartnerCreateModal from './modal/PartnerCreateModal';
import axios from 'axios';

interface DataType extends IPartner {
  key: number;
  name: string;
  remark: string;
  id: number;
}

type FieldType = {
  name: string;
  remark: string;
  id: number;
};

enum ActionType {
  ENABLE,
  UPDATE,
  DELETE,
  CREDIT,
  RESETPASSWORD
};

function Partner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState<DataType[]>([])
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedData, setSelectedData] = useState<FieldType>(null!);
  let ctx = useAppContext();
  let apis = useApis()

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
      render: (_, d) => (
        <Space size="middle">
          <Button type="primary" size='small' onClick={() => handleUpdate(ActionType.ENABLE, d)}>开启派单</Button>
          <Button type="primary" size='small' onClick={() => handleUpdate(ActionType.UPDATE, d)}>修改</Button>
          <Button type="primary" size='small' danger onClick={() => handleUpdate(ActionType.DELETE, d)}>删除</Button>
          <Button type="primary" size='small' onClick={() => handleUpdate(ActionType.CREDIT, d)}>授信额度</Button>
          <Button type="primary" size='small' danger onClick={() => handleUpdate(ActionType.RESETPASSWORD, d)}>重置密码</Button>
        </Space>
      ),
    },
  ];

  const fetchListPartner = async () => {
    const { data } = await apis.listPartner()
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

  const handleUpdate = async (type: ActionType, value: DataType) => {
    console.log('handleUpate', type, value)
    try {
      switch (type) {
        case ActionType.ENABLE: {
          await apis.partnerUpdate({ id: value.id, enable: Number(value.enable) })
          fetchListPartner()
          showSuccessMsg(Number(value.enable) == 1 ? '启用成功' : '冻结成功')
          break;
        }
        case ActionType.RESETPASSWORD: {
          let { data } = await apis.partnerResetPassword(value)
          showSuccessMsg(`重置成功, 密位为 ${data.password}`)
          break;
        }
        case ActionType.DELETE: {
          await apis.partnerDelete(value)
          fetchListPartner()
          showSuccessMsg('删除成功');
          break;
        }
        case ActionType.CREDIT: {
          let { data } = await apis.partnerResetPassword(value)
          showSuccessMsg(`重置成功, 密位为 ${data.password}`)
          break;
        }
        case ActionType.UPDATE: {
          openModal(value, true)
          break;
        }
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && message.error(msg)
      }
    } finally {
      // setConfirmLoading(false)
    }
  }

  useEffect(() => {
    fetchListPartner()
  }, [])

  const onSuccess = () => {
    fetchListPartner()
    setIsModalOpen(false)
  };

  const openModal = (selectedData: DataType | null = null, isOpen: boolean = false) => {
    console.log("selectedData", selectedData, 'isOpen', isOpen);
    setSelectedData(selectedData!)
    setIsModalOpen(isOpen)
  }

  const showSuccessMsg = (text: string) => {
    message.success(text)
  }

  return (
    <>
      {contextHolder}
      <Card>
        <div style={{ display: 'flex' }}>
          <Button type="primary" onClick={() => { setIsModalOpen(true) }} >新增</Button>
          <Divider type="vertical" style={{ height: '32px', textAlign: 'center', alignContent: 'center', marginLeft: '20px', marginRight: '20px' }} />
          <PartnerSearchForm />
        </div>

        <Divider />
        <Table<DataType> bordered columns={columns} dataSource={list} scroll={{ x: 'max-content' }} />
        {
          isModalOpen && <PartnerCreateModal info={selectedData} isModalOpen={isModalOpen} onOk={onSuccess} onCancel={() => openModal()} />
        }
      </Card>
    </>
  )
}

export default Partner