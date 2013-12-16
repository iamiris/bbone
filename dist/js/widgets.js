define("widgets/form/validator",["base/app"],function(e){var t=function(e,t){var r=[],i,s=_.every(t,function(t){var s=n[t.expr].call(this,t,e);return s||(r.push(t),i=t),s});return{isValid:s,errors:r,errorRule:i}},n={req:function(e,t){return!_.isEmpty(t)},digits:function(e,t){return/^\d{5}$/.test(t)},alphanumeric:function(e,t){var n=/^\w+$/;return n.test(t)},number:function(e,t){if(t===undefined)return!0;var n=+t;return n===n},email:function(e,t){var n=/^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-\\+]+)*@[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-\+]+)*(\.[A-Za-z]{2,})$/i;return n.test($.trim(t))},minlen:function(e,t){var n=e.length;return $.trim(String(t)).length>=n},maxlen:function(e,t,n){var r=e.length;return $.trim(String(t)).length<=r},lt:function(e,t,n){var r=parseFloat(n),i=parseFloat(t);return i<r},gt:function(e,t,n){var r=parseFloat(n),i=parseFloat(t);return i>r},eq:function(e,t,n){return n===t},neq:function(e,t){return e.value!==t},url:function(e,t){if(t==="")return!0;var n=/(http|https|market):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i;return n.test($.trim(t))},emaillist:function(e,t){var n=t.split(","),r=/^([\w\-]+(?:\.[\w\-]+)*)@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;for(var i=0;i<n.length;i++)if($.trim(n[i])!==""&&!r.test($.trim(n[i])))return!1;return!0},"function":function(e,t){var n=e.func;return n.call(null,t)}};return{validateValue:t,validationRuleMethods:n}}),define("text!widgets/form/inputView.html",[],function(){return'<div class="form-group">\n    <label>{{elementLabel this}}</label>\n    <div class="controls">\n        <input type="{{type}}" placeholder="{{placeholder}}"  name="{{name}}"  value="{{value}}" class="el-{{name}} form-control js-validate-change">\n        <span class="message-block"></span>\n    </div>\n</div>'}),define("widgets/form/element",["base/app","base","widgets/form/validator","text!./inputView.html"],function(e,t,n,r){var i=".form-group",s=".message-block",o="has-error",u=t.Model.extend({constructor:function(){t.Model.apply(this,arguments);var e=this,n=e.get("defaultValue");n===undefined&&e.set("defaultValue",e.get("value"));var r=e.collection,i=e.get("activeRules");_.each(i,function(t){var n=r.get(t.element);n.on("change:value",function(t,n){e.updateActive()}),e.updateActive()})},defaults:{valid:!0,active:!0,disabled:!1,readonly:!1,value:null,label:null,activeRules:[],validationRules:[],type:"text",errorCode:"",group:"elements"},idAttribute:"name",updateActive:function(){var e=this.get("activeRules"),t=_.every(e,function(e){var t=this.collection.get(e.element);return l[e.expr].call(this,t,e)},this);this.set("active",t)},isElementValid:function(e){var t=this.get("validationRules"),r=[];if(this.isNot("active"))return[];var i,s=_.every(t,function(e){var t=n.validationRuleMethods[e.expr].call(this,e,this.get("value"));return t||(r.push(e),i=e),t},this);this.set("valid",s);if(!e)if(i){var o=i.message||"error."+this.get("name")+"."+i.expr;this.set("errorCode",o)}else this.set("errorCode","");return r},getSiblingValue:function(e){if(this.collection)return this.collection.get(e).get("value")},getSiblingAttribute:function(e,t){if(this.collection)return this.collection.get(e).get(t)},setSiblingAttribute:function(e,t,n){if(this.collection)return this.collection.get(e).set(t,n)},setSiblingValue:function(e,t){if(this.collection)return this.collection.get(e).set("value",t)},isElementDefault:function(){var e=this.toJSON();return e.value===e.defaultValue},resetValue:function(e){var t=this;t.set("value",t.get("defaultValue")),this.updateActive(),e&&t.set("errorCode","")}}),a=t.Collection.extend({model:u}),f=t.View.extend({tagName:"div",className:"element",template:r,dataEvents:{forceRender:"render",forceUpdate:"updateValue"},events:{"change input":"updateValue","blur input":"updateValue","change select":"updateValue","blur select":"updateValue","change textarea":"updateValue","blur textarea":"updateValue","change .js-validate-change":"validateValue","blur .js-validate-blur":"validateValue","keyup .js-update-keyup":"updateValue"},postRender:function(){this.syncAttributes()},syncAttributes:function(){var e=this.model,t=e.toJSON();_.each(t,function(t,n){var r=this[n+"ChangeHandler"];r&&typeof r=="function"&&r.call(this,e.get(n))},this),this.updateValue(!0)},disabledChangeHandler:function(e){this.$el.toggleClass("disabled",e),this.$("input").attr("disabled",e)},readonlyChangeHandler:function(e){this.$el.toggleClass("readonly",e),this.$("input").attr("readonly",e)},validChangeHandler:function(e){this.$(i).toggleClass(o,!e)},activeChangeHandler:function(e){this.$el.toggle(e)},valueChangeHandler:function(e){this.$("input").val(e),this.model.updateActive()},errorCodeChangeHandler:function(t){var n=this.$(s);t===""?(n.empty(),this.model.set("valid",!0)):(this.model.set("valid",!1),n.html(e.getString(t)))},nameChangeHandler:function(e){this.$el.addClass("element-"+e)},valueFunction:function(){return this.$("input").val()},updateValue:function(e){this.model.set("value",this.valueFunction())},validateValue:function(){this.model.isElementValid()}}),l={eq:function(e,t){return e.isEqual("value",t.value)},valid:function(e){return e.isElementValid(!0),e.is("valid")},isIn:function(e,t){var n=e.get("value");return t.value.indexOf(n)!==-1},neq:function(e,t){return e.isNotEqual("value",t.value)},"function":function(e,t){var n=t.func;return n.apply(this,arguments)}};return{View:f,Model:u,Collection:a}}),define("text!widgets/messageStack/messageStack.html",[],function(){return'<ul class="alert-list ">\n\n</ul>\n<ul class="warning-list">\n\n</ul>\n\n<ul class="success-list">\n\n</ul>\n\n<ul class="failure-list">\n\n</ul>'}),define("widgets/messageStack",["base/app","base","list","text!./messageStack/messageStack.html"],function(e,t,n,r){var i=t.util,s=t.Model.extend({initialize:function(){var e=this,t=_.bind(this.removeMessage,this),n=new a;n.on("add",function(e){var n=e.get("expires");switch(n){case-1:e.removeSelf();break;case 0:break;default:_.delay(t,n*1e3,e)}}),this.messageCollection=n},addMessage:function(e){var t=this;e.ts=(new Date).getTime(),t.messageCollection.add(e)},removeMessage:function(e){this.messageCollection.remove(e)},removeAllMessages:function(){var e=this,t=e.messageCollection.pluck("ts");_.each(t,function(t){var n=e.messageCollection.get(t);n.removeSelf()})}}),o=t.Model.extend({defaults:{expires:10,isClosable:!1,messageType:"alert"},idAttribute:"ts"}),u=t.View.extend({tagName:"li",className:"alert",template:Handlebars.compile('{{#if isClosable}}<button type="button" class="close remove_message" >&times;</button>{{/if}}{{{message}}}'),events:{"click .remove_message":"removeMessage"},removeMessage:function(){this.model.removeSelf()},postRender:function(){var e=this.model.get("messageType"),t="alert-danger";switch(e){case"warning":t="alert-warning";break;case"success":t="alert-success"}this.$el.addClass(t)}}),a=t.Collection.extend({model:o}),f=t.View.extend({initialize:function(){this.viewIndex={};var e=this.model.messageCollection;this.listenTo(e,"add remove",this.checkEmpty),this.listenTo(e,"add",this.addMessage),this.listenTo(e,"remove",this.removeMessage)},template:r,checkEmpty:function(){var e=this.model.messageCollection;e.length===0?this.$el.addClass("hide"):this.$el.removeClass("hide")},addMessage:function(e){var t=e.toJSON(),n=this.$("."+t.messageType+"-list"),r=i.createView({View:u,parentEl:"."+t.messageType+"-list",parentView:this,model:e});this.viewIndex[e.id]=r},removeMessage:function(e){var t=this.viewIndex[e.id];this.viewIndex[e.id]=null,t.remove()},postRender:function(){var e=this.model.messageCollection}});return{View:f,Model:s,MessageCollection:a}}),define("text!widgets/form/checkListView.html",[],function(){return'<div class="form-group">\n    <label>{{elementLabel this}}</label>\n    <div class="controls">\n        {{#each options}}\n        <label class="checkbox-inline">\n            <input type="checkbox" name="{{id}}" value="{{id}}" class="js-validate-change"> {{name}}\n        </label>\n        {{/each}}\n        <span class="message-block"></span>\n    </div>\n</div>'}),define("text!widgets/form/checkBoxView.html",[],function(){return'<div class="form-group">\n    <div class="controls">\n        <label class="checkbox-inline">\n            <input type="checkbox" name="{{id}}" value="{{id}}" class="js-validate-change"> {{elementLabel this}}\n        </label>\n        <span class="message-block"></span>\n    </div>\n</div>'}),define("text!widgets/form/radioListView.html",[],function(){return'<div class="form-group">\n    <label>{{elementLabel this}}</label>\n    <div class="controls">\n        {{#each options}}\n        <label class="radio-inline">\n            <input type="radio" name="{{../name}}" value="{{id}}"  class="el-{{name}} js-validate-change" > {{name}}\n        </label>\n        {{/each}}\n        <span class="message-block"></span>\n    </div>\n</div>'}),define("text!widgets/form/selectView.html",[],function(){return'<div class="form-group ">\n    <label>{{elementLabel this}}</label>\n    <div class="controls kensho-select">\n        <select name="{{name}}" class="el-{{name}} form-control js-validate-change">\n            {{#each options}}\n            <option value="{{id}}">{{name}}</option>\n            {{/each}}\n        </select>\n        <span class="message-block"></span>\n    </div>\n</div>'}),define("text!widgets/form/textAreaView.html",[],function(){return'<div class="form-group">\n    <label>{{elementLabel this}}</label>\n    <div class="controls">\n        <textarea type="{{type}}" name="{{name}}" class="el-{{name}} form-control  js-update-change js-validate-change">{{value}}</textarea>\n        <span class="message-block"></span>\n    </div>\n</div>'}),define("text!widgets/form/buttonView.html",[],function(){return'<div class="form-group">\n    <div class="controls">\n        <button class="{{buttonClass this}}" type="{{buttonType this}}">{{value}}</button>\n        <span class="message-block"></span>\n    </div>\n</div>'}),define("text!widgets/form/messageView.html",[],function(){return'<div class="control-group">\n    <div class="message">{{value}}\n    </div>\n</div>'}),define("widgets/form",["base/app","base/util","base","widgets/form/element","widgets/messageStack","text!./form/checkListView.html","text!./form/checkBoxView.html","text!./form/radioListView.html","text!./form/selectView.html","text!./form/textAreaView.html","text!./form/buttonView.html","text!./form/messageView.html"],function(e,t,n,r,i,s,o,u,a,f,l,c){var h=r.View,p=r.Model,d=r.Collection,v=h.extend({template:l,valueFunction:function(){return this.$("button").text()},valueChangeHandler:function(e){this.$("button").text(e)},activeChangeHandler:function(e){this.$("button").prop("disabled",!e)}}),m=h.extend({template:o,valueFunction:function(){return this.$("input").is(":checked")},valueChangeHandler:function(e){this.$("input").attr("checked",e)}}),g=h.extend({template:f,valueFunction:function(){return this.$("textarea").val()},valueChangeHandler:function(e){this.$("textarea").val(e)}}),y=h.extend({template:a,valueFunction:function(){return this.$("select").val()},valueChangeHandler:function(e){this.$("select").val(e)},disabledChangeHandler:function(e){this.$el.toggleClass("disabled",e),this.$("select").attr("disabled",e)}}),b=h.extend({template:u,valueFunction:function(){return this.$("input:checked").val()},valueChangeHandler:function(e){this.$("input[value="+e+"]").attr("checked",!0)}}),w=h.extend({template:s,valueFunction:function(){var e=this.$("input:checked"),t=_.map(e,function(e){return $(e).val()});return t},valueChangeHandler:function(e){_.isArray(e)&&_.each(e,function(e){this.$("input[value="+e+"]").attr("checked",!0)},this)}}),E=h.extend({template:'<input type="hidden" value="{{value}}" name="{{name}}" />',valueChangeHandler:function(e){this.$("input").val(e),this.$("input").trigger("change")},valueFunction:function(){return""+this.$("input").val()}}),S=h.extend({template:" ",valueChangeHandler:function(e){},valueFunction:function(){}}),x=h.extend({selectIfDefault:function(){this.model.isElementDefault()&&this.$("input").select()},clearIfDefault:function(){this.model.isElementDefault()&&this.$("input").val("")},resetIfEmpty:function(){var e=this.$("input").val();if(e===""){var t=this.model.toJSON();t.defaultValue&&this.$("input").val(t.defaultValue)}this.updateValue()}}),T=h.extend({template:c,valueChangeHandler:function(e){this.$(".message").html(e)},valueFunction:function(){return this.$(".message").html()}}),N=h.extend({template:'<input type="hidden" value="{{value}}" name="{{name}}" />',valueChangeHandler:function(e){this.$("input").val(JSON.stringify(e)),this.updateValue()},valueFunction:function(){return JSON.parse(this.$("input").val())}}),C=h.extend({valueFunction:function(){return this.$("input").is(":checked")},valueChangeHandler:function(e){this.$("input").attr("checked",e)}}),k={select:y,textarea:g,checkbox:m,radioList:b,checkList:w,hidden:E,json:N,button:v,message:T,container:S},L=function(e){return k[e]||x},A=function(e,t){k[e]=t},O=function(e){k=_.extend({},k,e)},M=n.Model.extend({constructor:function(){n.Model.apply(this,arguments)},defaults:{elements:new d},setElementAttribute:function(e,t,n){var r=this.get("elements");r.get(e).set(t,n)},getValueObject:function(){var e=this.get("elements"),t=this.validateElements(),n={};return t.length===0?e.each(function(e){e.is("active")&&e.isNotEqual("type","button")&&(e.trigger("forceUpdate"),n[e.id]=e.get("value"))}):n.errors=t,n},validateElements:function(){var e=this.get("elements"),t=[];return e.each(function(e){t=t.concat(e.isElementValid())}),t},elementsChangeHandler:function(){var e=this.get("elements");e.on("change",function(e){var t="change",n=Array.prototype.slice.call(arguments,[0]);n[0]="elements:"+t,this.trigger.apply(this,n),n[0]="elements:"+e.get("name")+":"+t,this.trigger.apply(this,n)},this)}}),D="grp-",P=n.View.extend({constructor:function(e){this.typeViewIndex={},n.View.apply(this,arguments)},tagName:"div",className:"form-view",events:{"submit form":"formSubmitHandler"},template:'<div class="message-stack"></div><form action="{{actionId}}" class="form-vertical" method=""> <div class="group-list"></div> <div class="grp-buttons"> </div> </form>',postRender:function(){this.formEl=this.$("form"),this.renderGroupContainers(),this.renderMessageStack();var e=this.model,t=e.get("elements");t.each(function(e){this.addElement(e)},this)},addElement:function(e){var n=e.toJSON(),r=this,i=this.typeViewIndex[n.type]||L(n.type),s=n.name,o,u=this.$(".element-"+s);if(u.length!==0)o=new i({model:e,el:u}),o.postRender(),o.syncAttributes();else{o=t.createView({View:i,model:e,parentView:r});var a=n.group;this.$("."+D+a).append(o.render().el)}},removeElement:function(e){},renderGroupContainers:function(){var e=this.model,t=e.get("elements"),n=_.unique(t.pluck("group")),r=this.$(".group-list");_.each(n,function(e){this.$("."+D+e).length===0&&r.append('<div class="'+D+e+'"></div>')},this)},renderMessageStack:function(){var e=t.createView({View:i.View,Model:i.Model,parentEl:".message-stack",parentView:this}),n=e.model;e.listenTo(this,"showMessages",function(e){n.removeAllMessages(),_.each(e,function(e){var t=new i.Model(e);n.addMessage(t.toJSON())})}),e.listenTo(this,"clearMessages",function(){n.removeAllMessages()});var r=this.model.get("errors");r&&r.length>0&&this.trigger("showMessages",r)},formSubmitHandler:function(e){e.preventDefault(),this.trigger("clearMessages");var t=this.model.getValueObject(),n=this.model.get("actionId");this.options.prePostParser&&(t=this.options.prePostParser(t)),this.trigger("formSubmit",t)},addToTypeViewIndex:function(e,t){this.typeViewIndex[e]=t},submitSuccessHandler:function(){console.log(arguments)},submitFailureHandler:function(e,t){_.each(t,function(e){e.messageType="failure",e.expires=0}),this.trigger("showMessages",t)},setElementValue:function(e,t){var n=this.model.get("elements");n.get(e).set("value",t)},resetForm:function(e){var t=this.model.get("elements");t.each(function(e){e.resetValue(!0)}),e&&this.trigger("clearMessages")}});return P.addToTypeViewIndex=function(e,t){A(e,t)},{Model:M,View:P,ElementModel:p,ElementCollection:d,ElementView:h}}),define("widgets/tab",["base/app","base","list/singleSelect"],function(e,t,n){var r=t.util,i=t.View.extend({tagName:"li",template:'<a href="#{{id}}" class="action">{{name}}</a>',changeHandler:function(){this.$el.toggleClass("active",this.model.is("selected"))}}),s=t.View.extend({changeHandler:function(){this.$el.toggle(this.model.is("selected"))}}),o=n.View.extend({template:'<div class="prop-tabs"><ul class="ib-list"></ul></div><div class="tab-panes"></div> ',postRender:function(){var e=this,n=this.model.get("items"),o=r.createView({View:t.CollectionView,collection:n,el:e.$(".ib-list"),itemView:i,parentView:e}),u=r.createView({View:t.CollectionView,tagName:"div",collection:n,el:e.$(".tab-panes"),itemView:s,parentView:e})},actionHandler:function(e){this.model.setSelectedById(e)}});return{View:o,Model:n.Model}}),define("widgets",["require","widgets/form","widgets/header","widgets/messageStack","widgets/tab"],function(e){return{Form:e("widgets/form"),Header:e("widgets/header"),MessageStack:e("widgets/messageStack"),Tab:e("widgets/tab")}});