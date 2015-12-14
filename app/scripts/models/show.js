/*globals define */
define([
  'jquery',
  'underscore'
], function ($, _) {
  var Show = Backbone.Model.extend({
    
    // url: '/shows/' + this.get('id')
    initialize: function (opts) {
      this.url = '/shows/' + this.get('id');
    },

    sortByAverage: function(role) {
      return this.get(role).sort(function(a, b) {
        return a.average - b.average;
      });
    },

    chartData: function(data) {
      return {
        labels: _.pluck(data, 'name').map(function(name){return name.slice(0, 25)}),
        datasets: [
          {
            label: "Average",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: _.pluck(data, 'average')
          },
          // {
          //   label: "Episode Count",
          //   fillColor: "rgba(151,187,205,0.5)",
          //   strokeColor: "rgba(151,187,205,0.8)",
          //   highlightFill: "rgba(151,187,205,0.75)",
          //   highlightStroke: "rgba(151,187,205,1)",
          //   data: _.pluck(data, 'count')
          // }

        ]        
      };
    },

    chartOptions: {
      scaleBeginAtZero : false
    }    

  });


  return Show;
});
