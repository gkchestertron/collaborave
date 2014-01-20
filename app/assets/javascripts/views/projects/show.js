Collaborave.Views.Project = Backbone.View.extend({
	template: JST['projects/show'],
	events: {
		'click button#stop': 'stop',
		'click button#play': 'play',
		'click button#pause': 'pause',
		'click button#rewind': 'rewind',
		'click button#fast-forward': 'fastForward',
		'mousedown canvas.volume': 'volume'
	},
	render: function () {
		var projectView = this;
		var content = this.template({ project: this.model });
		this.$el.html(content);
		this.model.get('tracks').each(function (track) {
			var trackView = new Collaborave.Views.Track({model: track});
			projectView.$el.find('#mixer').append(trackView.render());
		});
		var volumectx = this.$el.find('canvas.volume').get()[0].getContext("2d");
		this.drawTrackVolume(volumectx, 116);
		return this.$el;
	},
	play: function () {
		this.model.play.bind(this.model)();
	},
	stop: function () {
		this.model.stop.bind(this.model)();
	},
	rewind: function () {
		this.model.rewind.bind(this.model)();
	},
	fastForward: function () {
		this.model.fastForward.bind(this.model)();
	},
	pause: function () {
		this.model.pause.bind(this.model)();
	},
	drawTrackVolume: function (ctx, value){
    ctx.clearRect(0, 0, 20, 232);
    ctx.fillStyle='#999';
    ctx.fillRect(0,0,20,232);
    ctx.fillStyle='#ccc';
    ctx.fillRect(0,0,20,value);
  },
  volume: function (event) {
		event.preventDefault();
		var trackView = this;
		var control = event.target;
		var trackctx = control.getContext("2d");
    var value = event.pageY - Collaborave.getPosition(control)[1];
    if (value > 232) {value = 232};
    if (value < 0) {value = 0}; 
    trackView.drawTrackVolume(trackctx, value);
    Collaborave.masterTrack.gain.value = (232 - value)/116;
    $(window).on('mousemove',function(event){
      
      value = event.pageY - Collaborave.getPosition(control)[1];
      if (value > 232) {value = 232};
	    if (value < 0) {value = 0};
      trackView.drawTrackVolume(trackctx, value);
      Collaborave.masterTrack.gain.value = (232 - value)/116;
      console.log(value);
    });
    //pause and play if was playing and unbind the dragging
    $(window).mouseup(function(f){  
      $(window).off('mousemove');
    });
	}
});
