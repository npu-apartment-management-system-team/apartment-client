import{_ as s}from"./index-b9788df0.js";import{s as o,c as e,b as t}from"./vant-0fe543f7.js";const n=a=>{t({duration:0,forbidClick:!0,message:a})},c=async()=>{n("正在加载您的个人信息");try{const{data:a}=await s.get("/api/user/user/info");return a}catch(a){o({type:"danger",message:`首页初始化失败,${a.message}`})}finally{e()}return null};export{c as h};
