define(["base/view","base/itemView","base/util"],function(e,t,n){var r=function(){var e=this,r={},i=this.$el,s=this.collection;e.addItem=function(o,u){u||(u=i);var a=s.indexOf(o),f=e.getOption("ItemView")||t,l=n.createView({model:o,attributes:{"data-id":o.id},View:f,parentView:e});r[o.cid]=l;if(a===0)l.$el.prependTo(u);else if(a>=s.length-1)l.$el.appendTo(u);else{var c=e.getModelViewAt(s.at(a-1).cid);l.$el.insertAfter(c.$el)}},e.removeItem=function(t){var n=e.getModelViewAt(t.cid);delete r[t.cid],n.remove()},e.removeAllItems=function(){_.each(r,function(e){e.remove()}),r={}},e.getModelViewAt=function(e){return r[e]},s.length>0&&e.on("rendered",e.renderItems),e.removeReferences(function(){e=null,r=null,i=null,s=null})},i=e.extend({constructor:function(t){var n=this;e.call(n,t),_.each([r],function(e){e.call(n,t)})},tagName:"ul",dataEvents:{add:"addHandler",remove:"removeHandler",reset:"resetHandler"},resetHandler:function(e,t,n){var r=this;_.each(n.previousModels,function(e){r.removeItem(e)}),r.renderItems()},renderItems:function(){var e=this;e.removeAllItems();var t=this.$el,n=this.collection;n.each(function(n){e.addItem(n,t)})},addHandler:function(e,t){this.addItem(t)},removeHandler:function(e,t){this.removeItem(t)}});return i});