Collaborave.Views.Project = Backbone.View.extend({
	initialize: function () {
		var projectView = this;
		this.listenTo(this.model.get('tracks'), 'change add remove', this.render)
		Collaborave.currentProjectView = this;
	},
	template: JST['projects/show'],
	events: {
		'click button#stop': 'stop',
		'click button.play': 'play',
		'click button.pause': 'pause',
		'mousedown button#rewind': 'rewind',
		'mousedown button#fast-forward': 'fastForward',
		'mousedown canvas.master-volume': 'volume',
		'click button#add-track-button': 'addTrack',
		'submit form#add-track-form': 'formPrevent',
		'click button#mute-monitor': 'muteMonitor'
	},
	formPrevent: function (event) {
		event.preventDefault();
	},
	addTrack: function (event) {
		event.preventDefault();
		var projectView = this;
		var $form = $('#add-track-form')
		var formData = $form.serializeJSON();
		this.model.get('tracks').create(formData);
	},
	muteMonitor: function (event) {
		event.preventDefault();
		if (Collaborave.Recorder.monitorGain.gain.value === 0) {
			Collaborave.Recorder.monitorGain.gain.value = 1;
		} else {
			Collaborave.Recorder.monitorGain.gain.value = 0;
		} 
	},
	render: function () {
		Collaborave.currentProjectView = this;
		var projectView = this;
		var content = this.template({ project: this.model });
		this.$el.html(content);
		this.model.get('tracks').each(function (track) {
			var trackView = new Collaborave.Views.Track({model: track});
			projectView.$el.find('#mixer').prepend(trackView.render());
		});
		var volumectx = this.$el.find('canvas.volume').get()[0].getContext("2d");
		this.drawTrackVolume(volumectx, 116);
		return this.$el;
		Collaborave.router.setupMainFilters();
	},
	play: function (event) {
		var button = event.target;
		$(button).removeClass('play');
		$(button).removeClass('btn-success');
		$(button).addClass('pause');
		$(button).addClass('btn-primary');
		$(button).text('pause');
		this.model.play.bind(this.model)();
	},
	stop: function () {
		var $button = $('button.pause');
		$button.addClass('play');
		$button.addClass('btn-success');
		$button.removeClass('pause');
		$button.removeClass('btn-primary');
		$button.text('play');
		this.model.stop.bind(this.model)();
	},
	rewind: function () {
		var project = this.model;
		var down = setInterval(function () { project.rewind.bind(project)() }, 100);
		$(window).on('mouseup', function () { clearInterval(down) });
	},
	fastForward: function () {
		var project = this.model;
		var down = setInterval(function () { project.fastForward.bind(project)() }, 100);
		$(window).on('mouseup', function () { clearInterval(down) });
	},
	pause: function (event) {
		var button = event.target;
		$(button).addClass('play');
		$(button).addClass('btn-success');
		$(button).removeClass('pause');
		$(button).removeClass('btn-primary');
		$(button).text('play');
		this.model.pause.bind(this.model)();
	},
	drawTrackVolume: function (ctx, value){
    ctx.clearRect(0, 0, 20, 252);
    ctx.fillStyle='#999';
    ctx.fillRect(0,0,20,252);
    ctx.fillStyle='#ccc';
    ctx.fillRect(0,0,20,value);
  },
  volume: function (event) {
		event.preventDefault();
		var trackView = this;
		var control = event.target;
		var trackctx = control.getContext("2d");
    var value = event.pageY - Collaborave.getPosition(control)[1];
    if (value > 252) {value = 252};
    if (value < 0) {value = 0}; 
    trackView.drawTrackVolume(trackctx, value);
    Collaborave.masterTrack.gain.value = (252 - value)/116;
    $(window).on('mousemove',function(event){
      
      value = event.pageY - Collaborave.getPosition(control)[1];
      if (value > 252) {value = 252};
	    if (value < 0) {value = 0};
      trackView.drawTrackVolume(trackctx, value);
      Collaborave.masterTrack.gain.value = (252 - value)/116;
      console.log(value);
    });
    //pause and play if was playing and unbind the dragging
    $(window).mouseup(function(f){  
      $(window).off('mousemove');
    });
	}
});
