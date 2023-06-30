import { useEffect, useState } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import MyNavLink from './Component/MyNavLink';
import './App.css'
import Login from './Pages/Login/Login'
import LoginHeader from './Component/LoginHeader/LoginHeader';
import Register from './Pages/Register';
import LeftMenu from './Component/LeftMenu';
import Layout, { Content, Header } from 'antd/es/layout/layout';
import {PieChartOutlined} from '@ant-design/icons'
import Sider from 'antd/es/layout/Sider';
import axios from 'axios';
import { Space } from 'antd';
import imgUrl from './assets/images/apartment.svg'
import Welcome from './Component/Welcome';
import _axios from './api';
import ApartTable from './Pages/ApartTable';

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  // color: '#fff',
  // backgroundColor: '#3ba0e9',
};

function getItem(label, key, icon, children, type) {
  return {
    key,icon,children,label,type,
  };
}

const textitem=[
  {},
  {
    id:1,
    name:"超级管理员",
    item:[
      getItem('管理员账号管理', '1', <PieChartOutlined />),
      getItem('外部单位管理', '2', <PieChartOutlined />),
      getItem('公寓管理', '3', <PieChartOutlined />),
      getItem('房间管理', '4', <PieChartOutlined />),
    ]
  },
  {
    id:2,
    name:"入住办理员",
    item:[
      getItem('入住申请审核', '1', <PieChartOutlined />),
      getItem('床位编号录入', '2', <PieChartOutlined />),
      getItem('人脸录入确认', '3', <PieChartOutlined />),
    ],
  },
  {
    id:3,
    name:"宿舍调配员",
    item:[
      getItem('住/调宿申请', '1', <PieChartOutlined />),
      getItem('公寓管理', '2', <PieChartOutlined />),
      getItem('房间管理', '3', <PieChartOutlined />),
      getItem('床位管理', '4', <PieChartOutlined />),
    ],
  },
]

function App() {
  const [loged,changeLoged]=useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [lognum,changeLognum]=useState(0);
  const [usermsg,setUserMsg]=useState(null);
  const navigate = useNavigate()
  useEffect(()=>{//建立长连结
    axios.defaults.baseURL="https://apartment-server.wangminan.me"
    axios.get('/api/auth/hello')
  },[])
  // function changeNav(keyword){
  //   if(keyword=="L"){
  //     navigate('/login')
  //   }else{
  //     navigate('/register')
  //   }
  // }
  function getApart(page,pagesize){
    _axios({
      method:'GET',
      url:'/api/management/apartment',
      pageNum:page,
      pageSize:pagesize,
    }).then(response=>{
      const {list,total}=response.data
      console.log(total)
      console.log(list)
    })
  }
  function login(num,user){
    changeLoged(()=>{
      return true;
    })
    changeLognum(num);
    setUserMsg(user);
    changeLognum(3);
    getApart(1,10)
  }

  if(loged){
    return (
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider style={siderStyle} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            {/* <div className="demo-logo-vertical" /> */}
            <LeftMenu mode="inline" theme="dark" textitem={textitem[lognum].item} />
          </Sider>
          <Layout>
            <Content style={contentStyle}>
              <Welcome job={textitem[lognum].name} usermsg={usermsg} />
              <ApartTable/>
            </Content>
          </Layout>
        </Layout>
      </Space>
    )
  }
  else{
    return (
    <div className="login-box">
      <div className='glass'>
        <div className='innerlogin'>
          <p>公寓员工管理系统</p>
          <img src={imgUrl}/>
          {/* <div>
            <LoginHeader changeNav={changeNav}/>
          </div> */}
            {/* <Login/> */}
            {/* <MyNavLink to="/login">login</MyNavLink>
            <MyNavLink to="/register">register</MyNavLink> */}

            {/* React v6新特性，移除了switch和redirect，switch被Routes替代，components被elements替代 */}
          <Routes>
            <Route path="/login" element={<Login login={login}/>} />
            <Route path="/register" element={<Register/>} />
            {/* 重定向的实现需要借助Navigate */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
    )
  }
}

export default App
