var t;const e=window,i=e.trustedTypes,s=i?i.createPolicy("lit-html",{createHTML:t=>t}):void 0,n="$lit$",o=`lit$${(Math.random()+"").slice(9)}$`,l="?"+o,r=`<${l}>`,h=document,$=()=>h.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,A=t=>a(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),_="[ \t\n\f\r]",c=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,u=/-->/g,v=/>/g,p=RegExp(`>|${_}(?:([^\\s"'>=/]+)(${_}*=${_}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,f=/"/g,m=/^(?:script|style|textarea|title)$/i,y=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),H=y(1),x=y(2),N=Symbol.for("lit-noChange"),C=Symbol.for("lit-nothing"),b=new WeakMap,M=h.createTreeWalker(h,129,null,!1),T=(t,e)=>{const i=t.length-1,l=[];let h,$=2===e?"<svg>":"",d=c;for(let e=0;e<i;e++){const i=t[e];let s,a,A=-1,_=0;for(;_<i.length&&(d.lastIndex=_,a=d.exec(i),null!==a);)_=d.lastIndex,d===c?"!--"===a[1]?d=u:void 0!==a[1]?d=v:void 0!==a[2]?(m.test(a[2])&&(h=RegExp("</"+a[2],"g")),d=p):void 0!==a[3]&&(d=p):d===p?">"===a[0]?(d=null!=h?h:c,A=-1):void 0===a[1]?A=-2:(A=d.lastIndex-a[2].length,s=a[1],d=void 0===a[3]?p:'"'===a[3]?f:g):d===f||d===g?d=p:d===u||d===v?d=c:(d=p,h=void 0);const y=d===p&&t[e+1].startsWith("/>")?" ":"";$+=d===c?i+r:A>=0?(l.push(s),i.slice(0,A)+n+i.slice(A)+o+y):i+o+(-2===A?(l.push(void 0),e):y)}const a=$+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==s?s.createHTML(a):a,l]};class w{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let h=0,d=0;const a=t.length-1,A=this.parts,[_,c]=T(t,e);if(this.el=w.createElement(_,s),M.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(r=M.nextNode())&&A.length<a;){if(1===r.nodeType){if(r.hasAttributes()){const t=[];for(const e of r.getAttributeNames())if(e.endsWith(n)||e.startsWith(o)){const i=c[d++];if(t.push(e),void 0!==i){const t=r.getAttribute(i.toLowerCase()+n).split(o),e=/([.?@])?(.*)/.exec(i);A.push({type:1,index:h,name:e[2],strings:t,ctor:"."===e[1]?U:"?"===e[1]?P:"@"===e[1]?R:B})}else A.push({type:6,index:h})}for(const e of t)r.removeAttribute(e)}if(m.test(r.tagName)){const t=r.textContent.split(o),e=t.length-1;if(e>0){r.textContent=i?i.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],$()),M.nextNode(),A.push({type:2,index:++h});r.append(t[e],$())}}}else if(8===r.nodeType)if(r.data===l)A.push({type:2,index:h});else{let t=-1;for(;-1!==(t=r.data.indexOf(o,t+1));)A.push({type:7,index:h}),t+=o.length-1}h++}}static createElement(t,e){const i=h.createElement("template");return i.innerHTML=t,i}}function S(t,e,i=t,s){var n,o,l,r;if(e===N)return e;let h=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const $=d(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==$&&(null===(o=null==h?void 0:h._$AO)||void 0===o||o.call(h,!1),void 0===$?h=void 0:(h=new $(t),h._$AT(t,i,s)),void 0!==s?(null!==(l=(r=i)._$Co)&&void 0!==l?l:r._$Co=[])[s]=h:i._$Cl=h),void 0!==h&&(e=S(t,h._$AS(t,e.values),h,s)),e}class I{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:h).importNode(i,!0);M.currentNode=n;let o=M.nextNode(),l=0,r=0,$=s[0];for(;void 0!==$;){if(l===$.index){let e;2===$.type?e=new E(o,o.nextSibling,this,t):1===$.type?e=new $.ctor(o,$.name,$.strings,this,t):6===$.type&&(e=new k(o,this,t)),this._$AV.push(e),$=s[++r]}l!==(null==$?void 0:$.index)&&(o=M.nextNode(),l++)}return M.currentNode=h,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class E{constructor(t,e,i,s){var n;this.type=2,this._$AH=C,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),d(t)?t===C||null==t||""===t?(this._$AH!==C&&this._$AR(),this._$AH=C):t!==this._$AH&&t!==N&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):A(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==C&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(h.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=w.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new I(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=b.get(t.strings);return void 0===e&&b.set(t.strings,e=new w(t)),e}T(t){a(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new E(this.k($()),this.k($()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class B{constructor(t,e,i,s,n){this.type=1,this._$AH=C,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=C}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=S(this,t,e,0),o=!d(t)||t!==this._$AH&&t!==N,o&&(this._$AH=t);else{const s=t;let l,r;for(t=n[0],l=0;l<n.length-1;l++)r=S(this,s[i+l],e,l),r===N&&(r=this._$AH[l]),o||(o=!d(r)||r!==this._$AH[l]),r===C?t=C:t!==C&&(t+=(null!=r?r:"")+n[l+1]),this._$AH[l]=r}o&&!s&&this.j(t)}j(t){t===C?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class U extends B{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===C?void 0:t}}const L=i?i.emptyScript:"";class P extends B{constructor(){super(...arguments),this.type=4}j(t){t&&t!==C?this.element.setAttribute(this.name,L):this.element.removeAttribute(this.name)}}class R extends B{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=S(this,t,e,0))&&void 0!==i?i:C)===N)return;const s=this._$AH,n=t===C&&s!==C||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==C&&(s===C||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class k{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}}const V={O:n,P:o,A:l,C:1,M:T,L:I,D:A,R:S,I:E,V:B,H:P,N:R,U:U,F:k},j=e.litHtmlPolyfillSupport;null==j||j(w,E),(null!==(t=e.litHtmlVersions)&&void 0!==t?t:e.litHtmlVersions=[]).push("2.7.4");const D=(t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let l=o._$litPart$;if(void 0===l){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=l=new E(e.insertBefore($(),t),t,void 0,null!=i?i:{})}return l._$AI(t),l};export{V as _$LH,H as html,N as noChange,C as nothing,D as render,x as svg};
