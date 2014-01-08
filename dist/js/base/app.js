define(["require","base/router","base/dataLoader","base/util","base/model"],function(e,t,n,r,i){function o(e){var t,n=305419896;for(t=0;t<e.length;t++)n+=e.charCodeAt(t)*t;return n}$.browser={msie:!1};var s=window.hex_md5,u=function(e){return o(e.toString())},a=function(e){return c[e]},f=function(e){return h[e]},l=0,c={},h={},p={},d={root:"/",baseUrl:"js/",defaultApp:"default",appBody:"#app-body",compileTemplate:function(e){return Handlebars.compile(e)},router:new t,getTemplateDef:function(t,n){var r=this;t=t||"";var i=u(t),s=n!=="underscore"?r.compileTemplate:_.template,o=a(i);return o||(o=$.Deferred(),typeof t=="function"?o.resolve(t):typeof t=="string"&&(r.cacheTemplate(o,i),/html$/.test(t)?e(["text!"+t],function(e){o.resolve(s(e))}):t.indexOf("#")===0?o.resolve(s($(t).html())):o.resolve(s(t)))),o},cacheTemplate:function(e,t){c[t]=e},cacheData:function(e,t){h[t]=e},log:function(){console.log.apply(console,arguments)},responseParser:function(e){return e},appModel:new i,getRequestDef:function(e){var t=this,r=n.getConfig(e.id);r.paramsParser=r.paramsParser||_.identity;var i=t.responseParser;r.responseParser&&(i=r.responseParser),e.params=r.paramsParser(e.params);var s=u(JSON.stringify(_.pick(e,"id","params"))),o=f(s);if(!o){o=$.Deferred();var a=n.getRequest(e.id,e.params);a.done(function(n){var r=i(n);r.errors?o.reject(n,r.errors):(e.cache==="session"&&t.cacheData(o,s),o.resolve(r))}),a.fail(function(e){o.resolve({errors:[{errorCode:"network issue",message:"Network failure try again later"}]})})}return o},beautifyId:function(e){return e=e.replace(/_([a-z])/g,function(e){return e.toUpperCase()}),e=e.replace(/_/g,""),e=e.replace(/([A-Z])/g,function(e){return" "+e}),e.replace(/(^.)/g,function(e){return e.toUpperCase()})},getDataIndex:function(){return h},getTemplateIndex:function(){return c},getFormatted:function(e,t,n){if(typeof t=="function")return t.apply(null,arguments);var r=v[t];return r?r(e,n):e},addFormatter:function(e,t){if(v[e])throw new Error("formatter already exist");this.setFormatter.apply(null,arguments)},setFormatter:function(e,t){v[e]=t},updateStringIndex:function(e){p=_.extend({},p,e)},getString:function(e){return p[e]?p[e]:e},getPageAttribute:function(e){return this.appModel.get(e)},getPageAttributes:function(){return this.appModel.toJSON()},getHash:u,getUniqueId:function(){return"__tmp_"+d.getHash(l++)},setupApp:function(e){e()},tearApp:function(e){e()},navigateTo:function(e,t,n){d.router.navigate(this.getURL(e,t,n),{trigger:!0})},getURL:function(e,t,n){var i="#";return e&&(i+=e),t&&(i+="/"+t),n&&(i+="/"+r.objectToParams(_.omit(n,"appId","pageId"))),i}},v={};return d});