import{r as m}from"./index-l2PZgWEW.js";var oe={exports:{}},O={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pe=m,fe=Symbol.for("react.element"),be=Symbol.for("react.fragment"),ge=Object.prototype.hasOwnProperty,me=pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,he={key:!0,ref:!0,__self:!0,__source:!0};function ne(e,r,o){var t,s={},n=null,i=null;o!==void 0&&(n=""+o),r.key!==void 0&&(n=""+r.key),r.ref!==void 0&&(i=r.ref);for(t in r)ge.call(r,t)&&!he.hasOwnProperty(t)&&(s[t]=r[t]);if(e&&e.defaultProps)for(t in r=e.defaultProps,r)s[t]===void 0&&(s[t]=r[t]);return{$$typeof:fe,type:e,key:n,ref:i,props:s,_owner:me.current}}O.Fragment=be;O.jsx=ne;O.jsxs=ne;oe.exports=O;var N=oe.exports;function ye(e,r){typeof e=="function"?e(r):e!=null&&(e.current=r)}function se(...e){return r=>e.forEach(o=>ye(o,r))}function nr(...e){return m.useCallback(se(...e),e)}var xe=m.forwardRef((e,r)=>{const{children:o,...t}=e,s=m.Children.toArray(o),n=s.find(ve);if(n){const i=n.props.children,l=s.map(c=>c===n?m.Children.count(i)>1?m.Children.only(null):m.isValidElement(i)?i.props.children:null:c);return N.jsx(F,{...t,ref:r,children:m.isValidElement(i)?m.cloneElement(i,void 0,l):null})}return N.jsx(F,{...t,ref:r,children:o})});xe.displayName="Slot";var F=m.forwardRef((e,r)=>{const{children:o,...t}=e;if(m.isValidElement(o)){const s=ke(o);return m.cloneElement(o,{...Ce(t,o.props),ref:r?se(r,s):s})}return m.Children.count(o)>1?m.Children.only(null):null});F.displayName="SlotClone";var we=({children:e})=>N.jsx(N.Fragment,{children:e});function ve(e){return m.isValidElement(e)&&e.type===we}function Ce(e,r){const o={...r};for(const t in r){const s=e[t],n=r[t];/^on[A-Z]/.test(t)?s&&n?o[t]=(...l)=>{n(...l),s(...l)}:s&&(o[t]=s):t==="style"?o[t]={...s,...n}:t==="className"&&(o[t]=[s,n].filter(Boolean).join(" "))}return{...e,...o}}function ke(e){var t,s;let r=(t=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:t.get,o=r&&"isReactWarning"in r&&r.isReactWarning;return o?e.ref:(r=(s=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:s.get,o=r&&"isReactWarning"in r&&r.isReactWarning,o?e.props.ref:e.props.ref||e.ref)}function ie(e){var r,o,t="";if(typeof e=="string"||typeof e=="number")t+=e;else if(typeof e=="object")if(Array.isArray(e)){var s=e.length;for(r=0;r<s;r++)e[r]&&(o=ie(e[r]))&&(t&&(t+=" "),t+=o)}else for(o in e)e[o]&&(t&&(t+=" "),t+=o);return t}function Se(){for(var e,r,o=0,t="",s=arguments.length;o<s;o++)(e=arguments[o])&&(r=ie(e))&&(t&&(t+=" "),t+=r);return t}const q="-";function ze(e){const r=Ae(e),{conflictingClassGroups:o,conflictingClassGroupModifiers:t}=e;function s(i){const l=i.split(q);return l[0]===""&&l.length!==1&&l.shift(),le(l,r)||Re(i)}function n(i,l){const c=o[i]||[];return l&&t[i]?[...c,...t[i]]:c}return{getClassGroupId:s,getConflictingClassGroupIds:n}}function le(e,r){var i;if(e.length===0)return r.classGroupId;const o=e[0],t=r.nextPart.get(o),s=t?le(e.slice(1),t):void 0;if(s)return s;if(r.validators.length===0)return;const n=e.join(q);return(i=r.validators.find(({validator:l})=>l(n)))==null?void 0:i.classGroupId}const re=/^\[(.+)\]$/;function Re(e){if(re.test(e)){const r=re.exec(e)[1],o=r==null?void 0:r.substring(0,r.indexOf(":"));if(o)return"arbitrary.."+o}}function Ae(e){const{theme:r,prefix:o}=e,t={nextPart:new Map,validators:[]};return Pe(Object.entries(e.classGroups),o).forEach(([n,i])=>{U(i,t,n,r)}),t}function U(e,r,o,t){e.forEach(s=>{if(typeof s=="string"){const n=s===""?r:te(r,s);n.classGroupId=o;return}if(typeof s=="function"){if(Ee(s)){U(s(t),r,o,t);return}r.validators.push({validator:s,classGroupId:o});return}Object.entries(s).forEach(([n,i])=>{U(i,te(r,n),o,t)})})}function te(e,r){let o=e;return r.split(q).forEach(t=>{o.nextPart.has(t)||o.nextPart.set(t,{nextPart:new Map,validators:[]}),o=o.nextPart.get(t)}),o}function Ee(e){return e.isThemeGetter}function Pe(e,r){return r?e.map(([o,t])=>{const s=t.map(n=>typeof n=="string"?r+n:typeof n=="object"?Object.fromEntries(Object.entries(n).map(([i,l])=>[r+i,l])):n);return[o,s]}):e}function je(e){if(e<1)return{get:()=>{},set:()=>{}};let r=0,o=new Map,t=new Map;function s(n,i){o.set(n,i),r++,r>e&&(r=0,t=o,o=new Map)}return{get(n){let i=o.get(n);if(i!==void 0)return i;if((i=t.get(n))!==void 0)return s(n,i),i},set(n,i){o.has(n)?o.set(n,i):s(n,i)}}}const ae="!";function Me(e){const{separator:r,experimentalParseClassName:o}=e,t=r.length===1,s=r[0],n=r.length;function i(l){const c=[];let b=0,p=0,g;for(let f=0;f<l.length;f++){let h=l[f];if(b===0){if(h===s&&(t||l.slice(f,f+n)===r)){c.push(l.slice(p,f)),p=f+n;continue}if(h==="/"){g=f;continue}}h==="["?b++:h==="]"&&b--}const y=c.length===0?l:l.substring(p),w=y.startsWith(ae),R=w?y.substring(1):y,x=g&&g>p?g-p:void 0;return{modifiers:c,hasImportantModifier:w,baseClassName:R,maybePostfixModifierPosition:x}}return o?function(c){return o({className:c,parseClassName:i})}:i}function Ie(e){if(e.length<=1)return e;const r=[];let o=[];return e.forEach(t=>{t[0]==="["?(r.push(...o.sort(),t),o=[]):o.push(t)}),r.push(...o.sort()),r}function _e(e){return{cache:je(e.cacheSize),parseClassName:Me(e),...ze(e)}}const Ge=/\s+/;function Te(e,r){const{parseClassName:o,getClassGroupId:t,getConflictingClassGroupIds:s}=r,n=new Set;return e.trim().split(Ge).map(i=>{const{modifiers:l,hasImportantModifier:c,baseClassName:b,maybePostfixModifierPosition:p}=o(i);let g=!!p,y=t(g?b.substring(0,p):b);if(!y){if(!g)return{isTailwindClass:!1,originalClassName:i};if(y=t(b),!y)return{isTailwindClass:!1,originalClassName:i};g=!1}const w=Ie(l).join(":");return{isTailwindClass:!0,modifierId:c?w+ae:w,classGroupId:y,originalClassName:i,hasPostfixModifier:g}}).reverse().filter(i=>{if(!i.isTailwindClass)return!0;const{modifierId:l,classGroupId:c,hasPostfixModifier:b}=i,p=l+c;return n.has(p)?!1:(n.add(p),s(c,b).forEach(g=>n.add(l+g)),!0)}).reverse().map(i=>i.originalClassName).join(" ")}function Ne(){let e=0,r,o,t="";for(;e<arguments.length;)(r=arguments[e++])&&(o=ce(r))&&(t&&(t+=" "),t+=o);return t}function ce(e){if(typeof e=="string")return e;let r,o="";for(let t=0;t<e.length;t++)e[t]&&(r=ce(e[t]))&&(o&&(o+=" "),o+=r);return o}function Oe(e,...r){let o,t,s,n=i;function i(c){const b=r.reduce((p,g)=>g(p),e());return o=_e(b),t=o.cache.get,s=o.cache.set,n=l,l(c)}function l(c){const b=t(c);if(b)return b;const p=Te(c,o);return s(c,p),p}return function(){return n(Ne.apply(null,arguments))}}function d(e){const r=o=>o[e]||[];return r.isThemeGetter=!0,r}const de=/^\[(?:([a-z-]+):)?(.+)\]$/i,We=/^\d+\/\d+$/,Le=new Set(["px","full","screen"]),Ve=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,$e=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Be=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,Fe=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Ue=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;function C(e){return z(e)||Le.has(e)||We.test(e)}function k(e){return A(e,"length",Qe)}function z(e){return!!e&&!Number.isNaN(Number(e))}function T(e){return A(e,"number",z)}function j(e){return!!e&&Number.isInteger(Number(e))}function qe(e){return e.endsWith("%")&&z(e.slice(0,-1))}function a(e){return de.test(e)}function S(e){return Ve.test(e)}const He=new Set(["length","size","percentage"]);function Je(e){return A(e,He,ue)}function Ze(e){return A(e,"position",ue)}const Xe=new Set(["image","url"]);function Ye(e){return A(e,Xe,er)}function Ke(e){return A(e,"",De)}function M(){return!0}function A(e,r,o){const t=de.exec(e);return t?t[1]?typeof r=="string"?t[1]===r:r.has(t[1]):o(t[2]):!1}function Qe(e){return $e.test(e)&&!Be.test(e)}function ue(){return!1}function De(e){return Fe.test(e)}function er(e){return Ue.test(e)}function rr(){const e=d("colors"),r=d("spacing"),o=d("blur"),t=d("brightness"),s=d("borderColor"),n=d("borderRadius"),i=d("borderSpacing"),l=d("borderWidth"),c=d("contrast"),b=d("grayscale"),p=d("hueRotate"),g=d("invert"),y=d("gap"),w=d("gradientColorStops"),R=d("gradientColorStopPositions"),x=d("inset"),f=d("margin"),h=d("opacity"),v=d("padding"),H=d("saturate"),W=d("scale"),J=d("sepia"),Z=d("skew"),X=d("space"),Y=d("translate"),L=()=>["auto","contain","none"],V=()=>["auto","hidden","clip","visible","scroll"],$=()=>["auto",a,r],u=()=>[a,r],K=()=>["",C,k],I=()=>["auto",z,a],Q=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],_=()=>["solid","dashed","dotted","double","none"],D=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],B=()=>["start","end","center","between","around","evenly","stretch"],E=()=>["","0",a],ee=()=>["auto","avoid","all","avoid-page","page","left","right","column"],P=()=>[z,T],G=()=>[z,a];return{cacheSize:500,separator:":",theme:{colors:[M],spacing:[C,k],blur:["none","",S,a],brightness:P(),borderColor:[e],borderRadius:["none","","full",S,a],borderSpacing:u(),borderWidth:K(),contrast:P(),grayscale:E(),hueRotate:G(),invert:E(),gap:u(),gradientColorStops:[e],gradientColorStopPositions:[qe,k],inset:$(),margin:$(),opacity:P(),padding:u(),saturate:P(),scale:P(),sepia:E(),skew:G(),space:u(),translate:u()},classGroups:{aspect:[{aspect:["auto","square","video",a]}],container:["container"],columns:[{columns:[S]}],"break-after":[{"break-after":ee()}],"break-before":[{"break-before":ee()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...Q(),a]}],overflow:[{overflow:V()}],"overflow-x":[{"overflow-x":V()}],"overflow-y":[{"overflow-y":V()}],overscroll:[{overscroll:L()}],"overscroll-x":[{"overscroll-x":L()}],"overscroll-y":[{"overscroll-y":L()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[x]}],"inset-x":[{"inset-x":[x]}],"inset-y":[{"inset-y":[x]}],start:[{start:[x]}],end:[{end:[x]}],top:[{top:[x]}],right:[{right:[x]}],bottom:[{bottom:[x]}],left:[{left:[x]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",j,a]}],basis:[{basis:$()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",a]}],grow:[{grow:E()}],shrink:[{shrink:E()}],order:[{order:["first","last","none",j,a]}],"grid-cols":[{"grid-cols":[M]}],"col-start-end":[{col:["auto",{span:["full",j,a]},a]}],"col-start":[{"col-start":I()}],"col-end":[{"col-end":I()}],"grid-rows":[{"grid-rows":[M]}],"row-start-end":[{row:["auto",{span:[j,a]},a]}],"row-start":[{"row-start":I()}],"row-end":[{"row-end":I()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",a]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",a]}],gap:[{gap:[y]}],"gap-x":[{"gap-x":[y]}],"gap-y":[{"gap-y":[y]}],"justify-content":[{justify:["normal",...B()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...B(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...B(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[v]}],px:[{px:[v]}],py:[{py:[v]}],ps:[{ps:[v]}],pe:[{pe:[v]}],pt:[{pt:[v]}],pr:[{pr:[v]}],pb:[{pb:[v]}],pl:[{pl:[v]}],m:[{m:[f]}],mx:[{mx:[f]}],my:[{my:[f]}],ms:[{ms:[f]}],me:[{me:[f]}],mt:[{mt:[f]}],mr:[{mr:[f]}],mb:[{mb:[f]}],ml:[{ml:[f]}],"space-x":[{"space-x":[X]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[X]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",a,r]}],"min-w":[{"min-w":[a,r,"min","max","fit"]}],"max-w":[{"max-w":[a,r,"none","full","min","max","fit","prose",{screen:[S]},S]}],h:[{h:[a,r,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[a,r,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[a,r,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[a,r,"auto","min","max","fit"]}],"font-size":[{text:["base",S,k]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",T]}],"font-family":[{font:[M]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",a]}],"line-clamp":[{"line-clamp":["none",z,T]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",C,a]}],"list-image":[{"list-image":["none",a]}],"list-style-type":[{list:["none","disc","decimal",a]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[h]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[h]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[..._(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",C,k]}],"underline-offset":[{"underline-offset":["auto",C,a]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:u()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",a]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",a]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[h]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...Q(),Ze]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",Je]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},Ye]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[R]}],"gradient-via-pos":[{via:[R]}],"gradient-to-pos":[{to:[R]}],"gradient-from":[{from:[w]}],"gradient-via":[{via:[w]}],"gradient-to":[{to:[w]}],rounded:[{rounded:[n]}],"rounded-s":[{"rounded-s":[n]}],"rounded-e":[{"rounded-e":[n]}],"rounded-t":[{"rounded-t":[n]}],"rounded-r":[{"rounded-r":[n]}],"rounded-b":[{"rounded-b":[n]}],"rounded-l":[{"rounded-l":[n]}],"rounded-ss":[{"rounded-ss":[n]}],"rounded-se":[{"rounded-se":[n]}],"rounded-ee":[{"rounded-ee":[n]}],"rounded-es":[{"rounded-es":[n]}],"rounded-tl":[{"rounded-tl":[n]}],"rounded-tr":[{"rounded-tr":[n]}],"rounded-br":[{"rounded-br":[n]}],"rounded-bl":[{"rounded-bl":[n]}],"border-w":[{border:[l]}],"border-w-x":[{"border-x":[l]}],"border-w-y":[{"border-y":[l]}],"border-w-s":[{"border-s":[l]}],"border-w-e":[{"border-e":[l]}],"border-w-t":[{"border-t":[l]}],"border-w-r":[{"border-r":[l]}],"border-w-b":[{"border-b":[l]}],"border-w-l":[{"border-l":[l]}],"border-opacity":[{"border-opacity":[h]}],"border-style":[{border:[..._(),"hidden"]}],"divide-x":[{"divide-x":[l]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[l]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[h]}],"divide-style":[{divide:_()}],"border-color":[{border:[s]}],"border-color-x":[{"border-x":[s]}],"border-color-y":[{"border-y":[s]}],"border-color-t":[{"border-t":[s]}],"border-color-r":[{"border-r":[s]}],"border-color-b":[{"border-b":[s]}],"border-color-l":[{"border-l":[s]}],"divide-color":[{divide:[s]}],"outline-style":[{outline:["",..._()]}],"outline-offset":[{"outline-offset":[C,a]}],"outline-w":[{outline:[C,k]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:K()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[h]}],"ring-offset-w":[{"ring-offset":[C,k]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",S,Ke]}],"shadow-color":[{shadow:[M]}],opacity:[{opacity:[h]}],"mix-blend":[{"mix-blend":[...D(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":D()}],filter:[{filter:["","none"]}],blur:[{blur:[o]}],brightness:[{brightness:[t]}],contrast:[{contrast:[c]}],"drop-shadow":[{"drop-shadow":["","none",S,a]}],grayscale:[{grayscale:[b]}],"hue-rotate":[{"hue-rotate":[p]}],invert:[{invert:[g]}],saturate:[{saturate:[H]}],sepia:[{sepia:[J]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[o]}],"backdrop-brightness":[{"backdrop-brightness":[t]}],"backdrop-contrast":[{"backdrop-contrast":[c]}],"backdrop-grayscale":[{"backdrop-grayscale":[b]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[p]}],"backdrop-invert":[{"backdrop-invert":[g]}],"backdrop-opacity":[{"backdrop-opacity":[h]}],"backdrop-saturate":[{"backdrop-saturate":[H]}],"backdrop-sepia":[{"backdrop-sepia":[J]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[i]}],"border-spacing-x":[{"border-spacing-x":[i]}],"border-spacing-y":[{"border-spacing-y":[i]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",a]}],duration:[{duration:G()}],ease:[{ease:["linear","in","out","in-out",a]}],delay:[{delay:G()}],animate:[{animate:["none","spin","ping","pulse","bounce",a]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[W]}],"scale-x":[{"scale-x":[W]}],"scale-y":[{"scale-y":[W]}],rotate:[{rotate:[j,a]}],"translate-x":[{"translate-x":[Y]}],"translate-y":[{"translate-y":[Y]}],"skew-x":[{"skew-x":[Z]}],"skew-y":[{"skew-y":[Z]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",a]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",a]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":u()}],"scroll-mx":[{"scroll-mx":u()}],"scroll-my":[{"scroll-my":u()}],"scroll-ms":[{"scroll-ms":u()}],"scroll-me":[{"scroll-me":u()}],"scroll-mt":[{"scroll-mt":u()}],"scroll-mr":[{"scroll-mr":u()}],"scroll-mb":[{"scroll-mb":u()}],"scroll-ml":[{"scroll-ml":u()}],"scroll-p":[{"scroll-p":u()}],"scroll-px":[{"scroll-px":u()}],"scroll-py":[{"scroll-py":u()}],"scroll-ps":[{"scroll-ps":u()}],"scroll-pe":[{"scroll-pe":u()}],"scroll-pt":[{"scroll-pt":u()}],"scroll-pr":[{"scroll-pr":u()}],"scroll-pb":[{"scroll-pb":u()}],"scroll-pl":[{"scroll-pl":u()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",a]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[C,k,T]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}}const tr=Oe(rr);function sr(...e){return tr(Se(e))}export{xe as S,we as a,sr as c,N as j,nr as u};
