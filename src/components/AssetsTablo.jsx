import React from 'react'

import { Table } from 'antd';
import { useCrypto } from '../context/crypto-context';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend']
    },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
];


 
export default function AssetsTablo() {
    const {assets} = useCrypto()
    const data = assets.map((a) => ({
    key: a.id,
    name:a.name,
    price:a.price,
    amount:a.amount,
    }))
  return (
    <div>
       <Table columns={columns} dataSource={data}  pagination={false}/>
    </div>
  )
}
