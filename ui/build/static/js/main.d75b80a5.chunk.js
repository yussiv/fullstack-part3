(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(13),u=t.n(c),o=t(14),i=t(2),l=t(3),m=t.n(l),f="/api/persons",d=function(){return m.a.get(f).then((function(e){return e.data}))},s=function(e){return m.a.post(f,e).then((function(e){return e.data}))},b=function(e){return m.a.delete("".concat(f,"/").concat(e.id)).then((function(e){return e.data}))},h=function(e){return m.a.put("".concat(f,"/").concat(e.id),e).then((function(e){return e.data}))},p=(t(37),function(e){var n=e.message,t=e.type;return null===n?null:r.a.createElement("div",{className:"notification ".concat(t)},n)}),v=function(e){return e.notifications.map((function(e){return r.a.createElement(p,{key:e.id,message:e.message,type:e.type})}))},E=function(e){var n=e.filterInput,t=e.handleFilter;return r.a.createElement("div",null,"show entries containing ",r.a.createElement("input",{value:n,onChange:t}))},O=function(e){var n=e.name,t=e.number,a=e.handleName,c=e.handleNumber,u=e.handleSubmit;return r.a.createElement("form",{onSubmit:u},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:n,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:t,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},g=function(e){var n=e.persons,t=e.handleRemove;return n.map((function(e){return r.a.createElement("div",{key:e.name},e.name," ",e.number,r.a.createElement("button",{onClick:t(e)},"delete"))}))},j=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),l=Object(i.a)(u,2),m=l[0],f=l[1],p=Object(a.useState)(""),j=Object(i.a)(p,2),w=j[0],k=j[1],y=Object(a.useState)(""),S=Object(i.a)(y,2),N=S[0],C=S[1],D=Object(a.useState)([]),R=Object(i.a)(D,2),x=R[0],F=R[1],I=Object(a.useRef)(x);I.current=x,Object(a.useEffect)((function(){d().then((function(e){c(e)}))}),[]);var J=t.filter((function(e){return N.length<1||e.name.toLowerCase().indexOf(N.toLowerCase())>-1})),L=function(e,n){var t=(new Date).valueOf();F(x.concat({message:e,id:t,type:n})),setTimeout((function(){F(I.current.filter((function(e){return e.id!==t})))}),5e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(v,{notifications:x}),r.a.createElement(E,{input:N,handleFilter:function(e){C(e.target.value)}}),r.a.createElement("h2",null,"add new"),r.a.createElement(O,{name:m,number:w,handleName:function(e){f(e.target.value)},handleNumber:function(e){k(e.target.value)},handleSubmit:function(e){e.preventDefault();var n,a="".concat(m," is already in the phonebook, replace number with new one?"),r=(n=m,t.filter((function(e){return e.name===n}))[0]);r?window.confirm(a)&&h(Object(o.a)({},r,{number:w})).then((function(e){c(t.map((function(n){return n.id===e.id?e:n}))),L("Number updated for ".concat(m),"success")})):s({name:m,number:w}).then((function(e){c(t.concat(e)),L("Added ".concat(m),"success")}))}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(g,{persons:J,handleRemove:function(e){return function(){window.confirm("Delete ".concat(e.name))&&b(e).then((function(){c(t.filter((function(n){return n.id!==e.id}))),L("".concat(e.name," removed from database"),"success")})).catch((function(){c(t.filter((function(n){return n.id!==e.id}))),L("".concat(e.name," not found in database"),"failure")}))}}}))};u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.d75b80a5.chunk.js.map