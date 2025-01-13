import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, DatePickerProps, Flex, Form, Input, message, Select, SelectProps } from "antd";

const PartnerSearchForm = () => {
    const state_options: SelectProps['options'] = [
      { value: 0, label: '正常' },
      { value: 1, label: '冻结' }
    ];
  
    const level_options: SelectProps['options'] = [
      { value: 0, label: '0' },
      { value: 1, label: '1' },
      { value: 2, label: '2' }
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
            <Input placeholder="合作商名称" style={{ width: 100, marginLeft: 0, marginRight: 0 }}/>
        </Form.Item>
        <Form.Item>
          <Select
            size="middle"
            placeholder="Type"
            defaultValue={'状态'}
            onChange={handleChange}
            style={{ width: '80px' }}
            options={state_options}
          />
        </Form.Item>
        <Form.Item>
          <Select
            size="middle"
            placeholder="State"
            defaultValue={'等级'}
            onChange={handleChange}
            style={{ width: '80px' }}
            options={level_options}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
          </Button>
        </Form.Item>
      </Form>
    );
  };

  export default PartnerSearchForm