define([
        'base/app',
        'base'
    ],
    function(app, Base) {
        'use strict';

        var ChartView = Base.View.extend({
            template: '<h1>{{title}}</h1><div class="chart-body"> </div>',
            configDefaults: {
                title: 'Chart Title'
            },
            serialize: function() {
                return this.getConfigs();
            },
            postRender: function() {
                this.renderChart();
            },
            renderChart: function() {
                //this.$('.chart-body').html(JSON.stringify(this.collection.toJSON()));
                var collection = this.collection;
                var chartConfigs = collection.getConfigs();
                console.log(collection.getSeries());
                this.$('.chart-body').highcharts({
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: collection.getCategories()
                    },
                    yAxis: {
                        title: {
                            text: chartConfigs.xAxis
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    credits: {
                        enabled: false
                    },
                    series: collection.getSeries()
                });
            }
        });


        var ChartCollection = Base.Collection.extend({
            configDefaults: {
                type: 'line',
                xAxis: 'count',
                yAxis: 'category',
                showLegend: false,
                title: 'Chart Title'
            },
            getCategories: function() {
                var yAxis = this.getConfig('yAxis');
                var collection = this;
                return collection.map(function(model) {
                    return model.get(yAxis);
                });
            },
            getSeries: function() {
                var xAxis = this.getConfig('xAxis').split(',');
                var collection = this;
                console.log(xAxis);
                return _.map(xAxis, function(axisId) {
                    return {
                        name: axisId,
                        data: collection.map(function(model) {
                            return model.get(axisId);
                        })
                    };
                });
            }
        });

        //TODO: Line Bar Stacked Bar Staked Area Bar with negative stack Dual Axis with line

        return {
            View: ChartView,
            Collection: ChartCollection
        };

    });