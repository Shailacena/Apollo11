import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, DatePickerProps, Flex, Form, Input, message, Select, SelectProps } from "antd";

const TradingRecordSearchForm = () => {
    const goods_state_options: SelectProps['options'] = [
      { value: 0, label: '正常' },
      { value: 1, label: '冻结' }
    ];
  
    const pay_state_options: SelectProps['options'] = [
      { value: 0, label: '未充值' },
      { value: 1, label: '部分充值' },
      { value: 2, label: '全部充值' }
    ];
  
    const callback_state_options: SelectProps['options'] = [
      { value: 0, label: '正常回调' },
      { value: 1, label: '未回调' }
    ];
  
    const [form] = Form.useForm();
  
    const onFinish = (values: any) => {
      console.log('Search values:', values);
      message.success('Search Success!');
    };
  
    const handleChange = (value: string | string[]) => {
      console.log(`Selected: ${value}`);
    };
  
    const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
      console.log(date, dateString);
    };
  
    return (
      <Form
        form={form}
        layout="inline"
        onFinish={onFinish}
        style={{ marginBottom: 16 }}
      >
        <Form.Item name="searchKeyword">
            <Input placeholder="平台单号" style={{ width: 80, marginLeft: 0, marginRight: 0 }}/>
        </Form.Item>
        <Form.Item name="searchKeyword">
          <Flex vertical={true}>
            <Input placeholder="商户单号" style={{ width: 80 }}/>
          </Flex>
        </Form.Item>
        <Form.Item name="searchKeyword">
          <Flex vertical={true}>
            <Input placeholder="官方单号" style={{ width: 80 }}/>
          </Flex>
        </Form.Item>
        <Form.Item name="searchKeyword">
          <Flex vertical={true}>
            <Input placeholder="订单金额" style={{ width: 80 }}/>
          </Flex>
        </Form.Item>
        <Form.Item name="searchKeyword">
          <Flex vertical={true}>
            <Input placeholder="下单账号" style={{ width: 80 }}/>
          </Flex>
        </Form.Item>
        <Form.Item name="searchKeyword">
          <Flex vertical={true}>
            <Input placeholder="店铺" style={{ width: 80 }}/>
          </Flex>
        </Form.Item>
        <Form.Item name="searchKeyword">
          <Flex vertical={true}>
            <Input placeholder="skuid" style={{ width: 80 }}/>
          </Flex>
        </Form.Item>
        <Form.Item name="searchKeyword">
          <Flex vertical={true}>
            <Input placeholder="ip" style={{ width: 80 }}/>
          </Flex>
        </Form.Item>
        <Form.Item>
          <Select
            size="middle"
            placeholder="Type"
            defaultValue={'支付类型'}
            onChange={handleChange}
            style={{ width: '100px' }}
            options={goods_state_options}
          />
        </Form.Item>
        <Form.Item>
          <Select
            size="middle"
            placeholder="State"
            defaultValue={'订单状态'}
            onChange={handleChange}
            style={{ width: '100px' }}
            options={pay_state_options}
          />
        </Form.Item>
        <Form.Item>
          <Select
            size="middle"
            placeholder="State"
            defaultValue={'回调状态'}
            onChange={handleChange}
            style={{ width: '100px' }}
            options={callback_state_options}
          />
        </Form.Item>
        <Form.Item>
          <DatePicker onChange={onDateChange}style={{ width: 100 }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
          </Button>
        </Form.Item>
      </Form>
    );
  };

  export default TradingRecordSearchForm