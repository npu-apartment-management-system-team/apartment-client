import React from 'react';
import { EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';
import {useState} from 'react';
import _axios from '../../api';
import { encrypt } from '../../utils/jsencrypt';

export default function Login(props) {
    // const initusername="",initpassword=""
    const initusername="13777864453",initpassword="root"
    const [username,setUsername]=useState(initusername);
    const [password,setPassword]=useState(initpassword);
    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });
      setTimeout(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = false;
          return newLoadings;
        });
      }, 6000);
    };
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
      enterLoading(0)
        _axios({
          method:'POST',
          url:'/api/auth/login/password',
          //请求体参数
          data:{
            username:username,
            password:encrypt(password),
          }
        }).then(response=>{
          const {code,result}=response.data
          // console.log('code is'+code)
          if(code===2000){
            window.localStorage.setItem('token', result.token)
            props.login(result.role,result.user);
          }
          else{
            const {msg}=response.data
            setPassword("")//登录失败时清空密码
            alert(msg)
          }
        })
    }
  return (
    <div>
      <Input
      value={username}
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
        value={password}
        onChange={passwordchange}
        placeholder="input password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <br/>
      <br/>
      <Button size="large" type="primary" loading={loadings[0]} onClick={loginClick}>
        Login
      </Button>
    </div>
  )
}
