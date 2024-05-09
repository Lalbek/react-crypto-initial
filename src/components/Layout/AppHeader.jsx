import React from 'react'
import { Layout } from 'antd';


const headerStyle = {
    width: "100%",
textAlign:"center",
    height: 60,
    padding:"1rem",
background:"white",
justifyContent:"space-between",
alignItems:"center"
  };

export default function AppHeader() {
  return  <Layout.Header style={headerStyle}>Header</Layout.Header>
}
