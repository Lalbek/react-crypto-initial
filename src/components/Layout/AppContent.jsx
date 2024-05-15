import React from 'react'
import { Layout, Typography } from 'antd'
import {useCrypto} from '../../context/crypto-context'

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem'
  };
export default function AppContent() {
const {assets, crypto} = useCrypto()

  return  <Layout.Content style={contentStyle}>
    <Typography.Title level={2} style={{textAlign:'left', color:'white'}}>Total:12300</Typography.Title>
  </Layout.Content>
}
