import React from 'react';
import { EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';
import {useState} from 'react';
import axios from 'axios';
import {encrypt} from '../../util/jsencrypt'

export default function Login() {
    let initusername:String,initpassword:String;
    initusername="";
    initpassword="";
    const [username,setUsername]=useState(initusername);
    const [password,setPassword]=useState(initpassword);
    function usernamechange(e){
        setUsername(()=>{
            return e.target.value
        })
    }
    function passwordchange(e){
        setPassword(()=>{
            return e.target.value
        })
    }
    function loginClick(){//登录请求
        axios.defaults.baseURL='https://apartment-server.wangminan.me';
        let login:{username:String,password:String};
        login={username:"",password:""};
        login.username=username;
        login.password=password;
    }
  return (
    <div>
      <Input
      onChange={usernamechange}
      placeholder="Enter your username"
      prefix={<UserOutlined className="site-form-item-icon" />}
      suffix={
        <Tooltip title="Extra information">
          <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      }
      />
      <br/>
      <br/>
      <Input.Password
        onChange={passwordchange}
        placeholder="input password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <br/>
      <br/>
      <Button size="large" type='primary' onClick={loginClick}>Login</Button>
    </div>
  )
}
