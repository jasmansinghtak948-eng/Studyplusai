(()=>{var e={};e.id=137,e.ids=[137],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},27790:e=>{"use strict";e.exports=require("assert")},84770:e=>{"use strict";e.exports=require("crypto")},17702:e=>{"use strict";e.exports=require("events")},92048:e=>{"use strict";e.exports=require("fs")},32615:e=>{"use strict";e.exports=require("http")},32694:e=>{"use strict";e.exports=require("http2")},35240:e=>{"use strict";e.exports=require("https")},19801:e=>{"use strict";e.exports=require("os")},55315:e=>{"use strict";e.exports=require("path")},76162:e=>{"use strict";e.exports=require("stream")},74175:e=>{"use strict";e.exports=require("tty")},17360:e=>{"use strict";e.exports=require("url")},21764:e=>{"use strict";e.exports=require("util")},71568:e=>{"use strict";e.exports=require("zlib")},13696:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>d,routeModule:()=>m,tree:()=>c}),s(66735),s(6694),s(35866);var r=s(23191),a=s(88716),o=s(37922),i=s.n(o),n=s(95231),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);s.d(t,l);let c=["",{children:["tests",{children:["upload",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,66735)),"/workspaces/Studyplusai/frontend/src/app/tests/upload/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,6694)),"/workspaces/Studyplusai/frontend/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,35866,23)),"next/dist/client/components/not-found-error"]}],d=["/workspaces/Studyplusai/frontend/src/app/tests/upload/page.tsx"],u="/tests/upload/page",p={require:s,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/tests/upload/page",pathname:"/tests/upload",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},8718:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,12994,23)),Promise.resolve().then(s.t.bind(s,96114,23)),Promise.resolve().then(s.t.bind(s,9727,23)),Promise.resolve().then(s.t.bind(s,79671,23)),Promise.resolve().then(s.t.bind(s,41868,23)),Promise.resolve().then(s.t.bind(s,84759,23))},42594:(e,t,s)=>{Promise.resolve().then(s.bind(s,42966))},24155:(e,t,s)=>{Promise.resolve().then(s.bind(s,74690))},42966:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>Y});var r,a=s(10326),o=s(17577),i=s(4891),n=s(77389),l=s(51471),c=s(49631),d=s(81002);let u={data:""},p=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||u},m=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,h=/\/\*[^]*?\*\/|  +/g,x=/\n+/g,b=(e,t)=>{let s="",r="",a="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?s=o+" "+i+";":r+="f"==o[1]?b(i,o):o+"{"+b(i,"k"==o[1]?"":t)+"}":"object"==typeof i?r+=b(i,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=b.p?b.p(o,i):o+":"+i+";")}return s+(t&&a?t+"{"+a+"}":a)+r},g={},f=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+f(e[s]);return t}return e},y=(e,t,s,r,a)=>{let o=f(e),i=g[o]||(g[o]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(o));if(!g[i]){let t=o!==e?e:(e=>{let t,s,r=[{}];for(;t=m.exec(e.replace(h,""));)t[4]?r.shift():t[3]?(s=t[3].replace(x," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(x," ").trim();return r[0]})(e);g[i]=b(a?{["@keyframes "+i]:t}:t,s?"":"."+i)}let n=s&&g.g?g.g:null;return s&&(g.g=g[i]),((e,t,s,r)=>{r?t.data=t.data.replace(r,e):-1===t.data.indexOf(e)&&(t.data=s?e+t.data:t.data+e)})(g[i],t,r,n),i},w=(e,t,s)=>e.reduce((e,r,a)=>{let o=t[a];if(o&&o.call){let e=o(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":b(e,""):!1===e?"":e}return e+r+(null==o?"":o)},"");function v(e){let t=this||{},s=e.call?e(t.p):e;return y(s.unshift?s.raw?w(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,p(t.target),t.g,t.o,t.k)}v.bind({g:1});let j,k,_,N=v.bind({k:1});function P(e,t){let s=this||{};return function(){let r=arguments;function a(o,i){let n=Object.assign({},o),l=n.className||a.className;s.p=Object.assign({theme:k&&k()},n),s.o=/ *go\d+/.test(l),n.className=v.apply(s,r)+(l?" "+l:""),t&&(n.ref=i);let c=e;return e[0]&&(c=n.as||e,delete n.as),_&&c[0]&&_(n),j(c,n)}return t?t(a):a}}var A=e=>"function"==typeof e,S=(e,t)=>A(e)?e(t):e,C=(()=>{let e=0;return()=>(++e).toString()})(),q=((()=>{let e;return()=>e})(),"default"),E=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return E(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},I=[],$={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},T={},D=(e,t=q)=>{T[t]=E(T[t]||$,e),I.forEach(([e,s])=>{e===t&&s(T[t])})},z=e=>Object.keys(T).forEach(t=>D(e,t)),M=e=>Object.keys(T).find(t=>T[t].toasts.some(t=>t.id===e)),O=(e=q)=>t=>{D(t,e)},H={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},L=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||C()}),R=e=>(t,s)=>{let r=L(t,e,s);return O(r.toasterId||M(r.id))({type:2,toast:r}),r.id},U=(e,t)=>R("blank")(e,t);U.error=R("error"),U.success=R("success"),U.loading=R("loading"),U.custom=R("custom"),U.dismiss=(e,t)=>{let s={type:3,toastId:e};t?O(t)(s):z(s)},U.dismissAll=e=>U.dismiss(void 0,e),U.remove=(e,t)=>{let s={type:4,toastId:e};t?O(t)(s):z(s)},U.removeAll=e=>U.remove(void 0,e),U.promise=(e,t,s)=>{let r=U.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?S(t.success,e):void 0;return a?U.success(a,{id:r,...s,...null==s?void 0:s.success}):U.dismiss(r),e}).catch(e=>{let a=t.error?S(t.error,e):void 0;a?U.error(a,{id:r,...s,...null==s?void 0:s.error}):U.dismiss(r)}),e};var F=N`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,G=N`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,B=N`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,W=(P("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${G} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${B} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,N`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`),Q=(P("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${W} 1s linear infinite;
`,N`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`),Z=N`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,X=(P("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Z} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,P("div")`
  position: absolute;
`,P("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,N`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`);function Y(){let e=(0,n.useRouter)(),[t,s]=(0,o.useState)({test_name:"",subject:"",total_questions:0,correct_answers:0,wrong_answers:0,not_attempted:0,time_taken:0}),[r,u]=(0,o.useState)([]),[p,m]=(0,o.useState)({name:"",accuracy:0}),[h,x]=(0,o.useState)(!1),b=e=>{let{name:r,value:a}=e.target;s({...t,[r]:isNaN(Number(a))?a:Number(a)})},g=e=>{u(r.filter((t,s)=>s!==e))},f=async s=>{if(s.preventDefault(),!t.test_name||!t.subject){U.error("Please fill test name and subject");return}x(!0);try{let s={};r.forEach(e=>{s[e.name]={accuracy:e.accuracy,correct:Math.round(e.accuracy/100*t.total_questions),total:t.total_questions}}),await l.E.uploadTest({...t,chapter_performance:s}),U.success("Test uploaded successfully!"),e.push("/dashboard")}catch(e){U.error(e.response?.data?.detail||"Upload failed")}finally{x(!1)}};return a.jsx("div",{className:"min-h-screen bg-gradient-to-b from-pastel-lavender via-pastel-sky-blue to-pastel-mint p-4 md:p-8",children:(0,a.jsxs)(i.E.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},className:"max-w-4xl mx-auto",children:[(0,a.jsxs)("div",{className:"mb-8",children:[a.jsx("h1",{className:"text-4xl font-poppins font-bold text-white mb-2",children:"\uD83D\uDCDD Upload Test Result"}),a.jsx("p",{className:"text-white/60",children:"Add your test scores for AI analysis"})]}),a.jsx(c.Wn,{className:"p-8",children:(0,a.jsxs)("form",{onSubmit:f,className:"space-y-8",children:[(0,a.jsxs)("div",{children:[a.jsx("h2",{className:"text-xl font-semibold text-white mb-6",children:"Test Information"}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-white/80 mb-2 text-sm",children:"Test Name"}),a.jsx("input",{type:"text",name:"test_name",value:t.test_name,onChange:b,placeholder:"e.g., Biology Mock Test",className:"w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-white/80 mb-2 text-sm",children:"Subject"}),(0,a.jsxs)("select",{name:"subject",value:t.subject,onChange:b,className:"w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/50",children:[a.jsx("option",{value:"",children:"Select Subject"}),a.jsx("option",{value:"Physics",children:"Physics"}),a.jsx("option",{value:"Chemistry",children:"Chemistry"}),a.jsx("option",{value:"Biology",children:"Biology"}),a.jsx("option",{value:"Mathematics",children:"Mathematics"}),a.jsx("option",{value:"English",children:"English"})]})]})]})]}),(0,a.jsxs)("div",{children:[a.jsx("h2",{className:"text-xl font-semibold text-white mb-6",children:"Performance Metrics"}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-white/80 mb-2 text-sm",children:"Total Questions"}),a.jsx("input",{type:"number",name:"total_questions",value:t.total_questions,onChange:b,className:"w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/50"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-white/80 mb-2 text-sm",children:"Correct Answers"}),a.jsx("input",{type:"number",name:"correct_answers",value:t.correct_answers,onChange:b,className:"w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/50"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-white/80 mb-2 text-sm",children:"Wrong Answers"}),a.jsx("input",{type:"number",name:"wrong_answers",value:t.wrong_answers,onChange:b,className:"w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/50"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-white/80 mb-2 text-sm",children:"Not Attempted"}),a.jsx("input",{type:"number",name:"not_attempted",value:t.not_attempted,onChange:b,className:"w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/50"})]}),(0,a.jsxs)("div",{className:"md:col-span-2",children:[a.jsx("label",{className:"block text-white/80 mb-2 text-sm",children:"Time Taken (in seconds)"}),a.jsx("input",{type:"number",name:"time_taken",value:t.time_taken,onChange:b,placeholder:"e.g., 3600 for 1 hour",className:"w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50"})]})]})]}),(0,a.jsxs)("div",{children:[a.jsx("h2",{className:"text-xl font-semibold text-white mb-6",children:"Chapter-wise Performance"}),(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-white/20",children:[a.jsx("input",{type:"text",value:p.name,onChange:e=>m({...p,name:e.target.value}),placeholder:"Chapter name",className:"px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50"}),a.jsx("input",{type:"number",value:p.accuracy,onChange:e=>m({...p,accuracy:Number(e.target.value)}),placeholder:"Accuracy %",min:"0",max:"100",className:"px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50"}),a.jsx(i.E.button,{whileHover:{scale:1.05},type:"button",onClick:()=>{p.name&&p.accuracy>0?(u([...r,{...p}]),m({name:"",accuracy:0}),U.success("Chapter added")):U.error("Please fill chapter details")},className:"px-4 py-3 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-medium hover:shadow-lg transition",children:"Add Chapter"})]}),r.length>0&&a.jsx("div",{className:"space-y-2",children:r.map((e,t)=>(0,a.jsxs)(i.E.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},className:"flex justify-between items-center p-4 rounded-lg bg-white/10 border border-white/20",children:[(0,a.jsxs)("div",{className:"flex-1",children:[a.jsx("p",{className:"text-white font-medium",children:e.name}),(0,a.jsxs)("p",{className:"text-white/60 text-sm",children:[e.accuracy,"% accuracy"]})]}),a.jsx(i.E.button,{whileHover:{scale:1.1},type:"button",onClick:()=>g(t),className:"p-2 hover:bg-red-500/20 rounded-lg transition text-red-400",children:a.jsx(d.q5L,{size:20})})]},t))})]})]}),(0,a.jsxs)(i.E.button,{whileHover:{scale:1.02},whileTap:{scale:.98},disabled:h,type:"submit",className:"w-full py-4 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50 flex items-center justify-center gap-2",children:[a.jsx(d.Yjd,{})," ",h?"Uploading...":"Upload Result & Analyze"]})]})})]})})}P("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${X} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,P("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,P("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,r=o.createElement,b.p=void 0,j=r,k=void 0,_=void 0,v`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`},49631:(e,t,s)=>{"use strict";s.d(t,{OQ:()=>l,Sz:()=>d,Wn:()=>n,f:()=>c});var r=s(10326),a=s(17577),o=s.n(a),i=s(4891);function n({children:e,className:t=""}){return r.jsx(i.E.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.4},className:`glass-dark p-6 rounded-2xl ${t}`,children:e})}function l({children:e,onClick:t,className:s="",variant:a="primary"}){return r.jsx(i.E.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:t,className:`px-6 py-3 rounded-lg font-semibold text-white transition-all ${{primary:"bg-gradient-to-r from-blue-400 to-purple-500 hover:shadow-lg hover:shadow-purple-500/50",secondary:"bg-white/20 hover:bg-white/30 border border-white/30"}[a]} ${s}`,children:e})}function c({value:e,suffix:t=""}){let[s,a]=o().useState(0);return(0,r.jsxs)("span",{children:[s,t]})}function d({children:e,delay:t=0}){return r.jsx(i.E.div,{animate:{y:[0,-20,0]},transition:{duration:3,delay:t,repeat:1/0},children:e})}},74690:(e,t,s)=>{"use strict";s.d(t,{AuthProvider:()=>n,a:()=>l});var r=s(10326),a=s(17577),o=s(51471);let i=(0,a.createContext)(void 0);function n({children:e}){let[t,s]=(0,a.useState)(null),[n,l]=(0,a.useState)(!0),c=async(e,t)=>{let r=await o.E.login({email:e,password:t});localStorage.setItem("access_token",r.tokens.access_token),localStorage.setItem("refresh_token",r.tokens.refresh_token),s(r.user)},d=async(e,t,r)=>{let a=await o.E.register({email:e,name:t,password:r});localStorage.setItem("access_token",a.tokens.access_token),localStorage.setItem("refresh_token",a.tokens.refresh_token),s(a.user)};return r.jsx(i.Provider,{value:{user:t,loading:n,isAuthenticated:!!t,login:c,register:d,logout:()=>{localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token"),s(null)}},children:e})}function l(){let e=(0,a.useContext)(i);if(void 0===e)throw Error("useAuth must be used within AuthProvider");return e}},51471:(e,t,s)=>{"use strict";s.d(t,{E:()=>a});let r=s(94464).Z.create({baseURL:"http://localhost:8000",headers:{"Content-Type":"application/json"}});r.interceptors.request.use(e=>e),r.interceptors.response.use(e=>e.data,e=>(e.response?.status===401&&(localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token")),Promise.reject(e)));let a={register:e=>r.post("/api/v1/auth/register",e),login:e=>r.post("/api/v1/auth/login",e),googleAuth:e=>r.post("/api/v1/auth/google",e),appleAuth:e=>r.post("/api/v1/auth/apple",e),getCurrentUser:()=>r.get("/api/v1/auth/me"),uploadTest:e=>r.post("/api/v1/tests/upload",e),getTestHistory:e=>r.get(`/api/v1/tests/history?limit=${e||10}`),getDashboard:()=>r.get("/api/v1/tests/dashboard"),getRecommendations:()=>r.get("/api/v1/tests/recommendations")}},6694:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>n,metadata:()=>i});var r=s(19510),a=s(68570);let o=(0,a.createProxy)(String.raw`/workspaces/Studyplusai/frontend/src/context/AuthContext.tsx#AuthProvider`);(0,a.createProxy)(String.raw`/workspaces/Studyplusai/frontend/src/context/AuthContext.tsx#useAuth`),s(54315);let i={title:"EduIntel AI - Academic Performance Intelligence System",description:"AI-powered platform for academic success"};function n({children:e}){return r.jsx("html",{lang:"en",children:r.jsx("body",{className:"bg-gradient-to-b from-pastel-lavender via-pastel-sky-blue to-pastel-mint min-h-screen",children:r.jsx(o,{children:e})})})}},66735:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(68570).createProxy)(String.raw`/workspaces/Studyplusai/frontend/src/app/tests/upload/page.tsx#default`)},54315:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[294,900],()=>s(13696));module.exports=r})();