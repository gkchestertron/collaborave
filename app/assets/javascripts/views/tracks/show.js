Collaborave.Views.Track = Backbone.View.extend({
	events: {
		'mousedown canvas.volume': 'volume',
		'mousedown canvas.highs': 'knob',
		'mousedown canvas.mids': 'knob',
		'mousedown canvas.lows': 'knob',
		'mousedown canvas.pan': 'pan'
	},
	template: JST['tracks/show'],
	render: function () {
		var trackView = this;
		var track = this.model;
		var content = this.template({track: this.model});
		this.$el.html(content);
		this.model.get('regions').each(function (region) {
			var regionView = new Collaborave.Views.Region({model: region, height: 198/track.get('regions').length});
			trackView.$el.find('.wavforms').append(regionView.render());
		});
		var volumectx = this.$el.find('canvas.volume').get()[0].getContext("2d");
		this.drawTrackVolume(volumectx, 65);
		var highsctx = this.$el.find('canvas.highs').get()[0].getContext("2d");
		this.drawKnob(highsctx, 30);
		var highsctx = this.$el.find('canvas.mids').get()[0].getContext("2d");
		this.drawKnob(highsctx, 30);
		var highsctx = this.$el.find('canvas.lows').get()[0].getContext("2d");
		this.drawKnob(highsctx, 30);
		var highsctx = this.$el.find('canvas.pan').get()[0].getContext("2d");
		this.drawKnob(highsctx, 30);
		return this.$el
	},
	volume: function (event) {
		event.preventDefault();
		var trackView = this;
		var control = event.target;
		var trackctx = control.getContext("2d");
    var value = event.pageY - Collaborave.getPosition(control)[1];
    trackView.drawTrackVolume(trackctx, value);
    trackView.model.set_filter('volume', {gain: { value: (130 - value)/65}});
    $(window).on('mousemove',function(event){
      
      value = event.pageY - Collaborave.getPosition(control)[1];
      trackView.drawTrackVolume(trackctx, value);
      trackView.model.set_filter('volume', {gain: { value: (130-value)/65}});
    });
    //pause and play if was playing and unbind the dragging
    $(window).mouseup(function(f){  
      $(window).off('mousemove');
    });
	},
	drawTrackVolume: function (ctx, value){
    ctx.clearRect(0, 0, 20, 130);
    ctx.fillStyle='#999';
    ctx.fillRect(0,0,20,130);
    ctx.fillStyle='#ccc';
    ctx.fillRect(0,0,20,value);
  },
  knob: function (event) { 
  	event.preventDefault();
		var trackView = this;
		var control = event.target;
		var knobctx = control.getContext("2d");
    var value = event.pageX - Collaborave.getPosition(control)[0];
    trackView.drawKnob(knobctx, value);
    var filter_name = $(event.target).data('name');
    trackView.model.set_filter(filter_name, {gain: {value: value/2}})

    $(window).on('mousemove',function (event) {
      value = event.pageX - Collaborave.getPosition(control)[0];
      trackView.drawKnob(knobctx, value);
      trackView.model.set_filter(filter_name, {gain: {value: value/2}})
    });

    $(window).mouseup(function(f){  
      $(window).off('mousemove');
    });
  },
  drawKnob: function (ctx, value) {
  	ctx.clearRect(0, 0, 60, 20);
    ctx.fillStyle='#ccc';
    ctx.fillRect(0,0,60,20);
    ctx.fillStyle='#999';
    ctx.fillRect(value-3,0,5,20);
    ctx.fillStyle='#ccc';
    ctx.fillRect(value - 1,0,1,20);
  },
  pan: function (event) { 
  	event.preventDefault();
		var trackView = this;
		var control = event.target;
		var knobctx = control.getContext("2d");
    var value = event.pageX - Collaborave.getPosition(control)[0];
    trackView.drawKnob(knobctx, value);
    var filter_name = $(event.target).data('name');
    trackView.model.get('filters').where({name: 'pan'})[0]

    $(window).on('mousemove',function (event) {
      value = event.pageX - Collaborave.getPosition(control)[0];
      trackView.drawKnob(knobctx, value);
      var panner = trackView.model.signal_path[4];
      panner.setPosition((value-30)/30,0,0.1 )
    });

    $(window).mouseup(function(f){  
      $(window).off('mousemove');
    });
  }  
});