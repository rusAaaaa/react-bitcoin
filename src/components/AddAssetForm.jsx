import {
  Select,
  Space,
  Divider,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useState, useRef } from 'react';
import { useCrypto } from '../context/crypto-context';
import CoinInfo from './CoinInfo';

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} is not a valid number',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export default function AddAssetForm({ onClose }) {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef();

  function handleNext() {
    setSubmitted(false);
    setCoin(null);
    form.resetFields();
  }

  if (submitted) {
    return (
      <Result
        icon={<SmileOutlined style={{ fontSize: '48px', color: '#F0B90B' }} />}
        title={
          <div style={{ fontSize: '24px', color: '#F0B90B' }}>
            Great, we have done all the operations!
          </div>
        }
        extra={[
          <Button
            type="primary"
            key="next"
            onClick={handleNext}
            style={{
              backgroundColor: '#F0B90B',
              borderColor: '#F0B90B',
              color: '#000',
            }}
          >
            Add Another Asset
          </Button>,
          <Button
            type="primary"
            key="console"
            onClick={onClose}
            style={{
              marginLeft: '10px',
              backgroundColor: '#000',
              borderColor: '#000',
              color: '#F0B90B',
            }}
          >
            Thank you!
          </Button>,
        ]}
        style={{
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#1E1E1E',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          color: '#F0B90B',
        }}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{
          width: '100%',
          marginBottom: '20px',
          backgroundColor: '#000',
          color: '#F0B90B',
          borderRadius: '4px',
        }}
        dropdownStyle={{
          backgroundColor: '#1E1E1E',
          color: '#F0B90B',
        }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Select a coin"
        options={crypto.map((coin) => ({
          label: (
            <Space>
              <img
                style={{ width: 20, borderRadius: '50%' }}
                src={coin.icon}
                alt={coin.name}
              />
              {coin.name}
            </Space>
          ),
          value: coin.id,
        }))}
      />
    );
  }

  function onFinish(values) {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price || +coin.price.toFixed(2), // Автоматическое заполнение цены
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    setSubmitted(true);
    addAsset(newAsset);
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue('price');
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue('amount');
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  }

  function handleReset() {
    form.resetFields();
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#353333',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        color: '#F0B90B',
      }}
      initialValues={{
        price: coin ? +coin.price.toFixed(2) : undefined,
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />
      <Divider style={{ backgroundColor: '#F0B90B' }} />

      <Form.Item
        label={<span style={{ color: '#F0B90B' }}>Amount</span>}
        name="amount"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
          style={{
            width: '100%',
            borderRadius: '4px',
            backgroundColor: '#343023',
            color: '#F0B90B',
            border: '1px solid #F0B90B',
          }}
        />
      </Form.Item>

      <Form.Item
        label={<span style={{ color: '#F0B90B' }}>Price</span>}
        name="price"
        rules={[
          {
            required: false,
            type: 'number',
            min: 0,
            message: 'Price cannot be negative',
          },
        ]}
      >
        <InputNumber
          onChange={handlePriceChange}
          placeholder="Enter coin price"
          style={{
            width: '100%',
            borderRadius: '4px',
            backgroundColor: '#1E1E1E',
            color: '#F0B90B',
            border: '1px solid #F0B90B',
          }}
        />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker
          showTime
          style={{
            width: '100%',
            borderRadius: '4px',
            backgroundColor: '#1E1E1E',
            color: '#F0B90B',
            border: '1px solid #F0B90B',
          }}
          placeholder="Select date & time"
        />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber
          disabled
          style={{
            width: '100%',
            borderRadius: '4px',
            backgroundColor: '#1E1E1E',
            color: '#F0B90B',
            border: '1px solid #F0B90B',
          }}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: '#F0B90B',
              borderColor: '#F0B90B',
              color: '#000',
              borderRadius: '4px',
            }}
          >
            Add Asset
          </Button>
          <Button
            htmlType="button"
            onClick={handleReset}
            style={{
              backgroundColor: '#000',
              borderColor: '#F0B90B',
              color: '#F0B90B',
              borderRadius: '4px',
            }}
          >
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
