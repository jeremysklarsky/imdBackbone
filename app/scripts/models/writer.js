/*globals define */
define([
  'jquery',
  'underscore'
], function ($, _) {
  var Writer = Backbone.Model.extend({
    
    // url: '/shows/' + this.get('id')
    initialize: function (opts) {
      this.url = '/writers/' + this.get('id');
    },


    getEpisodeData: function(showID) {
      return _.where(this.get('episodes'), {showID: showID});
    },

    sortByEpisodeRating: function(showID) {
      return this.getEpisodeData(showID).sort(function(a, b) {
        return a.rating - b.rating;
      });
    },

    chartData: function(data) {
      return {
        labels: _.pluck(data, 'title'),
        datasets: [
          {
            label: "Title",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: _.pluck(data, 'rating')
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


  return Writer;
});
