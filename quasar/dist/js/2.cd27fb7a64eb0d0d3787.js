webpackJsonp([2],{142:function(t,e,i){function n(t){i(244)}var o=i(117)(i(246),i(247),n,null,null);t.exports=o.exports},244:function(t,e,i){var n=i(245);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i(139)("0b5c6aaa",n,!0)},245:function(t,e,i){e=t.exports=i(138)(void 0),e.push([t.i,"",""])},246:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(118);e.default={components:{QBtn:n.b,QIcon:n.g,QItemMain:n.i,QItemSide:n.k,QLayout:n.m,QListHeader:n.o,QScrollArea:n.p,QSideLink:n.q,QToolbar:n.r,QToolbarTitle:n.s},data:function(){return{isSignedIn:this.$store.state.isSignedIn}},methods:{logIn:function(){this.$store.dispatch("handleAuthClick")},logOut:function(){this.$store.dispatch("handleSignoutClick")}}}},247:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("q-layout",{ref:"layout"},[i("q-toolbar",{attrs:{color:"primary"},slot:"header"},[i("q-btn",{attrs:{flat:""},on:{click:function(e){t.$refs.layout.toggleLeft()}}},[i("q-icon",{attrs:{name:"menu"}})],1),t._v(" "),i("q-toolbar-title",[t._v("\n      Studio APG Calendar Tools\n    ")]),t._v(" "),this.$store.state.isSignedIn?t._e():i("q-btn",{attrs:{outline:"",color:"amber"},on:{click:function(e){t.logIn()}}},[t._v("\n      Authorize\n    ")]),t._v(" "),this.$store.state.isSignedIn?i("q-btn",{attrs:{outline:"",color:"amber"},on:{click:function(e){t.logOut()}}},[t._v("\n      Sign Out\n    ")]):t._e()],1),t._v(" "),i("q-scroll-area",{staticStyle:{width:"100%",height:"100%"},slot:"left"},[i("q-list-header",[t._v("Menu")]),t._v(" "),i("q-side-link",{attrs:{item:"",to:"/"}},[i("q-item-side",{attrs:{icon:"home"}}),t._v(" "),i("q-item-main",{attrs:{label:"Home"}})],1),t._v(" "),i("q-side-link",{attrs:{item:"",to:"/weekly-allocation"}},[i("q-item-side",{attrs:{icon:"playlist_add"}}),t._v(" "),i("q-item-main",{attrs:{label:"Weekly Allocation"}})],1),t._v(" "),i("q-side-link",{attrs:{item:"",to:"/missing-studio"}},[i("q-item-side",{attrs:{icon:"label"}}),t._v(" "),i("q-item-main",{attrs:{label:"Missing Studio Label"}})],1)],1),t._v(" "),i("router-view",{staticClass:"layout-view"})],1)},staticRenderFns:[]}}});