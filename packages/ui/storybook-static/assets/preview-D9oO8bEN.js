import"./index-l2PZgWEW.js";const{useParameter:p,addons:R,useEffect:S,useMemo:I}=__STORYBOOK_MODULE_PREVIEW_API__;var g=Object.defineProperty,A=(e,t)=>{for(var r in t)g(e,r,{get:t[r],enumerable:!0})},O={};A(O,{initializeThemeState:()=>_,pluckThemeFromContext:()=>T,useThemeParameters:()=>h});var c="themes",v=`storybook/${c}`,M="theme",L={},P={REGISTER_THEMES:`${v}/REGISTER_THEMES`};function T({globals:e}){return e[M]||""}function h(){return p(c,L)}function _(e,t){R.getChannel().emit(P.REGISTER_THEMES,{defaultTheme:t,themes:e})}var k="html",m=e=>e.split(" ").filter(Boolean),y=({themes:e,defaultTheme:t,parentSelector:r=k})=>(_(Object.keys(e),t),(u,d)=>{let{themeOverride:s}=h(),o=T(d);return S(()=>{let E=s||o||t,a=document.querySelector(r);if(!a)return;Object.entries(e).filter(([l])=>l!==E).forEach(([l,f])=>{let i=m(f);i.length>0&&a.classList.remove(...i)});let n=m(e[E]);n.length>0&&a.classList.add(...n)},[s,o,r]),u()});const N={parameters:{actions:{argTypesRegex:"^on[A-Z].*"},controls:{matchers:{color:/(background|color)$/i,date:/Date$/}}},decorators:[y({themes:{light:"light",dark:"dark"},defaultTheme:"light"})]};export{N as default};