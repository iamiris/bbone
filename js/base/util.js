define(function() {
    "use strict";

    var paramsToObject = function(params) {
        if (!params) {
            return {};
        }
        var paramsArray = _.map(params.split(';'), function(str) {return str.split('=');});
        var obj = {};
        _.each(paramsArray, function(arr) {
            obj[arr[0]] = arr[1];
        });
        return obj;
    };
    var objectToParams = function(obj, separator) {
        var str = [];
        separator = separator || ';';

        _.each(obj, function(value, index) {
            str.push(index + '=' + value);
        });

        return str.join(separator);
    };





    return {
        paramsToObject: paramsToObject,
        objectToParams: objectToParams,
        createView: function(config) {

            var view;
            var viewType = 'model';

            var parentView = config.parentView;

            if (config.collection || config.Collection) {
                viewType = 'collection';
            }


            if (viewType === 'model') {
                if (config.Model) {
                    config.model = new config.Model(config.attributes);
                }
            } else {
                if (config.Collection) {
                    config.collection = new config.Collection(config.items);
                }
            }

            var filteredConfig = _.omit(config, 'Collection', 'Model', 'parentEl', 'skipRender', 'parentView');
            view = new config.View(filteredConfig);

            if (view) {
                //skip render if skipRender is true
                if (!config.skipRender) {
                    view.render();
                }

                //if parentEl
                if (config.parentEl) {
                    if (config.replaceHTML) {
                        config.parentEl.empty();
                    }

                    if(parentView && parentView.$(config.parentEl).length > 0){
                        view.$el.appendTo(parentView.$(config.parentEl));
                    }else{
                        view.$el.appendTo(config.parentEl);
                    }

                }
            }


            if(parentView){
                parentView.addChildView(view);
            }

            return view;
        }
    };

});
