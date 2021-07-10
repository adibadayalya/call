(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{106:function(e,t,n){},107:function(e,t,n){},147:function(e,t,n){"use strict";n.r(t);var c=n(2),r=n.n(c),s=n(35),a=n.n(s),o=n(22),i=n.n(o),l=n(30),u=n(11),d=n(157),j=n(158),b=n(79),m=(n(92),n(36)),p=b.a.initializeApp({apiKey:"AIzaSyB9Nqfz-StvZoeJ0X2sTDqOW1OyUPmxjx4",authDomain:"teams-clone-316708.firebaseapp.com",projectId:"teams-clone-316708",storageBucket:"teams-clone-316708.appspot.com",messagingSenderId:"622263471236",appId:"1:622263471236:web:1af8464e0482f30b27c6d1"}),h=p.auth(),O=n(3),x=r.a.createContext();function f(){return Object(c.useContext)(x)}function g(e){var t=e.children,n=new m.a.auth.GoogleAuthProvider,r=new m.a.auth.OAuthProvider("microsoft.com"),s=Object(c.useState)(),a=Object(u.a)(s,2),o=a[0],i=a[1],l=Object(c.useState)(!0),d=Object(u.a)(l,2),j=d[0],b=d[1];Object(c.useEffect)((function(){return h.onAuthStateChanged((function(e){i(e),b(!1)}))}),[]);var p={currentUser:o,signup:function(e,t){return h.createUserWithEmailAndPassword(e,t)},login:function(e,t){return h.signInWithEmailAndPassword(e,t)},logout:function(){return h.signOut()},resetPassword:function(e){return h.sendPasswordResetEmail(e)},updatePassword:function(e){return o.updatePassword(e)},updateName:function(e){return o.updateProfile({displayName:e})},googleSignIn:function(){m.a.auth().signInWithPopup(n).then((function(e){})).catch((function(e){console.log(e)}))},msSignIn:function(){m.a.auth().signInWithPopup(r).then((function(e){})).catch((function(e){console.log(e)}))}};return Object(O.jsx)(x.Provider,{value:p,children:!j&&t})}var v=n(12),w=n(18),y=(n(48),n(150)),N=n(151);function k(e){var t=e.forwardedRef;return Object(O.jsxs)(j.a.Group,{children:[Object(O.jsx)(j.a.Label,{children:"Email"}),Object(O.jsxs)(y.a,{children:[Object(O.jsx)(j.a.Control,{type:"email",required:!0,ref:t,style:{border:"none"}}),Object(O.jsx)(y.a.Append,{style:{backgroundColor:"white",border:"none",padding:"8px"},children:Object(O.jsx)(N.a,{size:20,color:"black",style:{backgroundColor:"white"}})})]})]})}var C=n(152);function R(e){var t=e.forwardedRef;return Object(O.jsxs)(j.a.Group,{id:"name",children:[Object(O.jsx)(j.a.Label,{children:"Name"}),Object(O.jsxs)(y.a,{children:[Object(O.jsx)(j.a.Control,{type:"text",required:!0,ref:t,style:{border:"none"}}),Object(O.jsx)(y.a.Append,{style:{backgroundColor:"white",border:"none",padding:"8px"},children:Object(O.jsx)(C.a,{size:20,color:"black",style:{backgroundColor:"white"}})})]})]})}var S=n(153),D=n(154);function L(e){var t=e.forwardedRef;return Object(O.jsxs)(j.a.Group,{id:"password",className:"mt-3 mb-3",children:[Object(O.jsx)(j.a.Label,{children:"Password"}),Object(O.jsxs)(y.a,{children:[Object(O.jsx)(j.a.Control,{type:"password",required:!0,ref:t,style:{border:"none"}}),Object(O.jsx)(y.a.Append,{children:Object(O.jsx)(S.a,{onClick:function(){"password"===t.current.type?t.current.type="text":t.current.type="password"},variant:"outline-secondary",style:{backgroundColor:"white",border:"none",borderRadius:"0px",padding:"8px"},children:Object(O.jsx)(D.a,{size:20,color:"black"})})})]})]})}function A(e){var t=e.forwardedRef;return Object(O.jsxs)(j.a.Group,{id:"password-confirm",className:"mt-3 mb-3",children:[Object(O.jsx)(j.a.Label,{children:"Confirm Password"}),Object(O.jsxs)(y.a,{children:[Object(O.jsx)(j.a.Control,{type:"password",required:!0,ref:t,style:{border:"none"}}),Object(O.jsx)(y.a.Append,{children:Object(O.jsx)(S.a,{onClick:function(){"password"===t.current.type?t.current.type="text":t.current.type="password"},variant:"outline-secondary",style:{backgroundColor:"white",border:"none",borderRadius:"0px",padding:"8px"},children:Object(O.jsx)(D.a,{size:20,color:"black"})})})]})]})}function U(){var e=f().googleSignIn;return Object(O.jsxs)(S.a,{className:"w-100 mt-2 shadow",style:{backgroundColor:"black",border:"none"},onClick:e,children:[Object(O.jsx)("img",{alt:"Google",style:{marginRight:"4px",marginBottom:"2px"},width:"20px",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"}),"Continue with Google"]})}function P(){var e=f().msSignIn;return Object(O.jsxs)(S.a,{className:"w-100 mt-2 shadow",style:{backgroundColor:"black",border:"none"},onClick:e,children:[Object(O.jsx)("img",{alt:"Microsoft",style:{marginRight:"4px",marginBottom:"3px"},width:"20px",src:"https://image.flaticon.com/icons/png/512/732/732221.png"}),"Continue with Microsoft"]})}function I(){return Object(O.jsxs)("div",{style:{maxWidth:"400px",margin:"auto"},className:"text-center",children:[Object(O.jsx)(U,{}),Object(O.jsx)("span",{className:"line-text",children:"or"}),Object(O.jsx)(P,{})]})}function T(){var e=Object(c.useRef)(),t=Object(c.useRef)(),n=Object(c.useRef)(),r=Object(c.useRef)(),s=f().signup,a=Object(c.useState)(""),o=Object(u.a)(a,2),b=o[0],m=o[1],p=Object(c.useState)(!1),h=Object(u.a)(p,2),x=h[0],g=h[1],y=Object(v.g)();function N(){return(N=Object(l.a)(i.a.mark((function c(a){return i.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:if(a.preventDefault(),t.current.value===n.current.value){c.next=3;break}return c.abrupt("return",m("Passwords do not match!"));case 3:return c.prev=3,m(""),g(!0),c.next=8,s(e.current.value,t.current.value).then((function(e){return e.user.updateProfile({displayName:r.current.value,photoURL:"https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"})}));case 8:y.push("/"),c.next=14;break;case 11:c.prev=11,c.t0=c.catch(3),m(c.t0.message);case 14:g(!1);case 15:case"end":return c.stop()}}),c,null,[[3,11]])})))).apply(this,arguments)}return Object(O.jsxs)("div",{className:"d-flex out-div",children:[Object(O.jsx)("div",{className:"signUp shadow",children:Object(O.jsxs)("div",{className:"signUpContent",children:[Object(O.jsx)("h2",{className:"text-center mb-4",style:{color:"rgba(13,110,253,255)"},children:"Create an Account"}),Object(O.jsx)("hr",{style:{height:"2.5px"}}),b&&Object(O.jsx)(d.a,{variant:"danger",children:b}),Object(O.jsxs)(j.a,{onSubmit:function(e){return N.apply(this,arguments)},children:[Object(O.jsx)(R,{forwardedRef:r}),Object(O.jsx)(k,{forwardedRef:e}),Object(O.jsx)(L,{forwardedRef:t}),Object(O.jsx)(A,{forwardedRef:n}),Object(O.jsx)("button",{disabled:x,type:"submit",className:"mt-3 shadow signup-btn",children:"Sign Up"})]})]})}),Object(O.jsx)("span",{style:{margin:"auto"},children:"or"}),Object(O.jsxs)("div",{className:"options-box",children:[Object(O.jsxs)("div",{className:"w-100 text-center mt-2",children:["Already have an account? ",Object(O.jsx)(w.b,{to:"/login",style:{textDecoration:"none"},children:"Log In"})]}),Object(O.jsx)("span",{className:"line-text",children:"or"}),Object(O.jsx)(I,{})]})]})}var M=n(156),V=n(155),E=(n(61),n(159)),G=n(43);n(106);function z(){var e=Object(c.useRef)(Object(E.a)());return Object(O.jsx)(G.CopyToClipboard,{text:e.current,children:Object(O.jsx)("button",{className:"w-100 create-meeting-btn",onClick:function(){var t=window.open("/meeting/".concat(e.current),"_blank");e.current=Object(E.a)(),t.focus()},children:"Create Room"})})}var W=n.p+"static/media/graphic.dacc7cdc.jpeg";function B(){var e=Object(c.useState)(""),t=Object(u.a)(e,2),n=t[0],r=t[1],s=Object(c.useState)(""),a=Object(u.a)(s,2),o=a[0],b=a[1],m=f(),p=m.currentUser,h=m.logout,x=Object(v.g)();function g(){return(g=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b(""),e.prev=1,e.next=4,h();case 4:x.push("/login"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),b("Failed to Log Out");case 10:case"end":return e.stop()}}),e,null,[[1,7]])})))).apply(this,arguments)}return Object(O.jsxs)("div",{className:"outt-div",children:[Object(O.jsxs)("div",{className:"d-flex menu-pic text-center",children:["password"===p.providerData[0].providerId&&Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(w.b,{to:"/update-profile",className:"btn-primary shadow update-btn",children:"Update Profile"}),Object(O.jsx)("div",{className:"vl"}),Object(O.jsx)("div",{className:"mt-2"})]}),Object(O.jsx)(V.a,{roundedCircle:!0,src:p.photoURL||"https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",alt:"default",style:{height:"40px",width:"40px",padding:"1px"}}),Object(O.jsxs)("div",{style:{padding:"8px",width:"auto"},children:[Object(O.jsx)("h5",{className:"mb-0",children:p.displayName}),Object(O.jsx)("span",{children:p.email})]}),Object(O.jsxs)("div",{className:"d-flex",children:[Object(O.jsx)("div",{className:"vl"}),Object(O.jsx)("div",{className:"mt-2",children:Object(O.jsx)(S.a,{size:"sm",onClick:function(){return g.apply(this,arguments)},className:"shadow",children:"Log Out"})})]})]}),Object(O.jsxs)("div",{className:"d-flex",children:[Object(O.jsxs)("div",{className:"text-center call-menu shadow",children:[Object(O.jsx)(z,{}),Object(O.jsx)(j.a,{onSubmit:function(e){e.preventDefault()},children:Object(O.jsxs)(j.a.Group,{id:"name",className:"mt-3 form-men",children:[Object(O.jsx)("span",{className:"line-text mt-4 mb-4",children:"or"}),Object(O.jsx)(j.a.Control,{className:"mt-3",type:"text",placeholder:"Enter Meeting Code",value:n,onChange:function(e){r(e.target.value)}}),Object(O.jsx)(j.a.Label,{className:"w-100",children:Object(O.jsx)("button",{type:"submit",className:"mt-3 join-room-btn",onClick:function(){""!==n?(b(""),window.open("/meeting/".concat(n),"_blank").focus()):b("Enter room code!")},children:"Join Room"})})]})}),o&&Object(O.jsx)(d.a,{variant:"danger",children:o})]}),Object(O.jsx)("div",{className:"img-graphic",children:Object(O.jsx)(V.a,{className:"actual-image",roundedCircle:!0,src:W,height:"500px"})})]})]})}n(62);function F(){var e=Object(c.useRef)(),t=Object(c.useRef)(),n=f().login,r=Object(c.useState)(""),s=Object(u.a)(r,2),a=s[0],o=s[1],b=Object(c.useState)(!1),m=Object(u.a)(b,2),p=m[0],h=m[1],x=Object(v.g)();function g(){return(g=Object(l.a)(i.a.mark((function c(r){return i.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return r.preventDefault(),c.prev=1,o(""),h(!0),c.next=6,n(e.current.value,t.current.value);case 6:x.push("/"),c.next=12;break;case 9:c.prev=9,c.t0=c.catch(1),o(c.t0.message);case 12:h(!1);case 13:case"end":return c.stop()}}),c,null,[[1,9]])})))).apply(this,arguments)}return Object(O.jsxs)("div",{className:"d-flex out-div",children:[Object(O.jsx)("div",{className:"login shadow",children:Object(O.jsxs)("div",{className:"loginContent",children:[Object(O.jsx)("h2",{className:"text-center mb-4 heading",style:{color:"rgba(13,110,253,255)"},children:"Log In"}),Object(O.jsx)("hr",{style:{height:"2.5px"}}),a&&Object(O.jsx)(d.a,{variant:"danger",children:a}),Object(O.jsxs)(j.a,{onSubmit:function(e){return g.apply(this,arguments)},children:[Object(O.jsx)(k,{forwardedRef:e}),Object(O.jsx)(L,{forwardedRef:t})," ",Object(O.jsx)("button",{disabled:p,type:"submit",className:"mt-2 shadow login-btn",children:"Log In"}),Object(O.jsx)("div",{className:"w-100 text-center mt-3",children:Object(O.jsx)(w.b,{to:"/forgot-password",style:{textDecoration:"none"},children:"Forgot Password?"})})]}),Object(O.jsxs)("div",{className:"text-center mt-2",children:["Don't have an account? ",Object(O.jsx)(w.b,{to:"/signup",style:{textDecoration:"none"},children:"Sign Up"})]})]})}),Object(O.jsx)("span",{style:{margin:"auto"},children:"or"}),Object(O.jsx)(I,{})]})}var q=n(32),_=n(45),J=["component"];function H(e){var t=e.component,n=Object(_.a)(e,J),c=f().currentUser;return Object(O.jsx)(v.b,Object(q.a)(Object(q.a)({},n),{},{render:function(e){return c?Object(O.jsx)(t,Object(q.a)({},e)):Object(O.jsx)(v.a,{to:"/login"})}}))}var Y=["component"];function K(e){var t=e.component,n=Object(_.a)(e,Y),c=f().currentUser;return Object(O.jsx)(v.b,Object(q.a)(Object(q.a)({},n),{},{render:function(e){return c?Object(O.jsx)(v.a,{to:"/"}):Object(O.jsx)(t,Object(q.a)({},e))}}))}function X(){var e=Object(c.useRef)(),t=f().resetPassword,n=Object(c.useState)(""),r=Object(u.a)(n,2),s=r[0],a=r[1],o=Object(c.useState)(!1),b=Object(u.a)(o,2),m=b[0],p=b[1],h=Object(c.useState)(""),x=Object(u.a)(h,2),g=x[0],v=x[1];function y(){return(y=Object(l.a)(i.a.mark((function n(c){return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return c.preventDefault(),n.prev=1,v(""),a(""),p(!0),n.next=7,t(e.current.value);case 7:v("Check your inbox for further instructions!"),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(1),a(n.t0.message);case 13:p(!1);case 14:case"end":return n.stop()}}),n,null,[[1,10]])})))).apply(this,arguments)}return Object(O.jsx)("div",{className:"out-div",children:Object(O.jsxs)("div",{className:"form shadow",style:{marginTop:"15vh"},children:[Object(O.jsxs)("div",{className:"form-content",children:[Object(O.jsx)("h2",{className:"text-center mb-4",style:{color:"rgba(13,110,253,255)"},children:"Password Reset"}),Object(O.jsx)("hr",{style:{height:"2.5px"}}),s&&Object(O.jsx)(d.a,{variant:"danger",children:s}),g&&Object(O.jsx)(d.a,{variant:"success",children:g}),Object(O.jsxs)(j.a,{onSubmit:function(e){return y.apply(this,arguments)},children:[Object(O.jsx)(k,{forwardedRef:e}),Object(O.jsx)(S.a,{disabled:m,type:"submit",className:"w-100 mt-2",children:"Send Reset Password Link"})]})]}),Object(O.jsx)("div",{className:"w-100 text-center mt-2",children:Object(O.jsx)(w.b,{to:"/login",style:{textDecoration:"none"},children:"Log In"})}),Object(O.jsxs)("div",{className:"w-100 text-center mt-2",children:["Don't have an account? ",Object(O.jsx)(w.b,{to:"/signup",style:{textDecoration:"none"},children:"Sign Up!"})]})]})})}n(107);function Z(){var e=Object(c.useRef)(),t=Object(c.useRef)(),n=Object(c.useRef)(),r=Object(c.useRef)(),s=f(),a=s.currentUser,o=s.updatePassword,i=s.updateName,l=Object(c.useState)(""),b=Object(u.a)(l,2),m=b[0],p=b[1],h=Object(c.useState)(!1),x=Object(u.a)(h,2),g=x[0],k=x[1],R=Object(v.g)();return Object(O.jsx)("div",{className:"out-div",children:Object(O.jsx)("div",{className:"shadow updateProf",children:Object(O.jsxs)("div",{className:"content",children:[Object(O.jsx)("h2",{className:"text-center",style:{color:"rgba(13,110,253,255)"},children:"Update Profile"}),Object(O.jsx)("h6",{className:"text-center",style:{fontSize:"10px"},children:"**Please type in the current passowrd in both fields if password change is not required"}),Object(O.jsx)("hr",{style:{height:"2.5px"}}),m&&Object(O.jsx)(d.a,{variant:"danger",children:m}),Object(O.jsxs)(j.a,{onSubmit:function(e){if(e.preventDefault(),k(!0),p(""),t.current.value!==r.current.value)return p("Passwords do not match!");var c=[];n.current.value!==a.displayName&&c.push(i(n.current.value)),t.current.value&&c.push(o(t.current.value)),Promise.all(c).then((function(){R.push("/")})).catch((function(){p("Failed to Update Account")})).finally((function(){k(!1)}))},children:[Object(O.jsxs)(j.a.Group,{id:"name",children:[Object(O.jsx)(j.a.Label,{children:"Name"}),Object(O.jsxs)(y.a,{children:[Object(O.jsx)(j.a.Control,{type:"text",required:!0,ref:n,defaultValue:a.displayName}),Object(O.jsx)(y.a.Append,{style:{backgroundColor:"white",border:"none",padding:"8px"},children:Object(O.jsx)(C.a,{size:20,color:"black",style:{backgroundColor:"white"}})})]})]}),Object(O.jsxs)(j.a.Group,{id:"email",className:"mt-1",children:[Object(O.jsx)(j.a.Label,{children:"Email"}),Object(O.jsxs)(y.a,{children:[Object(O.jsx)(j.a.Control,{type:"email",required:!0,ref:e,defaultValue:a.email,disabled:!0}),Object(O.jsx)(y.a.Append,{style:{backgroundColor:"white",border:"none",padding:"8px"},children:Object(O.jsx)(N.a,{size:20,color:"black",style:{backgroundColor:"white"}})})]})]}),Object(O.jsx)(L,{forwardedRef:t}),Object(O.jsx)(A,{forwardedRef:r}),Object(O.jsxs)("div",{className:"w-100 text-center mt-3 d-flex",children:[Object(O.jsx)(S.a,{disabled:g,type:"submit",children:"Update"}),Object(O.jsx)(w.b,{className:"shadow btn-primary backToDashBoard",to:"/",style:{textDecoration:"none"},children:"Back to Dashboard"})]})]})]})})})}var Q=n(83),$=n.n(Q);function ee(e){var t=e.otherUserDeets,n=e.otherUserName,c=e.partner,r=e.userJoined,s=e.userLeft;return Object(O.jsxs)("div",{className:"join-alert",children:[r&&""!==c&&Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(V.a,{roundedCircle:!0,className:"img-thumbnail",style:{height:"50px",width:"50px",padding:"1px"},src:t.photoURL}),Object(O.jsxs)("span",{className:"join-name",children:[n," has joined!"]})]}),s&&Object(O.jsxs)("span",{className:"join-name",children:[n," left!"]})]})}var te=n.p+"static/media/HangUpButton.427d0f6c.png",ne=n(20);function ce(e){var t=e.roomID;return Object(O.jsxs)("div",{className:"copy-to-clipboard",children:[Object(O.jsx)("span",{className:"copy-alert shadow",children:"Copied!"}),Object(O.jsx)(G.CopyToClipboard,{text:t.current,children:Object(O.jsx)("button",{className:"shadow share-code-button",onClick:function(){return function(){var e=document.getElementsByClassName("copy-alert")[0];e.style.left="0vw",setTimeout((function(){e.style.left="-90vw"}),3e3)}()},children:Object(O.jsx)(ne.f,{size:30,color:"white"})})})]})}function re(e){var t=e.visibilityMsg,n=e.gotANewMessage,c=e.messageWindow,r=e.userVideoContainer,s=e.setVisibilityMsg,a=e.setGotANewMessage;function o(){t?(c.current.style.right="-60vw",r.current.style.left="74%",s(!1),a(!1)):(c.current.style.right="1vw",r.current.style.left="45%",s(!0),a(!1))}return Object(O.jsxs)(O.Fragment,{children:[document.addEventListener("keydown",(function(e){t&&27===e.keyCode&&o()})),t?Object(O.jsx)("button",{onClick:o,className:"message-toggle",children:Object(O.jsx)(ne.c,{size:25})}):n?Object(O.jsx)("button",{onClick:o,className:"message-toggle",children:Object(O.jsx)(ne.d,{size:25,color:"darkgreen"})}):Object(O.jsx)("button",{onClick:o,className:"message-toggle",children:Object(O.jsx)(ne.e,{size:25,color:"white"})})]})}function se(e){var t=e.userStream,n=Object(c.useState)(!1),r=Object(u.a)(n,2),s=r[0],a=r[1];function o(){t.current.getAudioTracks()[0].enabled?(t.current.getAudioTracks()[0].enabled=!1,a(!0)):(t.current.getAudioTracks()[0].enabled=!0,a(!1))}return Object(O.jsx)(O.Fragment,{children:s?Object(O.jsx)("button",{className:"control-button",onClick:o,children:Object(O.jsx)(ne.i,{className:"mic-icon",size:30,style:{backgroundColor:"red"}})}):Object(O.jsx)("button",{className:"control-button",onClick:o,children:Object(O.jsx)(ne.h,{className:"mic-icon",size:30,style:{backgroundColor:"white"}})})})}function ae(e){var t=e.userStream,n=e.roomID,r=e.socketRef,s=Object(c.useState)(!1),a=Object(u.a)(s,2),o=a[0],i=a[1];function l(){t.current.getVideoTracks()[0].enabled?(t.current.getVideoTracks()[0].enabled=!1,i(!0),r.current.emit("other-user-video-off",n)):(t.current.getVideoTracks()[0].enabled=!0,r.current.emit("other-user-video-on",n),i(!1))}return Object(O.jsx)(O.Fragment,{children:o?Object(O.jsx)("button",{className:"control-button",onClick:l,children:Object(O.jsx)(ne.a,{className:"cam-icon",size:30,style:{backgroundColor:"red"}})}):Object(O.jsx)("button",{className:"control-button",onClick:l,children:Object(O.jsx)(ne.b,{className:"cam-icon",size:30,style:{backgroundColor:"white"}})})})}function oe(e){var t=e.senders,n=e.userStream;return Object(O.jsx)("button",{className:"screen-share",onClick:function(){navigator.mediaDevices.getDisplayMedia({cursor:!0}).then((function(e){var c=e.getTracks()[0];t.current.find((function(e){return"video"===e.track.kind})).replaceTrack(c),c.onended=function(){t.current.find((function(e){return"video"===e.track.kind})).replaceTrack(n.current.getTracks()[1])}}))},children:"Share Screen"})}function ie(e){var t=e.roomID,n=e.visibilityMsg,c=e.gotANewMessage,r=e.messageWindow,s=e.userVideoContainer,a=e.setVisibilityMsg,o=e.setGotANewMessage,i=e.userStream,l=e.socketRef,u=e.senders;return Object(O.jsxs)("div",{className:"control-panel",children:[Object(O.jsx)(ce,{roomID:t}),Object(O.jsx)("div",{className:"control-panel-element",children:Object(O.jsx)(re,{visibilityMsg:n,gotANewMessage:c,messageWindow:r,userVideoContainer:s,setVisibilityMsg:a,setGotANewMessage:o})}),Object(O.jsx)(se,{userStream:i}),Object(O.jsx)("img",{className:"hang-up-btn",onClick:function(){return console.log("leave"),void window.open("","_self").close()},src:te,alt:"hang-up"}),Object(O.jsx)(ae,{userStream:i,socketRef:l,roomID:t.current}),Object(O.jsx)(oe,{senders:u,userStream:i})]})}function le(e){var t=e.userVideoContainer,n=e.userVideo;return Object(O.jsxs)("div",{className:"my-video-container",ref:t,children:[Object(O.jsx)("span",{className:"my-name",children:"You"}),Object(O.jsx)("video",{className:"my-video",autoPlay:!0,ref:n,muted:!0})]})}function ue(e){var t=e.partnerVideoGrid,n=e.partner,c=e.otherUSerVideoVisible,r=e.otherUserDeets,s=e.partnerVideo;return Object(O.jsxs)("div",{className:"partner-video-container",ref:t,children:[""===n&&Object(O.jsx)("span",{className:"default-message",children:"No one else is here"}),!c&&""!==n&&Object(O.jsx)("div",{className:"alt-image-vid-off",children:Object(O.jsx)(V.a,{roundedCircle:!0,className:"alt-image-off img-thumbnail",style:{height:"100px",width:"100px",padding:"1px"},src:r.photoURL})}),""!==n&&Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("video",{className:"caller-video",autoPlay:!0,ref:s,controls:!0}),Object(O.jsx)("span",{className:"caller-name",children:n})]})]})}function de(e){var t=e.actualMessage,n=e.messageDiv,r=e.socketRef,s=e.setGotANewMessage,a=e.roomID,o=f().currentUser;function i(){n.current.scrollTop=n.current.scrollHeight}return Object(c.useEffect)((function(){r.current.on("recieved a new message",(function(e){var t=Object(u.a)(e,2);!function(e,t){var c=document.createElement("div");c.classList.add("messageCard");var r=document.createElement("p");r.innerText=t,r.classList.add("senderDetails"),r.classList.add("senderDetailsOther");var s=document.createElement("p");s.innerText=e,s.classList.add("msg"),c.append(r),c.append(s),n.current.append(c)}(t[0],t[1]),s(!0),i()}))}),[]),Object(O.jsx)("div",{className:"msg-box",children:Object(O.jsx)(j.a,{onSubmit:function(e){e.preventDefault()},children:Object(O.jsx)(j.a.Group,{id:"message-input",children:Object(O.jsxs)(y.a,{children:[Object(O.jsx)(j.a.Control,{type:"text",style:{color:"black"},ref:t}),Object(O.jsx)(y.a.Append,{children:Object(O.jsx)("button",{style:{padding:"8px"},onClick:function(){""!==t.current.value&&(!function(e){var t=document.createElement("div");t.classList.add("messageCard");var c=document.createElement("p");c.innerText="You",c.classList.add("senderDetails"),c.classList.add("senderDetailsSelf");var r=document.createElement("p");r.innerText=e,r.classList.add("msg"),t.append(c),t.append(r),n.current.append(t)}(t.current.value),i(),r.current.emit("sending a message",[t.current.value,o.displayName,a]),t.current.value="")},className:"message-send-button",children:Object(O.jsx)(ne.g,{size:20})})})]})})})})}n(78);var je={height:window.innerHeight,width:window.innerWidth};function be(e){var t=f().currentUser,n=Object(c.useRef)(e.match.params.roomID),r=Object(c.useRef)(),s=Object(c.useRef)(),a=Object(c.useRef)(),o=Object(c.useRef)(),i=Object(c.useRef)(),l=Object(c.useRef)(),d=Object(c.useRef)(),j=Object(c.useRef)(),b=Object(c.useRef)(),m=Object(c.useRef)(),p=Object(c.useRef)(),h=Object(c.useRef)([]),x=Object(c.useState)(!0),g=Object(u.a)(x,2),v=g[0],w=g[1],y=Object(c.useState)(!0),N=Object(u.a)(y,2),k=N[0],C=N[1],R=Object(c.useState)(!1),S=Object(u.a)(R,2),D=S[0],L=S[1],A=Object(c.useState)(!1),U=Object(u.a)(A,2),P=U[0],I=U[1],T=Object(c.useState)(!1),M=Object(u.a)(T,2),V=M[0],E=M[1],G=Object(c.useState)(!1),z=Object(u.a)(G,2),W=z[0],B=z[1],F=Object(c.useState)(),q=Object(u.a)(F,2),_=q[0],J=q[1],H=Object(c.useState)(""),Y=Object(u.a)(H,2),K=Y[0],X=Y[1],Z=Object(c.useState)(""),Q=Object(u.a)(Z,2),te=Q[0],ne=Q[1];function ce(e){var n=new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:stun2.l.google.com:19302"},{urls:"stun:stun3.l.google.com:19302"},{urls:"stun:stun4.l.google.com:19302"}]});return n.onicecandidate=ae,n.ontrack=be,n.onnegotiationneeded=function(){return function(e){a.current.createOffer().then((function(e){return a.current.setLocalDescription(e)})).then((function(){var n={target:e,caller:l.current.id,sdp:a.current.localDescription,userObject:t};l.current.emit("offer",n)})).catch((function(e){return console.log(e)}))}(e)},n}function re(e){a.current=ce();var n=new RTCSessionDescription(e.sdp);e.userObject&&v&&(I(!0),me(),E(!1),J(e.userObject),X(e.userObject.displayName),ne(e.userObject.displayName)),a.current.setRemoteDescription(n).then((function(){j.current.getTracks().forEach((function(e){return h.current.push(a.current.addTrack(e,j.current))}))})).then((function(){return a.current.createAnswer()})).then((function(e){return a.current.setLocalDescription(e)})).then((function(){var n={target:e.caller,caller:l.current.id,sdp:a.current.localDescription,userObject:t};l.current.emit("answer",n)}))}function se(e){var t=new RTCSessionDescription(e.sdp);a.current.setRemoteDescription(t).catch((function(e){return console.log(e)}))}function ae(e){if(e.candidate){var n={target:d.current,candidate:e.candidate,userObject:t};l.current.emit("ice-candidate",n)}}function oe(e){var t=new RTCIceCandidate(e);a.current.addIceCandidate(t).catch((function(e){return console.log(e)}))}function be(e){s.current.srcObject=e.streams[0],s.current.style.display="block"}function me(){var e=document.getElementsByClassName("join-alert")[0];e.style.left="2vw",setTimeout((function(){e.style.left="-50vw"}),3e3),"seagreen"===e.style.backgroundColor?e.style.backgroundColor="red":e.style.backgroundColor="seagreen"}return Object(c.useEffect)((function(){navigator.mediaDevices.getUserMedia({audio:!0,video:je}).then((function(n){r.current.srcObject=n,j.current=n,l.current=$.a.connect("/"),l.current.emit("join room",[e.match.params.roomID,t]),l.current.on("other user",(function(e){var n=Object(u.a)(e,2),c=n[0],r=n[1];w(!1),function(e){a.current=ce(e),j.current.getTracks().forEach((function(e){return h.current.push(a.current.addTrack(e,j.current))}))}(c),J(r),X(r.displayName),ne(r.displayName),I(!0),me(),E(!1),d.current=c,l.current.emit("my name",t.displayName)})),l.current.on("user joined",(function(e){d.current=e})),l.current.on("offer",re),l.current.on("answer",se),l.current.on("ice-candidate",oe),l.current.on("video off by other user",(function(){C(!1),s.current.style.display="none"})),l.current.on("video on by other user",(function(){C(!0),s.current.style.display="block"})),l.current.on("user left",(function(e){s.current&&(s.current.style.display="none"),a.current&&a.current.close(),console.log("userLeft"),console.log(e),ne(""),I(!1),E(!0),me(),console.log(V),C(!0)}))})).catch((function(){alert("You can not join/create without providing permission for camera and mic input!")}))}),[]),Object(O.jsxs)("div",{className:"outer-box",children:[Object(O.jsxs)("div",{className:"video-container",children:[Object(O.jsx)(le,{userVideoContainer:i,userVideo:r}),Object(O.jsx)(ue,{partnerVideoGrid:o,partner:te,otherUSerVideoVisible:k,otherUserDeets:_,partnerVideo:s}),Object(O.jsxs)("div",{ref:p,className:"msg-container",children:[Object(O.jsx)("div",{ref:b,className:"chat-window"}),Object(O.jsx)(O.Fragment,{children:l.current&&Object(O.jsx)(de,{actualMessage:m,messageDiv:b,socketRef:l,setGotANewMessage:B,roomID:n.current})})]})]}),Object(O.jsx)(ee,{otherUserDeets:_,otherUserName:K,partner:te,userJoined:P,userLeft:V}),Object(O.jsx)(ie,{roomID:n,visibilityMsg:D,gotANewMessage:W,messageWindow:p,userVideoContainer:i,setVisibilityMsg:L,setGotANewMessage:B,userStream:j,socketRef:l,senders:h})]})}var me=n(84);var pe=function(){return Object(O.jsx)(M.a,{className:"d-flex align-items-center justify-content-center",style:{maxHeight:"100vh",maxWidth:"100vw"},children:Object(O.jsx)("div",{className:"w-100",children:Object(O.jsx)(w.a,{children:Object(O.jsx)(g,{children:Object(O.jsxs)(me.a,{atEnter:{opacity:0},atLeave:{opacity:0},atActive:{opacity:1},className:"switch-wrapper",children:[Object(O.jsx)(H,{exact:!0,path:"/",component:B}),Object(O.jsx)(H,{path:"/update-profile",component:Z}),Object(O.jsx)(H,{path:"/meeting/:roomID",component:be}),Object(O.jsx)(K,{path:"/signup",component:T}),Object(O.jsx)(K,{path:"/login",component:F}),Object(O.jsx)(K,{path:"/forgot-password",component:X})]})})})})})};n(146);document.addEventListener("DOMContentLoaded",(function(){a.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(pe,{})}),document.getElementById("root"))}))},48:function(e,t,n){},61:function(e,t,n){},62:function(e,t,n){},78:function(e,t,n){}},[[147,1,2]]]);
//# sourceMappingURL=main.27ffb2e9.chunk.js.map