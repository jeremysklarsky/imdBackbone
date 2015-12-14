/*globals define */
define([
  'jquery'
  // 'models/show',
], function ($, Show) {
  var Seasons = Backbone.Collection.extend({
    
    initialize: function(opts) {
      this.seasons = opts.seasons;

    },

    sortByAverage: function() {
      return this.shows.sort(function(a, b) {
        return a.average - b.average;
      });
    },

    episodesChartData: function(data) {
      return {
        labels: _.pluck(data, 'title'),
        datasets: [
          {
            label: "Shows",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: _.pluck(data, 'rating')
          }
        ]        
      };
    },

    chartData: function(data) {
      return {
        labels: _.pluck(data, 'number'),
        datasets: [
          {
            label: "Shows",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: _.pluck(data, 'average')
          }  
        ]        
      };
    },

    chartOptions: {
      scaleBeginAtZero : false,
    } 
  });

  return Seasons;
});
