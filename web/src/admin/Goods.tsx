import { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Select, Table } from 'antd';
import type { FormProps, TableProps } from 'antd';
import { createGoods, GoodsCreateReq, listGoods } from '../api/api';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';

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
  const [isShowAddGoodsModal, setIsAddGoodsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  // const appCt = useAppContext();
  
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

  const showAddGoodsModal = () => {
    setIsAddGoodsModalOpen(true);
  };

  const handleCancel = () => {
    setIsAddGoodsModalOpen(false);
  };

  const onFinish: FormProps<GoodsCreateReq>['onFinish'] = async (value) => {
    try {
      console.log(value);
      let { data } = await createGoods(value)
      console.log(data)
      fetchListGoods()
      // success(data.password);
      // setIsModalOpen(false);
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
      <Button type="primary" onClick={showAddGoodsModal}>新增商品</Button>
      <Divider />
      <Table<DataType> columns={columns} dataSource={list} scroll={{ x: 'max-content' }} />

      <Modal title="新增商品" footer={null} open={isShowAddGoodsModal} onCancel={handleCancel} style={{ maxWidth: 480 }} destroyOnClose>
        <Divider />
        <div style={{ display: 'flex', marginTop: 20, alignItems: 'center' }}>
          <Form
            labelCol={{ span: 8 }}
            name="basic"
            autoComplete="off"
            onFinish={onFinish}
          >
            <Form.Item<FieldTypeCreateGoods>
              name="partnerId"
              label="合作商"
            >
              {/* <Select options={appCt.partnerList}
              // [
              //   { value: 'jack', label: 'Jack' },
              //   { value: 'lucy', label: 'Lucy' },
              //   { value: 'Yiminghe', label: 'yiminghe' },
              //   { value: 'disabled', label: 'Disabled', disabled: true },
              // ]}
              >
              </Select> */}
            </Form.Item>

            <Form.Item<FieldTypeCreateGoods>
              name="rechargeType"
              label="昵称"
              required
            >
              <Input style={{ width: 250 }} />
            </Form.Item>
            <Form.Item<FieldTypeCreateGoods>
              name="skuId"
              label="SKU"
            >
              <TextArea rows={4} style={{ width: 250 }} />
            </Form.Item>

            <Form.Item label={null} style={{ marginTop: 30 }}>
              <Button style={{ width: 100 }} size="large" block type="primary" htmlType="submit">
                确定
              </Button>
            </Form.Item>
          </Form >
        </div>
      </Modal>
    </>
  )
}

export default Goods