(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{141:function(e,t){},143:function(e,t){},152:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(31),s=n.n(a),i=n(11),o=n.n(i),l=n(16),j=n(8),u=n(161),d=n(158),b=n(159),O=n(155),p=n(52);n(100);(new p.a.auth.GoogleAuthProvider).addScope("https://www.googleapis.com/auth/contacts.readonly");var h=p.a.initializeApp({apiKey:"AIzaSyB9Nqfz-StvZoeJ0X2sTDqOW1OyUPmxjx4",authDomain:"teams-clone-316708.firebaseapp.com",projectId:"teams-clone-316708",storageBucket:"teams-clone-316708.appspot.com",messagingSenderId:"622263471236",appId:"1:622263471236:web:1af8464e0482f30b27c6d1"}),x=h.auth(),m=n(1),f=c.a.createContext();function g(){return Object(r.useContext)(f)}function v(e){var t=e.children,n=Object(r.useState)(),c=Object(j.a)(n,2),a=c[0],s=c[1],i=Object(r.useState)(!0),o=Object(j.a)(i,2),l=o[0],u=o[1];Object(r.useEffect)((function(){return x.onAuthStateChanged((function(e){s(e),u(!1)}))}),[]);var d={currentUser:a,signup:function(e,t){return x.createUserWithEmailAndPassword(e,t)},login:function(e,t){return x.signInWithEmailAndPassword(e,t)},logout:function(){return x.signOut()},resetPassword:function(e){return x.sendPasswordResetEmail(e)},updatePassword:function(e){return a.updatePassword(e)},updateName:function(e){return a.updateProfile({displayName:e})}};return Object(m.jsx)(f.Provider,{value:d,children:!l&&t})}var w=n(7),y=n(9);function N(){var e=Object(r.useRef)(),t=Object(r.useRef)(),n=Object(r.useRef)(),c=Object(r.useRef)(),a=g().signup,s=Object(r.useState)(""),i=Object(j.a)(s,2),p=i[0],h=i[1],x=Object(r.useState)(!1),f=Object(j.a)(x,2),v=f[0],N=f[1],C=Object(w.g)();function k(){return(k=Object(l.a)(o.a.mark((function r(s){return o.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(s.preventDefault(),t.current.value===n.current.value){r.next=3;break}return r.abrupt("return",h("Passwords do not match!"));case 3:return r.prev=3,h(""),N(!0),r.next=8,a(e.current.value,t.current.value).then((function(e){return e.user.updateProfile({displayName:c.current.value,photoURL:"https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"})}));case 8:C.push("/"),r.next=14;break;case 11:r.prev=11,r.t0=r.catch(3),h("Failed to create an account");case 14:N(!1);case 15:case"end":return r.stop()}}),r,null,[[3,11]])})))).apply(this,arguments)}return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(u.a,{children:Object(m.jsxs)(u.a.Body,{children:[Object(m.jsx)("h2",{className:"text-center mb-4",children:"Sign Up"}),p&&Object(m.jsx)(d.a,{variant:"danger",children:p}),Object(m.jsxs)(b.a,{onSubmit:function(e){return k.apply(this,arguments)},children:[Object(m.jsxs)(b.a.Group,{id:"name",children:[Object(m.jsx)(b.a.Label,{children:"Name"}),Object(m.jsx)(b.a.Control,{type:"text",required:!0,ref:c})]}),Object(m.jsxs)(b.a.Group,{id:"email",children:[Object(m.jsx)(b.a.Label,{children:"Email"}),Object(m.jsx)(b.a.Control,{type:"email",required:!0,ref:e})]}),Object(m.jsxs)(b.a.Group,{id:"password",children:[Object(m.jsx)(b.a.Label,{children:"Password"}),Object(m.jsx)(b.a.Control,{type:"password",required:!0,ref:t})]}),Object(m.jsxs)(b.a.Group,{id:"password-confirm",children:[Object(m.jsx)(b.a.Label,{children:"Confrim Password"}),Object(m.jsx)(b.a.Control,{type:"password",required:!0,ref:n})]}),Object(m.jsx)(O.a,{disabled:v,type:"submit",className:"w-100 mt-2",children:"Sign Up"})]})]})}),Object(m.jsxs)("div",{className:"w-100 text-center mt-2",children:["Already have an account? ",Object(m.jsx)(y.b,{to:"/login",style:{textDecoration:"none"},children:"Log In"})]})]})}var C=n(157),k=n(156);function S(){var e=Object(r.useState)(""),t=Object(j.a)(e,2),n=t[0],c=t[1],a=g(),s=a.currentUser,i=a.logout,b=Object(w.g)();function p(){return(p=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c(""),e.prev=1,e.next=4,i();case 4:b.push("/login"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),c("Failed to Log Out");case 10:case"end":return e.stop()}}),e,null,[[1,7]])})))).apply(this,arguments)}return Object(m.jsx)("div",{style:{backgroundColor:"lightgrey"},children:Object(m.jsxs)(u.a,{children:[Object(m.jsxs)(u.a.Body,{className:"text-center",children:[Object(m.jsx)(k.a,{roundedCircle:!0,src:s.photoURL,alt:"default",style:{height:"150px",width:"150px",margin:"auto"}}),Object(m.jsxs)("h2",{className:"text-center mb-4",children:["Hello ",s.displayName,"!"]}),n&&Object(m.jsx)(d.a,{variant:"danger",children:n}),Object(m.jsx)("strong",{children:"Email: "})," ",s.email,Object(m.jsx)(y.b,{to:"/update-profile",className:"btn btn-primary w-100 mt-3",children:"Update Profile"}),Object(m.jsx)(y.b,{to:"/call-menu",className:"btn btn-primary w-100 mt-3",children:"Call Menu"})]}),Object(m.jsx)("div",{className:"w-100 text-center mt-2",children:Object(m.jsx)(O.a,{variant:"link",style:{textDecoration:"none"},onClick:function(){return p.apply(this,arguments)},children:"Log Out"})})]})})}function P(){var e=Object(r.useRef)(),t=Object(r.useRef)(),n=g().login,c=Object(r.useState)(""),a=Object(j.a)(c,2),s=a[0],i=a[1],p=Object(r.useState)(!1),h=Object(j.a)(p,2),x=h[0],f=h[1],v=Object(w.g)();function N(){return(N=Object(l.a)(o.a.mark((function r(c){return o.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return c.preventDefault(),r.prev=1,i(""),f(!0),r.next=6,n(e.current.value,t.current.value);case 6:v.push("/"),r.next=12;break;case 9:r.prev=9,r.t0=r.catch(1),i("Failed to sign in");case 12:f(!1);case 13:case"end":return r.stop()}}),r,null,[[1,9]])})))).apply(this,arguments)}return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(u.a,{children:Object(m.jsxs)(u.a.Body,{children:[Object(m.jsx)("h2",{className:"text-center mb-4",children:"Log In"}),s&&Object(m.jsx)(d.a,{variant:"danger",children:s}),Object(m.jsxs)(b.a,{onSubmit:function(e){return N.apply(this,arguments)},children:[Object(m.jsxs)(b.a.Group,{id:"email",children:[Object(m.jsx)(b.a.Label,{children:"Email"}),Object(m.jsx)(b.a.Control,{type:"email",required:!0,ref:e})]}),Object(m.jsxs)(b.a.Group,{id:"password",children:[Object(m.jsx)(b.a.Label,{children:"Password"}),Object(m.jsx)(b.a.Control,{type:"password",required:!0,ref:t})]}),Object(m.jsx)(O.a,{disabled:x,type:"submit",className:"w-100 mt-2",children:"Log In"}),Object(m.jsx)("div",{className:"w-100 text-center mt-3",children:Object(m.jsx)(y.b,{to:"/forgot-password",style:{textDecoration:"none"},children:"Forgot Password?"})})]})]})}),Object(m.jsxs)("div",{className:"w-100 text-center mt-2",children:["Need an account? ",Object(m.jsx)(y.b,{to:"/signup",style:{textDecoration:"none"},children:"Sign Up"})]})]})}var D=n(26),L=n(43),R=["component"];function I(e){var t=e.component,n=Object(L.a)(e,R),r=g().currentUser;return Object(m.jsx)(w.b,Object(D.a)(Object(D.a)({},n),{},{render:function(e){return r?Object(m.jsx)(t,Object(D.a)({},e)):Object(m.jsx)(w.a,{to:"/login"})}}))}var U=["component"];function E(e){var t=e.component,n=Object(L.a)(e,U),r=g().currentUser;return Object(m.jsx)(w.b,Object(D.a)(Object(D.a)({},n),{},{render:function(e){return r?Object(m.jsx)(w.a,{to:"/"}):Object(m.jsx)(t,Object(D.a)({},e))}}))}function B(){var e=Object(r.useRef)(),t=g().resetPassword,n=Object(r.useState)(""),c=Object(j.a)(n,2),a=c[0],s=c[1],i=Object(r.useState)(!1),p=Object(j.a)(i,2),h=p[0],x=p[1],f=Object(r.useState)(""),v=Object(j.a)(f,2),w=v[0],N=v[1];function C(){return(C=Object(l.a)(o.a.mark((function n(r){return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r.preventDefault(),n.prev=1,N(""),s(""),x(!0),n.next=7,t(e.current.value);case 7:N("Check your inbox for further instructions!"),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(1),s("Failed to reset Password");case 13:x(!1);case 14:case"end":return n.stop()}}),n,null,[[1,10]])})))).apply(this,arguments)}return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(u.a,{children:Object(m.jsxs)(u.a.Body,{children:[Object(m.jsx)("h2",{className:"text-center mb-4",children:"Password Reset"}),a&&Object(m.jsx)(d.a,{variant:"danger",children:a}),w&&Object(m.jsx)(d.a,{variant:"success",children:w}),Object(m.jsxs)(b.a,{onSubmit:function(e){return C.apply(this,arguments)},children:[Object(m.jsxs)(b.a.Group,{id:"email",children:[Object(m.jsx)(b.a.Label,{children:"Email"}),Object(m.jsx)(b.a.Control,{type:"email",required:!0,ref:e})]}),Object(m.jsx)(O.a,{disabled:h,type:"submit",className:"w-100 mt-2",children:"Reset Password"})]})]})}),Object(m.jsx)("div",{className:"w-100 text-center mt-2",children:Object(m.jsx)(y.b,{to:"/login",style:{textDecoration:"none"},children:"Log In"})}),Object(m.jsxs)("div",{className:"w-100 text-center mt-2",children:["Need an account? ",Object(m.jsx)(y.b,{to:"/signup",style:{textDecoration:"none"},children:"Sign Up"})]})]})}function G(){var e=Object(r.useRef)(),t=Object(r.useRef)(),n=Object(r.useRef)(),c=Object(r.useRef)(),a=g(),s=a.currentUser,i=a.updatePassword,o=a.updateName,l=Object(r.useState)(""),p=Object(j.a)(l,2),h=p[0],x=p[1],f=Object(r.useState)(!1),v=Object(j.a)(f,2),N=v[0],C=v[1],k=Object(w.g)();return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(u.a,{children:Object(m.jsxs)(u.a.Body,{children:[Object(m.jsx)("h2",{className:"text-center mb-4",children:"Update Profile"}),h&&Object(m.jsx)(d.a,{variant:"danger",children:h}),Object(m.jsxs)(b.a,{onSubmit:function(e){if(e.preventDefault(),C(!0),x(""),t.current.value!==c.current.value)return x("Passwords do not match!");var r=[];n.current.value!==s.displayName&&r.push(o(n.current.value)),t.current.value&&r.push(i(t.current.value)),Promise.all(r).then((function(){k.push("/")})).catch((function(){x("Failed to Update Account")})).finally((function(){C(!1)}))},children:[Object(m.jsxs)(b.a.Group,{id:"name",children:[Object(m.jsx)(b.a.Label,{children:"Name"}),Object(m.jsx)(b.a.Control,{type:"text",required:!0,ref:n,defaultValue:s.displayName})]}),Object(m.jsxs)(b.a.Group,{id:"email",children:[Object(m.jsx)(b.a.Label,{children:"Email"}),Object(m.jsx)(b.a.Control,{type:"email",required:!0,ref:e,defaultValue:s.email,disabled:!0})]}),Object(m.jsxs)(b.a.Group,{id:"password",children:[Object(m.jsx)(b.a.Label,{children:"Password"}),Object(m.jsx)(b.a.Control,{type:"password",ref:t,placeholder:"Leave Blank to keep the same"})]}),Object(m.jsxs)(b.a.Group,{id:"password-confirm",children:[Object(m.jsx)(b.a.Label,{children:"Confrim Password"}),Object(m.jsx)(b.a.Control,{type:"password",ref:c,placeholder:"Leave Blank to keep the same"})]}),Object(m.jsx)(O.a,{disabled:N,type:"submit",className:"w-100 mt-2",children:"Update"})]})]})}),Object(m.jsx)("div",{className:"w-100 text-center mt-2",children:Object(m.jsx)(y.b,{to:"/",style:{textDecoration:"none"},children:"Back to Dashboard"})})]})}var q=n(160),F=n(88);function A(){var e=Object(w.g)(),t=Object(r.useRef)(Object(q.a)());return Object(m.jsx)(F.CopyToClipboard,{text:t.current,children:Object(m.jsx)(O.a,{className:"w-100",onClick:function(){e.push("/meeting/".concat(t.current))},children:"Create Meeting"})})}function M(){var e=Object(r.useState)(""),t=Object(j.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(""),s=Object(j.a)(a,2),i=s[0],p=s[1],h=g(),x=h.currentUser,f=h.logout,v=Object(w.g)();function N(){return(N=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return p(""),e.prev=1,e.next=4,f();case 4:v.push("/login"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),p("Failed to Log Out");case 10:case"end":return e.stop()}}),e,null,[[1,7]])})))).apply(this,arguments)}return Object(m.jsx)("div",{style:{backgroundColor:"lightgrey"},children:Object(m.jsxs)(u.a,{children:[Object(m.jsxs)(u.a.Body,{className:"text-center",children:[Object(m.jsx)(k.a,{roundedCircle:!0,src:x.photoURL,alt:"default",style:{height:"150px",width:"150px",margin:"auto"}}),Object(m.jsx)("h2",{className:"text-center mb-4",children:"Call Menu"}),i&&Object(m.jsx)(d.a,{variant:"danger",children:i}),Object(m.jsx)("strong",{children:"Email: "})," ",x.email,Object(m.jsx)(b.a,{children:Object(m.jsxs)(b.a.Group,{id:"name",className:"mt-3",children:[Object(m.jsx)(A,{}),Object(m.jsx)(b.a.Control,{type:"text",placeholder:"Enter Meeting Code",value:n,onChange:function(e){c(e.target.value)}}),Object(m.jsx)(b.a.Label,{className:"w-100",children:Object(m.jsx)(y.b,{to:"/meeting",className:"btn btn-primary w-100 mt-3",onClick:function(){console.log(n)},children:"Join Meeting"})})]})}),Object(m.jsx)(y.b,{to:"/",className:"btn btn-primary w-100 mt-3",children:"Back To Dashboard"})]}),Object(m.jsx)("div",{className:"w-100 text-center mt-2",children:Object(m.jsx)(O.a,{variant:"link",style:{textDecoration:"none"},onClick:function(){return N.apply(this,arguments)},children:"Log Out"})})]})})}var J,T,W=n(93),z=n(56),H=n(89),V=n.n(H),Y=n(57),K=n.n(Y),X=n(58),Z=X.a.div(J||(J=Object(z.a)(["\n    padding: 20px;\n    display: flex;\n    height: 100vh;\n    width: 90%;\n    margin: auto;\n    flex-wrap: wrap;\n"]))),Q=X.a.video(T||(T=Object(z.a)(["\n    height: 40%;\n    width: 50%;\n"]))),$=function(e){var t=Object(r.useRef)();return Object(r.useEffect)((function(){e.peer.on("stream",(function(e){t.current.srcObject=e}))}),[]),console.log("nyVideo"),Object(m.jsx)(Q,{playsInline:!0,autoPlay:!0,ref:t,style:{transform:[{scaleY:-1}]}})},_={height:window.innerHeight,width:window.innerWidth},ee=function(e){var t=Object(r.useState)([]),n=Object(j.a)(t,2),c=n[0],a=n[1],s=Object(r.useRef)(),i=Object(r.useRef)(),o=Object(r.useRef)([]),l=e.match.params.roomID;return Object(r.useEffect)((function(){s.current=V.a.connect("/"),navigator.mediaDevices.getUserMedia({video:_,audio:!0}).then((function(e){i.current.srcObject=e,s.current.emit("join room",l),s.current.on("all users",(function(t){var n=[];t.forEach((function(t){var r=function(e,t,n){var r=new K.a({initiator:!0,trickle:!1,stream:n});return r.on("signal",(function(n){s.current.emit("sending signal",{userToSignal:e,callerID:t,signal:n})})),r}(t,s.current.id,e);o.current.push({peerID:t,peer:r}),n.push(r)})),a(n)})),s.current.on("user joined",(function(t){var n=function(e,t,n){var r=new K.a({initiator:!1,trickle:!1,stream:n});return r.on("signal",(function(e){s.current.emit("returning signal",{signal:e,callerID:t})})),r.signal(e),r}(t.signal,t.callerID,e);o.current.push({peerID:t.callerID,peer:n}),a((function(e){return[].concat(Object(W.a)(e),[n])}))})),s.current.on("receiving returned signal",(function(e){o.current.find((function(t){return t.peerID===e.id})).peer.signal(e.signal)}))}))}),[]),Object(m.jsxs)(Z,{style:{backgroundColor:"black"},children:[Object(m.jsx)(Q,{muted:!0,ref:i,autoPlay:!0,playsInline:!0,style:{transform:"rotateY(180deg)"}}),c.map((function(e,t){return Object(m.jsx)($,{peer:e},t)}))]})};var te=function(){return Object(m.jsx)(C.a,{className:"d-flex align-items-center justify-content-center",style:{minHeight:"100vh"},children:Object(m.jsx)("div",{className:"w-100",children:Object(m.jsx)(y.a,{children:Object(m.jsx)(v,{children:Object(m.jsxs)(w.d,{children:[Object(m.jsx)(I,{exact:!0,path:"/",component:S}),Object(m.jsx)(I,{path:"/update-profile",component:G}),Object(m.jsx)(I,{path:"/call-menu",component:M}),Object(m.jsx)(I,{path:"/meeting/:roomID",component:ee}),Object(m.jsx)(E,{path:"/signup",component:N}),Object(m.jsx)(E,{path:"/login",component:P}),Object(m.jsx)(E,{path:"/forgot-password",component:B})]})})})})})};n(151);s.a.render(Object(m.jsx)(c.a.StrictMode,{children:Object(m.jsx)(te,{})}),document.getElementById("root"))}},[[152,1,2]]]);
//# sourceMappingURL=main.4a337a00.chunk.js.map