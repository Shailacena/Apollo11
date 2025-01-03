import { SearchOutlined } from '@ant-design/icons';
import { Space, Table, Tag, Button, Form, message, Flex, Input, Select, Card } from 'antd';
import type { SelectProps, TableProps } from 'antd';
import UploadDialog from '../components/UploadDialog';
import CurrentLocation from '../components/CurrentLocation';

interface DataType {
  key: string;
  order_total_amount: string;
  success_total_amount: string;
  order_total_num: number;
  time: number;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '日期', key: 'time', dataIndex: 'time', align: 'center', render: (text) => {
      const date = new Date(text);
      return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    }
  },
  {
    title: '订单总金额', dataIndex: 'order_total_amount', key: 'order_total_amount', align: 'center',
  },
  {
    title: '成功总金额', key: 'success_total_amount', dataIndex: 'success_total_amount', align: 'center',
  },
  {
    title: '总订单数', key: 'order_total_num', dataIndex: 'order_total_num', align: 'center',
  },
];

const data: DataType[] = [];

function CashFlowDaily() {
  for (let i = 0; i < 50; i++) {
    data.push({
      key: i.toString(), order_total_amount: i.toString(), success_total_amount: '123', order_total_num: 500, balance: 30000, time: 1735131468000
    })
  }
  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <CurrentLocation />
      </div>
      <Card>
        <div style={{ marginBottom: 10 }}>
          <Button type="primary" onClick={() => toggleModal(0, true)}>
            导出
          </Button>
        </div>
        <Table<DataType>
          bordered
          size='small'
          pagination={{ pageSize: 12 }} // 分页
          scroll={{ x: 'max-content' }}
          columns={columns}
          dataSource={data} />
      </Card>
    </>
  )
}

const toggleModal = (idx: number, target: boolean) => {
  message.warning('功能还未完成...');
};

export default CashFlowDaily