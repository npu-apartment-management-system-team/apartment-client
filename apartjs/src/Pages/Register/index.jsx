import React, { useState } from 'react'
import { UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

export default function Register() {
  const [username,setUsername]=useState("");
  const [password1,setPassword1]=useState("");
  const [password2,setPassword2]=useState("");
  const [sata,setSata]=useState("")
  function usernamechange(e){
    setUsername(()=>{
        return e.target.value
    })
  }
  function checkpassword(p1,p2){//当前后两次密码不同时，将密码框变红警示
    if(p2!==""&&p1!==p2){
      setSata(()=>{
        return "error"
      })
    }else{
      setSata(()=>{
        return ""
      })
    }
  }
  function passwordchange1(e){
    setPassword1(()=>{
        return e.target.value
    })
    checkpassword(e.target.value,password2);
  }
  function passwordchange2(e){
    setPassword2(()=>{
        return e.target.value
    })
    checkpassword(password1,e.target.value);
  }
  function registerClick(e){
    if(password1!==password2){
      alert("")
    }
  }
  return (
    <div>
      <Input onChange={usernamechange} placeholder="default size" prefix={<UserOutlined />} />
      <br/><br/>
      <Input.Password
        onChange={passwordchange1}
        placeholder="input password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <br/><br/>
      <Input.Password
        status={sata}
        onChange={passwordchange2}
        placeholder="password again"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <br/><br/>
      <Button size="large" type='primary' onClick={registerClick}>SignUP</Button>
    </div>
  )
}
