define([],function(){var e=function(e){if(!e)return{};var t=_.map(e.split(";"),function(e){return e.split("=")}),n={};return _.each(t,function(e){n[e[0]]=e[1]}),n},t=function(e,t){var n=[];return t=t||";",_.each(e,function(e,t){n.push(t+"="+e)}),n.join(t)},n=function(e,t){var n=t.parentView;e&&(n&&n.addChildView(e),t.skipRender!==!0&&e.render(),t.parentEl!==undefined?(t.replaceHTML===!0&&t.parentEl.empty(),n&&n.$(t.parentEl).length>0?e.$el.appendTo(n.$(t.parentEl)):e.$el.appendTo(t.parentEl)):e.$el.appendTo(n.el))};return{paramsToObject:e,objectToParams:t,createView:function(e){var t,r="model";if(e.collection||e.Collection)r="collection";r==="model"?e.Model&&(e.model=new e.Model(e.modelAttributes)):e.Collection&&(e.collection=new e.Collection(e.items));var i=_.omit(e,"Collection","Model","parentEl","skipRender","View");return t=new e.View(i),n(t,e),t},deployView:n}});