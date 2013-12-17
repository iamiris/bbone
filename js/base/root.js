define(['base/view', 'base/model', 'widgets/header', 'base/app'], function(BaseView, BaseModel, Header, baseApp) {

    var currentPageView;

    var activeApp;


    var renderPage = function(appId, pageId, params){
        if(currentPageView){
            console.log('currentPageView removed ', new Date().toLocaleTimeString());
            currentPageView.remove();
        }

        require(['apps/' + appId + '/pages/'+pageId], function(Page){
            var view = new Page.View({
                model: new Page.Model(params)
            });
            var el = $(baseApp.appBody);
            el.empty();
            el.html(view.el);
            view.render();
            currentPageView = view;
        })
    }

    var renderApp = function(attr){
        require(['apps/' + attr.appId], function() {
            require(['apps/' + attr.appId + '/app'], function(currentApp) {
                var pageId = attr.pageId || currentApp.defaultPage;
                activeApp = currentApp;
                currentApp.setupApp(function(){
                    renderPage(attr.appId,pageId, attr);
                })
            });
        });
    }

    var RootView = BaseView.extend({
        postRender: function() {
            var header = new Header.View({
                el: this.$('#header'),
                model: this.model
            });
            header.render();
        },
        changeHandler: function(changes) {
            var attr = this.model.toJSON();
            if (changes.appId) {
                if(activeApp){
                    activeApp.tearApp(function(){
                        renderApp(attr);
                    });
                }else{
                    renderApp(attr);
                }

            }else if (changes.pageId) {
                require(['apps/' + attr.appId + '/app'], function(app) {
                    renderPage(attr.appId,attr.pageId, attr);
                });
            }
        }
    });

    return {
        View: RootView
    };

});
