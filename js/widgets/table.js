define([
    'base/app',
    'base/view',
    'base/model',
    'base/configurableModel',
    'base/collection',
    'base/util',
    'base/collectionView'
],
    function (baseApp, BaseView, BaseModel, ConfigurableModel, BaseCollection, baseUtil, CollectionView) {


        var getDefaultTableConfigs = function(){
            return {
                sortOrder: 'asc',
                sortKey: '',
                page: 1,
                perPage: 100
            }
        }

        var TableModel = ConfigurableModel.extend({
            constructor: function (attributes, options) {
                options = options || {};
                options.config = _.extend({},getDefaultTableConfigs() , options.config);
                ConfigurableModel.call(this, attributes, options);
            }
        })

        var RowView = BaseView.extend({
            tagName: 'tr',
            className: 'table-row',
            template: '{{#each items}}<td data-key="{{key}}" class="{{classNames}}"><div class="cell-value" style="text-align: {{align}}">{{value}}</div></td>{{/each}}',
            useDeepJSON: true
        })

        var HeaderView = RowView.extend({
            className: 'table-heading',
            template: '{{#each items}}<th data-key="{{key}}" class="{{classNames}}"><div class="cell-value" style="text-align: {{align}}">{{value}}</div></th>{{/each}}'
        })

        var setupRowRender = function () {
            var _this = this;
            var model = _this.model;
            var viewIndex = {};
            var el = this.$el;
            var coll = this.getOption('rowCollection');
            var columns = this.getOption('columns');
            var sortOrder = model.getConfig('sortOrder');
            var sortKey = model.getConfig('sortKey');


            _this.addItem = function (model, containerEl) {

                var index = coll.indexOf(model);

                var rowValueArray = _.map(columns, function (item) {
                    var classList = ['cell'];
                    if (sortKey === item.key) {
                        classList.push('sorted');
                        classList.push(sortOrder);
                    }

                    if(index%2===0){
                        classList.push('even')
                    }

                    return {
                        key: item.key,
                        classNames: classList.join(' '),
                        value: baseApp.getFormatted(model.get(item.key), item.formatter),
                        align:item.align || 'left'
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
                coll.each(function (model) {
                    _this.addItem(model, rowList);
                });
                el.show();
            },
            renderHeader: function (rowList) {
                var _this = this;
                var model = _this.model;
                var columns = this.getOption('columns');
                var sortOrder = model.getConfig('sortOrder');
                var sortKey = model.getConfig('sortKey');

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
                        align:item.align || 'left'
                    }
                })

                console.log(columnsArray);
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
            RowCollection: BaseCollection,
            Model:TableModel
        }


    });