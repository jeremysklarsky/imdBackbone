define([
  'jquery',
  'underscore',
  'backbone', 
  'hogan', 
  'text!templates/seasons.html',
  'text!templates/episodeTooltip.html',
  'collections/seasons',
  'Chart'
], 
  function($, _, Backbone, Hogan, Template, TooltipTemplate, Seasons, Chart) {
  var SeasonsView = Backbone.View.extend({
    template: Template,
    tooltipTemplate: TooltipTemplate,

    events: {
      'click #seasons-chart': 'loadSeasonEpisodes',
      'mouseleave #seasons-episode-chart': 'removeToolTip',
      'mouseenter #seasons-episode-chart': 'showToolTip'
    },

    initialize: function(options) {
      this.collection = new Seasons({seasons: options.seasons});
      this.render();
    },

    render: function(){
      this.compiledTemplate = Hogan.compile(this.template);
      this.compiledToolTip = Hogan.compile(this.tooltipTemplate);
      $(this.el).html(this.compiledTemplate.render({
      }));

      this.buildChart();
    },

    buildChart: function() {
      // Get context with jQuery - using jQuery's .get() method.
      var collection = this.collection;
      var episodeData = collection.chartData(this.collection.seasons);
      var chartEl = $('#seasons-chart') ;
      var ctx = chartEl.get(0).getContext("2d");
      // chartEl.attr('width', episodeData.labels.length * 35);

      // This will get the first returned node in the jQuery collection.
      this.chart = new Chart(ctx).Line(episodeData, collection.chartOptions);
    },

    loadSeasonEpisodes: function(e) {
      var self = this;
      var collection = this.collection;
      var seasonNumber = this.chart.getPointsAtEvent(e)[0].label;
      var seasonToLoad = this.findSeasonObj(seasonNumber);
      var episodeData = collection.episodesChartData(seasonToLoad.episodes);
      var chartEl = $('#seasons-episode-chart');
      var ctx = chartEl.get(0).getContext("2d");
      var chartOptions = collection.chartOptions;


      if (this.episodesChart) {
        this.episodesChart.destroy();
      }
      chartEl.attr('width', episodeData.labels.length * 35);
      chartOptions.customTooltips = customTooltips;

      this.episodesChart = new Chart(ctx).Line(episodeData, chartOptions);

      function customTooltips(tooltip) {

        // tooltip will be false if tooltip is not visible or should be hidden
        if (!tooltip) {
            return;
        }
        
        var tooltipEl = $('#chartjs-tooltip');
        var title = tooltip.text.split(": ")[0];
        var episodeObj = _.where(seasonToLoad.episodes, {title: title})[0];
        var director = episodeObj.director.name;
        var writers = _.pluck(episodeObj.writers, 'name').join(', ');
        var rating = episodeObj.rating;
        var top;
        tooltipEl.removeClass('above below');
        tooltipEl.addClass(tooltip.yAlign);

        // tooltipEl.html('some awesome text');
        tooltipEl.html(self.compiledToolTip.render({
          title: title,
          director: director,
          rating: rating,
          writers: writers
        }));

        if (tooltip.yAlign == 'above') {
            top = tooltip.y - tooltip.caretHeight - tooltip.caretPadding;
        } else {
            top = tooltip.y + tooltip.caretHeight + tooltip.caretPadding;
        }

        tooltipEl.css({
            opacity: 1,
            left: tooltip.chart.canvas.offsetLeft + tooltip.x + 'px',
            top: tooltip.chart.canvas.offsetTop + top + 'px',
            fontFamily: tooltip.fontFamily,
            fontSize: tooltip.fontSize,
            fontStyle: tooltip.fontStyle,
            position: 'absolute'
        });
      }

    },

    removeToolTip: function() {
      $('#chartjs-tooltip').hide();
    },

    showToolTip: function() {
      $('#chartjs-tooltip').show();
    },
  

    // loadShow: function(e) {
    //   var showName = this.chart.getBarsAtEvent(e)[0].label;
    //   var showToLoad = this.findShowObj(showName);
    //   var showView = new ShowView({id: showToLoad.id});
    // },

    findSeasonObj: function(number) {
      return _.findWhere(this.collection.seasons, {number: number});
    },

    // destroy: function () {
    //   this.$el.empty();
    // },
  });


  return SeasonsView;
});