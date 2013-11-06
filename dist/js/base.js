/**
 * @license RequireJS text 2.0.5+ Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

define("base/util",[],function(){var e=function(e){if(!e)return{};var t=_.map(e.split(";"),function(e){return e.split("=")}),n={};return _.each(t,function(e){n[e[0]]=e[1]}),n},t=function(e,t){var n=[];return t=t||";",_.each(e,function(e,t){n.push(t+"="+e)}),n.join(t)};return{paramsToObject:e,objectToParams:t,createView:function(e){var t,n="model",r=e.parentView;if(e.collection||e.Collection)n="collection";n==="model"?e.Model&&(e.model=new e.Model(e.attributes)):e.Collection&&(e.collection=new e.Collection(e.items));var i=_.omit(e,"Collection","Model","parentEl","skipRender","parentView");return t=new e.View(i),t&&(e.skipRender||t.render(),e.parentEl&&(e.replaceHTML&&e.parentEl.empty(),r&&r.$(e.parentEl).length>0?t.$el.appendTo(r.$(e.parentEl)):t.$el.appendTo(e.parentEl))),r&&r.addChildView(t),t}}}),define("base/router",["require","base/util"],function(e){var t=e("base/util"),n=Backbone.Router.extend({routes:{"":"index",":appId/:pageId/*params":"loadAppPage",":appId/":"loadApp",":appId":"loadApp",":appId/:pageId":"loadAppPage",":appId/:pageId/":"loadAppPage"},index:function(){e(["base/app"],function(e){e.router.navigate("#"+e.defaultApp,{trigger:!0})})},loadAppPage:function(n,r,i){e(["base/app"],function(e){var s=t.paramsToObject(i);s.appId=n,s.pageId=r,e.appModel.set(s)})},loadApp:function(n,r,i){e(["base/app"],function(e){var r=t.paramsToObject(i);e.appModel.clear(),r.appId=n,e.appModel.set(r)})}});return n}),define("base/dataLoader",["require"],function(e){var t={},n={},r={type:"get",params:{},url:"",parser:_.identity};n.define=function(e,n){var i=_.extend({},r,n);t[e]=i};var i=n.getConfig=function(e){if(t[e])return _.clone(t[e]);throw Error("Undefined request by Id: "+e)};return n.getRequest=function(e,t){var n=i(e,t),r=$.extend(!0,{},n);return n.type.toLowerCase()==="post"?(r.data=JSON.stringify(t),$.ajax(r)):n.type.toLowerCase()==="form_post"?$.post(r.url,t):(_.isEmpty(t)||(r.url+="?"+$.param(t)),$.ajax(r))},n}),define("base/formatter",[],function(){require(["base/app"],function(e){function t(e,t){try{for(var n in t)Object.defineProperty(e.prototype,n,{value:t[n],enumerable:!1})}catch(r){e.prototype=t}}function i(e){return e}function s(){}function c(e,t){var n=Math.pow(10,Math.abs(8-t)*3);return{scale:t>8?function(e){return e/n}:function(e){return e*n},symbol:e}}function d(e,t){return t-(e?Math.ceil(Math.log(e)/Math.LN10):1)}function v(e){return e+""}var n="\0",r=n.charCodeAt(0);e.map=function(e){var t=new s;if(e instanceof s)e.forEach(function(e,n){t.set(e,n)});else for(var n in e)t.set(n,e[n]);return t},t(s,{has:function(e){return n+e in this},get:function(e){return this[n+e]},set:function(e,t){return this[n+e]=t},remove:function(e){return e=n+e,e in this&&delete this[e]},keys:function(){var e=[];return this.forEach(function(t){e.push(t)}),e},values:function(){var e=[];return this.forEach(function(t,n){e.push(n)}),e},entries:function(){var e=[];return this.forEach(function(t,n){e.push({key:t,value:n})}),e},forEach:function(e){for(var t in this)t.charCodeAt(0)===r&&e.call(this,t.substring(1),this[t])}});var o=".",u=",",a=[3,3],f="$",l=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"].map(c);e.formatPrefix=function(t,n){var r=0;return t&&(t<0&&(t*=-1),n&&(t=e.round(t,d(t,n))),r=1+Math.floor(1e-12+Math.log(t)/Math.LN10),r=Math.max(-24,Math.min(24,Math.floor((r<=0?r+1:r-1)/3)*3))),l[8+r/3]},e.round=function(e,t){return t?Math.round(e*(t=Math.pow(10,t)))/t:Math.round(e)},e.format=function(t){var n=h.exec(t),r=n[1]||" ",i=n[2]||">",s=n[3]||"",u=n[4]||"",a=n[5],l=+n[6],c=n[7],d=n[8],g=n[9],y=1,b="",w=!1;d&&(d=+d.substring(1));if(a||r==="0"&&i==="=")a=r="0",i="=",c&&(l-=Math.floor((l-1)/4));switch(g){case"n":c=!0,g="g";break;case"%":y=100,b="%",g="f";break;case"p":y=100,b="%",g="r";break;case"b":case"o":case"x":case"X":u==="#"&&(u="0"+g.toLowerCase());case"c":case"d":w=!0,d=0;break;case"s":y=-1,g="r"}u==="#"?u="":u==="$"&&(u=f),g=="r"&&!d&&(g="g");if(d!=null)if(g=="g")d=Math.max(1,Math.min(21,d));else if(g=="e"||g=="f")d=Math.max(0,Math.min(20,d));g=p.get(g)||v;var E=a&&c;return function(t){if(w&&t%1)return"";var n=t<0||t===0&&1/t<0?(t=-t,"-"):s;if(y<0){var f=e.formatPrefix(t,d);t=f.scale(t),b=f.symbol}else t*=y;t=g(t,d);var h=t.lastIndexOf("."),p=h<0?t:t.substring(0,h),v=h<0?"":o+t.substring(h+1);!a&&c&&(p=m(p));var S=u.length+p.length+v.length+(E?0:n.length),x=S<l?(new Array(S=l-S+1)).join(r):"";return E&&(p=m(x+p)),n+=u,t=p+v,(i==="<"?n+t+x:i===">"?x+n+t:i==="^"?x.substring(0,S>>=1)+n+t+x.substring(S):n+(E?t:x+t))+b}};var h=/(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,p=e.map({b:function(e){return e.toString(2)},c:function(e){return String.fromCharCode(e)},o:function(e){return e.toString(8)},x:function(e){return e.toString(16)},X:function(e){return e.toString(16).toUpperCase()},g:function(e,t){return e.toPrecision(t)},e:function(e,t){return e.toExponential(t)},f:function(e,t){return e.toFixed(t)},r:function(t,n){return(t=e.round(t,d(t,n))).toFixed(Math.max(0,Math.min(20,d(t*(1+1e-15),n))))}}),m=i;if(a){var g=a.length;m=function(e){var t=e.length,n=[],r=0,i=a[0];while(t>0&&i>0)n.push(e.substring(t-=i,t+i)),i=a[r=(r+1)%g];return n.reverse().join(u)}}e.addFormatter("currency",e.format("$0,000")),e.addFormatter("integer",e.format("0,000"))})}),define("base/app",["require","base/router","base/dataLoader","base/formatter"],function(e,t,n){var r=window.hex_md5,i=function(e){return r(e.toString())},s=function(e){return u[e]},o=function(e){return a[e]},u={},a={},f={},l={root:"/",baseUrl:"js/",defaultApp:"default",appBody:"#app-body",compileTemplate:function(e){return Handlebars.compile(e)},router:new t,getTemplateDef:function(t){var n=this;t=t||"";var r=i(t),o=s(r);return o||(o=$.Deferred(),n.cacheTemplate(o,r),typeof t=="function"?o.resolve(t):typeof t=="string"&&(/html$/.test(t)?e(["text!"+t],function(e){o.resolve(n.compileTemplate(e))}):t.indexOf("#")===0?o.resolve(n.compileTemplate($(t).html())):o.resolve(n.compileTemplate(t)))),o},cacheTemplate:function(e,t){u[t]=e},cacheData:function(e,t){a[t]=e},log:function(){console.log.apply(console,arguments)},parseSuccessResponse:function(e){return e},parseFailureResponse:function(e){return e},appModel:new Backbone.Model,getRequestDef:function(e){var t=this,r=n.getConfig(e.id);r.paramsParser=r.paramsParser||_.identity;var s=t.parseSuccessResponse,u=t.parseFailureResponse;r.parser&&(s=u=r.parser);var a=i(JSON.stringify(_.pick(e,"id","params"))),f=o(a);if(!f){f=$.Deferred();var l=n.getRequest(e.id,r.paramsParser(e.params));l.done(function(e){var n=s(e);n.errors?f.resolve(n.errors):(t.cacheData(f,a),f.resolve(n))}),l.fail(function(e){f.resolve({errors:[{errorCode:"network issue",message:"Network failure try again later"}]})})}return f},beautifyId:function(e){return e=e.replace(/_([a-z])/g,function(e){return e.toUpperCase()}),e=e.replace(/_/g,""),e=e.replace(/([A-Z])/g,function(e){return" "+e}),e.replace(/(^.)/g,function(e){return e.toUpperCase()})},getDataIndex:function(){return a},getTemplateIndex:function(){return u},getFormatted:function(e,t,n){if(typeof t=="function")return t.apply(null,arguments);var r=c[t];return r?r(e,n):e},addFormatter:function(e,t){if(c[e])throw new Error("formatter already exist");this.setFormatter.apply(null,arguments)},setFormatter:function(e,t){c[e]=t},updateStringIndex:function(e){f=_.extend({},f,e)},getString:function(e){return f[e]?f[e]:e},getHash:i},c={};return l}),define("base/model",[],function(){var e=Backbone.Model.extend({constructor:function(e,t){var n=this;t&&t.defaults&&(n.defaults=t.defaults),Backbone.Model.apply(n,arguments)},is:function(e){return this.get(e)===!0},isNot:function(e){return this.get(e)===!1},isEqual:function(e,t){return this.get(e)===t},isNotEqual:function(e,t){return this.get(e)!==t},removeSelf:function(){this.collection&&this.collection.remove(this)},isDefault:function(e,t){return this.defaults[e]===t},setDefault:function(e,t){this.defaults[e]=t},moveUp:function(){var e=this.collection;if(!e)return;var t=e.indexOf(this);if(t===0)return;this.removeSelf(),e.add(this,{at:t-1})},moveDown:function(){var e=this.collection;if(!e)return;var t=e.indexOf(this);if(t===e.length-1)return;this.removeSelf(),e.add(this,{at:t+1})},getClosest:function(){var e=this.collection;if(!e||e.length<2)return;var t=e.indexOf(this),n=e.at(t-1);return n?n:e.at(t+1)},toJSON:function(e){var t=_.clone(this.attributes);return e&&_.each(t,function(e,n){e&&e.toJSON&&(t[n]=e.toJSON())}),t},checkFilters:function(e){if(e.length===0)return!0;var n=this,r=n.toJSON(),i=_.every(e,function(e){return t[e.expr].call(n,e,r[e.column])});return i}}),t={eq:function(e,t){return e.value===t},startsWith:function(e,t){return(new RegExp("^"+e.value,"i")).test(t)},endsWith:function(e,t){return(new RegExp(e.value+"$","i")).test(t)},has:function(e,t){return(new RegExp(e.value,"i")).test(t)}};return e}),define("base/view",["base/app","base/model","base/util"],function(e,t,n){var r=Backbone.View.extend({constructor:function(e){var t=this;t.removeQue=[],Backbone.View.call(t,e),_.each(v,function(e){e(t)})},render:function(){var n=this;n.beforeRender();var r=function(){e.getTemplateDef(n.getTemplate()).done(function(e){n.model||(n.model=new t),n.renderTemplate(e),u(n);if(n.setState){var r=_.keys(n.getOption("states"))[0];n.setState(n.getState()||n.getOption("state")||r)}n.postRender()})},i=function(){n.removeChildViews&&n.removeChildViews(),r()},s=n.loadMeta();return s.done(i),n},postRender:function(){},beforeRender:function(){},renderTemplate:function(e){var t=this.getOption("useDeepJSON");this.$el.html(e(this.model.toJSON(t)))},getOption:function(e){return this.options[e]||this[e]},loadingHandler:function(e){this.$el.toggleClass("loading",e)},metaLoadErrorHandler:function(){this.$el.html("Error Loading Meta Data")},addMethod:function(e,t){this[e]||(this[e]=t)},remove:function(){this.removeChildViews(),Backbone.View.prototype.remove.call(this),this.removeReferences(),this.removeQue=null},removeReferences:function(e){e?this.removeQue.push(e):_.each(this.removeQue,function(e){e.call(this)})}}),i=function(e){var t=e.model||e.collection,n;n=e.dataEvents,_.each(n,function(n,r){var i,s,o;o=/\s+/,s=n.split(o),i=r.split(o),_.each(s,function(n){_.each(i,function(r){e.listenTo(t,r,function(){if(!e[n])throw n+" Not Defined";var t=Array.prototype.slice.call(arguments);t.unshift(r),e[n].apply(e,t)})})})})},s=function(e){var t=e.getOption("states");if(!t)return;var r,i,s=function(){i&&i.remove()},o=function(t){i=n.createView({View:t,model:e.model,parentEl:e.$(".state-view"),parentView:e})};e.setState=function(e){if(typeof e!="string")throw new Error("state should be a string");if(r===e)return;r=e;var n=t[e];if(!n)throw new Error("Invalid State");s(),o(n)},e.getState=function(){return r},e.removeReferences(function(){t=null,r=null,i=null,e=null})},o=function(e){var t=e.getOption("template")||e.template;e.setTemplate=function(n){t=n,e.render()},e.getTemplate=function(){return t},e.removeReferences(function(){t=null,e=null})},u=function(e){var t={},r=e.getOption("views");_.each(r,function(r,i){r.parentView=e,t[i]=n.createView(r)}),e.getSubView=function(e){var n=t[e];if(n)return n;throw new Error("No View Defined for id :"+e)},e.getSubModel=function(t){return e.getSubView(t).model},e.getSubAttribute=function(t,n){return e.getSubModel(t).get(n)},e.removeReferences(function(){r=null,t=null,e=null})},a=function(e){var t=e.model;t&&(e.listenTo(t,"change",_.bind(f,e)),l.call(e,t))},f=function(e){var t=e.changedAttributes();_.each(t,function(e,t){var n=this[t+"ChangeHandler"];n&&typeof n=="function"&&n.call(this,e)},this);var n=this.changeHandler;n&&typeof n=="function"&&n.call(this,t)},l=function(e){var t=e.toJSON();_.each(t,function(e,t){var n=this[t+"ChangeHandler"];n&&typeof n=="function"&&n.call(this,e)},this);var n=this.changeHandler;n&&typeof n=="function"&&n.call(this,t)},c=function(e){var t=function(e){e.actionHandled&&(e.stopPropagation(),$("body").trigger("click"))};e.actionHandler&&e.$el.on("click",".action",function(n){n.preventDefault();var r=$(n.currentTarget),i=r.attr("href").substr(1);e.actionHandler.call(e,i,n),t(n)}),e.$el.on("click",".dummy",function(e){e.preventDefault()}),e.removeReferences(function(){e.$el.off(),e=null})},h=function(e){var t=e.getOption("renderEvents")||e.renderEvents;t&&t.length>0&&e.listenTo(e.model,t.join(" "),function(){e.render.call(e)})},p=function(t){var n=t.getOption("requests")||t.requests,r=0,i=function(){r++,r>0&&t.loadingHandler.call(t,!0)},s=function(){r--,r<1&&t.loadingHandler.call(t,!1)};t.addRequest=function(t,n){var r=t;_.isArray(r)||(r=[r]);var o=_.map(r,function(t){var n=e.getRequestDef(t);return t.callback&&n.always(t.callback),i(),n.always(s),n}),u=$.when.apply(null,o);return n&&u.then(n),u},t.loadMeta=function(){if(!t.metaDef){var e=n?t.addRequest(n,function(){var e=t.getOption("requestsParser");e&&e.apply(t,arguments)}):$.when({});t.metaDef=e}return t.metaDef},t.removeReferences(function(){n=null,r=null,t=null})},d=function(e){var t=[];e.addChildView=function(e){t.push(e)},e.removeChildViews=function(){_.each(t,function(e){e&&e.remove&&e.remove()}),t=[]},e.removeReferences(function(){t=null,e=null})},v=[i,p,o,a,c,h,s,d];return r}),define("text",["module"],function(e){var t,n,r,i,s=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],o=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,u=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,a=typeof location!="undefined"&&location.href,f=a&&location.protocol&&location.protocol.replace(/\:/,""),l=a&&location.hostname,c=a&&(location.port||undefined),h=[],p=e.config&&e.config()||{};t={version:"2.0.5+",strip:function(e){if(e){e=e.replace(o,"");var t=e.match(u);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:p.createXhr||function(){var e,t,n;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;if(typeof ActiveXObject!="undefined")for(t=0;t<3;t+=1){n=s[t];try{e=new ActiveXObject(n)}catch(r){}if(e){s=[n];break}}return e},parseName:function(e){var t,n,r,i=!1,s=e.indexOf("."),o=e.indexOf("./")===0||e.indexOf("../")===0;return s!==-1&&(!o||s>1)?(t=e.substring(0,s),n=e.substring(s+1,e.length)):t=e,r=n||t,s=r.indexOf("!"),s!==-1&&(i=r.substring(s+1)==="strip",r=r.substring(0,s),n?n=r:t=r),{moduleName:t,ext:n,strip:i}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,r,i){var s,o,u,a=t.xdRegExp.exec(e);return a?(s=a[2],o=a[3],o=o.split(":"),u=o[1],o=o[0],(!s||s===n)&&(!o||o.toLowerCase()===r.toLowerCase())&&(!u&&!o||u===i)):!0},finishLoad:function(e,n,r,i){r=n?t.strip(r):r,p.isBuild&&(h[e]=r),i(r)},load:function(e,n,r,i){if(i.isBuild&&!i.inlineText){r();return}p.isBuild=i.isBuild;var s=t.parseName(e),o=s.moduleName+(s.ext?"."+s.ext:""),u=n.toUrl(o),h=p.useXhr||t.useXhr;!a||h(u,f,l,c)?t.get(u,function(n){t.finishLoad(e,s.strip,n,r)},function(e){r.error&&r.error(e)}):n([o],function(e){t.finishLoad(s.moduleName+"."+s.ext,s.strip,e,r)})},write:function(e,n,r,i){if(h.hasOwnProperty(n)){var s=t.jsEscape(h[n]);r.asModule(e+"!"+n,"define(function () { return '"+s+"';});\n")}},writeFile:function(e,n,r,i,s){var o=t.parseName(n),u=o.ext?"."+o.ext:"",a=o.moduleName+u,f=r.toUrl(o.moduleName+u)+".js";t.load(a,r,function(n){var r=function(e){return i(f,e)};r.asModule=function(e,t){return i.asModule(e,f,t)},t.write(e,a,r,s)},s)}};if(p.env==="node"||!p.env&&typeof process!="undefined"&&process.versions&&!!process.versions.node)n=require.nodeRequire("fs"),t.get=function(e,t){var r=n.readFileSync(e,"utf8");r.indexOf("﻿")===0&&(r=r.substring(1)),t(r)};else if(p.env==="xhr"||!p.env&&t.createXhr())t.get=function(e,n,r,i){var s=t.createXhr(),o;s.open("GET",e,!0);if(i)for(o in i)i.hasOwnProperty(o)&&s.setRequestHeader(o.toLowerCase(),i[o]);p.onXhr&&p.onXhr(s,e),s.onreadystatechange=function(t){var i,o;s.readyState===4&&(i=s.status,i>399&&i<600?(o=new Error(e+" HTTP status: "+i),o.xhr=s,r(o)):n(s.responseText))},s.send(null)};else if(p.env==="rhino"||!p.env&&typeof Packages!="undefined"&&typeof java!="undefined")t.get=function(e,t){var n,r,i="utf-8",s=new java.io.File(e),o=java.lang.System.getProperty("line.separator"),u=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),i)),a="";try{n=new java.lang.StringBuffer,r=u.readLine(),r&&r.length()&&r.charAt(0)===65279&&(r=r.substring(1)),n.append(r);while((r=u.readLine())!==null)n.append(o),n.append(r);a=String(n.toString())}finally{u.close()}t(a)};else if(p.env==="xpconnect"||!p.env&&typeof Components!="undefined"&&Components.classes&&Components.interfaces)r=Components.classes,i=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),t.get=function(e,t){var n,s,o={},u=new FileUtils.File(e);try{n=r["@mozilla.org/network/file-input-stream;1"].createInstance(i.nsIFileInputStream),n.init(u,1,0,!1),s=r["@mozilla.org/intl/converter-input-stream;1"].createInstance(i.nsIConverterInputStream),s.init(n,"utf-8",n.available(),i.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),s.readString(n.available(),o),s.close(),n.close(),t(o.value)}catch(a){throw new Error((u&&u.path||"")+": "+a)}};return t}),define("text!widgets/header/header.html",[],function(){return'<div class="container">\n    <a href="#" class="logo"><img src="/ibone/js/widgets/header/inmobi-logo.png"/> </a>\n    <ul class="nav-items">\n        <li class="introduction"><a href="#introduction/landing">Introduction</a></li>\n        <li class="examples"><a href="#examples/landing">Examples</a></li>\n    </ul>\n</div>'}),define("widgets/header",["base/view","base/model","text!./header/header.html"],function(e,t,n){var r=e.extend({template:n,appIdChangeHandler:function(e){this.$(".active").removeClass("active"),this.$("."+e).addClass("active")}});return{View:r,Model:t}}),define("base/root",["base/view","base/model","widgets/header"],function(e,t,n){var r=e.extend({postRender:function(){var e=new n.View({el:this.$("#header"),model:this.model});e.render()},changeHandler:function(e){var t=this.model.toJSON();e.appId?require(["apps/"+t.appId],function(){require(["apps/"+t.appId+"/app"],function(e){e.renderPage(t.pageId,t)})}):e.pageId&&require(["apps/"+t.appId+"/app"],function(e){e.renderPage(t.pageId,t)})}});return{View:r}}),define("base/itemView",["base/view"],function(e){var t=e.extend({tagName:"li",template:"{{name}}"});return t}),define("base/collectionView",["base/view","base/itemView","base/util"],function(e,t,n){var r=function(){var e=this,r={},i=this.$el,s=this.collection;e.addItem=function(o,u){u||(u=i);var a=s.indexOf(o),f=e.getOption("itemView")||t,l=n.createView({model:o,attributes:{"data-id":o.id},View:f,parentView:e});r[o.id]=l;if(a===0)l.$el.prependTo(u);else if(a>=s.length-1)l.$el.appendTo(u);else{var c=e.getModelViewAt(s.at(a-1).id);l.$el.insertAfter(c.$el)}},e.removeItem=function(t){var n=e.getModelViewAt(t.id);n.remove()},e.getModelViewAt=function(e){return r[e]},e.removeReferences(function(){e=null,r=null,i=null,s=null})},i=e.extend({constructor:function(t){var n=this;e.call(n,t),_.each([r],function(e){e.call(n,t)})},tagName:"ul",dataEvents:{add:"addHandler",remove:"removeHandler"},postRender:function(){var e=this,t=this.$el,n=this.collection;t.hide(),n.each(function(n){e.addItem(n,t)}),t.show()},addHandler:function(e,t){this.addItem(t)},removeHandler:function(e,t){this.removeItem(t)}});return i}),define("base/configurableModel",["base/model"],function(e){var t=e.extend({constructor:function(t,r){var i=this;e.call(this,t,r),_.each([n],function(e){e(i)});var s=this.getConfigModel();this.setConfigs(_.extend({},r.config)),this.listenTo(this.getConfigModel(),"all",function(e){this.trigger.apply(this,["config_"+e].concat(_.rest(arguments)))})}}),n=function(t){var n=new e,r={setConfig:function(e,t){n.set(e,t)},getConfig:function(e){return n.get(e)},setConfigs:function(e){n.set(e)},getConfigs:function(e){return n.toJSON(e)},getConfigModel:function(){return n}};_.extend(t,r)};return t}),define("base/collection",["base/app","base/model"],function(e,t){var n=Backbone.Collection.extend({model:t,constructor:function(e,t){var n=this;n.options=t||{},Backbone.Collection.apply(n,arguments)},getOption:function(e){return this.options[e]||this[e]}});return n}),define("base/helpers",["base/app"],function(e){Handlebars.registerHelper("elementLabel",function(e){return e.label||e.name}),Handlebars.registerHelper("string",function(t){return e.getString(t)}),Handlebars.registerHelper("stringify",function(e){return JSON.stringify(e)}),Handlebars.registerHelper("toggleClass",function(e){if(this[e])return e}),Handlebars.registerHelper("buttonType",function(){return this.isPrimary?"submit":"button"}),Handlebars.registerHelper("buttonClass",function(){return this.isPrimary?"btn-primary-cta":this.isSecondary?"btn-secondary-cta":"btn-regular"}),Handlebars.registerHelper("ifEqual",function(e,t,n){if(e===t)return n.fn(this);if(n.inverse)return n.inverse(this)})}),define("base",["require","base/view","base/root","base/collectionView","base/itemView","base/model","base/configurableModel","base/collection","base/util","base/app","base/dataLoader","base/router","base/helpers","base/formatter"],function(e){return{View:e("base/view"),Root:e("base/root"),CollectionView:e("base/collectionView"),ItemView:e("base/itemView"),Model:e("base/model"),ConfigurableModel:e("base/configurableModel"),Collection:e("base/collection"),util:e("base/util"),app:e("base/app"),dataLoader:e("base/dataLoader"),Router:e("base/router"),helpers:e("base/helpers"),formatter:e("base/formatter")}});