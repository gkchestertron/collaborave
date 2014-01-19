Collaborave.Views.Track = Backbone.View.extend({
	events: {
		'mousedown canvas.volume': 'volume'
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
		this.drawTrackVolume(volumectx, 65)
		return this.$el
	},
	volume: function (event) {
		event.preventDefault();
		var track = this;
		var control = event.target;
		var trackctx = control.getContext("2d");
    var value = event.pageY - Collaborave.getPosition(control)[1];
    track.drawTrackVolume(trackctx, value);
    track.model.set_filter('volume', {gain: { value: (130 - value)/65}});
    $(window).on('mousemove',function(event){
      
      value = event.pageY - Collaborave.getPosition(control)[1];
      track.drawTrackVolume(trackctx, value);
      console.log(value)
      track.model.set_filter('volume', {gain: { value: (130-value)/65}});
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
    }	
});