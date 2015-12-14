define([
  'jquery',
  'underscore',
  'backbone', 
  'hogan', 
  'text!templates/show.html',
  'models/show',
  'Chart',
  'views/people',
  'views/seasons'
], 
  function($, _, Backbone, Hogan, Template, Show, Chart, PeopleView, SeasonsView) {
  var ShowView = Backbone.View.extend({
    el: '#show',
    template: Template,

    events: {
      'click #writersChart': 'loadWriter',
      'click #directorsChart': 'loadDirector',
    },

    initialize: function(options) {
      this.model = new Show({id: options.id});
      this.load();
    },

    load: function() {
      var self = this;
      
      this.model.fetch().then(function(data){
        self.render();
      });
    },

    render: function(){
      this.compiledTemplate = Hogan.compile(this.template);
      $(this.el).html(this.compiledTemplate.render({}));
      this.buildCharts();
    },

    buildCharts: function() {
      var writers = new PeopleView({el: $('#writers'), 
                                    model: this.model, 
                                    type: 'writers'});
      var directors = new PeopleView({el: $('#directors'), 
                                      model: this.model, 
                                      type: 'directors'});
      var seasons = new SeasonsView({el: $('#seasons'),
                                     seasons: this.model.get('seasons')});
    },

    // buildWritersChart: function() {
    //   // Get context with jQuery - using jQuery's .get() method.
    //   var model = this.model;
    //   var episodeData = model.chartData(model.sortByEpisodeRating(this.showID));
    //   var chartEl = $("#writersChart") ;
    //   var ctx = chartEl.get(0).getContext("2d");
    //   chartEl.attr('width', episodeData.labels.length * 35);

    //   // This will get the first returned node in the jQuery collection.
    //   this.writersChart = new Chart(ctx).Bar(episodeData, model.chartOptions);
    // },

    // buildDirectorsChart: function() {
    //   var model = this.directorModel;
    //   var episodeData = model.chartData(model.sortByEpisodeRating(this.showID));
    //   var chartEl = $("#directorsChart") ;
    //   var ctx = chartEl.get(0).getContext("2d");
    //   chartEl.attr('width', episodeData.labels.length * 35);

    //   // This will get the first returned node in the jQuery collection.
    //   this.directorsChart = new Chart(ctx).Bar(episodeData, model.chartOptions);
    // },      

    loadWriter: function(e) {
      var writerName = this.chart.getBarsAtEvent(e)[0].label;
      var writerToLoad = this.findWriterObj(writerName);
      var writerView = new PeopleView({id: writerToLoad.id, show: this.model});
    },

    // findWriterObj: function(writerName) {
    //   return _.findWhere(this.model.get('writers'), {name: writerName});
    // },

    // destroy: function () {
    //   this.$el.empty();
    // },
  });


  return ShowView;
});