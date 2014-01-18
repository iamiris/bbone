define("widgets/form/validator",["base/app"],function(e){var t=function(e,t){var r=[],i,s=_.every(t,function(t){var s=n[t.expr].call(this,t,e);return s||(r.push(t),i=t),s});return{isValid:s,errors:r,errorRule:i}},n={req:function(e,t){return!_.isEmpty(t)},digits:function(e,t){return/^\d{5}$/.test(t)},alphanumeric:function(e,t){var n=/^\w+$/;return n.test(t)},number:function(e,t){if(t===undefined)return!0;var n=+t;return n===n},email:function(e,t){var n=/^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-\\+]+)*@[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-\+]+)*(\.[A-Za-z]{2,})$/i;return n.test($.trim(t))},minlen:function(e,t){var n=e.length;return $.trim(String(t)).length>=n},maxlen:function(e,t,n){var r=e.length;return $.trim(String(t)).length<=r},lt:function(e,t,n){var r=parseFloat(n),i=parseFloat(t);return i<r},gt:function(e,t,n){var r=parseFloat(n),i=parseFloat(t);return i>r},eq:function(e,t,n){return n===t},neq:function(e,t){return e.value!==t},url:function(e,t){if(t==="")return!0;var n=/(http|https|market):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i;return n.test($.trim(t))},emaillist:function(e,t){var n=t.split(","),r=/^([\w\-]+(?:\.[\w\-]+)*)@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;for(var i=0;i<n.length;i++)if($.trim(n[i])!==""&&!r.test($.trim(n[i])))return!1;return!0},"function":function(e,t){var n=e.func;return n.call(null,t)}};return{validateValue:t,validationRuleMethods:n}}),define("text!widgets/form/inputView.html",[],function(){return'<div class="form-group">\n    <label>{{elementLabel this}}</label>\n    <div class="controls">\n        <input type="{{type}}" placeholder="{{placeholder}}"  name="{{name}}"  value="{{value}}" class="el-{{name}} form-control js-validate-change">\n        <span class="message-block"></span>\n    </div>\n</div>'}),define("widgets/form/element",["base/app","base","widgets/form/validator","text!./inputView.html"],function(e,t,n,r){var i=".form-group",s=".message-block",o="has-error",u=t.Model.extend({constructor:function(){t.Model.apply(this,arguments);var e=this,n=e.get("defaultValue");n===undefined&&e.set("defaultValue",e.get("value"));var r=e.collection,i=e.get("activeRules");_.each(i,function(t){var n=r.get(t.element);n.on("change:value",function(t,n){e.updateActive()}),e.updateActive()})},defaults:{valid:!0,active:!0,disabled:!1,readonly:!1,skipPost:!1,value:null,label:null,activeRules:[],validationRules:[],type:"text",errorCode:"",group:"elements"},idAttribute:"name",updateActive:function(){var e=this.get("activeRules"),t=_.every(e,function(e){var t=this.collection.get(e.element);return l[e.expr].call(this,t,e)},this);this.set("active",t)},isElementValid:function(e){var t=this.get("validationRules"),r=[];if(this.isNot("active"))return[];var i,s=_.every(t,function(e){var t=n.validationRuleMethods[e.expr].call(this,e,this.get("value"));return t||(r.push(e),i=e),t},this);this.set("valid",s);if(!e)if(i){var o=i.message||"error."+this.get("name")+"."+i.expr;this.set("errorCode",o)}else this.set("errorCode","");return r},getSiblingValue:function(e){if(this.collection)return this.collection.get(e).get("value")},getSiblingAttribute:function(e,t){if(this.collection)return this.collection.get(e).get(t)},setSiblingAttribute:function(e,t,n){if(this.collection)return this.collection.get(e).set(t,n)},setSiblingValue:function(e,t){if(this.collection)return this.collection.get(e).set("value",t)},isElementDefault:function(){var e=this.toJSON();return e.value===e.defaultValue},resetValue:function(e){var t=this;t.set("value",t.get("defaultValue")),this.updateActive(),e&&t.set("errorCode","")}}),a=t.Collection.extend({model:u}),f=t.View.extend({tagName:"div",className:"element",template:r,dataEvents:{forceRender:"render",forceUpdate:"updateValue"},events:{"change input":"updateValue","blur input":"updateValue","change select":"updateValue","blur select":"updateValue","change textarea":"updateValue","blur textarea":"updateValue","change .js-validate-change":"validateValue","blur .js-validate-blur":"validateValue","keyup .js-update-keyup":"updateValue"},disabledChangeHandler:function(e){this.$el.toggleClass("disabled",e),this.$("input").attr("disabled",e)},readonlyChangeHandler:function(e){this.$el.toggleClass("readonly",e),this.$("input").attr("readonly",e)},validChangeHandler:function(e){this.$(i).toggleClass(o,!e)},activeChangeHandler:function(e){this.$el.toggle(e)},valueChangeHandler:function(e){this.$("input").val(e),this.model.updateActive()},errorCodeChangeHandler:function(t){var n=this.$(s);t===""?(n.empty(),this.model.set("valid",!0)):(this.model.set("valid",!1),n.html(e.getString(t)))},nameChangeHandler:function(e){this.$el.addClass("element-"+e)},valueFunction:function(){return this.$("input").val()},updateValue:function(e){this.model.set("value",this.valueFunction())},validateValue:function(){this.model.isElementValid()}}),l={eq:function(e,t){return e.isEqual("value",t.value)},valid:function(e){return e.isElementValid(!0),e.is("valid")},isIn:function(e,t){var n=e.get("value");return t.value.indexOf(n)!==-1},neq:function(e,t){return e.isNotEqual("value",t.value)},"function":function(e,t){var n=t.func;return n.apply(this,arguments)}};return{View:f,Model:u,Collection:a}}),define("text!widgets/messageStack/messageStack.html",[],function(){return'<ul class="alert-list ">\n\n</ul>\n<ul class="warning-list">\n\n</ul>\n\n<ul class="success-list">\n\n</ul>\n\n<ul class="failure-list">\n\n</ul>'}),define("widgets/messageStack",["base/app","base","list","text!./messageStack/messageStack.html"],function(e,t,n,r){var i=t.util,s=t.Model.extend({initialize:function(){var e=_.bind(this.removeMessage,this),t=new a;t.on("add",function(t){var n=t.get("expires");switch(n){case-1:t.removeSelf();break;case 0:break;default:_.delay(e,n*1e3,t)}}),this.messageCollection=t},addMessage:function(e){var t=this;e.ts=(new Date).getTime(),t.messageCollection.add(e)},removeMessage:function(e){this.messageCollection.remove(e)},removeAllMessages:function(){var e=this,t=e.messageCollection.pluck("ts");_.each(t,function(t){var n=e.messageCollection.get(t);n.removeSelf()})}}),o=t.Model.extend({defaults:{expires:10,isClosable:!1,messageType:"alert"},idAttribute:"ts"}),u=t.View.extend({tagName:"li",className:"alert",template:e.compileTemplate('{{#if isClosable}}<button type="button" class="close remove_message" >&times;</button>{{/if}}{{{message}}}'),events:{"click .remove_message":"removeMessage"},removeMessage:function(){this.model.removeSelf()},postRender:function(){var e=this.model.get("messageType"),t="alert-danger";switch(e){case"warning":t="alert-warning";break;case"success":t="alert-success"}this.$el.addClass(t)}}),a=t.Collection.extend({model:o}),f=t.View.extend({initialize:function(){this.viewIndex={},this.model||(this.model=new s);var e=this.model.messageCollection;this.listenTo(e,"add remove",this.checkEmpty),this.listenTo(e,"add",this.addMessage),this.listenTo(e,"remove",this.removeMessage)},template:r,checkEmpty:function(){var e=this.model.messageCollection;e.length===0?this.$el.addClass("hide"):this.$el.removeClass("hide")},addMessage:function(e){e.toJSON||(e=new o(e));var t=e.toJSON(),n=i.createView({View:u,parentEl:"."+t.messageType+"-list",parentView:this,model:e});this.viewIndex[e.id]=n},removeMessage:function(e){var t=this.viewIndex[e.id];this.viewIndex[e.id]=null,t.remove()}});return{View:f,Model:s,MessageCollection:a}}),define("widgets/calendar/month",["base"],function(e){var t=e.app.compileTemplate('<td><a href="#selectDate" data-date="{{date}}" data-month="{{month}}" data-year="{{year}}" class="day action {{#if isToday}}today{{/if}} {{#if isSelected}}selected{{/if}}{{#if isDisabled}}disabled{{/if}}">{{date}}</a> </td>'),n=e.View.extend({className:"month",template:'<a href="#prevMonth" class="action but-prev"> < </a><div class="month-name">{{monthName month}}-{{year}}</div> <a href="#nextMonth" class="action but-next"> > </a> ',postRender:function(){var e=$("<table></table>"),n=this.model.toJSON(),r=this.getDate().startOf("week"),i=0,s,o=!1,u=!1,a=!1,f=moment().startOf("day").valueOf(),l=n.selectedEpoch;while(i<42){var c=r.day();c===0&&(s=$("<tr></tr>"),e.append(s)),r.valueOf()===f?o=!0:o=!1,r.valueOf()===l?u=!0:u=!1,r.month()!==n.month?a=!0:a=!1,s.append(t({date:r.date(),month:r.month(),year:r.year(),isToday:o,isSelected:u,isDisabled:a})),r.add("days",1),i++}this.$el.append(e)},getDate:function(){var e=this.model.toJSON();return moment({y:e.year,M:e.month,d:1})},changeHandler:function(){this.render()},actionHandler:function(e,t){switch(e){case"prevMonth":var n=this.getDate();n.add("months",-1),this.model.set({month:n.month(),year:n.year()});break;case"nextMonth":var n=this.getDate();n.add("months",1),this.model.set({month:n.month(),year:n.year()});break;case"selectDate":var r=$(t.target),i=r.data(),n=moment({y:i.year,M:i.month,d:i.date});this.model.set("selectedEpoch",n.valueOf()),this.trigger("dateClicked",n);break;default:alert("unhandled action: "+e)}}}),r=e.Model.extend({defaults:{month:moment().month(),year:moment().year(),selectedEpoch:moment().startOf("day").valueOf()}});return{View:n,Model:r}}),define("widgets/calendar",["require","widgets/calendar/month"],function(e){return{Month:e("widgets/calendar/month")}}),define("text!widgets/form/checkListView.html",[],function(){return'<div class="form-group">\n    <label>{{elementLabel this}}</label>\n    <div class="controls">\n        {{#each options}}\n        <label class="checkbox-inline">\n            <input type="checkbox" name="{{id}}" value="{{id}}" class="js-validate-change"> {{name}}\n        </label>\n        {{/each}}\n        <span class="message-block"></span>\n    </div>\n</div>'}),define("text!widgets/form/checkBoxView.html",[],function(){return'<div class="form-group">\n    <div class="controls">\n        <label class="checkbox-inline">\n            <input type="checkbox" name="{{id}}" value="{{id}}" class="js-validate-change"> {{elementLabel this}}\n        </label>\n        <span class="message-block"></span>\n    </div>\n</div>'}),define("text!widgets/form/radioListView.html",[],function(){return'<div class="form-group">\n    <label>{{elementLabel this}}</label>\n    <div class="controls">\n        {{#each options}}\n        <label class="radio-inline">\n            <input type="radio" name="{{../name}}" value="{{id}}"  class="el-{{name}} js-validate-change" > {{name}}\n        </label>\n        {{/each}}\n        <span class="message-block"></span>\n    </div>\n</div>'}),define("text!widgets/form/selectView.html",[],function(){return'<div class="form-group ">\n    <label>{{elementLabel this}}</label>\n    <div class="controls kensho-select">\n        <select name="{{name}}" class="el-{{name}} form-control js-validate-change">\n            {{#each options}}\n            <option value="{{id}}">{{name}}</option>\n            {{/each}}\n        </select>\n        <span class="message-block"></span>\n    </div>\n</div>'}),define("text!widgets/form/textAreaView.html",[],function(){return'<div class="form-group">\n    <label>{{elementLabel this}}</label>\n    <div class="controls">\n        <textarea type="{{type}}" name="{{name}}" class="el-{{name}} form-control  js-update-change js-validate-change">{{value}}</textarea>\n        <span class="message-block"></span>\n    </div>\n</div>'}),define("text!widgets/form/buttonView.html",[],function(){return'<div class="form-group">\n    <div class="controls">\n        <button class="{{buttonClass this}}" type="{{buttonType this}}">{{value}}</button>\n        <span class="message-block"></span>\n    </div>\n</div>'}),define("text!widgets/form/dateInputView.html",[],function(){return'<div class="control-group">\n    <label class="control-label">\n        {{elementLabel this}}\n    </label>\n\n    <div class="controls type-{{type}}">\n        <input type="text" name="{{name}}" value="{{value}}" placeholder="{{placeholder}}" class="el-{{name}} dateInput">\n        <div class="monthView"></div>\n        <span class="help-inline"></span>\n    </div>\n</div>'}),define("text!widgets/form/messageView.html",[],function(){return'<div class="control-group">\n    <div class="message">{{value}}\n    </div>\n</div>'}),define("widgets/form",["base/app","base/util","base","widgets/form/element","widgets/messageStack","widgets/calendar","text!./form/checkListView.html","text!./form/checkBoxView.html","text!./form/radioListView.html","text!./form/selectView.html","text!./form/textAreaView.html","text!./form/buttonView.html","text!./form/dateInputView.html","text!./form/messageView.html"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p){var d=r.View,v=r.Model,m=r.Collection,g=d.extend({template:c,valueFunction:function(){return this.$("button").text()},valueChangeHandler:function(e){this.$("button").text(e)},activeChangeHandler:function(e){this.$("button").prop("disabled",!e)}}),y=d.extend({events:{"change input":"updateValue","blur input":"resetIfEmpty","focus input":"selectIfDefault","click input":"clearIfDefault"},selectIfDefault:function(){this.model.isElementDefault()&&this.$("input").select()},clearIfDefault:function(){this.model.isElementDefault()&&this.$("input").val("")},resetIfEmpty:function(){var e=this.$("input").val();if(e===""){var t=this.model.toJSON();t.defaultValue&&this.$("input").val(t.defaultValue)}this.updateValue()}}),b=y.extend({template:h,events:{"click .dateInput":"showDatePicker","change .dateInput":"dateChangeHandler"},postRender:function(){var t=this;t.hideDatePicker();var n=this.getSubView("monthView");this.listenTo(n,"dateClicked",function(e){t.hideDatePicker(),t.$(".dateInput").val(e.format("L")),t.updateValue()});var r=n.$el;this.listenTo(e,"bodyClick",function(e){var n=$(e.target);n.parents().index(t.$el)==-1&&r.is(":visible")&&r.hide()})},views:{monthView:{View:s.Month.View,Model:s.Month.Model,parentEl:".monthView"}},showDatePicker:function(){var e=this.getSubView("monthView"),t=this.model.get("value"),n=moment(t,"MM/DD/YYYY");e.model.set({year:n.year(),month:n.month(),selectedEpoch:n.valueOf()}),e.show()},hideDatePicker:function(){var e=this.getSubView("monthView");e.hide()},valueFunction:function(){return this.$(".dateInput").val()},valueChangeHandler:function(e){var t=moment(e,"MM/DD/YYYY");t.isValid()||(t=moment(),this.model.set("value",t.format("L"))),this.$(".dateInput").val(t.format("L"))},dateChangeHandler:function(){var e=this.$(".dateInput").val(),t=moment(e,"MM/DD/YYYY");t.isValid()?(this.model.set("value",e),this.hideDatePicker()):this.valueChangeHandler(this.model.get("value"))}}),w=d.extend({template:u,valueFunction:function(){return this.$("input").is(":checked")},valueChangeHandler:function(e){this.$("input").attr("checked",e)}}),E=d.extend({template:l,valueFunction:function(){return this.$("textarea").val()},valueChangeHandler:function(e){this.$("textarea").val(e)}}),S=d.extend({template:f,valueFunction:function(){return this.$("select").val()},valueChangeHandler:function(e){this.$("select").val(e)},disabledChangeHandler:function(e){this.$el.toggleClass("disabled",e),this.$("select").attr("disabled",e)}}),x=d.extend({template:a,valueFunction:function(){return this.$("input:checked").val()},valueChangeHandler:function(e){this.$("input[value="+e+"]").attr("checked",!0)}}),T=d.extend({template:o,valueFunction:function(){var e=this.$("input:checked"),t=_.map(e,function(e){return $(e).val()});return t},valueChangeHandler:function(e){_.isArray(e)&&_.each(e,function(e){this.$("input[value="+e+"]").attr("checked",!0)},this)}}),N=d.extend({template:'<input type="hidden" value="{{value}}" name="{{name}}" />',valueChangeHandler:function(e){this.$("input").val(e),this.$("input").trigger("change")},valueFunction:function(){return""+this.$("input").val()}}),C=d.extend({template:" ",valueChangeHandler:function(e){},valueFunction:function(){}}),y=d.extend({selectIfDefault:function(){this.model.isElementDefault()&&this.$("input").select()},clearIfDefault:function(){this.model.isElementDefault()&&this.$("input").val("")},resetIfEmpty:function(){var e=this.$("input").val();if(e===""){var t=this.model.toJSON();t.defaultValue&&this.$("input").val(t.defaultValue)}this.updateValue()}}),k=d.extend({template:p,valueChangeHandler:function(e){this.$(".message").html(e)},valueFunction:function(){return this.$(".message").html()}}),L=d.extend({template:'<input type="hidden" value="{{value}}" name="{{name}}" />',valueChangeHandler:function(e){this.$("input").val(JSON.stringify(e)),this.updateValue()},valueFunction:function(){return JSON.parse(this.$("input").val())}}),A=d.extend({valueFunction:function(){return this.$("input").is(":checked")},valueChangeHandler:function(e){this.$("input").attr("checked",e)}}),O={select:S,textarea:E,checkbox:w,dateInput:b,radioList:x,checkList:T,hidden:N,json:L,button:g,message:k,container:C},M=function(e){return O[e]||y},D=function(e,t){O[e]=t},P=function(e){O=_.extend({},O,e)},H=n.Model.extend({constructor:function(){n.Model.apply(this,arguments)},defaults:{elements:new m},setElementAttribute:function(e,t,n){var r=this.get("elements");r.get(e).set(t,n)},getValueObject:function(){var e=this.get("elements");e.each(function(e){e.trigger("forceUpdate")});var t=this.validateElements(),n={};return t.length===0?e.each(function(e){e.is("active")&&e.isNotEqual("type","button")&&(n[e.id]=e.get("value"))}):n.errors=t,n},validateElements:function(){var e=this.get("elements"),t=[];return e.each(function(e){t=t.concat(e.isElementValid())}),t},elementsChangeHandler:function(){var e=this.get("elements");e.on("change",function(e){var t="change",n=Array.prototype.slice.call(arguments,[0]);n[0]="elements:"+t,this.trigger.apply(this,n),n[0]="elements:"+e.get("name")+":"+t,this.trigger.apply(this,n)},this)}}),B="grp-",j=n.View.extend({constructor:function(e){this.typeViewIndex={},n.View.apply(this,arguments)},tagName:"div",className:"form-view",events:{"submit form":"formSubmitHandler"},template:'<div class="message-stack"></div><form action="{{actionId}}" class="form-vertical" method=""> <div class="group-list"></div> <div class="grp-buttons"> </div> </form>',postRender:function(){this.formEl=this.$("form"),this.renderGroupContainers(),this.renderMessageStack();var e=this.model,t=e.get("elements");t.each(function(e){this.addElement(e)},this)},addElement:function(e){var n=e.toJSON(),r=this,i=this.typeViewIndex[n.type]||M(n.type),s=n.name,o,u=this.$(".element-"+s);if(u.length!==0)o=new i({model:e,el:u}),o.trigger("rendered"),o.postRender();else{o=t.createView({View:i,model:e,parentView:r});var a=n.group;this.$("."+B+a).append(o.el)}},removeElement:function(e){},renderGroupContainers:function(){var e=this.model,t=e.get("elements"),n=_.unique(t.pluck("group")),r=this.$(".group-list");_.each(n,function(e){this.$("."+B+e).length===0&&r.append('<div class="'+B+e+'"></div>')},this)},renderMessageStack:function(){var e=t.createView({View:i.View,Model:i.Model,parentEl:".message-stack",parentView:this}),n=e.model;e.listenTo(this,"showMessages",function(e){n.removeAllMessages(),_.each(e,function(e){var t=new i.Model(e);n.addMessage(t.toJSON())})}),e.listenTo(this,"clearMessages",function(){n.removeAllMessages()});var r=this.model.get("errors");r&&r.length>0&&this.trigger("showMessages",r)},formSubmitHandler:function(e){e.preventDefault(),this.trigger("clearMessages");var t=this.model.getValueObject(),n=this.model.get("actionId");this.options.prePostParser&&(t=this.options.prePostParser(t)),this.trigger("formSubmit",t)},addToTypeViewIndex:function(e,t){this.typeViewIndex[e]=t},submitSuccessHandler:function(){console.log(arguments)},submitFailureHandler:function(e,t){_.each(t,function(e){e.messageType="failure",e.expires=0}),this.trigger("showMessages",t)},setElementValue:function(e,t){var n=this.model.get("elements");n.get(e).set("value",t)},resetForm:function(e){var t=this.model.get("elements");t.each(function(e){e.resetValue(!0)}),e&&this.trigger("clearMessages")}});return j.addToTypeViewIndex=function(e,t){D(e,t)},{Model:H,View:j,ElementModel:v,ElementCollection:m,ElementView:d}}),define("widgets/tab",["base/app","base","list/singleSelect"],function(e,t,n){var r=t.util,i=t.View.extend({tagName:"li",template:'<a href="#{{id}}" class="action">{{name}}</a>',changeHandler:function(){this.$el.toggleClass("active",this.model.is("selected"))}}),s=t.View.extend({changeHandler:function(){this.$el.toggle(this.model.is("selected"))}}),o=n.View.extend({template:'<div class="prop-tabs"><ul class="ib-list"></ul></div><div class="tab-panes"></div> ',postRender:function(){var e=this,n=this.model.get("items");r.createView({View:t.CollectionView,collection:n,el:e.$(".ib-list"),ItemView:i,parentView:e}),r.createView({View:t.CollectionView,tagName:"div",collection:n,el:e.$(".tab-panes"),ItemView:s,parentView:e})},actionHandler:function(e){this.model.setSelectedById(e)}});return{View:o,Model:n.Model}}),define("widgets/table/rowCollection",["base/app","base/util","base/model","base/collection"],function(e,t,n,r){var i=r.extend({constructor:function(){var e=this;r.apply(e,arguments),_.each(a,function(t){t(e)})},configDefaults:{sortOrder:"asc",perPage:5},configHandler:function(e){(_.has(e,"sortKey")||_.has(e,"sortOrder"))&&this.setConfig("page",1)},isLocal:function(){var e=this.getConfig("requestId"),t=this.url;return e&&t?!1:!0}}),s=function(e){e.setSortKey=function(t){var n=e.getConfigs(),r="asc";t===n.sortKey?(r=n.sortOrder==="asc"?"desc":"asc",e.setConfigs({sortOrder:r})):e.setConfigs({sortKey:t,sortOrder:r})},e.getSorted=function(){var t=e.getConfigs(),n=e.sortBy(t.sortKey);return t.sortOrder!=="asc"&&n.reverse(),n}},o=function(t){var n={};t.addFilter=function(t){var r=e.getHash(JSON.stringify(t));n[r]=t},t.removeFilter=function(t){var r=e.getHash(t),i=n[r];if(!i)throw new Error("Filter missing");delete n[r]},t.getFiltered=function(e){var t=_.values(n);return t.length===0?e:_.filter(e,function(e){return e.checkFilters(t)})},t.getProcessedRecords=function(){var e=t.getConfigs(),n;if(e.requestId||t.url)n=t.toArray();else{var r=t.getFiltered(t.getSorted(t));t.setConfig("totalRecords",r.length),n=t.getPaginated(r)}return n},t.processedEach=function(e,n){var r=t.getProcessedRecords();_.each(r,function(r,i){e.call(n||t,r,i)})}},u=function(e){var t=e.getConfigs();e.getPaginated=function(n){return t=e.getConfigs(),t.paginated?n.splice((t.page-1)*t.perPage,t.perPage):n},e.nextPage=function(){var t=e.getConfigs(),n=Math.ceil(t.totalRecords/t.perPage),r=e.getConfig("page");e.setConfig("page",Math.min(r+1,n))},e.prevPage=function(){var t=e.getConfig("page");e.setConfig("page",Math.max(1,t-1))}},a=[o,s,u];return i}),define("text!widgets/table/pagination.html",[],function(){return'<div class="paginator">\n    <div class="summary">\n        {{start}} to {{end}} of {{totalRecords}}\n    </div>\n    {{#if totalRecords}}\n    <div class="buttons">\n        <ul>\n            <li>{{page}}</li>\n            <li><a href="#prevPage" class="action"> < </a> </li>\n            <li><a href="#nextPage" class="action"> > </a> </li>\n        </ul>\n    </div>\n    {{/if}}\n</div>'}),define("widgets/table/pagination",["base/app","base/view","base/model","base/util","text!./pagination.html","widgets/table/rowCollection"],function(e,t,n,r,i,s){var o=t.extend({constructor:function(){t.apply(this,arguments);var e=this.getOption("rowCollection");this.listenTo(e,"configChange",this.render)},template:i,renderTemplate:function(e){var t=this.getOption("rowCollection"),n=t.getProcessedRecords(),r=t.getConfigs();r.start=n.length!==0?(r.page-1)*r.perPage+1:0,r.end=Math.min(r.page*r.perPage,r.totalRecords),this.$el.html(e(r))},actionHandler:function(e){var t=this.getOption("rowCollection");switch(e){case"nextPage":t.nextPage();break;case"prevPage":t.prevPage()}}});return{View:o}}),define("widgets/table",["base/app","base/view","base/model","base/collection","base/util","widgets/table/rowCollection","widgets/table/pagination"],function(e,t,n,r,i,s,o){var u=n.extend({}),a=t.extend({constructor:function(){var e=this;t.apply(e,arguments);var n=e.getOption("rowModel");if(!n)return;var r=e.model.get("key");e.listenTo(n,"change:"+r,function(t,n){e.model.set("value",n)})},tagName:"td",template:'<div class="cell-value" style="text-align: {{align}};">{{#if renderHTML}}{{{value}}}{{else}}{{value}}{{/if}}</div>',attributes:function(){var e=this.model.toJSON();return{"class":e.classNames,style:"width:"+e.width,"data-key":e.key}},valueChangeHandler:function(){this.render()},valueFunction:function(){return this.model.get("value")}}),f=a.extend({tagName:"th",template:'<div class="cell-value" style="text-align: {{align}};">{{#if renderHTML}}{{{label}}}{{else}}{{label}}{{/if}}</div>'}),l=f.extend({constructor:function(){var e=this;t.apply(e,arguments);var n=e.getOption("rowCollection"),r=e.model.get("key"),i=function(){var t=n.getProcessedRecords(),i=_.filter(t,function(e){return e.get(r)===!0});t.length===0?(e.model.set("value",!1),e.model.set("disabled",!0)):(i.length===t.length?e.model.set("value",!0):e.model.set("value",!1),e.model.set("disabled",!1))};e.listenTo(n,"change:"+r,i),i()},template:'<label class="cell-value" style="text-align: {{align}}; display:block;"> <input type="checkbox" /></label>',events:{"change input":"updateRowCollection"},updateRowCollection:function(){var e=this.model.get("key"),t=this.getOption("rowCollection"),n=t.getProcessedRecords(),r=this.valueFunction();_.each(n,function(t){t.set(e,r)})},valueFunction:function(){return this.$("input").is(":checked")},valueChangeHandler:function(e){this.$("input").prop("checked",e)},disabledChangeHandler:function(e){this.$("input").prop("disabled",e)}}),c=a.extend({template:'<label class="cell-value" style="text-align: {{align}}; display:block;"> <input type="checkbox" /></label>',events:{"change input":"updateRowModel"},updateRowModel:function(){var e=this.getOption("rowModel"),t=this.model.get("key");e.set(t,this.valueFunction())},valueFunction:function(){return this.$("input").is(":checked")},valueChangeHandler:function(e){this.$("input").prop("checked",e)},disabledChangeHandler:function(e){console.log(e,this.$("input")),this.$("input").prop("disabled",e)}}),h={checkbox:c},p={checkbox:l},d=t.extend({tagName:"tr",className:"table-row",postRender:function(){var e=this,t=this.model.toJSON(!0),r=t.items,s=this.getOption("rowModel");_.each(r,function(t){var r=h[t.type]||a,o=i.createView({View:r,Model:n,modelAttributes:t,rowModel:s,parentView:e});o.$el.appendTo(e.$el)})},useDeepJSON:!0}),v=d.extend({className:"table-heading",postRender:function(){var e=this,t=this.model.toJSON(!0),r=t.items,s=this.getOption("rowCollection");_.each(r,function(t){var r=p[t.type]||f,o=i.createView({View:r,Model:n,modelAttributes:t,rowCollection:s,parentView:e});o.$el.appendTo(e.$el)})}}),m=t.extend({tagName:"tr",className:"table-row no-data-row",template:'<td colspan="{{colspan}}">{{{value}}}</td>'}),g=function(){var t=this,s={},o=this.$el,u=this.getOption("rowCollection"),a=this.getOption("columns");t.addItem=function(o,f,l){var c=u.getConfig("sortOrder"),h=u.getConfig("sortKey"),p=_.map(a,function(t){var n=["cell"];h===t.key&&(n.push("sorted"),n.push("order-"+c)),f%2===0&&n.push("even");var r=o.toJSON();return{key:t.key,type:t.type||"value",classNames:n.join(" "),value:e.getFormatted(r[t.key],t.formatter,r),align:t.align||"left",width:t.width!==undefined?t.width+"px":"auto",renderHTML:t.renderHTML}}),v=new n({items:new r(p)}),m=i.createView({model:v,View:d,parentView:t,rowModel:o});s[m.cid]=m,m.$el.appendTo(l)},t.addHeaderItem=function(o){var f=u.getConfig("sortOrder"),l=u.getConfig("sortKey"),c=_.map(a,function(t){var n=["header-cell"];return t.sortable!==!1&&n.push("sortable"),l===t.key&&(n.push("sorted"),n.push("order-"+f)),{key:t.key,type:t.type||"value",classNames:n.join(" "),label:t.label||e.beautifyId(t.key),align:t.align||"left",width:t.width?t.width+"px":"auto"}}),h=new n({items:new r(c)}),p=i.createView({View:v,model:h,parentEl:o,parentView:t,rowCollection:u});s[p.cid]=p},t.renderNoData=function(){var e=i.createView({View:m,parentEl:".row-list",parentView:t,model:new n({colspan:a.length,value:t.getOption("noDataTemplate")||"No Records"})});s[e.cid]=e},t.removeItem=function(e){var n=t.getModelViewAt(e.id);n.remove()},t.removeAllRows=function(){_.each(s,function(e){e.remove()})},t.getModelViewAt=function(e){return s[e]},t.removeReferences(function(){t=null,s=null,o=null,u=null})},y=t.extend({template:'<div class="table-header"></div> <table class="row-list"></table><div class="table-footer"></div>',className:"data-table",events:{"click th.sortable":"toggleSort"},constructor:function(e){var n=this;t.call(n,e),_.each([g],function(t){t.call(n,e)});var r=this.getOption("rowCollection");n.listenTo(r,"configChange",n.loadRows)},redrawTable:function(){this.removeAllRows(),this.renderHeader(),this.renderRows()},postRender:function(){this.loadRows()},loadRows:function(){var e=this,t="loadComplete";e.stopListening(e,t),e.listenToOnce(e,t,e.redrawTable);var n=this.getOption("rowCollection"),r=n.getConfigs();if(r.requestId){var i=e.addRequest({id:r.requestId,params:r});i.done(function(r){n.reset(r.results),n.setConfig("totalRecords",r.totalRecords),e.trigger(t,t)})}else if(n.url){var s=n.fetch({processData:!0,reset:!0});s.done(function(){e.trigger(t)})}else e.trigger(t)},renderRows:function(){var e=this,t=e.getOption("rowCollection"),n=t.getProcessedRecords(),r=this.$(".row-list");n.length===0?e.renderNoData():_.each(n,function(t,n){e.addItem(t,n,r)})},renderHeader:function(){var e=this,t=this.$(".row-list");e.addHeaderItem(t)},loadingHandler:function(e){t.prototype.loadingHandler.call(this,e)},toggleSort:function(e){if(this.$(".no-data-row").length>0){e.preventDefault();return}var t=$(e.currentTarget),n=t.data("key");this.getOption("rowCollection").setSortKey(n)}});return{View:y,RowCollection:s,Model:u}}),define("text!widgets/dropdown/dropdown.html",[],function(){return'<style>\n	\n	.toggle-body {\n		display: none;\n		position: absolute;\n		background-color: #fff;\n	}\n	.open .toggle-body{\n		display: block;\n	}\n\n	.list-view {\n		border:1px solid #ccc;\n		border-radius: 3px;\n	}\n\n	.list-view {\n		display: inline-block;\n	}\n\n	.list-view a {\n		display: block;\n		padding: 5px;\n	}\n\n	.toggle-but {\n		padding: 5px;\n		border-radius: 3px;\n		border:1px solid #ccc;\n		display: inline-block;\n		padding-right: 30px;\n		position: relative;\n	}\n\n	.down-arrow {\n		font-style: normal;\n		position: absolute;\n		font-size:10px;\n		right: 2px;\n		top: 2px;\n		display: block;\n		padding: 5px;\n	}\n</style>\n<div class="toggle-but"> <div class="summary-view"> </div> <em class="down-arrow">▼</em></div>\n<div class="toggle-body">\n	<div class="list-view"></div>\n</div>'}),define("widgets/dropdown",["base/app","base","list/singleSelect","text!./dropdown/dropdown.html"],function(e,t,n,r){var i=t.View.extend({template:"",selectedItemChangeHandler:function(e){this.$el.html(e.get("name"))}}),s=n.View.extend({template:r,events:{"click .toggle-but":"toggleState","click .toggle-body":"hideBody"},states:{closed:function(){this.$el.removeClass("open")},open:function(){this.$el.addClass("open")}},toggleState:function(){this.setState(this.getState()==="closed"?"open":"closed")},views:{listView:n.View.prototype.views.listView,summaryView:function(){return{View:i,model:this.model,parentEl:".summary-view"}}},selectedItemChangeHandler:function(){this.hideBody()},hideBody:function(){this.setState("closed")},className:"drop-down"});return{SingleSelectView:s,SingleSelectModel:n.Model}}),define("widgets/chart",["base/app","base"],function(e,t){var n=.1,r=["#ffc42b","#0fafe8","#66bb10","#89A54E","#80699B","#3D96AE","#DB843D","#92A8CD","#A47D7C","#B5CA92"],i=[.8,.8],s=[{linearGradient:[0,0,0,300],stops:[[0,"#ffcc48"],[1,"#fff6cd"]]},{linearGradient:[0,0,0,300],stops:[[0,"#0db2e8"],[1,"#e1f7ff"]]}],o=t.View.extend({template:'<h1>{{title}}</h1><div class="chart-body"> </div>',serialize:function(){return this.collection.getConfigs()},postRender:function(){this.renderChart()},renderChart:function(){var e=this.collection,t=e.getConfigs(),i=e.getSeries(),s=e.getCategories(),o=Math.ceil(s.length/t.maxXticks);this.$(".chart-body").highcharts({chart:{type:t.type},colors:t.chartColors||r,symbols:["circle","circle","circle","circle","circle"],title:{text:""},credits:{enabled:!1},series:i,legend:{enabled:t.showLegend,margin:30,verticalAlign:"top",borderWidth:0,useHTML:!0,symbolWidth:0,labelFormatter:function(){return"<div class='checkboxwidget'> <div class='checkboxColor boxchecked jqSymbol"+this.index+"'><span style='background-color:"+this.color+";'></span><label style='color:"+this.color+"'>"+this.name+"</label></div></div>"}},xAxis:{startOnTick:!0,endOnTick:!0,tickmarkPlacement:"on",tickLength:0,title:{text:t.xAxis},minPadding:0,maxPadding:0,labels:{step:o,style:{"font-size":"11px","font-family":"Arial"}},categories:s},yAxis:{lineWidth:1,allowDecimals:!1,min:0,title:{text:t.yAxis,style:{"font-size":"12px","font-family":"Arial"}},minPadding:0,gridLineWidth:n,labels:{enabled:!0},stackLabels:{enabled:!0,style:{fontWeight:"bold",color:Highcharts.theme&&Highcharts.theme.textColor||"gray"}}},tooltip:{enabled:!0,formatter:function(){var e="";return this.x?e="<b>"+this.series.name+"</b><br/>"+this.x+" : "+this.y:e="<b>"+this.key+"</b> : "+this.y+" ( "+this.percentage.toFixed(2)+"% )",e}},plotOptions:{bar:{pointWidth:35,dataLabels:{enabled:!0}},column:{stacking:"normal",pointWidth:t.pointWidth,dataLabels:{enabled:!0}},pie:{allowPointSelect:!0,cursor:"pointer",shadow:!0,innerSize:"40%",dataLabels:{enabled:!0,color:"#000000",connectorColor:"#000000",formatter:function(){return"<b>"+this.point.name+"</b>: "+this.percentage.toFixed(2)+" %"}},states:{hover:{enabled:!1}}},area:{stacking:t.isStacked?"normal":null},series:{stacking:t.isStacked?"normal":null,lineWidth:2,shadow:!1,marker:{enabled:!1,fillColor:"#FFFFFF",lineWidth:1.5,lineColor:null,radius:3,states:{hover:{enabled:!0}}},events:{legendItemClick:function(e){}}},line:{marker:{enabled:!1,states:{hover:{enabled:!0}}},events:{legendItemClick:function(e){}}}},scrollbar:{enabled:!0},exporting:{enabled:!1}})}}),u=t.Collection.extend({configDefaults:{type:"line",yAxis:"count",xAxis:"category",showLegend:!1,title:"Chart Title",pointWidth:20,isStacked:!1,maxXticks:8,step:1},getCategories:function(){var e=this.getConfig("xAxis"),t=this;return t.map(function(t){return t.get(e)})},getSeries:function(){var e=this.getConfig("yAxis").split(","),t=this;return _.map(e,function(e,n){return{name:e,data:t.map(function(t){return t.get(e)}),fillColor:s[n],fillOpacity:i[n]}})}});return{View:o,Collection:u}}),define("widgets",["require","widgets/form","widgets/calendar","widgets/header","widgets/messageStack","widgets/tab","widgets/table","widgets/dropdown","widgets/chart"],function(e){return{Form:e("widgets/form"),Calender:e("widgets/calendar"),Header:e("widgets/header"),MessageStack:e("widgets/messageStack"),Tab:e("widgets/tab"),Table:e("widgets/table"),DropDown:e("widgets/dropdown"),Chart:e("widgets/chart")}});