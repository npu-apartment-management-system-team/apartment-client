import{u as n}from"./vue-router-cb3f8704.js";import{a as i}from"./js-cookie-edb2da2a.js";import{s as t}from"./vant-0fe543f7.js";import{h as p}from"./index-2d19de49.js";import{u as m}from"./index-5fa6e342.js";import{_ as u}from"./index-40edb61c.js";import{c as _,R as d,V as l,Z as f,_ as y,W as h}from"./@vue-b391e2c0.js";import"./@vant-803324af.js";import"./index-b9788df0.js";import"./axios-4a70c6fc.js";import"./pinia-49471876.js";import"./@vueuse-9a68d694.js";import"./pinia-plugin-persistedstate-c44f3b64.js";const g=s=>(f("data-v-4988c442"),s=s(),y(),s),S={class:"welcome-banner"},w=g(()=>h("h1",null,"正在处理绑定信息",-1)),B=[w],v={__name:"BindAlipaySuccess",setup(s){const o=n(),r=m(),c=async()=>{const e=await p();e!==null&&e.code===2e3?r.$patch(a=>{a.currentUser=e.result}):e!==null?t({type:"danger",message:`首页初始化失败,${e.msg},请刷新页面重试`}):t({type:"danger",message:"首页初始化失败,请刷新页面重试"})};return _(()=>{const e=o.currentRoute.value.query.token;e===void 0?(t({type:"danger",message:"绑定失败,3s后跳转回登录页面",duration:3e3}),setTimeout(async()=>{await o.push("/login")},3e3)):(i.set("token",e),t({type:"success",message:"绑定成功,3s后执行跳转",duration:3e3}),setTimeout(async()=>{await c(),await o.push("/main/my/my-home")},3e3))}),(e,a)=>(d(),l("div",S,B))}},G=u(v,[["__scopeId","data-v-4988c442"]]);export{G as default};
