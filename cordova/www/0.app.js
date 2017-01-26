webpackJsonp([0],{260:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=t.makeSelectable=t.ListItem=t.List=void 0;var a=n(259),r=o(a),l=n(400),u=o(l),i=n(937),s=o(i);t.List=r["default"],t.ListItem=u["default"],t.makeSelectable=s["default"],t["default"]=r["default"]},398:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=void 0;var a=n(933),r=o(a);t["default"]=r["default"]},409:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),r=o(a),l=n(65),u=o(l),i=n(62),s=o(i),c=function(e){return r["default"].createElement(s["default"],e,r["default"].createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}))};c=(0,u["default"])(c),c.displayName="ActionDelete",c.muiName="SvgIcon",t["default"]=c},410:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),r=o(a),l=n(65),u=o(l),i=n(62),s=o(i),c=function(e){return r["default"].createElement(s["default"],e,r["default"].createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}))};c=(0,u["default"])(c),c.displayName="ContentAdd",c.muiName="SvgIcon",t["default"]=c},411:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),r=o(a),l=n(65),u=o(l),i=n(62),s=o(i),c=function(e){return r["default"].createElement(s["default"],e,r["default"].createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}))};c=(0,u["default"])(c),c.displayName="ContentCreate",c.muiName="SvgIcon",t["default"]=c},502:function(e,t,n){"use strict";var o=this&&this.__assign||Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++){t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},a=n(1),r=n(290),l=n(261),u=n(179),i=n(24),s=function(e){var t={};return e.goal||(t.goal="Required"),t},c={layout:{display:"flex",flexFlow:"column wrap",justifyContent:"space-around"},buttonContainer:{display:"flex",flexFlow:"row wrap",justifyContent:"space-between"}},d=function(e){var t=e.input,n=e.label,r=e.meta,u=r.touched,i=r.error;return a.createElement(l["default"],o({floatingLabelText:n,hintText:n,multiLine:!0,rows:1,rowsMax:2,fullWidth:!0,errorText:u&&i},t))},p=function(e){var t=e.handleSubmit;e.load,e.pristine,e.reset,e.submitting,e.goal;return a.createElement("form",{onSubmit:t},a.createElement("div",{style:c.layout},a.createElement("div",null,a.createElement(r.Field,{name:"goal",component:d})),a.createElement("div",null,a.createElement(u["default"],{type:"submit",label:"Save"}))))};p=r.reduxForm({form:"goalsForm",validate:s})(p),Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=i.connect(function(e){var t={goal:""};return e.loadedGoalId>0&&(t={goal:e.goals[e.loadedGoalId+""].title}),{initialValues:t}})(p)},510:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(250);t["default"]={path:"debug",name:"debug",getComponent:function(e,t){t(null,o.AppStatusContainer)}}},512:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(311),r=o(a);t["default"]={path:"message",name:"message",getComponent:function(e,t){t(null,r["default"])}}},513:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1276),r=o(a);t["default"]={path:"home",name:"home",getComponent:function(e,t){t(null,r["default"])}}},516:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1282),r=o(a);t["default"]={path:"notes",getComponent:function(e,t){n.e(0,function(e){t(null,r["default"])})}}},519:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1287),r=o(a),l={path:"workbook/:id",getComponent:function(e,t){console.log("workbook page called"),n.e(0,function(e){t(null,r["default"])})}};t["default"]=l},520:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(503),r=o(a);t["default"]={path:"home",getComponent:function(e,t){t(null,r["default"])}}},933:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){var n=t.muiTheme.floatingActionButton,o=e.backgroundColor||n.color,a=n.iconColor;return e.disabled?(o=e.disabledColor||n.disabledColor,a=n.disabledTextColor):e.secondary&&(o=n.secondaryColor,a=n.secondaryIconColor),{root:{transition:M["default"].easeOut(),display:"inline-block"},container:{backgroundColor:o,transition:M["default"].easeOut(),position:"relative",height:n.buttonSize,width:n.buttonSize,padding:0,overflow:"hidden",borderRadius:"50%",textAlign:"center",verticalAlign:"bottom"},containerWhenMini:{height:n.miniSize,width:n.miniSize},overlay:{transition:M["default"].easeOut(),top:0},overlayWhenHovered:{backgroundColor:(0,w.fade)(a,.4)},icon:{height:n.buttonSize,lineHeight:n.buttonSize+"px",fill:a,color:a},iconWhenMini:{height:n.miniSize,lineHeight:n.miniSize+"px"}}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(10),l=o(r),u=n(11),i=o(u),s=n(5),c=o(s),d=n(3),p=o(d),f=n(4),h=o(f),m=n(7),y=o(m),v=n(6),b=o(v),g=n(8),E=o(g),_=n(1),T=o(_),C=n(20),M=o(C),w=n(74),k=n(144),O=o(k),S=n(399),x=o(S),I=n(53),j=o(I),D=n(146),P=n(80),z=(o(P),n(75)),L=(o(z),function(e){function t(){var e,n,o,r;(0,p["default"])(this,t);for(var l=arguments.length,u=Array(l),i=0;i<l;i++)u[i]=arguments[i];return n=o=(0,y["default"])(this,(e=t.__proto__||(0,c["default"])(t)).call.apply(e,[this].concat(u))),o.state={hovered:!1,touch:!1,zDepth:void 0},o.handleMouseDown=function(e){0===e.button&&o.setState({zDepth:o.props.zDepth+1}),o.props.onMouseDown&&o.props.onMouseDown(e)},o.handleMouseUp=function(e){o.setState({zDepth:o.props.zDepth}),o.props.onMouseUp&&o.props.onMouseUp(e)},o.handleMouseLeave=function(e){o.refs.container.isKeyboardFocused()||o.setState({zDepth:o.props.zDepth,hovered:!1}),o.props.onMouseLeave&&o.props.onMouseLeave(e)},o.handleMouseEnter=function(e){o.refs.container.isKeyboardFocused()||o.state.touch||o.setState({hovered:!0}),o.props.onMouseEnter&&o.props.onMouseEnter(e)},o.handleTouchStart=function(e){o.setState({touch:!0,zDepth:o.props.zDepth+1}),o.props.onTouchStart&&o.props.onTouchStart(e)},o.handleTouchEnd=function(e){o.setState({touch:!0,zDepth:o.props.zDepth}),o.props.onTouchEnd&&o.props.onTouchEnd(e)},o.handleKeyboardFocus=function(e,t){t&&!o.props.disabled?(o.setState({zDepth:o.props.zDepth+1}),o.refs.overlay.style.backgroundColor=(0,w.fade)(a(o.props,o.context).icon.color,.4)):o.state.hovered||(o.setState({zDepth:o.props.zDepth}),o.refs.overlay.style.backgroundColor="transparent")},r=n,(0,y["default"])(o,r)}return(0,b["default"])(t,e),(0,h["default"])(t,[{key:"componentWillMount",value:function(){this.setState({zDepth:this.props.disabled?0:this.props.zDepth})}},{key:"componentDidMount",value:function(){}},{key:"componentWillReceiveProps",value:function(e){var t={};e.disabled!==this.props.disabled&&(t.zDepth=e.disabled?0:this.props.zDepth),e.disabled&&(t.hovered=!1),this.setState(t)}},{key:"render",value:function(){var e=this.props,t=(e.backgroundColor,e.className),n=e.children,o=e.disabled,r=e.mini,u=(e.secondary,e.iconStyle),s=e.iconClassName,c=(e.zDepth,(0,i["default"])(e,["backgroundColor","className","children","disabled","mini","secondary","iconStyle","iconClassName","zDepth"])),d=this.context.muiTheme.prepareStyles,p=a(this.props,this.context),f=void 0;s&&(f=T["default"].createElement(x["default"],{className:s,style:(0,E["default"])({},p.icon,r&&p.iconWhenMini,u)}));var h=void 0;n&&(h=(0,D.extendChildren)(n,function(e){return{style:(0,E["default"])({},p.icon,r&&p.iconWhenMini,u,e.props.style)}}));var m=o?null:{onMouseDown:this.handleMouseDown,onMouseUp:this.handleMouseUp,onMouseLeave:this.handleMouseLeave,onMouseEnter:this.handleMouseEnter,onTouchStart:this.handleTouchStart,onTouchEnd:this.handleTouchEnd,onKeyboardFocus:this.handleKeyboardFocus};return T["default"].createElement(j["default"],{className:t,style:(0,E["default"])(p.root,this.props.style),zDepth:this.state.zDepth,circle:!0},T["default"].createElement(O["default"],(0,l["default"])({},c,m,{ref:"container",disabled:o,style:(0,E["default"])(p.container,this.props.mini&&p.containerWhenMini,u),focusRippleColor:p.icon.color,touchRippleColor:p.icon.color}),T["default"].createElement("div",{ref:"overlay",style:d((0,E["default"])(p.overlay,this.state.hovered&&!this.props.disabled&&p.overlayWhenHovered))},f,h)))}}]),t}(_.Component));L.defaultProps={disabled:!1,mini:!1,secondary:!1,zDepth:2},L.contextTypes={muiTheme:_.PropTypes.object.isRequired},t["default"]=L},937:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.makeSelectable=void 0;var a=n(10),r=o(a),l=n(11),u=o(l),i=n(5),s=o(i),c=n(3),d=o(c),p=n(4),f=o(p),h=n(7),m=o(h),y=n(6),v=o(y),b=n(8),g=o(b),E=n(1),_=o(E),T=n(74),C=t.makeSelectable=function(e){var t,n;return n=t=function(t){function n(){var e,t,o,a;(0,d["default"])(this,n);for(var r=arguments.length,l=Array(r),u=0;u<r;u++)l[u]=arguments[u];return t=o=(0,m["default"])(this,(e=n.__proto__||(0,s["default"])(n)).call.apply(e,[this].concat(l))),o.hasSelectedDescendant=function(e,t){return _["default"].isValidElement(t)&&t.props.nestedItems&&t.props.nestedItems.length>0?t.props.nestedItems.reduce(o.hasSelectedDescendant,e):e||o.isChildSelected(t,o.props)},o.handleItemTouchTap=function(e,t){var n=t.props.value;n!==o.props.value&&o.props.onChange&&o.props.onChange(e,n)},a=t,(0,m["default"])(o,a)}return(0,v["default"])(n,t),(0,f["default"])(n,[{key:"extendChild",value:function(e,t,n){var o=this;if(e&&e.type&&"ListItem"===e.type.muiName){var a=this.isChildSelected(e,this.props),r=void 0;a&&(r=(0,g["default"])({},t,n));var l=(0,g["default"])({},e.props.style,r);return this.keyIndex+=1,_["default"].cloneElement(e,{onTouchTap:function(t){o.handleItemTouchTap(t,e),e.props.onTouchTap&&e.props.onTouchTap(t)},key:this.keyIndex,style:l,nestedItems:e.props.nestedItems.map(function(e){return o.extendChild(e,t,n)}),initiallyOpen:this.isInitiallyOpen(e)})}return e}},{key:"isInitiallyOpen",value:function(e){return e.props.initiallyOpen?e.props.initiallyOpen:this.hasSelectedDescendant(!1,e)}},{key:"isChildSelected",value:function(e,t){return t.value===e.props.value}},{key:"render",value:function(){var t=this,n=this.props,o=n.children,a=n.selectedItemStyle,l=(0,u["default"])(n,["children","selectedItemStyle"]);this.keyIndex=0;var i={};if(!a){var s=this.context.muiTheme.baseTheme.palette.textColor;i.backgroundColor=(0,T.fade)(s,.2)}return _["default"].createElement(e,(0,r["default"])({},l,this.state),E.Children.map(o,function(e){return t.extendChild(e,i,a)}))}}]),n}(E.Component),t.propTypes={children:E.PropTypes.node,onChange:E.PropTypes.func,selectedItemStyle:E.PropTypes.object,value:E.PropTypes.any},t.contextTypes={muiTheme:E.PropTypes.object.isRequired},n};t["default"]=C},1273:function(e,t,n){"use strict";var o=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},a=n(1),r=n(143),l=n(94),u=n(179),i=n(260),s=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={open:!1},t.handleOpen=function(){t.setState({open:!0})},t.handleClose=function(){t.setState({open:!1})},t}return o(t,e),t.prototype.render=function(){var e=this.props,t=e.title,n=e.items,o=[a.createElement(l["default"],{label:"Close",primary:!0,keyboardFocused:!0,onTouchTap:this.handleClose})];return a.createElement("div",null,a.createElement(u["default"],{label:t,onTouchTap:this.handleOpen}),a.createElement(r["default"],{title:t,actions:o,modal:!1,open:this.state.open,onRequestClose:this.handleClose,autoScrollBodyContent:!0},a.createElement(i.List,null,n.map(function(e){return a.createElement(i.ListItem,{key:e.id,primaryText:e.title})}))))},t}(a.Component);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=s},1274:function(e,t,n){"use strict";var o=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},a=n(1),r=n(143),l=n(94),u=n(398),i=n(410),s=n(502),c=n(24),d=n(40),p=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.render=function(){var e=this.props,t=e.addGoal,n=(e.workbook,e.handleClose),o=e.handleOpen,c=e.open,d=[a.createElement(l["default"],{label:"Cancel",primary:!0,onTouchTap:n}),a.createElement(l["default"],{label:"Submit",primary:!0,keyboardFocused:!0,onTouchTap:n})];return a.createElement("div",null,a.createElement(u["default"],{onTouchTap:o,style:{marginRight:20}},a.createElement(i["default"],null)),a.createElement(r["default"],{title:"Create a Goal",actions:d,modal:!1,open:c,onRequestClose:n},a.createElement(s["default"],{onSubmit:t,workbook:!0})))},t}(a.Component),f=function(e){return{open:0===e.loadedGoalId}},h=function(e,t){return{addGoal:function(n){e(d.goalSubmitted(t.workbook.id,n.goal)),e(d.goalLoad(-1))},handleOpen:function(){e(d.goalLoad(0))},handleClose:function(){e(d.goalLoad(-1))}}};Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=c.connect(f,h)(p)},1275:function(e,t,n){"use strict";var o=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},a=n(1),r=n(143),l=n(94),u=n(502),i=n(24),s=n(40),c=n(317),d=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.render=function(){var e=this.props,t=(e.editGoal,e.open),n=e.handleClose,o=e.goal,i=e.editGoal2,s=[a.createElement(l["default"],{label:"Cancel",primary:!0,onTouchTap:n}),a.createElement(l["default"],{label:"Submit",primary:!0,keyboardFocused:!0,onTouchTap:n})];return a.createElement("div",null,a.createElement(r["default"],{title:"Edit Goal",actions:s,modal:!1,open:t,onRequestClose:n},a.createElement(u["default"],{goal:!0,onSubmit:i(o)})))},t}(a.Component),p=function(e){return{open:e.loadedGoalId>0,goal:e.loadedGoalId>0?e.goals[e.loadedGoalId+""]:c.goalFactory(0,"")}},f=function(e,t){return{editGoal2:function(n){return function(o){e(s.goalEdit(t.workbook.id,n.id,o)),e(s.goalLoad(-1))}},handleClose:function(){e(s.goalLoad(-1))}}};Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=i.connect(p,f)(d)},1276:function(e,t,n){"use strict";var o=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},a=n(1),r=n(24),l=n(40),u=n(148),i={gridList:{overflowY:"auto",marginBottom:24},gridTile:{},container:{display:"block"}},s=function(e){function t(t){return e.call(this,t)||this}return o(t,e),t.prototype.componentWillMount=function(){this.props.appBarTitle&&this.props.appBarTitle("S.M.A.R.T. Goals")},t.prototype.render=function(){var e=this.props;e.flashMessage,e.appBarTitle,e.onTileClick,e.device;return a.createElement("div",{style:i.container},a.createElement("div",null,a.createElement("h1",null,"This is my workbook"),a.createElement("h4",null,"These are my choices"),a.createElement("p",null,a.createElement("b",null,"Be Specific")," – Exactly what do you want to achieve? Create sub-goals to your overall goal and address who, what, when, where and why. Use action verbs within your goals (i.e., Create, Design, Develop, Implement, etc.)."),a.createElement("p",null,a.createElement("b",null,"Make It Measureable")," – Ensure you can track the progress and measure the outcome."),a.createElement("p",null,a.createElement("b",null,"Achievable")," – Your goals should be within your control where you can attain them. Vague (“Boiling the Ocean”) and unattainable goals may lead to disappointment."),a.createElement("p",null,a.createElement("b",null,"Realistic")," – Make sure what you are trying to achieve is practical and relevant. Review and update your goals as needed."),a.createElement("p",null,a.createElement("b",null,"Timeline")," – A goal should be grounded within a time frame. If you want to lose 10 pounds, by when do you want to achieve this goal?")))},t}(a.Component),c=function(e){return{device:e.device}},d=function(e){return{flashMessage:function(t){return e(l.showFlashMessage(t))},onTileClick:function(t){e(u.push(t))}}};Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=r.connect(c,d)(s)},1279:function(e,t,n){"use strict";var o=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},a=n(1),r=n(143),l=n(94),u=n(1280),i=n(24),s=n(40),c=n(316),d=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.render=function(){var e=this.props,t=e.editNote,n=e.open,o=e.handleClose,i=e.note,s=[a.createElement(l["default"],{label:"Cancel",primary:!0,onTouchTap:o})];return a.createElement("div",null,a.createElement(r["default"],{title:"Note",actions:s,modal:!1,open:n,onRequestClose:o},a.createElement(u["default"],{note:!0,onSubmit:t(i)})))},t}(a.Component),p=function(e){return{open:e.loadedNoteId>-1,note:e.loadedNoteId>0?e.notes[e.loadedNoteId+""]:c.noteFactory(0,"")}},f=function(e,t){return{editNote:function(t){return function(n){t.id?(console.log("noteEdit"),e(s.noteEdit(t.id,n))):(console.log("noteCreate"),e(s.noteCreate(n))),e(s.noteLoad(-1))}},handleClose:function(){e(s.noteLoad(-1))}}};Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=i.connect(p,f)(d)},1280:function(e,t,n){"use strict";var o=this&&this.__assign||Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++){t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},a=n(1),r=n(290),l=n(261),u=n(179),i=n(24),s=function(e){var t={};return e.note||(t.note="Required"),t},c=function(e){var t=e.input,n=e.label,r=e.meta,u=r.touched,i=r.error;return a.createElement(l["default"],o({floatingLabelText:n,hintText:n,multiLine:!0,rows:2,rowsMax:4,fullWidth:!0,errorText:u&&i},t))},d={layout:{display:"flex",flexFlow:"column wrap",justifyContent:"space-around"},buttonContainer:{display:"flex",flexFlow:"row wrap",justifyContent:"space-between"}},p=function(e){var t=e.handleSubmit,n=(e.load,e.pristine),o=e.reset,l=e.submitting;e.note;return a.createElement("form",{onSubmit:t},a.createElement("div",{style:d.layout},a.createElement("div",null,a.createElement(r.Field,{name:"note",component:c})),a.createElement("div",{style:d.buttonContainer},a.createElement("div",null,a.createElement(u["default"],{type:"submit",primary:!0,disabled:n||l,label:"Save"})),a.createElement("div",null,a.createElement(u["default"],{onTouchTap:o,secondary:!0,disabled:n,label:"Clear"})))))};p=r.reduxForm({form:"notesForm",validate:s})(p),Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=i.connect(function(e){var t={note:""};return e.loadedNoteId>0&&(t={note:e.notes[e.loadedNoteId+""].text}),{initialValues:t}})(p)},1281:function(e,t,n){"use strict";var o=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},a=n(1),r=n(1279),l=n(260),u=n(409),i=n(411),s=n(117),c=n(398),d=n(410),p=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.componentWillMount=function(){this.props.appBarTitle&&this.props.appBarTitle("Notes")},t.prototype.render=function(){var e=this.props,t=(e.isOnline,e.noteEdit),n=e.notes,o=e.noteDelete,p=e.noteLoad;return a.createElement("div",null,a.createElement(l.List,null,n.map(function(e){return a.createElement(l.ListItem,{key:e.id,primaryText:e.text,rightIcon:a.createElement(s["default"],{onTouchTap:function(){return o(e.id)}},a.createElement(u["default"],null)),leftIcon:a.createElement(s["default"],{onTouchTap:function(){return t(e)}},a.createElement(i["default"],null))})})),a.createElement(c["default"],{onTouchTap:function(){return p()},style:{marginRight:20}},a.createElement(d["default"],null)),a.createElement(r["default"],null))},t}(a.Component);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=p},1282:function(e,t,n){"use strict";var o=n(1281),a=n(24),r=n(40),l=function(e,t){return{notes:e.noteIds.map(function(t){return e.notes[t+""]}),isOnline:!0}},u=function(e){return{noteEdit:function(t){return e(r.noteLoad(t.id))},noteDelete:function(t){return e(r.noteDelete(t))},noteLoad:function(){return e(r.noteLoad(0))}}};Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a.connect(l,u)(o["default"])},1286:function(e,t,n){"use strict";var o=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},a=n(1),r=n(1274),l=n(1275),u=n(1273),i=n(260),s=n(409),c=n(411),d=n(117),p=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.componentWillMount=function(){var e=this.props.workbook;this.props.appBarTitle&&this.props.appBarTitle(e.title)},t.prototype.componentWillUpdate=function(e){var t=e.workbook;this.props.appBarTitle&&this.props.appBarTitle(t.title)},t.prototype.render=function(){var e=this.props,t=e.workbook,n=(e.isOnline,e.examples),o=e.goals,p=e.goalClick,f=e.goalDelete;return a.createElement("div",null,a.createElement(u["default"],{title:"Examples",items:n}),a.createElement(i.List,null,o.map(function(e){return a.createElement(i.ListItem,{key:e.id,primaryText:e.title,rightIcon:a.createElement(d["default"],{onTouchTap:function(){return f(t.id,e.id)}},a.createElement(s["default"],null)),leftIcon:a.createElement(d["default"],{onTouchTap:function(){return p(e)}},a.createElement(c["default"],null))})})),a.createElement(r["default"],{workbook:t}),a.createElement(l["default"],{workbook:t}))},t}(a.Component);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=p},1287:function(e,t,n){"use strict";var o=n(1286),a=n(24),r=n(40),l=function(e,t){return{workbook:e.workbooks[t.params.id],examples:e.workbooks[t.params.id].examples.map(function(t){return e.examples[t+""]}),goals:e.workbooks[t.params.id].goals.map(function(t){return e.goals[t+""]}),isOnline:!0}},u=function(e){return{goalClick:function(t){return e(r.goalLoad(t.id))},goalDelete:function(t,n){return e(r.goalDeleted(t,n))}}};Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a.connect(l,u)(o["default"])}});
//# sourceMappingURL=0.app.js.map