import{_ as o}from"./index-a79a0e8e.js";import{s as r,c as e,b as n}from"./vant-70475d99.js";const i=()=>{window.sessionStorage.removeItem("currentUser")},t=s=>{n({duration:0,forbidClick:!0,message:s})},u=async()=>{t("正在退出登录");try{i(),await o.post("/api/auth/loginuser/logout")}catch{}finally{e()}},d=async s=>{t("正在修改密码");try{const{data:a}=await o.put("/api/user/password",s);return a}catch(a){r({type:"danger",message:`首页初始化失败,${a.message}`})}finally{e()}return null};export{d as a,u as h};