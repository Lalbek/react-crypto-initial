
import { Button, Drawer, Layout, Modal, Select, Space } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CryptoInfoModal from '../CryptoInfoModal';
import AddAssetForm from '../AddAssetForm';


const headerStyle = {
    width:'100%',
    textAlign:'center',
    height: 60,
    padding:'1rem',
    justifyContent:'space-between',
    alignItems:'center',
    display:'flex',
  };
  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);


export default function AppHeader() {
  const[select, setSelect] = useState(false)
  const[modal, setModal] = useState(false)
  const[coin, setCoin] = useState(null)
  const[drawer, setDrawer] = useState(false)
  const {crypto} = useCrypto()

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect((prev) => !prev);
      }
    };
  
    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  }, []);

  function handleSelect(value) {
    setModal(true)
    setCoin(crypto.find((c) => c.id === value ))

    }
  return (
     <Layout.Header style={headerStyle}> 
 <Select  
    style={{
      width: 250,
    }}
    open={select}
    onClick={() => setSelect(prev=>!prev)}
    onSelect={handleSelect}
    value='press / open'
    optionLabelProp='label'
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
   <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>
   <Modal  open={modal}  onCancel={() => setModal(false)} footer={null}>
     <CryptoInfoModal coin={coin} />
      </Modal>
      <Drawer width={600} title="Add Asset"
       onClose={() => setDrawer(false)}
       open={drawer}
       destroyOnClose
       >
     <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
</Layout.Header>
);
}
