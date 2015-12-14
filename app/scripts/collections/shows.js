/*globals define */
define([
  'jquery'
  // 'models/show',
], function ($, Show) {
  var Shows = Backbone.Collection.extend({
    url: '/shows',
    // model: Show,

    sortByAverage: function() {
      return this.shows.sort(function(a, b) {
        return a.average - b.average;
      });
    },

    chartData: function(data) {
      return {
        labels: _.pluck(data, 'name'),
        datasets: [
          {
            label: "Shows",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: _.pluck(data, 'average')
          }
        ]        
      };
    },

    chartOptions: {
      scaleBeginAtZero : false
    }

      

  });

  return Shows;
});
