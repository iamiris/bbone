define([],function(){var e=function(e){if(!e)return{};var t=_.map(e.split(";"),function(e){return e.split("=")}),n={};return _.each(t,function(e){n[e[0]]=e[1]}),n},t=function(e,t){var n=[];return t=t||";",_.each(e,function(e,t){n.push(t+"="+e)}),n.join(t)};return{paramsToObject:e,objectToParams:t,createView:function(e){var t,n="model",r=e.parentView;if(e.collection||e.Collection)n="collection";n==="model"?e.Model&&(e.model=new e.Model(e.attributes)):e.Collection&&(e.collection=new e.Collection(e.items));var i=_.omit(e,"Collection","Model","parentEl","skipRender","parentView");return t=new e.View(i),t&&(e.skipRender||t.render(),e.parentEl&&(e.replaceHTML&&e.parentEl.empty(),r&&r.$(e.parentEl).length>0?t.$el.appendTo(r.$(e.parentEl)):t.$el.appendTo(e.parentEl))),r&&r.addChildView(t),t}}});