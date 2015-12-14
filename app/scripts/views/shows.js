define([
  'jquery',
  'underscore',
  'backbone', 
  'hogan', 
  'text!templates/shows.html',
  'collections/shows',
  'views/show',
  'Chart'
], 
  function($, _, Backbone, Hogan, Template, Shows, ShowView, Chart) {
  var ShowsCollectionView = Backbone.View.extend({
    el: '#shows',
    template: Template,

    events: {
      'click #showsChart': 'loadShow',
    },

    initialize: function() {
      this.load();
    },

    load: function() {
      var self = this;
      this.collection = new Shows();
      this.collection.fetch().then(function(data){
        self.collection.shows = data.shows;
        self.render();
      });
    },

    render: function(){
      this.compiledTemplate = Hogan.compile(this.template);
      $(this.el).html(this.compiledTemplate.render({}));

      this.buildChart();
    },

    buildChart: function() {
      // Get context with jQuery - using jQuery's .get() method.
      var data = this.collection.chartData(this.collection.sortByAverage());
      var ctx = $("#showsChart").get(0).getContext("2d");
      // This will get the first returned node in the jQuery collection.

      this.chart = new Chart(ctx).Bar(data, this.collection.chartOptions);
    },

    loadShow: function(e) {
      var showName = this.chart.getBarsAtEvent(e)[0].label;
      var showToLoad = this.findShowObj(showName);
      var showView = new ShowView({id: showToLoad.id});
    },

    findShowObj: function(showName) {
      return _.findWhere(this.collection.shows, {name: showName});
    }
  });


  return ShowsCollectionView;
});