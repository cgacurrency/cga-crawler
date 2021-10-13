webpackJsonp([366],{1219:function(e,t,a){"use strict";function n(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,a){function n(r,s){try{var c=t[r](s),l=c.value}catch(e){return void a(e)}if(!c.done)return Promise.resolve(l).then(function(e){n("next",e)},function(e){n("throw",e)});e(l)}return n("next")})}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function c(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=a(25),m=a.n(l),u=a(1),i=a.n(u),o=a(317),f=(a.n(o),a(195)),p=a.n(f),h=a(30),d=a(20),E=a(316),v=a(51),b=a(80),y=a(15),x=a.n(y),g=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),N=function(e){function t(e){r(this,t);var a=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.statTimer=null,a.state={account:"",blockCount:{},version:{},weight:0,peerCount:0,systemInfo:{}},a}return c(t,e),g(t,[{key:"componentWillMount",value:function(){function e(){return t.apply(this,arguments)}var t=n(m.a.mark(function e(){var t=this;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=this,e.next=3,b.a.version();case 3:return e.t1=e.sent,e.next=6,b.a.nodeAccount();case 6:e.t2=e.sent,e.t3={version:e.t1,account:e.t2},e.t4=function(){return t.updateStats()},e.t0.setState.call(e.t0,e.t3,e.t4);case 10:case"end":return e.stop()}},e,this)}));return e}()},{key:"componentWillUnmount",value:function(){this.statTimer&&(clearTimeout(this.statTimer),this.statTimer=null)}},{key:"updateStats",value:function(){function e(){return t.apply(this,arguments)}var t=n(m.a.mark(function e(){return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=this,e.next=3,b.a.blockCount();case 3:return e.t1=e.sent,e.next=6,b.a.weight(this.state.account);case 6:return e.t2=e.sent,e.next=9,b.a.systemInfo();case 9:return e.t3=e.sent,e.next=12,b.a.peerCount();case 12:e.t4=e.sent,e.t5={blockCount:e.t1,weight:e.t2,systemInfo:e.t3,peerCount:e.t4},e.t0.setState.call(e.t0,e.t5),this.statTimer=setTimeout(this.updateStats.bind(this),1e4);case 16:case"end":return e.stop()}},e,this)}));return e}()},{key:"render",value:function(){var e=this.state,t=e.blockCount,a=e.weight,n=e.peerCount;return i.a.createElement("div",{className:"p-4"},i.a.createElement(o.Helmet,{title:"CGA Node Status"}),i.a.createElement("div",{className:"row align-items-center"},i.a.createElement("div",{className:"col-sm"},i.a.createElement("h1",{className:"mb-0"},i.a.createElement(d.a,{id:"nav.status"})),i.a.createElement("p",{className:"text-muted break-word"},i.a.createElement(v.a,{account:this.state.account,className:"text-muted"}))),i.a.createElement("div",{className:"col col-auto"},i.a.createElement("h3",null,i.a.createElement("span",{className:"text-muted"},"Version")," ","CGA BETA 18.0"))),i.a.createElement("hr",null),i.a.createElement("div",{className:"row mt-5"},i.a.createElement("div",{className:"col-sm text-sm-center"},i.a.createElement("p",{className:"text-muted mb-2"},i.a.createElement(d.a,{id:"status.checked_blocks"})),i.a.createElement("h2",null,i.a.createElement(h.b,{value:t.count||0,maximumFractionDigits:0}))),i.a.createElement("div",{className:"col-sm text-sm-center"},i.a.createElement("p",{className:"text-muted mb-2"},i.a.createElement(d.a,{id:"status.unchecked_blocks"})),i.a.createElement("h2",null,i.a.createElement(h.b,{value:t.unchecked||0,maximumFractionDigits:0}))),i.a.createElement("div",{className:"col-sm text-sm-center"},i.a.createElement("p",{className:"text-muted mb-2"},i.a.createElement(d.a,{id:"status.voting_weight"})),i.a.createElement("h2",null,i.a.createElement(h.b,{value:E.a.fromRaw(a),maximumFractionDigits:0})," ",x.a.currency.shortName)),i.a.createElement("div",{className:"col-sm text-sm-center"},i.a.createElement("p",{className:"text-muted mb-2"},i.a.createElement(d.a,{id:"status.peers"})),i.a.createElement("h2",null,i.a.createElement(h.b,{value:n})))),i.a.createElement("div",{className:"row mt-5"},i.a.createElement("div",{className:"col-sm text-sm-center"},i.a.createElement("p",{className:"text-muted mb-2"},i.a.createElement(d.a,{id:"status.uptime"})),i.a.createElement("h2",null,this.getUptime())),i.a.createElement("div",{className:"col-sm text-sm-center"},i.a.createElement("p",{className:"text-muted mb-2"},i.a.createElement(d.a,{id:"status.cpu_usage"})),i.a.createElement("h2",null,this.getCpuUsage())),i.a.createElement("div",{className:"col-sm text-sm-center"},i.a.createElement("p",{className:"text-muted mb-2"},i.a.createElement(d.a,{id:"status.memory"})),i.a.createElement("h2",null,this.getMemory())),i.a.createElement("div",{className:"col-sm text-sm-center"},i.a.createElement("p",{className:"text-muted mb-2"},i.a.createElement(d.a,{id:"status.database"})),i.a.createElement("h2",null,this.getDatabaseSize()))))}},{key:"getUptime",value:function(){var e=this.state.systemInfo;return e.raiStats?p()().subtract((e.raiStats.elapsed||0)/1e3,"seconds").fromNow(!0):"..."}},{key:"getCpuUsage",value:function(){var e=this.state.systemInfo;return e.raiStats?(e.raiStats.cpu||0)+"%":"..."}},{key:"getMemory",value:function(){var e=this.state.systemInfo;if(!e.memory)return"...";var t=e.memory,a=e.raiStats,n=function(e){return e=e/1024/1024,e>1024?Math.round(e/1024*100)/100+"GB":Math.round(100*e)/100+"MB"};return n(a.memory||0)+" / "+n(t.total)}},{key:"getDatabaseSize",value:function(){var e=this.state.systemInfo;if(!e.dbSize)return"Unknown";var t=e.dbSize/1024/1024;return t>1024?i.a.createElement(u.Fragment,null,i.a.createElement(h.b,{value:t/1024,maximumFractionDigits:2}),"GB"):i.a.createElement(u.Fragment,null,i.a.createElement(h.b,{value:t,maximumFractionDigits:2}),"MB")}}]),t}(i.a.PureComponent);t.default=N}});
//# sourceMappingURL=366.e07beb56.chunk.js.map