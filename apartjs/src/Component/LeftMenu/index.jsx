import React, { useEffect } from 'react'
import { Menu } from 'antd';

// const items = [内部渲染items似乎不可行，直接传入完整items来使用
//   getItem('Option 1', '1', <PieChartOutlined />),
//   getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('Option 3', '3', <ContainerOutlined />),
//   // getItem('Navigation One', 'sub1', <MailOutlined />, [
//   //   getItem('Option 5', '5'),
//   //   getItem('Option 6', '6'),
//   //   getItem('Option 7', '7'),
//   //   getItem('Option 8', '8'),
//   // ]),
//   // getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
//   //   getItem('Option 9', '9'),
//   //   getItem('Option 10', '10'),
//   //   getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
//   // ]),
// ];

export default function LeftMenu(props) {
  return (
    <div>
      <div>
        <Menu
            // defaultSelectedKeys={['1']}
            // defaultOpenKeys={['sub1']}
            mode={props.mode}
            theme={props.theme}
            items={props.textitem}
        /> 
      </div>
    </div>
  )
}
