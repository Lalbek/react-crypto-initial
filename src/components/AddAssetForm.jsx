import React, { useState,useRef } from 'react'
import { useCrypto } from '../context/crypto-context'
import { Button,  DatePicker, Divider, Flex, Form, Input, InputNumber, Result, Select, Space, Typography } from 'antd'
import CoinInfo from './CoinInfo';

const validateMessages = {
  required: "${label} is required!",
  types: {
  number:"${label} is not valid number!",
  },
number:{
range:"${label} must be between ${min} and ${max}"
}
};

export default function AddAssetForm({onClose}) {
  const [form] = Form.useForm()
const [coin, setCoin] = useState(null)
const {crypto, addAsset} = useCrypto()
const [submitted, setSubmitted] = useState(false)
const assetRef = useRef()

if(submitted) {
return (
  <Result
  status="success"
  title="Added new asset"
  subTitle={`Added ${ assetRef.current.amount} of ${coin.name} by price ${ assetRef.current.price}`}
  extra={[
    <Button type="primary" key="console" onClick={onClose}>
      Close
    </Button>,
   
  ]}
/>
  )
}

if (!coin) {
return (
  <Select  
    style={{
      width: "100%",
    }}
    onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
    placeholder="Select Coin"
    options={crypto.map(coin => ({
    label:coin.name,
    value:coin.id,
    icon:coin.icon,
    }))}
    optionRender={(option) => (
      <Space>
      <img  style={{width:25}}  src={option.data.icon} alt={option.data.name}/> {option.data.label}
      </Space>
    )}
  />
  )
}
function onFinish(values){

  const newAsset = {
  id: coin.id,
  amount:values.amount,
  price:values.price,
  date:values.date ?.$d ?? new Data(),
  }
  assetRef.current = newAsset
setSubmitted(true)
addAsset(newAsset)
}

function handleAmountChange(value){
  const price = form.getFieldValue('price')
form.setFieldsValue({
total: +(value * price).toFixed(2),
})
}

function handlePriceChange(value){
  const amount = form.getFieldValue('amount')
  form.setFieldsValue({
  total: +(amount*coin.price).toFixed(2),
  })
  }

return(
  <Form
  form={form}
  name="basic"
  labelCol={{
    span: 4,
  }}
  wrapperCol={{
    span: 10,
  }}
  style={{
    maxWidth: 600,
  }}
  initialValues={{
  price:+coin.price.toFixed(2),
  }}
  onFinish={onFinish}
  validateMessages={validateMessages}
>
  <CoinInfo coin={coin} />
  <Divider />
  
    <Form.Item
      label="Amount"
      name="amount"
      rules={[
        {
          required: true,
          type:"number",
          min:0,
        },
      ]}
    >
      <InputNumber onChange={handleAmountChange} placeholder='Enter coin number' style={{ width:"100%"}}/>
    </Form.Item>

    <Form.Item label="Price" name="price"  >
      <InputNumber onChange={handlePriceChange} style={{ width:"100%"}} />
    </Form.Item>
    <Form.Item label="Date & Time" name="date"  >
      <DatePicker showTime/>
    </Form.Item>
    <Form.Item  label="Total" name="total"  >
      <InputNumber disabled style={{ width:"100%"}} />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit">
        Add Asset
      </Button>
    </Form.Item>
  </Form>
     
  )
}
