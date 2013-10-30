define([
    'base/app',
    'base/view',
    'base/model',
    'base/configurableModel',
    'base/collection',
    'base/util',
    'widgets/table/rowCollection'
],
    function (baseApp, BaseView, BaseModel, ConfigurableModel, BaseCollection, baseUtil, RowCollection) {
        'use strict';

        var TableModel = BaseModel.extend({

        })


        var RowView = BaseView.extend({
            tagName: 'tr',
            className: 'table-row',
            template: '{{#each items}}<td data-key="{{key}}" class="{{classNames}}"><div class="cell-value" style="text-align: {{align}}">{{#if renderHTML}}{{{value}}}{{else}}{{value}}{{/if}}</div></td>{{/each}}',
            useDeepJSON: true
        })

        var HeaderView = RowView.extend({
            className: 'table-heading',
            template: '{{#each items}}<th data-key="{{key}}" class="{{classNames}}"><div class="cell-value" style="text-align: {{align}}">{{value}}</div></th>{{/each}}'
        })

        var setupRowRender = function () {
            var _this = this; 

            var viewIndex = {};
            var el = this.$el;
            var coll = this.getOption('rowCollection');
            var columns = this.getOption('columns');
            var sortOrder = coll.getConfig('sortOrder');
            var sortKey = coll.getConfig('sortKey');


            _this.addItem = function (model, index, containerEl) {

                var rowValueArray = _.map(columns, function (item) {
                    var classList = ['cell'];
                    if (sortKey === item.key) {
                        classList.push('sorted');
                        classList.push(sortOrder);
                    }

                    if (index % 2 === 0) {
                        classList.push('even')
                    }

                    var dataObj = model.toJSON();

                    return {
                        key: item.key,
                        classNames: classList.join(' '),
                        value: baseApp.getFormatted(dataObj[item.key], item.formatter, dataObj),
                        align: item.align || 'left',
                        renderHTML: item.renderHTML
                    }

                })

                var rowModel = new BaseModel({
                    items: new BaseCollection(rowValueArray)
                })


                var view = baseUtil.createView({model: rowModel, View: RowView, parentView: _this});
                viewIndex[model.id] = view;
                //console.log(view.$el.html());
                view.$el.appendTo(containerEl);

            };

            _this.removeItem = function (model) {
                var view = _this.getModelViewAt(model.id);
                view.remove();
            };

            _this.getModelViewAt = function (id) {
                return viewIndex[id];
            };

            _this.removeReferences(function () {
                _this = null;
                viewIndex = null;
                el = null;
                coll = null;
            })


        };


        var View = BaseView.extend({
            template: '<div class="table-header"></div> <table class="row-list"></table><div class="table-footer"></div>',
            className: 'data-table',
            constructor: function (options) {
                var _this = this;
                BaseView.call(_this, options);
                _.each([setupRowRender], function (func) {
                    func.call(_this, options);
                });
            },
            postRender: function () {
                var _this = this;
                var el = this.$el;
                var rowList = this.$('.row-list');
                var coll = this.getOption('rowCollection');
                _this.renderHeader(rowList);
                el.hide();

                var collConfig = coll.getConfigs();

                if (collConfig.requestId) {

                    var def = _this.addRequest({
                        id: collConfig.requestId,
                        params: _.omit(collConfig, 'requestId')
                    })

                    def.done(function (resp) {
                        coll.reset(resp.results);
                        coll.setConfig('totalRecords', resp.totalRecords);

                        coll.each(function (model, index) {
                            _this.addItem(model, index, rowList);
                        });
                    })
                } else if (collConfig.baseUrl) {
                    _this.listenToOnce(coll, 'add', function () {
                        coll.each(function (model, index) {
                            _this.addItem(model, index, rowList);
                        });
                    })
                    coll.fetch({data: _.omit(collConfig, 'baseUrl'),
                        processData: true});
                } else {
                    coll.processedEach(function (model, index) {
                        _this.addItem(model, index, rowList);
                    });
                }
                el.show();


            },
            renderHeader: function (rowList) {
                var _this = this;
                var coll = this.getOption('rowCollection');
                var columns = this.getOption('columns');
                var sortOrder = coll.getOption('sortOrder');
                var sortKey = coll.getOption('sortKey');

                var columnsArray = _.map(columns, function (item) {
                    var classList = ['header-cell'];
                    if (sortKey === item.key) {
                        classList.push('sorted');
                        classList.push(sortOrder);
                    }

                    return {
                        key: item.key,
                        classNames: classList.join(' '),
                        value: item.label || baseApp.beautifyId(item.key),
                        align: item.align || 'left'
                    }
                })


                var headerModel = new BaseModel({
                    items: new BaseCollection(columnsArray)
                })

                baseUtil.createView({
                    View: HeaderView,
                    model: headerModel,
                    parentEl: rowList,
                    parentView: _this
                })
            }
        })

        return {
            View: View,
            RowCollection: RowCollection,
            Model: TableModel
        }


    });