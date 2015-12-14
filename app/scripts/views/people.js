define([
  'jquery',
  'underscore',
  'backbone', 
  'hogan', 
  'text!templates/people.html',
  'models/writer',
  'models/director',
  'Chart',
  'jquery-ui'
], 
  function($, _, Backbone, Hogan, Template, Writer, Director, Chart) {
  var PeopleView = Backbone.View.extend({
    template: Template,

    events: {
      "slide .slider": 'redrawChart'
    },

    initialize: function(options) {
      this.showID = options.show;
      this.type = options.type;
      this.verb = this.type === 'writers' ? 'Written' : 'Directed';
      this.load();

    },

    load: function() {
      var self = this;
      this.model.fetch().then(function(data){
        self.model.shows = data.shows;
        self.render();
      });
    },

    render: function(){
      this.compiledTemplate = Hogan.compile(this.template);
      
      $(this.el).html(this.compiledTemplate.render({
        type: this.type,
        title: _(this.type).capitalize(),
        verb: this.verb
      }));

      this.slider = this.$el.find( ".slider" );
      this.slider.slider({
        min: 1,
        max: Math.max.apply(Math, this.model.get(this.type).map(function(o){return o.count;}))
      });
      
      this.slider.css('width', 450);
      this.buildChart({min: 1});

    },

    buildChart: function(options) {
      // Get context with jQuery - using jQuery's .get() method.
      var model = this.model;
      var allData = model.sortByAverage(this.type);
      var episodeData = model.chartData(this.limitData(allData, options.min));
      var chartEl = $('#' + this.type +'Chart') ;
      var ctx = chartEl.get(0).getContext("2d");

      // This will get the first returned node in the jQuery collection.
      
      if (this.chart) {
        this.chart.destroy();
      }
      chartEl.css('height', 400);
      chartEl.css('width', episodeData.labels.length * 50);

      this.chart = new Chart(ctx).Bar(episodeData, model.chartOptions);
    },

    limitData: function(data, min) {
      return _.filter(data, function(ent){ return ent.count >= min; });
    },

    redrawChart: function(e, ui) {
      var minimum = ui.value;
      var selector = '#' + this.verb + '-count';
      $(selector).text(minimum);
      this.buildChart({min: minimum});
    }
  

    // loadShow: function(e) {
    //   var showName = this.chart.getBarsAtEvent(e)[0].label;
    //   var showToLoad = this.findShowObj(showName);
    //   var showView = new ShowView({id: showToLoad.id});
    // },

    // findShowObj: function(showName) {
    //   return _.findWhere(this.collection.shows, {name: showName});
    // },

    // destroy: function () {
    //   this.$el.empty();
    // },
  });


  return PeopleView;
});