import{j as s,c as m}from"./cn-JZv3sLID.js";import{r as o}from"./index-l2PZgWEW.js";import{c as k,P as f,u as M,a as _}from"./index-C_YkFgLh.js";import"./index-6lph7OXq.js";var p="Avatar",[P,G]=k(p),[F,N]=P(p),I=o.forwardRef((a,t)=>{const{__scopeAvatar:e,...r}=a,[n,d]=o.useState("idle");return s.jsx(F,{scope:e,imageLoadingStatus:n,onImageLoadingStatusChange:d,children:s.jsx(f.span,{...r,ref:t})})});I.displayName=p;var j="AvatarImage",L=o.forwardRef((a,t)=>{const{__scopeAvatar:e,src:r,onLoadingStatusChange:n=()=>{},...d}=a,i=N(j,e),c=T(r),l=M(x=>{n(x),i.onImageLoadingStatusChange(x)});return _(()=>{c!=="idle"&&l(c)},[c,l]),c==="loaded"?s.jsx(f.img,{...d,ref:t,src:r}):null});L.displayName=j;var y="AvatarFallback",R=o.forwardRef((a,t)=>{const{__scopeAvatar:e,delayMs:r,...n}=a,d=N(y,e),[i,c]=o.useState(r===void 0);return o.useEffect(()=>{if(r!==void 0){const l=window.setTimeout(()=>c(!0),r);return()=>window.clearTimeout(l)}},[r]),i&&d.imageLoadingStatus!=="loaded"?s.jsx(f.span,{...n,ref:t}):null});R.displayName=y;function T(a){const[t,e]=o.useState("idle");return _(()=>{if(!a){e("error");return}let r=!0;const n=new window.Image,d=i=>()=>{r&&e(i)};return e("loading"),n.onload=d("loaded"),n.onerror=d("error"),n.src=a,()=>{r=!1}},[a]),t}var C=I,E=L,b=R;const g=o.forwardRef(({className:a,...t},e)=>s.jsx(C,{ref:e,className:m("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",a),...t}));g.displayName=C.displayName;const v=o.forwardRef(({className:a,...t},e)=>s.jsx(E,{ref:e,className:m("aspect-square h-full w-full",a),...t}));v.displayName=E.displayName;const A=o.forwardRef(({className:a,...t},e)=>s.jsx(b,{ref:e,className:m("flex h-full w-full items-center justify-center rounded-full bg-accent",a),...t}));A.displayName=b.displayName;g.__docgenInfo={description:"",methods:[]};v.__docgenInfo={description:"",methods:[]};A.__docgenInfo={description:"",methods:[]};const K={component:()=>s.jsxs(g,{children:[s.jsx(v,{src:"https://github.com/shadcn.png",alt:"@shadcn"}),s.jsx(A,{children:"CN"})]})},u={};var h,S,w;u.parameters={...u.parameters,docs:{...(h=u.parameters)==null?void 0:h.docs,source:{originalSource:"{}",...(w=(S=u.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};const O=["Default"];export{u as Default,O as __namedExportsOrder,K as default};