(this["webpackJsonp@effectnode/cms-example"]=this["webpackJsonp@effectnode/cms-example"]||[]).push([[1],{50:function(e,t,n){e.exports=n(66)},51:function(e,t,n){},65:function(e,t,n){var o={"./lok.myFristNode.js":[67,0,5],"./lok.mySecondNode.js":[68,0,4,6]};function r(e){if(!n.o(o,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=o[e],r=t[0];return Promise.all(t.slice(1).map(n.e)).then((function(){return n(r)}))}r.keys=function(){return Object.keys(o)},r.id=65,e.exports=r},66:function(e,t,n){"use strict";n.r(t);n(51);var o=n(2),r=n.n(o),a=n(46),i=n.n(a),c=n(15),u=n(3),d=n(37),l=(n(56),n(58),n(74)),s=n(71),f=n(73),p=n(72),v=function(){return"_"+Math.random().toString(36).substr(2,9)+Math.random().toString(36).substr(2,9)},m=function(e){void 0===e&&(e={});var t=v(),n={exportJSON:function(){return JSON.parse(JSON.stringify(e))},getNameSpcaeID:function(){return t},onChange:function(n,o){var r=""+t,a=function(){o(e[n])};return window.addEventListener(r+"-"+n,a),function(){window.removeEventListener(r+"-"+n,a)}},useReactiveKey:function(n,r){Object(o.useEffect)((function(){var o=""+t,a=function(){r(e[n])};return window.addEventListener(o+"-"+n,a),function(){window.removeEventListener(o+"-"+n,a)}}),[])},makeKeyReactive:function(e){var n=Object(o.useState)(0),r=n[0],a=n[1];Object(o.useEffect)((function(){var n=""+t,o=function(){a((function(e){return e+1}))};return window.addEventListener(n+"-"+e,o),function(){window.removeEventListener(n+"-"+e,o)}}),[r])},onChangeAny:function(n){var o=""+t,r=function(){n(e[key])};return window.addEventListener(""+o,r),function(){window.removeEventListener(""+o,r)}},notifyKeyChange:function(e){window.dispatchEvent(new CustomEvent(t+"-"+e,{detail:{}}))}};return new Proxy(e,{get:function(e,t){return n[t]?n[t]:e[t]},set:function(e,n,o){return e[n]=o,"undefined"!==typeof window&&window.dispatchEvent(new CustomEvent(t+"-"+n,{detail:{}})),!0}})}({listing:[],listingReload:0,layouts:[],layoutsReload:0,canvasID:!1,canvasOwnerID:!1,overlay:"",cursorMode:"ready",hovering:"floor",draggingNodeID:!1,draggingIOID:!1,addNodeTitle:"mytitle",cursorAt:new u.Vector3,dragStartPos:new u.Vector3,moved:0,isDown:!1,nodes:[],connections:[],currentEditSocketID:!1,currentEditNodeID:!1,firebaseConfig:!1}),g=new Map;var y=d.a,h=function(){function e(){}return e.addCodeBlock=function(e){var t=e.point;m.overlay="",m.cursorMode="ready",m.hovering="floor";var n=y.database().ref("/canvas/"+m.canvasID+"/"+m.canvasOwnerID+"/nodes").push(),o=v();n.set({title:m.addNodeTitle,_id:o,position:t.toArray(),inputs:[{_id:v(),type:"input",nodeID:o},{_id:v(),type:"input",nodeID:o},{_id:v(),type:"input",nodeID:o},{_id:v(),type:"input",nodeID:o},{_id:v(),type:"input",nodeID:o}],outputs:[{_id:v(),type:"output",nodeID:o},{_id:v(),type:"output",nodeID:o},{_id:v(),type:"output",nodeID:o},{_id:v(),type:"output",nodeID:o},{_id:v(),type:"output",nodeID:o}]})},e.saveCodeBlock=function(e){var t=e.node;y.database().ref("/canvas/"+m.canvasID+"/"+m.canvasOwnerID+"/nodes/"+t._fid).set(t.data)},e.removeCodeBlockByID=function(e){var t=e.nodeID;y.database().ref("/canvas/"+m.canvasID+"/"+m.canvasOwnerID+"/nodes/"+t).remove()},e.addLink=function(e){var t=e.input,n=e.output;y.database().ref("/canvas/"+m.canvasID+"/"+m.canvasOwnerID+"/connections").push().set({_id:v(),input:t,output:n})},e.removeLinkByID=function(e){var t=e.linkID;y.database().ref("/canvas/"+m.canvasID+"/"+m.canvasOwnerID+"/connections/"+t).remove()},e.removeCurrentNodeAndConnections=function(){var t=m.currentEditNodeID,n=m.nodes.find((function(e){return e._fid===t}));if(n){var o=n.data._id;m.connections.filter((function(e){return e.data.input.nodeID===o||(e.data.output.nodeID===o||void 0)})).map((function(e){return e._fid})).forEach((function(t){e.removeLinkByID({linkID:t})})),e.removeCodeBlockByID({nodeID:t}),m.currentEditNodeID=!1}},e}();function E(e){var t=e.codes,n=void 0===t?[]:t;return m.makeKeyReactive("overlay"),Object(o.useEffect)((function(){var e=function(e){"escape"===e.key.toLowerCase()&&(m.overlay="")};return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}})),m.overlay?r.a.createElement("div",{style:{position:"fixed",top:"0px",left:"0px",width:"100%",backgroundColor:"rgba(255,255,255,0.92)"}},"main"===m.overlay&&r.a.createElement(b,{codes:n}),"node"===m.overlay&&r.a.createElement(w,{codes:n}),"addCodeBlock"===m.overlay&&r.a.createElement("div",{style:{width:"100%",position:"absolute",top:"0px",left:"0px",backgroundColor:"rgba(255,255,255,0.95)"}},r.a.createElement("div",{style:{width:"100%",backgroundColor:"rgba(40,255,40,1.0)"},className:"bg-green-400"},r.a.createElement("div",{style:{width:"100%",padding:"15px",fontSize:"30px",fontFamily:"Arial"}},r.a.createElement("div",{style:{width:"100%"}},"Click on Floor to Add")))),m.overlay&&r.a.createElement("div",{style:{position:"absolute",top:"20px",right:"20px",zIndex:10}},r.a.createElement("svg",{width:"24",height:"24",xmlns:"http://www.w3.org/2000/svg",fillRule:"evenodd",clipRule:"evenodd",fill:"black",onClick:function(){m.overlay=""},onPointerDown:function(){m.overlay=""},style:{cursor:"pointer"}},r.a.createElement("path",{d:"M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"})))):r.a.createElement("div",null)}function b(e){var t=e.codes,n=void 0===t?[]:t;return r.a.createElement("div",{style:{width:"100%",height:"100%",position:"fixed",top:"0px",left:"0px",backgroundColor:"rgba(255,255,255,0.92)"}},r.a.createElement("div",{style:{backgroundColor:"rgba(255,255,0,0.92)"}},r.a.createElement("div",{style:{padding:"15px",fontSize:"30px",fontFamily:"Arial"}},r.a.createElement("div",null,"Getting Started"))),r.a.createElement("div",{style:{padding:"15px",fontSize:"20px",fontFamily:"Arial"}},r.a.createElement("div",null,"Add New CodeBlock")),n.map((function(e){return r.a.createElement("div",{key:e.title,style:{marginLeft:"15px",marginBottom:"15px",textDecoration:"underline"}},r.a.createElement("div",{style:{cursor:"pointer"},onPointerDown:function(){m.addNodeTitle=e.title,m.hovering="floor",m.cursorMode="addCodeBlock",m.overlay="addCodeBlock"}},e.title))})))}function w(e){var t=e.codes,n=void 0===t?[]:t,a=Object(o.useMemo)((function(){var e=m.currentEditNodeID,t=m.nodes.find((function(t){return t._fid===e})),n=[],o=[];if(t){var r=t.data._id;n=m.connections.filter((function(e){if(e.data.input.nodeID===r)return!0})),o=m.connections.filter((function(e){if(e.data.output.nodeID===r)return!0}))}return{node:t,inputLinks:n,outputLinks:o}})),i=a.node,c=a.outputLinks,u=a.inputLinks,d=Object(o.useState)(0)[1],l=Object(o.useState)(i.data.title),s=l[0],f=l[1];return r.a.createElement("div",{style:{width:"100%",height:"100%",position:"fixed",top:"0px",left:"0px",backgroundColor:"rgba(255,255,255,0.92)"}},r.a.createElement("div",{style:{backgroundColor:"lightblue"}},r.a.createElement("div",{style:{padding:"15px",fontSize:"30px",fontFamily:"Arial"}},r.a.createElement("div",null,"Node Settings"))),r.a.createElement("div",{style:{padding:"15px",fontSize:"20px",fontFamily:"Arial"}},r.a.createElement("div",null,"Node using logic:"," ",r.a.createElement("div",{style:{borderColor:"black",display:"inline-block",border:"black solid 1px"}},r.a.createElement("select",{style:{appearance:"none",width:"100%",height:"100%"},value:s,onChange:function(e){var t=e.target.value;i.data.title=t,h.saveCodeBlock({node:i}),f(t)}},n.map((function(e,t){return r.a.createElement("option",{key:t+e.title,value:e.title},e.title)})))))),u.length>0&&r.a.createElement("div",{style:{padding:"15px",fontSize:"23px",fontFamily:"Arial"}},r.a.createElement("div",{style:{cursor:"pointer"}},"Inputs")),u.map((function(e){var t=e.data.input._id,n=i.data.inputs.findIndex((function(e){return e._id===t})),o=i.data.inputs.find((function(e){return e._id===t})),a=m.nodes.find((function(e){return e.data._id===o.nodeID}));return r.a.createElement("div",{key:e._fid,style:{marginLeft:"15px",marginBottom:"15px",textDecoration:"underline"}},r.a.createElement("div",{style:{cursor:"pointer"},onPointerDown:function(t){"red"===t.currentTarget.style.color&&(h.removeLinkByID({linkID:e._fid}),d((function(e){return e+1}))),t.currentTarget.style.color="red"}},'Remove Input at label "',n,'"'," ",a.data.title&&r.a.createElement("span",null,'which is conncted to "',a.data.title,'"')))})),c.length>0&&r.a.createElement("div",{style:{padding:"15px",fontSize:"23px",fontFamily:"Arial"}},r.a.createElement("div",{style:{cursor:"pointer"}},"Outputs")),c.map((function(e){var t=e.data.output._id,n=i.data.outputs.findIndex((function(e){return e._id===t})),o=i.data.outputs.find((function(e){return e._id===t})),a=m.nodes.find((function(e){return e.data._id===o.nodeID}));return r.a.createElement("div",{key:e._fid,style:{marginLeft:"15px",marginBottom:"15px",textDecoration:"underline"}},r.a.createElement("div",{style:{cursor:"pointer"},onPointerDown:function(t){"red"===t.currentTarget.style.color&&(h.removeLinkByID({linkID:e._fid}),d((function(e){return e+1}))),t.currentTarget.style.color="red"}},'Remove Output at label "',n,'"'," ",a.data.title&&r.a.createElement("span",null,'which is conncted to "',a.data.title,'"')))})),r.a.createElement("div",{style:{padding:"15px",fontSize:"23px",fontFamily:"Arial"}},r.a.createElement("div",{style:{cursor:"pointer"}},"Remove Node & Connections")),r.a.createElement("div",{style:{padding:"15px",textDecoration:"underline",fontFamily:"Arial"}},r.a.createElement("div",{style:{cursor:"pointer"},onPointerDown:function(){window.confirm("remove item")&&(h.removeCurrentNodeAndConnections(),m.overlay="")}},"Remove")))}function I(){return(I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function D(){var e=Object(c.c)().camera,t=Object(o.useRef)();Object(o.useEffect)((function(){e.position.X=0,e.position.y=50,e.position.z=75,e.fov=45,e.lookAt(0,0,0),e.near=.1,e.far=1e4,e.updateProjectionMatrix()}),[t.current]);var n=function(){"floor"===m.hovering?"ready"===m.cursorMode?document.body.style.cursor="grab":"pan"===m.cursorMode?document.body.style.cursor="grabbing":"addCodeBlock"===m.cursorMode&&(document.body.style.cursor="crosshair"):"object"===m.hovering?document.body.style.cursor="pointer":(m.hovering,document.body.style.cursor="")};m.useReactiveKey("overlay",n),m.useReactiveKey("cursorMode",n),m.useReactiveKey("hovering",n),m.useReactiveKey("draggingNodeID",(function(){t.current.enabled=!m.draggingNodeID})),m.useReactiveKey("draggingIOID",(function(){t.current.enabled=!m.draggingIOID}));var a={onPointerDown:function(e){var t=e.point;m.isDown=!0,"ready"===m.cursorMode&&(m.cursorMode="pan"),"addCodeBlock"===m.cursorMode&&h.addCodeBlock({point:t})},onPointerUp:function(e){m.isDown=!1,"pan"===m.cursorMode&&(m.cursorMode="ready"),setTimeout((function(){m.draggingIOID&&(m.draggingIOID=!1)}),100)},onPointerEnter:function(){},onPointerMove:function(e){m.moved++,e.stopPropagation(),"floor"!==m.hovering&&(m.hovering="floor"),m.cursorAt.copy(e.point)}};return Object(o.useEffect)((function(){window.addEventListener("touchstart",(function(e){e.preventDefault()}),{passive:!1}),window.addEventListener("touchmove",(function(e){e.preventDefault()}),{passive:!1})}),[]),r.a.createElement("group",null,r.a.createElement(l.a,{screenSpacePanning:!1,ref:t}),r.a.createElement("mesh",I({visible:!1,name:"floor","rotation-x":-.5*Math.PI},a),r.a.createElement("planeBufferGeometry",{args:[1e3,1e3,2,2]}),r.a.createElement("shaderMaterial",{fragmentShader:"void main (void) { discard; }"})),r.a.createElement("gridHelper",{raycast:function(){},"position-y":.01,args:[1e3,100,"#232323","#232323"]}))}function k(e){var t=I({},e),n=Object(o.useRef)();return Object(c.b)((function(e){var t=e.clock.getElapsedTime();n.current.rotation.z=u.MathUtils.lerp(n.current.rotation.z,Math.sin(t/4)/20,.1),n.current.position.y=u.MathUtils.lerp(n.current.position.y,(-5+Math.sin(t))/5,.1)})),r.a.createElement("group",I({raycast:s.a,onPointerEnter:function(){m.hovering="object"},onPointerLeave:function(){m.hovering="floor"},onPointerDown:function(e){e.stopPropagation(),e.target.setPointerCapture(e.pointerId)},onPointerUp:function(e){m.overlay="main",m.hovering="overlay",e.stopPropagation(),e.target.releasePointerCapture(e.pointerId)},ref:n},t),r.a.createElement("pointLight",{"position-x":0,"position-z":-2,"position-y":2}),r.a.createElement("group",{"rotation-x":0*Math.PI,position:[0,-.04,.41]},r.a.createElement("mesh",{onClick:function(){}},r.a.createElement("sphereBufferGeometry",{args:[4,32,32]}),r.a.createElement("meshStandardMaterial",{metalness:1,roughness:.3,color:"#bababa"}))),r.a.createElement("group",{position:[0,7,1],"rotation-x":-.25*Math.PI},r.a.createElement(f.a,{color:"#000000",fontSize:1.5,maxWidth:200,lineHeight:1,textAlign:"center",anchorX:"center",anchorY:"middle",outlineWidth:.12,outlineColor:"#ffffff"},"Click to start")))}function O(){return r.a.createElement("group",null,r.a.createElement(o.Suspense,{fallback:null},r.a.createElement("group",{"position-y":3},r.a.createElement(k,null))))}function x(){m.makeKeyReactive("cursorMode");var e=Object(o.useRef)();return Object(c.b)((function(){e.current&&e.current.position.lerp(m.cursorAt,.5)})),r.a.createElement("group",{visible:!("ontouchstart"in window),ref:e},"addCodeBlock"===m.cursorMode&&r.a.createElement("group",null,r.a.createElement("mesh",{"position-y":1,"rotation-x":1*Math.PI},r.a.createElement("coneBufferGeometry",{args:[.8,2,32,1]}),r.a.createElement("meshStandardMaterial",{color:"#bababa",roughness:.3,metalness:1})),r.a.createElement("group",{"rotation-x":-.25*Math.PI,"position-y":3},r.a.createElement(f.a,{color:"#000000",fontSize:.7,maxWidth:200,lineHeight:1,textAlign:"center",anchorX:"center",anchorY:"middle",outlineWidth:.04,outlineColor:"#ffffff"},"Click to add"))))}var C=function(e){var t=e.a,o=e.b,r=e.dotted,a=void 0!==r&&r,i=n(26).LineSegmentsGeometry,c=n(40).LineGeometry,d=(new u.Vector3).copy(t).distanceTo(o)/1.6;d>500&&(d=500);var l=new u.CatmullRomCurve3([new u.Vector3(t.x,t.y-1,t.z),new u.Vector3(t.x,t.y-1+d,t.z),new u.Vector3(o.x,o.y-1+d,o.z),new u.Vector3(o.x,o.y-1,o.z)],!1),s=new c;a&&(s=new i);for(var f=[],p=[],v=new u.Vector3,m=new u.Color,g=new u.Color("#0000ff"),y=0;y<100;y++)l.getPointAt(y/100%1,v),isNaN(v.x)&&(v.x=0),isNaN(v.y)&&(v.y=0),isNaN(v.z)&&(v.z=0),p.push(v.x,v.y,v.z),m.setStyle("#00ff00"),m.lerp(g,y/100),m.offsetHSL(0,.5,0),f.push(m.r,m.g,m.b);return s.setColors(f),s.setPositions(p),s};function P(){m.makeKeyReactive("draggingIOID");var e=n(24).LineMaterial,t=n(45).Line2,a=Object(o.useMemo)((function(){return new e({transparent:!0,color:new u.Color("#00ffff"),linewidth:.0015,opacity:1,dashed:!0,vertexColors:!1})}),[]),i=Object(o.useRef)({}),d=Object(o.useMemo)((function(){var e=(new u.Vector3).copy(m.cursorAt);e.set(1,1,1);var n=new u.Vector3(1,1,1).copy(m.dragStartPos),o=C({a:e,b:n,dotted:!0}),r=new t(o,a);r.computeLineDistances();var c=!1;return i.current.updateLine=function(){if(!m.isDown||e.x===m.cursorAt.x&&e.y===m.cursorAt.y&&e.z===m.cursorAt.z||(c=!0),e.copy(m.cursorAt),c){var t=C({a:e,b:n,dotted:!0});r.geometry=t}},r}));return Object(c.b)((function(){Object.values(i.current).forEach((function(e){return e()}))})),r.a.createElement("group",null,m.draggingIOID&&r.a.createElement("primitive",{object:d}))}function j(e){var t=e.link,a=n(24).LineMaterial,i=n(45).Line2,d=Object(o.useMemo)((function(){return new a({transparent:!0,color:new u.Color("#00ffff"),linewidth:.0015,opacity:.8,dashed:!0,vertexColors:!0})}),[]),l=Object(o.useRef)({}),s=Object(c.c)().scene,f=Object(o.useMemo)((function(){var e=new u.Vector3,t=new u.Vector3,n=C({a:e,b:t}),o=new i(n,d);return o.computeLineDistances(),o}),[]);return Object(o.useEffect)((function(){var e=new u.Vector3,n=new u.Vector3,o=0;l.current.updateLine=function(){var r=s.getObjectByName(t.data.input._id),a=s.getObjectByName(t.data.output._id);if(r&&a&&(r.getWorldPosition(e),a.getWorldPosition(n),o!==e.length()+n.length())){o=e.length()+n.length();var i=C({a:e,b:n});f.geometry=i}}}),[]),Object(c.b)((function(){Object.values(l.current).forEach((function(e){return e()}))})),r.a.createElement("group",null,r.a.createElement("primitive",{object:f}))}var S=function(e){var t=e.idx,n=e.io,o=void 0===n?"input":n,a=e.node,i=e.socket,c=e.e,d=e.total,l=new u.Vector3,s=new u.Vector3,p=c*-Math.PI;"output"===o&&(p=Math.PI*c),p-=2*Math.PI*.5/d,p+=1.5*Math.PI,l.setFromCylindricalCoords(6,p,0),s.setFromCylindricalCoords(10.5,p,0);return r.a.createElement("group",null,r.a.createElement("mesh",{"position-y":0,name:i._id,onPointerDown:function(e){e.stopPropagation(),e.target.setPointerCapture(e.pointerId),m.isDown=!0,m.draggingIOID={socket:JSON.parse(JSON.stringify(i)),node:JSON.parse(JSON.stringify(a))},m.dragStartPos.copy(m.cursorAt)},onPointerMove:function(e){var t=e.eventObject;t.material.emissive=new u.Color("#323232"),t.material.needsUpdate=!0},onPointerEnter:function(e){var t=e.eventObject;t.material.emissive=new u.Color("#323232"),t.material.needsUpdate=!0},onPointerLeave:function(e){var t=e.eventObject;t.material.emissive=new u.Color("#000000"),t.material.needsUpdate=!0},onPointerUp:function(e){e.stopPropagation(),e.target.releasePointerCapture(e.pointerId);var t=function(){if(m.draggingIOID&&m.draggingIOID.socket._id!==i._id&&m.draggingIOID.node._fid!==a._fid&&m.draggingIOID.socket.type!==i.type){var e=[{node:a,socket:i},I({},m.draggingIOID)],t=e.find((function(e){return"input"===e.socket.type})),n=e.find((function(e){return"output"===e.socket.type}));if(console.log(t,n),t&&n)return{input:t,output:n}}}();t&&h.addLink({input:t.input.socket,output:t.output.socket}),m.isDown=!1,m.draggingIOID=!1},position:l.toArray(),userData:i},r.a.createElement("sphereBufferGeometry",{args:[1,20,20]}),r.a.createElement("meshStandardMaterial",{metalness:1,roughness:.3,color:"input"===o?"green":"blue"})),r.a.createElement("group",{position:s.toArray()},r.a.createElement("group",{"position-z":"input"===o?-.1:.1,"rotation-x":-.25*Math.PI},r.a.createElement(f.a,{color:"#000000",fontSize:1.5,maxWidth:200,lineHeight:1,textAlign:"center",anchorX:"center",anchorY:"middle",outlineWidth:.12,outlineColor:"#ffffff"},""+t))))};function M(e){var t=e.node,n=Object(o.useRef)();return Object(c.b)((function(){n.current&&(m.draggingNodeID===t.data._id&&(t.data.position=m.cursorAt.toArray()),n.current.position.fromArray(t.data.position))})),r.a.createElement("group",{"position-y":2.75},r.a.createElement("group",{ref:n},r.a.createElement("group",{"position-z":18,"position-y":0,"rotation-x":-.25*Math.PI},r.a.createElement(f.a,{color:"#000000",fontSize:1.5,maxWidth:200,lineHeight:1,textAlign:"center",anchorX:"center",anchorY:"middle",outlineWidth:.12,outlineColor:"#ffffff"},""+t.data.title)),r.a.createElement("group",null,r.a.createElement("mesh",{raycast:s.a,onPointerDown:function(e){m.isDown=!0,m.draggingNodeID=t.data._id,m.moved=0},onPointerUp:function(e){m.isDown=!1,m.draggingNodeID=!1,h.saveCodeBlock({node:t}),m.moved<=10&&(m.currentEditNodeID=t._fid,m.overlay="node"),m.moved=0}},r.a.createElement("sphereBufferGeometry",{args:[2.75,32,32]}),r.a.createElement("meshStandardMaterial",{metalness:1,roughness:.3}))),r.a.createElement("group",{"position-z":-1.11},t.data.inputs.map((function(e,n,o){return r.a.createElement(S,{key:e._id,socket:e,node:t,idx:n,e:(n+0)/o.length,total:t.data.inputs.length+t.data.outputs.length})}))),r.a.createElement("group",{"position-z":1.11},t.data.outputs.map((function(e,n,o){return r.a.createElement(S,{io:"output",key:e._id,socket:e,node:t,idx:n,e:(n+1)/o.length,total:t.data.inputs.length+t.data.outputs.length})})))))}function L(){var e=Object(o.useState)([]),t=e[0],n=e[1];m.makeKeyReactive("canvasOwnerID"),m.makeKeyReactive("canvasID");var a=m.canvasID,i=m.canvasOwnerID;return Object(o.useEffect)((function(){if(!a)return function(){};if(!i)return function(){};var e=y.database().ref("/canvas/"+a+"/"+i+"/nodes").on("value",(function(e){if(e){var t=[],o=e.val();for(var r in o)t.push({_fid:r,data:o[r]});m.nodes=t,n(t)}}));return function(){e()}}),[a,i]),r.a.createElement("group",null,t.map((function(e){return r.a.createElement(M,{key:e._fid,node:e})})))}function _(){var e=Object(o.useState)([]),t=e[0],n=e[1];m.makeKeyReactive("canvasOwnerID"),m.makeKeyReactive("canvasID");var a=m.canvasID,i=m.canvasOwnerID;return Object(o.useEffect)((function(){return a&&i?y.database().ref("/canvas/"+a+"/"+i+"/connections").on("value",(function(e){if(e){var t=[],o=e.val();for(var r in o)t.push({_fid:r,data:o[r]});m.connections=t,n(t),console.log(t)}})):function(){}}),[a,i]),r.a.createElement("group",null,t.map((function(e){return r.a.createElement(j,{key:e._fid,link:e})})))}function N(){var e=Object(c.c)().get;return r.a.createElement(p.a,{near:.1,frames:1,resolution:128,far:1e3},(function(t){e().scene.background=new u.Color("#444"),e().scene.environment=t}))}function A(){return r.a.createElement("group",null,r.a.createElement(D,null),r.a.createElement(O,null),r.a.createElement(L,null),r.a.createElement(_,null),r.a.createElement(x,null),r.a.createElement(P,null),r.a.createElement(N,null),r.a.createElement("ambientLight",{intensity:.87}),r.a.createElement("directionalLight",{position:[10,10,0],intensity:.87}),r.a.createElement("ambientLight",{position:[10,10,-10],intensity:.87}))}var z=function(e){var t=e.canvasID,n=e.ownerID,a=e.codes,i=void 0===a?[]:a,u=e.firebaseConfig,l=Object(o.useState)(!1),s=l[0],f=l[1],p=Object(o.useState)(!1),v=p[0],y=p[1];Object(o.useEffect)((function(){m.canvasID=t,m.canvasOwnerID=n,m.firebaseConfig=u,function(e){return new Promise((function(t){var n=setInterval((function(){var o=m[e];o&&(clearInterval(n),t(o))}))}))}("firebaseConfig").then((function(e){!function(e){var t=e.firebaseConfig;g.has("app")||g.set("app",d.a.initializeApp(t)),g.has("database")||g.set("database",d.a.database()),g.has("setup-listen-login")||(g.set("setup-listen-login",!0),g.get("app").auth().onAuthStateChanged((function(e){e?g.set("user",e):g.delete("user")}))),g.has("setup-do-login")||(g.set("setup-do-login",!0),console.log("[Firebase]: done setup")),g.get("app")}({firebaseConfig:e}),f(!0)}))}),[t,n]);var h=Object(o.useRef)();return r.a.createElement("div",{ref:h,style:{width:"100%",height:"100%",position:"relative"}},r.a.createElement(c.a,{dpr:"undefined"!==typeof window&&window.devicePixelRatio||1},s&&v&&r.a.createElement(A,null),r.a.createElement(B,{setOKSize:y,resize:h})),s&&v&&r.a.createElement(E,{codes:i}))};function B(e){var t=e.resize,n=e.setOKSize,r=Object(c.c)();return Object(o.useEffect)((function(){t.current&&(t.current.style.width=window.innerWidth+"px",t.current.style.height=window.innerWidth+"px"),setTimeout((function(){n(!0)}))}),[r,t,t.current]),null}var R=function(){return r.a.createElement(z,{firebaseConfig:K,canvasID:"-MdBQtfGPXXPkl-NuEoW",ownerID:"NGpUixuU0NOkOlmLsLuepkaZxxt1",codes:V()})},K={apiKey:"AIzaSyAPuwK2yMl025KLVTnGDdN34XxHBYQHoVk",authDomain:"effect-node-by-you.firebaseapp.com",databaseURL:"https://en-you.firebaseio.com/",projectId:"effect-node-by-you",storageBucket:"effect-node-by-you.appspot.com",messagingSenderId:"587774316246",appId:"1:587774316246:web:2a52c46bd184fc3a1d4377",measurementId:"G-SYFGKL6VNR"},V=function(){var e=n(64);return function(t){var n=[];return t.keys().forEach((function(o){var r=e.basename(o);n.push({title:r,loader:function(){return t(o)}})})),n}(n(65))},F=function(){return r.a.createElement(R,null)};i.a.render(r.a.createElement(F,null),document.getElementById("root"))}},[[50,2,3]]]);
//# sourceMappingURL=main.03cbd04b.chunk.js.map