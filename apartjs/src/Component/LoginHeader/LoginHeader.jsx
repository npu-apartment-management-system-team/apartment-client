import React from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';

const items = [
    {
      label: 'Register',
      key: 'R',
      icon: <MailOutlined />,
    },
    {
      label: 'Login',
      key: 'L',
      icon: <AppstoreOutlined />,
    },
  ];

export default function LoginHeader(props) {
  const [current, setCurrent] = useState('L');
  const onClick = (e) => {
    // console.log('click ', e);
    setCurrent(e.key);//设置当前被选中的菜单项
    props.changeNav(e.key)
  };
  return (
    <div>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </div>
  )
}
