import{b as m,s,c,N as ce,F as pe,B as ve,U as ge,d as ye,f as fe,R as be,g as he,P as _e,h as ke,i as Ce,j as Ve,e as Ue}from"./vant-70475d99.js";import{u as we}from"./vue-router-05758286.js";import{v as j,b as S,c as Ie}from"./validatorUtil-fa8d24ca.js";import{u as xe}from"./index-e822aa76.js";import{s as $e}from"./pinia-f48910fc.js";import{s as ze,b as E,p as F,__tla as Ae}from"./ocrUtil-32f59570.js";import{_ as f}from"./index-a79a0e8e.js";import{h as Ze}from"./index-1bb4b957.js";import{_ as Ne,__tla as Pe}from"./index-affbebf5.js";import{b as i,c as Re,R as v,V as je,C as r,u as w,U as n,K as g,i as Se,S as y,Y as C,W as qe}from"./@vue-802b571a.js";import"./@vant-176bc72f.js";import"./ali-oss-9dda75ed.js";import"./axios-4a70c6fc.js";import"./js-cookie-edb2da2a.js";import"./@vueuse-94ed6524.js";import"./pinia-plugin-persistedstate-c44f3b64.js";let K,Be=Promise.all([(()=>{try{return Ae}catch{}})(),(()=>{try{return Pe}catch{}})()]).then(async()=>{let q,B,G;q={class:"revise-form"},B={class:"submit-revise-btn"},G={__name:"ReviseInfo",setup(Ge){const J=we(),O=xe(),{currentUser:o}=$e(O),l=i({username:"",departmentId:o.value.departmentId,name:o.value.name,personalId:o.value.personalId,personalCardUrl:o.value.personalCardUrl,faceUrl:o.value.faceUrl,email:o.value.email,sex:o.value.sex,isCadre:o.value.isCadre});let W="";const I=i(!0),b=i({phone:"",code:""}),N=i(""),L=async()=>{if(!j(l.value.username)){s({type:"danger",message:"\u624B\u673A\u53F7\u683C\u5F0F\u4E0D\u6B63\u786E"});return}m({duration:0,forbidClick:!0,message:"\u8BF7\u6C42\u9A8C\u8BC1\u7801\u53D1\u9001\u4E2D"});const a={phone:l.value.username};try{const{data:e}=await f.post("/api/auth/sendsms",a);if(e.code!==null&&e.code===2e3){s({type:"success",message:"\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001"}),N.value="300s",I.value=!1;let d=300;const u=setInterval(()=>{d--,N.value=d+"s",d===0&&(clearInterval(u),I.value=!0)},1e3)}else s({type:"danger",message:`\u9A8C\u8BC1\u7801\u53D1\u9001\u5931\u8D25,${e.msg},\u8BF7\u91CD\u8BD5`})}catch(e){s({type:"danger",message:`\u670D\u52A1\u5668\u5F02\u5E38${e},\u8BF7\u901A\u77E5\u7BA1\u7406\u5458`})}finally{c()}},h=i(!1),M=async()=>{if(b.value.phone=l.value.username,!S(b.value.code)||!j(b.value.phone)){s({type:"danger",message:"\u683C\u5F0F\u4E0D\u6B63\u786E"});return}m({duration:0,forbidClick:!0,message:"\u8BF7\u6C42\u9A8C\u8BC1\u7801\u9A8C\u8BC1\u4E2D"});try{const{data:a}=await f.post("/api/auth/checksms",b.value);a.code!==null&&a.code===2e3?(s({type:"success",message:"\u9A8C\u8BC1\u7801\u9A8C\u8BC1\u6210\u529F"}),h.value=!0):s({type:"danger",message:`\u9A8C\u8BC1\u7801\u9A8C\u8BC1\u5931\u8D25,${a.msg},\u8BF7\u91CD\u8BD5`})}catch(a){s({type:"danger",message:`\u670D\u52A1\u5668\u5F02\u5E38${a},\u8BF7\u901A\u77E5\u7BA1\u7406\u5458`})}finally{c()}},_=i({email:"",code:""}),x=i([]),$=i(!1),z=i(!0),P=i(""),Q=async()=>{if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(l.value.email)){s({type:"danger",message:"\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E"});return}m({duration:0,forbidClick:!0,message:"\u8BF7\u6C42\u9A8C\u8BC1\u7801\u53D1\u9001\u4E2D"});const a={email:l.value.email};try{const{data:e}=await f.post("/api/auth/sendmail",a);if(e.code!==null&&e.code===2e3){s({type:"success",message:"\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001"}),P.value="300s",z.value=!1;let d=300;const u=setInterval(()=>{d--,P.value=d+"s",d===0&&(clearInterval(u),z.value=!1)},1e3)}else s({type:"danger",message:`\u9A8C\u8BC1\u7801\u53D1\u9001\u5931\u8D25,${e.msg},\u8BF7\u91CD\u8BD5`})}catch(e){s({type:"danger",message:`\u670D\u52A1\u5668\u5F02\u5E38${e},\u8BF7\u901A\u77E5\u7BA1\u7406\u5458`})}finally{c()}},Y=async()=>{if(_.value.email=l.value.email,!S(_.value.code)||/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(_.value.code)){s({type:"danger",message:"\u683C\u5F0F\u4E0D\u6B63\u786E"});return}m({duration:0,forbidClick:!0,message:"\u8BF7\u6C42\u90AE\u7BB1\u9A8C\u8BC1\u4E2D"});try{const{data:a}=await f.post("/api/auth/checkmail",_.value);a.code!==null&&a.code===2e3?(s({type:"success",message:"\u90AE\u7BB1\u9A8C\u8BC1\u6210\u529F"}),$.value=!0):s({type:"danger",message:`\u90AE\u7BB1\u9A8C\u8BC1\u5931\u8D25,${a.msg},\u8BF7\u91CD\u8BD5`})}catch(a){s({type:"danger",message:`\u670D\u52A1\u5668\u5F02\u5E38${a},\u8BF7\u901A\u77E5\u7BA1\u7406\u5458`})}finally{c()}},H=a=>a.content.size>10*1024*1024?(s({type:"danger",message:"\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC710M"}),!1):/image\/(png|jpg|jpeg|JPG|PNG)/.test(a.file.type)?!0:(s({type:"danger",message:"\u6587\u4EF6\u683C\u5F0F\u4E0D\u6B63\u786E"}),!1);let k=i("");const T=async a=>{if(H(a)){m({duration:0,forbidClick:!0,message:"\u6B63\u5728\u8BC6\u522B\u8EAB\u4EFD\u8BC1"});try{const{data:e}=await ze(a);if(e.code===2e3){const d=JSON.parse(e.data);if(d.data.face!==null){const u=d.data.face;if(u.warning.isCopy!==0||u.warning.isReshoot!==0){s({type:"danger",message:"\u8BC6\u522B\u5230\u7FFB\u62CD\u6216\u590D\u5236\u3002\u8BF7\u8BC6\u522B\u539F\u4EF6\u8EAB\u4EFD\u8BC1"});return}l.value.name=u.data.name,l.value.personalId=u.data.idNumber,l.value.sex=u.data.sex==="\u7537"?0:1,k.value=u.data.sex,c(),m({duration:0,forbidClick:!0,message:"\u6B63\u5728\u4E0A\u4F20\u8EAB\u4EFD\u8BC1\u7167\u7247\u5230\u540E\u53F0\u5B58\u50A8"});const U=E(a.content,a.file.name),p=await F("apartment/user/idcard/",l.value.name+"_"+U.name,U);l.value.personalCardUrl=p.url}else s({type:"danger",message:"\u8EAB\u4EFD\u8BC1\u8BC6\u522B\u5931\u8D25,\u8BF7\u91CD\u8BD5"})}else s({type:"danger",message:`\u8EAB\u4EFD\u8BC1\u8BC6\u522B\u5931\u8D25,${e.msg},\u8BF7\u91CD\u8BD5`})}catch(e){s({type:"danger",message:`\u670D\u52A1\u5668\u5F02\u5E38${e},\u8BF7\u901A\u77E5\u7BA1\u7406\u5458`})}finally{c()}}},A=i([]),Z=i([]),R=[],V=i(!1),X=({selectedValues:a})=>{l.value.departmentId=R.find(e=>e.value===a[0]).text,V.value=!1},ee=async()=>{m({duration:0,forbidClick:!0,message:"\u6B63\u5728\u83B7\u53D6\u90E8\u95E8\u5217\u8868"});try{const{data:a}=await f.get("/api/management/department/list");a.code===2e3?(Z.value=a.result.list,Z.value.forEach(e=>{R.push({text:e.name,value:e.id})})):s({type:"danger",message:a.message})}catch(a){s({type:"danger",message:`\u670D\u52A1\u5668\u5F02\u5E38${a},\u8BF7\u901A\u77E5\u7BA1\u7406\u5458`})}finally{c()}},ae=async a=>{m({duration:0,forbidClick:!0,message:"\u4EBA\u8138\u7167\u7247\u4E0A\u4F20\u4E2D"});try{const e=E(a.content,a.file.name);if(!e.name.endsWith("jpg"))return s({type:"danger",message:"\u4EBA\u8138\u7167\u7247\u683C\u5F0F\u4E0D\u6B63\u786E"}),!1;const d=await F("apartment/user/face/",l.value.name+"_"+e.name,e);return d.url!==void 0&&(l.value.faceUrl=d.url),!0}catch{s({type:"danger",message:"\u4EBA\u8138\u7167\u7247\u4E0A\u4F20\u5931\u8D25,\u8BF7\u91CD\u8BD5"})}finally{c()}return!1},le=async()=>{const a=await Ze();a!==null&&a.code===2e3?O.$patch(e=>{e.currentUser=a.result}):a!==null?s({type:"danger",message:`\u9996\u9875\u521D\u59CB\u5316\u5931\u8D25,${a.msg},\u8BF7\u5237\u65B0\u9875\u9762\u91CD\u8BD5`}):s({type:"danger",message:"\u9996\u9875\u521D\u59CB\u5316\u5931\u8D25,\u8BF7\u5237\u65B0\u9875\u9762\u91CD\u8BD5"})},se=async()=>{try{if(h.value||s({type:"danger",message:"\u8BF7\u5148\u9A8C\u8BC1\u624B\u673A\u53F7"}),l.value.faceUrl!==W){if(m({duration:0,forbidClick:!0,message:"\u68C0\u6D4B\u5230\u4EBA\u8138\u6570\u636E\u53D1\u751F\u53D8\u5316,\u6B63\u5728\u4E0A\u4F20"}),!await ae(x.value[0]))return;c(),m({duration:0,forbidClick:!0,message:"\u4EBA\u8138\u6570\u636E\u4E0A\u4F20\u6210\u529F,\u6B63\u5728\u8FDB\u884C\u4EBA\u8BC1\u6838\u9A8C"});const e={faceUrl:l.value.faceUrl,name:l.value.name,personalId:l.value.personalId};c(),m({duration:0,forbidClick:!0,message:"\u4EBA\u8BC1\u6838\u9A8C\u6210\u529F,\u6B63\u5728\u8FDB\u884C\u4E0A\u4F20\u4FEE\u6539\u4FE1\u606F"});const d=await f.post("/api/auth/faceVerification",e);if(!d.data.code===2e3){c(),s({type:"danger",message:`\u4EBA\u8BC1\u6838\u9A8C\u5931\u8D25,${d.data.msg},\u8BF7\u91CD\u8BD5`});return}}A.value.indexOf("isCadre")!==-1&&(l.value.isCadre=1),l.value.departmentId=Z.value.find(e=>e.name===l.value.departmentId).id,m({duration:0,forbidClick:!0,message:"\u6B63\u5728\u63D0\u4EA4\u4FEE\u6539\u4FE1\u606F"});const{data:a}=await f.put(`/api/user/user/${o.value.id}`,l.value);a.code===2e3?(s({type:"success",message:"\u6210\u529F\u4FEE\u6539\u60A8\u7684\u4E2A\u4EBA\u4FE1\u606F"}),await le(),await J.go(0)):s({type:"danger",message:a.message})}catch(a){s({type:"danger",message:`\u670D\u52A1\u5668\u5F02\u5E38${a},\u8BF7\u901A\u77E5\u7BA1\u7406\u5458`})}finally{c()}};return Re(async()=>{k.value=o.value.sex===0?"\u7537":"\u5973",await ee(),x.value.push({url:o.value.faceUrl,isImage:!0}),o.value.isCadre===1&&A.value.push("isCadre"),l.value.departmentId=Z.value.find(a=>a.id===o.value.departmentId).name,W=o.value.faceUrl}),(a,e)=>{const d=ce,u=ve,U=ge,p=ye,D=fe,te=be,re=he,ue=_e,de=ke,ne=Ce,oe=Ve,ie=Ue,me=pe;return v(),je("div",q,[r(d,{title:"\u4FEE\u6539\u4E2A\u4EBA\u4FE1\u606F","left-text":"\u8FD4\u56DE","left-arrow":"",onClickLeft:e[0]||(e[0]=t=>w(J).go(-1))}),r(me,{style:{"margin-top":"5%"},onSubmit:e[18]||(e[18]=t=>se())},{default:n(()=>[r(ie,{inset:"",style:{padding:"1%"}},{default:n(()=>[r(U,{style:{width:"60%",margin:"0 auto"},"after-read":T},{default:n(()=>[r(u,{plain:"",block:"",type:"primary",size:"small"},{default:n(()=>[g(" \u62CD\u6444\u60A8\u7684\u8EAB\u4EFD\u8BC1-\u6B63\u9762-\u4EE5\u81EA\u52A8\u586B\u5145 ")]),_:1})]),_:1}),r(p,{modelValue:l.value.personalId,"onUpdate:modelValue":e[1]||(e[1]=t=>l.value.personalId=t),center:"",disabled:"",clearable:"",label:"\u8EAB\u4EFD\u8BC1\u53F7",placeholder:"\u8BE5\u4F4D\u7F6E\u4F1A\u88AB\u81EA\u52A8\u586B\u5145"},null,8,["modelValue"]),r(p,{modelValue:l.value.name,"onUpdate:modelValue":e[2]||(e[2]=t=>l.value.name=t),center:"",disabled:"",clearable:"",label:"\u771F\u5B9E\u59D3\u540D",placeholder:"\u8BE5\u4F4D\u7F6E\u4F1A\u88AB\u81EA\u52A8\u586B\u5145"},null,8,["modelValue"]),r(p,{modelValue:w(k),"onUpdate:modelValue":e[3]||(e[3]=t=>Se(k)?k.value=t:k=t),center:"",disabled:"",clearable:"",label:"\u6027\u522B",placeholder:"\u8BE5\u4F4D\u7F6E\u4F1A\u88AB\u81EA\u52A8\u586B\u5145"},null,8,["modelValue"]),r(re,null,{default:n(()=>[r(te,{class:"personCard"},{default:n(()=>[r(D,{span:"8"},{default:n(()=>[g(" \u4EBA\u8138\u7167\u7247 ")]),_:1}),r(D,{span:"16"},{default:n(()=>[r(U,{capture:"camera",modelValue:x.value,"onUpdate:modelValue":e[4]||(e[4]=t=>x.value=t),"max-count":1,"max-size":10*1024*1024},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),r(p,{modelValue:l.value.username,"onUpdate:modelValue":e[5]||(e[5]=t=>l.value.username=t),name:"\u624B\u673A\u53F7",label:"\u624B\u673A\u53F7",placeholder:"\u8BF7\u8F93\u5165\u624B\u673A\u53F7",type:"tel",clearable:"",rules:[{validator:w(j),message:"\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u624B\u673A\u53F7\u7801"}],disabled:h.value},null,8,["modelValue","rules","disabled"]),h.value?C("",!0):(v(),y(p,{key:0,modelValue:b.value.code,"onUpdate:modelValue":e[7]||(e[7]=t=>b.value.code=t),center:"",clearable:"",type:"digit",label:"\u77ED\u4FE1\u9A8C\u8BC1\u7801",placeholder:"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",rules:[{validator:w(S),message:"\u5E94\u4E3A4\u4F4D\u6570\u5B57"}]},{button:n(()=>[I.value?(v(),y(u,{key:0,size:"small",type:"primary",onClick:e[6]||(e[6]=t=>L()),disabled:h.value},{default:n(()=>[g(" \u53D1\u9001\u9A8C\u8BC1\u7801 ")]),_:1},8,["disabled"])):I.value?C("",!0):(v(),y(u,{key:1,size:"small",type:"primary",disabled:"",loading:"","loading-text":N.value},null,8,["loading-text"]))]),_:1},8,["modelValue","rules"])),h.value?C("",!0):(v(),y(u,{key:1,plain:"",block:"",type:"primary",size:"small",style:{width:"40%",margin:"1% auto"},onClick:e[8]||(e[8]=t=>M())},{default:n(()=>[g("\u9A8C\u8BC1\u624B\u673A\u53F7\u7801 ")]),_:1})),r(p,{modelValue:l.value.email,"onUpdate:modelValue":e[9]||(e[9]=t=>l.value.email=t),center:"",clearable:"",label:"\u90AE\u7BB1",placeholder:"\u8BF7\u8F93\u5165\u90AE\u7BB1(\u975E\u5F3A\u5236)",disabled:$.value},null,8,["modelValue","disabled"]),$.value?C("",!0):(v(),y(p,{key:2,modelValue:_.value.code,"onUpdate:modelValue":e[11]||(e[11]=t=>_.value.code=t),center:"",clearable:"",type:"digit",label:"\u90AE\u7BB1\u9A8C\u8BC1\u7801",placeholder:"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",rules:[{required:!1,validator:w(Ie),message:"\u5E94\u4E3A4\u4F4D\u6570\u5B57"}]},{button:n(()=>[z.value?(v(),y(u,{key:0,size:"small",type:"primary",onClick:e[10]||(e[10]=t=>Q())},{default:n(()=>[g(" \u53D1\u9001\u9A8C\u8BC1\u7801 ")]),_:1})):z.value?C("",!0):(v(),y(u,{key:1,size:"small",type:"primary",disabled:"",loading:"","loading-text":P.value},null,8,["loading-text"]))]),_:1},8,["modelValue","rules"])),$.value?C("",!0):(v(),y(u,{key:3,plain:"",block:"",type:"primary",size:"small",style:{width:"40%",margin:"1% auto"},onClick:e[12]||(e[12]=t=>Y())},{default:n(()=>[g(" \u9A8C\u8BC1\u90AE\u7BB1 ")]),_:1})),r(p,{modelValue:l.value.departmentId,"onUpdate:modelValue":e[13]||(e[13]=t=>l.value.departmentId=t),"is-link":"",readonly:"",label:"\u5355\u4F4D",placeholder:"\u8BF7\u9009\u62E9\u60A8\u6240\u5C5E\u7684\u5355\u4F4D",onClick:e[14]||(e[14]=t=>V.value=!0),rules:[{required:!0,message:"\u8BF7\u9009\u62E9\u60A8\u6240\u5C5E\u7684\u5355\u4F4D"}]},null,8,["modelValue"]),r(de,{show:V.value,"onUpdate:show":e[16]||(e[16]=t=>V.value=t),round:"",position:"bottom"},{default:n(()=>[r(ue,{columns:R,onCancel:e[15]||(e[15]=t=>V.value=!1),onConfirm:X})]),_:1},8,["show"]),r(oe,{modelValue:A.value,"onUpdate:modelValue":e[17]||(e[17]=t=>A.value=t),direction:"horizontal",class:"checkbox-area"},{default:n(()=>[r(ne,{name:"isCadre"},{default:n(()=>[g("\u6211\u662F\u5904\u7EA7\u4EE5\u4E0A\u5E72\u90E8")]),_:1})]),_:1},8,["modelValue"])]),_:1}),qe("div",B,[r(u,{plain:"",block:"",type:"primary","native-type":"submit"},{default:n(()=>[g(" \u4FEE\u6539\u4E2A\u4EBA\u4FE1\u606F ")]),_:1})])]),_:1})])}}},K=Ne(G,[["__scopeId","data-v-e80f56e5"]])});export{Be as __tla,K as default};