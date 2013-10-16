define([
    'base/app',
    'base/view',
    'base/model',
    'base/util',
    'text!./pagination.html',
    'widgets/table/rowCollection'
],
    function (baseApp, BaseView, BaseModel, baseUtil, paginationTemplate, RowCollection) {

        var View = BaseView.extend({
            constructor:function(){
                BaseView.apply(this, arguments);
                var rowCollection = this.getOption('rowCollection');
                this.listenTo(rowCollection, 'config_change',this.render);
            },
            template:paginationTemplate,
            renderTemplate:function(templateFunction){
                var rowCollection = this.getOption('rowCollection');
                var dataObj = rowCollection.getConfigs();
                dataObj.start = ((dataObj.page-1)*dataObj.perPage)+1;
                dataObj.end = (dataObj.page)*dataObj.perPage;
                this.$el.html(templateFunction(dataObj));
            },
            actionHandler:function(action){
                var rowCollection = this.getOption('rowCollection');
                switch(action){
                    case 'nextPage':
                        rowCollection.nextPage();
                        break;
                    case 'prevPage':
                        rowCollection.prevPage();
                        break;
                }
            }
        })

        return {
            View:View
        }


    });