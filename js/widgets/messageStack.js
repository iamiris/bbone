define(['base/app', 'base', 'list', 'text!./messageStack/messageStack.html'], function (app, Base, List, template) {

    'use strict';
    var baseUtil = Base.util;


    // Default Model.
    var Model = Base.Model.extend({
        initialize: function () {
            var _this = this;
            var removeMessage = _.bind(this.removeMessage, this);
            var messageCollection = new MessageCollection();
            messageCollection.on('add', function (model) {
                var expires = model.get('expires');
                switch (expires) {
                    case -1:
                        model.removeSelf();
                        break;
                    case 0:
                        //do nothing
                        break;
                    default:
                        _.delay(removeMessage, expires * 1000, model);
                        break;
                }
            });


            this.messageCollection = messageCollection;
        },
        addMessage: function (obj) {
            obj.ts = new Date().getTime();
            this.messageCollection.add(obj);
        },
        removeMessage: function (model) {
            this.messageCollection.remove(model);
        },
        removeAllMessages: function () {
            this.messageCollection.reset([]);
        }

    });

    /*
     expires can be seconds or 0 (never expires) or -1 (never shows up)
     messageType can be any string that added on class to message container
     */


    var MessageModel = Base.Model.extend({
        defaults: {
            expires: 10,
            isClosable: true,
            messageType: 'alert'
        },
        idAttribute: 'ts'
    });

    var MessageItemView = Base.View.extend({
        tagName: 'li',
        template: Handlebars.compile("{{#if isClosable}}<button type=\"button\" class=\"close remove_message\" >&times;</button>{{/if}}{{{message}}}"),
        events: {
            'click .remove_message': 'removeMessage'
        },
        removeMessage: function () {
            this.model.removeSelf();
        }
    });

    // Default Collection.
    var MessageCollection = Base.Collection.extend({
        model: MessageModel
    });

    // Default View.
    var View = Base.View.extend({

        initialize:function(){
            this.viewIndex = {};
            var messageCollection = this.model.messageCollection;
            this.listenTo(messageCollection,'add remove', this.checkEmpty);
            this.listenTo(messageCollection,'add', this.addMessage);
            this.listenTo(messageCollection,'remove', this.removeMessage);
        },
        template: template,
        checkEmpty: function () {
            var messageCollection = this.model.messageCollection;
            if (messageCollection.length === 0) {
                this.$el.addClass("hide");
            } else {
                this.$el.removeClass("hide");
            }
        },
        addMessage:function(model){
            var attributes = model.toJSON();
            var container = this.$('.'+attributes.messageType+'-list');
            var itemView = baseUtil.createView({
                View:MessageItemView,
                parentEl:'.'+attributes.messageType+'-list',
                parentView:this,
                model:model
            })
            console.log('.'+attributes.messageType+'-list');
            this.viewIndex[model.id]=itemView;
        },
        removeMessage:function(model){
            var itemView = this.viewIndex[model.id];
            itemView.remove();
        },
        postRender: function () {
            var collection = this.model.messageCollection;
            /*
            var MsgListView = Base.View.extend({

                initialize:function(){
                    this.listenTo(this.collection, 'remove',this.checkEmpty);
                    this.listenTo(this.collection, 'add',this.checkEmpty);
                    this.checkEmpty();
                }

            });


            baseUtil.createView({
                View: MsgListView,
                collection: collection,
                itemView: MessageItemView,
                filter: function (item) {
                    return item.attributes.messageType === 'alert';
                },
                parentEl: '.alert-list',
                parentView: this
            })


            baseUtil.createView({
                View: MsgListView,
                collection: collection,
                itemView: MessageItemView,
                filter: function (item) {
                    return item.attributes.messageType === 'warning';
                },
                parentEl: '.warning-list',
                parentView: this
            })


            baseUtil.createView({
                View: MsgListView,
                collection: collection,
                itemView: MessageItemView,
                filter: function (item) {
                    return item.attributes.messageType === 'success';
                },
                parentEl: '.success-list',
                parentView: this
            })


            baseUtil.createView({
                View: MsgListView,
                collection: collection,
                itemView: MessageItemView,
                filter: function (item) {
                    return item.attributes.messageType === 'failure';
                },
                parentEl: '.failure-list',
                parentView: this
            })

            */

        }

    });


    return {
        View: View,
        Model: Model,
        MessageCollection: MessageCollection
    };

});
