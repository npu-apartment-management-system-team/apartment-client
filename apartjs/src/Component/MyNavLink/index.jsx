import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MyNavLink(props) {
  return (
    <div>
      <NavLink activeClassName='atguigu' className="list-group-item active" {...props}/>
    </div>
  )
}
