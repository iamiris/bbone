define(["base/app","base/view","base/model","base/configurableModel","base/collection","base/util","widgets/table/rowCollection"],function(e,t,n,r,i,s,o){var u=n.extend({}),a=t.extend({tagName:"tr",className:"table-row",template:'{{#each items}}<td data-key="{{key}}" class="{{classNames}}"><div class="cell-value" style="text-align: {{align}}">{{#if renderHTML}}{{{value}}}{{else}}{{value}}{{/if}}</div></td>{{/each}}',useDeepJSON:!0}),f=a.extend({className:"table-heading",template:'{{#each items}}<th data-key="{{key}}" class="{{classNames}}"><div class="cell-value" style="text-align: {{align}}">{{value}}</div></th>{{/each}}'}),l=function(){var t=this,r={},o=this.$el,u=this.getOption("rowCollection"),f=this.getOption("columns"),l=u.getConfig("sortOrder"),c=u.getConfig("sortKey");t.addItem=function(o,u,h){var p=_.map(f,function(t){var n=["cell"];c===t.key&&(n.push("sorted"),n.push(l)),u%2===0&&n.push("even");var r=o.toJSON();return{key:t.key,classNames:n.join(" "),value:e.getFormatted(r[t.key],t.formatter,r),align:t.align||"left",renderHTML:t.renderHTML}}),d=new n({items:new i(p)}),v=s.createView({model:d,View:a,parentView:t});r[o.id]=v,v.$el.appendTo(h)},t.removeItem=function(e){var n=t.getModelViewAt(e.id);n.remove()},t.getModelViewAt=function(e){return r[e]},t.removeReferences(function(){t=null,r=null,o=null,u=null})},c=t.extend({template:'<div class="table-header"></div> <table class="row-list"></table><div class="table-footer"></div>',className:"data-table",constructor:function(e){var n=this;t.call(n,e),_.each([l],function(t){t.call(n,e)})},postRender:function(){var e=this,t=this.$el,n=this.$(".row-list"),r=this.getOption("rowCollection");e.renderHeader(n),t.hide();var i=r.getConfigs();if(i.requestId){var s=e.addRequest({id:i.requestId,params:_.omit(i,"requestId")});s.done(function(t){r.reset(t.results),r.setConfig("totalRecords",t.totalRecords),r.each(function(t,r){e.addItem(t,r,n)})})}else i.baseUrl?(e.listenToOnce(r,"add",function(){r.each(function(t,r){e.addItem(t,r,n)})}),r.fetch({data:_.omit(i,"baseUrl"),processData:!0})):r.processedEach(function(t,r){e.addItem(t,r,n)});t.show()},renderHeader:function(t){var r=this,o=this.getOption("rowCollection"),u=this.getOption("columns"),a=o.getOption("sortOrder"),l=o.getOption("sortKey"),c=_.map(u,function(t){var n=["header-cell"];return l===t.key&&(n.push("sorted"),n.push(a)),{key:t.key,classNames:n.join(" "),value:t.label||e.beautifyId(t.key),align:t.align||"left"}}),h=new n({items:new i(c)});s.createView({View:f,model:h,parentEl:t,parentView:r})}});return{View:c,RowCollection:o,Model:u}});