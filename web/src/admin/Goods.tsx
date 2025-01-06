import { useEffect, useState } from 'react';
import { Button, Card, Divider, Form, Input, message, Modal, Select, Space, Table } from 'antd';
import type { FormProps, TableProps } from 'antd';
import { createGoods, GoodsCreateReq, listGoods, listPartner } from '../api/api';
import axios from 'axios';
import { useAppContext } from '../AppProvider';
import CurrentLocation from '../components/CurrentLocation';
import { routes } from './routes';

interface DataType {
  key: string;
}

type FieldTypeCreateGoods = {
  key: string;
  partnerId: number;
  rechargeType: number;
  skuId: string;
  brandId: string;
  price: number;
  realPrice: number;
  shopName: string;
  createAt: number;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '合作商单号',
    dataIndex: 'partnerId',
    align: 'center',
    key: 'partnerId',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '合作商',
    dataIndex: 'partnerId',
    align: 'center',
    key: 'partnerId',
  },
  {
    title: '订单类型',
    dataIndex: 'rechargeType',
    align: 'center',
    key: 'rechargeType',
  },
  {
    title: '今日交易额',
    key: 'tags',
    dataIndex: 'tags',
    align: 'center',
  },
  {
    title: '每日限额',
    key: 'tags',
    dataIndex: 'tags',
    align: 'center',
  },
  {
    title: '店铺',
    key: 'shopName',
    dataIndex: 'shopName',
    align: 'center',
  },
  {
    title: 'skuId',
    key: 'skuId',
    dataIndex: 'skuId',
    align: 'center',
  },
  {
    title: '商品金额',
    key: 'price',
    dataIndex: 'price',
    align: 'center',
  },
  {
    title: '商品实际金额',
    key: 'realPrice',
    dataIndex: 'realPrice',
    align: 'center',
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
    key: 'createAt',
    dataIndex: 'createAt',
    align: 'center',
  },
  {
    title: '通知时间',
    key: 'action',
  },
  {
    title: '备注',
    key: 'action',
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right', // 固定最右边，配合Table的scroll={{ x: 'max-content' }}使用
    align: 'center',
    render: () => (
      <Space size="middle">
        <Button type="primary" size='small' onClick={() => onEditClick('0')}>修改</Button>
        <Button type="primary" size='small' danger onClick={() => onEditClick('0')}>冻结</Button>
        <Button type="primary" size='small' danger onClick={() => onEditClick('0')}>删除</Button>
        <Button type="primary" size='small' danger onClick={() => onEditClick('0')}>取消订单</Button>
      </Space>
    ),
  },
];

const onEditClick = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
  // return <OrderDetail />
};

function Goods() {
  const [list, setList] = useState<DataType[]>([])
  const [isShowAddGoodsModal, setIsAddGoodsModalOpen] = useState(false);
  const [messageApi, _] = message.useMessage();
  const ctx = useAppContext();

  const fetchListGoods = async () => {
    const { data } = await listGoods()
    let d: DataType[] = data?.list?.map((item, index) => {
      let newItem: DataType = {
        key: index.toString(),
        ...item
      }
      return newItem
    })
    console.log('11111222', d)
    setList(d)
  }

  const fetchListPartner = async () => {
    const { data } = await listPartner()
    console.log(data.list)
    console.log(ctx)
    ctx.partnerList = data.list;
    data?.list?.map((item, index) => {
      let newItem = {
        key: index,
        ...item
      }
      return newItem
    })
  }

  useEffect(() => {
    fetchListGoods()

    if (!ctx.partnerList || ctx.partnerList.length == 0) {
      fetchListPartner()
    }
  }, [])

  const showAddGoodsModal = () => {
    setIsAddGoodsModalOpen(true);
  };

  const handleCancel = () => {
    setIsAddGoodsModalOpen(false);
  };

  const success = () => {
    Modal.success({
      content: `添加成功!`,
    });
  };

  const onFinish: FormProps<GoodsCreateReq>['onFinish'] = async (value) => {
    try {
      console.log(value);
      value.rechargeType = value.rechargeType && Number(value.rechargeType)
      value.price = value.price && Number(value.price)
      value.realPrice = value.realPrice && Number(value.realPrice)
      value.partnerId = value.partnerId && Number(value.partnerId)

      let { data } = await createGoods(value)
      console.log(data)
      fetchListGoods();
      success();
      setIsAddGoodsModalOpen(false);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && messageApi.open({
          type: 'error',
          content: msg,
        });
      }
    }
  }

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <CurrentLocation routeconfigs={routes} />
      </div>
      <Card>
        <Button type="primary" onClick={showAddGoodsModal}>新增商品</Button>
        <Divider />
        <Table<DataType>
          bordered
          pagination={{ pageSize: 12 }} // 分页
          columns={columns}
          dataSource={list}
          scroll={{ x: 'max-content' }} />

        <Modal title="新增商品" footer={null} open={isShowAddGoodsModal} onCancel={handleCancel} style={{ maxWidth: 480 }} destroyOnClose>
          <Divider />
          <div style={{ display: 'flex', marginTop: 20, alignItems: 'center' }}>
            <Form
              labelCol={{ span: 8 }}
              name="basic"
              autoComplete="off"
              onFinish={onFinish}
              style={{ width: '80%' }}
              initialValues={{ rechargeType: '0' }}
            >
              <Form.Item<FieldTypeCreateGoods>
                name="partnerId"
                label="合作商"
              >
                <Select options={ctx.partnerList?.map((item) => {
                  let newItem = {
                    value: item.id,
                    label: item.name
                  }
                  return newItem
                }) || []}
                >
                </Select>
              </Form.Item>

              <Form.Item<FieldTypeCreateGoods>
                name="rechargeType"
                label="充值类型"
              >
                <Select
                  options={[
                    { value: '0', label: '京东游戏' },
                    { value: '1', label: '京东实物' }
                  ]}
                >
                </Select>
              </Form.Item>

              <Form.Item<FieldTypeCreateGoods>
                name="skuId"
                label="skuid"
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldTypeCreateGoods>
                name="brandId"
                label="BrandId"
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldTypeCreateGoods>
                name="price"
                label="金额"
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldTypeCreateGoods>
                name="realPrice"
                label="真实金额"
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldTypeCreateGoods>
                name="shopName"
                label="店铺名称"
              >
                <Input />
              </Form.Item>

              <Form.Item label={null} style={{ marginTop: 30 }}>
                <Button style={{ width: 100 }} size="large" block type="primary" htmlType="submit">
                  确定
                </Button>
              </Form.Item>
            </Form >
          </div>
        </Modal>
      </Card>
    </>
  )
}

export default Goods