(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ffadf022"],{"6f36":function(t,e,n){"use strict";n.d(e,"e",function(){return o}),n.d(e,"c",function(){return r}),n.d(e,"b",function(){return c}),n.d(e,"a",function(){return s}),n.d(e,"d",function(){return l}),n.d(e,"f",function(){return u});var a=n("b775"),i={workSheet:"/sheets/workSheet",checkSheet:"/sheets/checkSheet",repairSheetDetail:"/sheets/repairSheetDetail",workSheetRow:"/sheets/workSheetRow",checkSheetRow:"/sheets/checkSheetRow",scheduleDetail:"/sheets/scheduleDetail"};function o(){return Object(a["b"])({url:i.workSheet,method:"get"})}function r(){return Object(a["b"])({url:i.checkSheet,method:"get"})}function c(t){return Object(a["b"])({url:i.workSheetRow,method:"post",data:t,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function s(t){return Object(a["b"])({url:i.checkSheetRow,method:"post",data:t,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function l(){return Object(a["b"])({url:i.repairSheetDetail,method:"get"})}function u(t){return Object(a["b"])({url:i.scheduleDetail,method:"post",data:t,headers:{"Content-Type":"application/json;charset=UTF-8"}})}},"9acc":function(t,e,n){},b51f:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("page-view",{attrs:{title:"巡检单管理"}},[n("div",[n("div",[n("a-form",{staticClass:"ant-advanced-search-form",attrs:{form:t.form}},[n("a-row",{attrs:{gutter:24}},[n("a-col",{attrs:{md:8,sm:24}},[n("a-form-item",{attrs:{label:"巡检单单号"}},[n("a-input",{attrs:{placeholder:"请输入巡检单单号"},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}})],1)],1)],1),n("a-row",{attrs:{gutter:24}},[n("a-col",{attrs:{md:8,sm:24,lg:10}},[n("a-form-item",{attrs:{label:"根据编号查找巡检员"}},[n("a-input",{attrs:{placeholder:"请输入巡检员编号"},model:{value:t.input2,callback:function(e){t.input2=e},expression:"input2"}})],1)],1),n("a-col",{attrs:{md:8,sm:24,lg:10}},[n("a-form-item",{attrs:{label:"根据姓名查找巡检员"}},[n("a-input",{attrs:{placeholder:"请输入巡检员姓名"},model:{value:t.input3,callback:function(e){t.input3=e},expression:"input3"}})],1)],1)],1),n("a-row",[n("a-col",{staticStyle:{textAlign:"'left'","margin-bottom":"24px"},attrs:{span:4}},[n("a-button",{staticClass:"button",attrs:{size:"large",type:"primary"},on:{click:t.onClickRefresh}},[t._v("刷新表单\n            ")])],1)],1)],1)],1),n("a-card",[n("a-table",{attrs:{columns:t.columns,dataSource:t.DataShow,rowKey:"id",bordered:""},scopedSlots:t._u([t._l(["id","potrolID","","eqID","checkTime","checkArea"],function(e){return{key:e,fn:function(a){return[n("div",{key:e},[t._v("\n            "+t._s(a)+"\n          ")])]}}}),{key:"checkPic",fn:function(e){return[n("div",{attrs:{id:"app"}},[n("div",{},[n("div",{staticClass:"pic",on:{click:function(){return t.showImg(e)}}},[n("a-avatar",{attrs:{src:e}})],1)]),n("vue-easy-lightbox",{attrs:{visible:t.visible,imgs:t.src},on:{hide:t.handleHide}})],1)]}},{key:"operation",fn:function(e,a){return[n("div",{staticClass:"button"},[n("a-button",{attrs:{size:"small",type:"danger"},on:{click:function(e){return t.onClickDelete(a.id)}}},[t._v("删除\n            ")]),n("a-modal",{attrs:{title:"确认删除"},on:{ok:t.onClickDeleteRow},model:{value:t.visible2,callback:function(e){t.visible2=e},expression:"visible2"}},[n("div",{staticClass:"modal"},[t._v("\n                是否删除本条记录\n              ")])])],1)]}}],null,!0)})],1)],1)])},i=[],o=n("75fc"),r=(n("386d"),n("cebc")),c=n("6f36"),s=n("2b0e"),l=n("ffe7"),u=n.n(l),h=n("da65"),d=n.n(h),f=n("680a");s["a"].use(d.a);var p=[{title:"巡检单单号",dataIndex:"id",align:"center",sorter:function(t,e){return t.id>e.id}},{title:"巡检员编号",dataIndex:"potrolID",align:"center",sorter:function(t,e){return t.potrolID>e.potrolID}},{title:"巡检员姓名",dataIndex:"potrolName",align:"center",sorter:function(t,e){return t.potrolID>e.potrolID}},{title:"巡检器材编号",dataIndex:"eqID",align:"center",sorter:function(t,e){return t.eqID>e.eqID}},{title:"巡检时间",dataIndex:"checkTime",align:"center",sorter:function(t,e){return t.checkTime>e.checkTime}},{title:"巡检地区",align:"center",dataIndex:"checkArea"},{title:"巡检结果图片",align:"center",dataIndex:"checkPic",scopedSlots:{customRender:"checkPic"}},{titile:"操作",align:"center",dataIndex:"operation",scopedSlots:{customRender:"operation"}}],m=[],b=[],k={components:{PageView:f["c"]},inject:["reload"],data:function(){return this.cacheData=m.map(function(t){return Object(r["a"])({},t)}),{Data:m,DataShow:b,input:"",input2:"",input3:"",columns:p,visible:!1,visible2:!1,src:"",deleteInfo:"",isRouterAlive:!0,todelete:"",form:this.$form.createForm(this)}},watch:{input:function(t){if(""==t)this.DataShow=this.Data;else{var e={keys:["id"],threshold:.1},n=new u.a(this.Data,e);this.DataShow=n.search(t)}},input2:function(t){if(""==t)this.DataShow=this.Data;else{var e={keys:["potrolID"],threshold:.1},n=new u.a(this.Data,e);this.DataShow=n.search(t)}},input3:function(t){if(""==t)this.DataShow=this.Data;else{var e={keys:["potrolName"],threshold:.1},n=new u.a(this.Data,e);this.DataShow=n.search(t)}}},computed:{},methods:{showImg:function(t){this.visible=!0,this.src=t},handleHide:function(){this.visible=!1},onClickRefresh:function(){this.reload()},onClickDelete:function(t){this.todelete=t,this.visible2=!0},handleOK:function(t){this.visible2=!1},onClickDeleteRow:function(){var t=this,e=this.$createElement;this.visible2=!1;var n=Object(o["a"])(this.DataShow);console.log(n);var a=n.filter(function(e){return t.todelete===e.id})[0];console.log(a),Object(c["a"])({id:a.id}).then(function(n){t.deleteInfo=n.info,console.log("delete",t.deleteInfo),"fail"!==t.deleteInfo&&(t.Data=Object(o["a"])(n.data),t.DataShow=t.Data),"ok"===t.deleteInfo?t.$notification.open({message:"删除成功",description:"本条巡检单记录删除成功",icon:e("a-icon",{attrs:{type:"check"},style:"color: #108ee9"})}):t.$notification.open({message:"删除失败",description:"本条巡检单记录删除失败",icon:e("a-icon",{attrs:{type:"warning"},style:"color: #108ee9"})})})}},mounted:function(){var t=this;Object(c["c"])().then(function(e){var n;(n=console).log.apply(n,Object(o["a"])(e.data)),t.Data=Object(o["a"])(e.data),t.DataShow=t.Data})}},v=k,w=(n("e84e"),n("2877")),D=Object(w["a"])(v,a,i,!1,null,"504b5e65",null);e["default"]=D.exports},e84e:function(t,e,n){"use strict";var a=n("9acc"),i=n.n(a);i.a}}]);