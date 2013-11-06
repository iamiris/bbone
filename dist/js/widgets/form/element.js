define(["base/app","base","widgets/form/validator","text!./inputView.html"],function(e,t,n,r){var i=".form-group",s=".message-block",o="has-error",u=t.Model.extend({constructor:function(){t.Model.apply(this,arguments);var e=this,n=e.get("defaultValue");n||e.set("defaultValue",e.get("value"));var r=e.collection,i=e.get("activeRules");_.each(i,function(t){var n=r.get(t.element);n.on("change:value",function(t,n){e.updateActive()}),e.updateActive()})},defaults:{valid:!0,active:!0,disabled:!1,readonly:!1,value:null,label:null,activeRules:[],validationRules:[],type:"text",errorCode:"",group:"elements"},idAttribute:"name",updateActive:function(){var e=this.get("activeRules"),t=_.every(e,function(e){var t=this.collection.get(e.element);return l[e.expr].call(this,t,e)},this);this.set("active",t)},isElementValid:function(e){var t=this.get("validationRules"),r=[];if(this.isNot("active"))return[];var i,s=_.every(t,function(e){var t=n.validationRuleMethods[e.expr].call(this,e,this.get("value"));return t||(r.push(e),i=e),t},this);this.set("valid",s);if(!e)if(i){var o=i.message||"error."+this.get("name")+"."+i.expr;this.set("errorCode",o)}else this.set("errorCode","");return r},getSiblingValue:function(e){if(this.collection)return this.collection.get(e).get("value")},getSiblingAttribute:function(e,t){if(this.collection)return this.collection.get(e).get(t)},setSiblingAttribute:function(e,t,n){if(this.collection)return this.collection.get(e).set(t,n)},setSiblingValue:function(e,t){if(this.collection)return this.collection.get(e).set("value",t)},isElementDefault:function(){var e=this.toJSON();return e.value===e.defaultValue},resetValue:function(e){var t=this;t.set("value",t.get("defaultValue")),e&&t.set("errorCode","")}}),a=t.Collection.extend({model:u}),f=t.View.extend({tagName:"div",className:"element",template:r,dataEvents:{forceRender:"render"},postRender:function(){this.syncAttributes()},syncAttributes:function(){var e=this.model,t=e.toJSON();_.each(t,function(t,n){var r=this[n+"ChangeHandler"];r&&typeof r=="function"&&r.call(this,e.get(n))},this),this.updateValue(!0)},disabledChangeHandler:function(e){this.$el.toggleClass("disabled",e),this.$("input").attr("disabled",e)},readonlyChangeHandler:function(e){this.$el.toggleClass("readonly",e),this.$("input").attr("readonly",e)},validChangeHandler:function(e){this.$(i).toggleClass(o,!e)},activeChangeHandler:function(e){this.$el.toggle(e)},valueChangeHandler:function(e){this.$("input").val(e),this.model.updateActive()},errorCodeChangeHandler:function(t){var n=this.$(s);t===""?(n.empty(),this.model.set("valid",!0)):(this.model.set("valid",!1),n.html(e.getString(t)))},nameChangeHandler:function(e){this.$el.addClass("element-"+e)},valueFunction:function(){return this.$("input").val()},updateValue:function(e){this.model.set("value",this.valueFunction()),e!==!0&&this.model.isElementValid()}}),l={eq:function(e,t){return e.isEqual("value",t.value)},valid:function(e){return e.isElementValid(!0),e.is("valid")},isIn:function(e,t){var n=e.get("value");return t.value.indexOf(n)!==-1},neq:function(e,t){return e.isNotEqual("value",t.value)},"function":function(e,t){var n=t.func;return n.apply(this,arguments)}};return{View:f,Model:u,Collection:a}});