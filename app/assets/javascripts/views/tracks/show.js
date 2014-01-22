Collaborave.Views.Track = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model.get('regions'), 'add remove change', this.render)
  },
	events: {
		'mousedown canvas.volume': 'volume',
		'mousedown canvas.highs': 'knob',
		'mousedown canvas.mids': 'knob',
		'mousedown canvas.lows': 'knob',
		'mousedown canvas.pan': 'pan',
		'click button.mute': 'mute',
		'click button.solo': 'solo',
    'click button.add-region': 'uploadRegion',
    'click button.record': 'record',
    'click button.delete-track': 'delete',
    'click div.wavforms': 'setTime'

	},
	template: JST['tracks/show'],
  record: function (event) {
    var $button = $(event.target);
    if ($button.hasClass('btn-danger')) {
      $button.removeClass('btn-danger')
      Collaborave.Recorder.trackId = null;
    } else {
      Collaborave.Recorder.trackId = this.model.id;
      $button.addClass('btn-danger');
    } 
  },
  delete: function () {
    this.model.destroy();
  },
	render: function () {
		var trackView = this;
		var track = this.model;
		var content = this.template({track: this.model});
		this.$el.html(content);
    if (this.model.get('regions')) {
  		this.model.get('regions').each(function (region) {
  			var regionView = new Collaborave.Views.Region({model: region, height: 198/track.get('regions').length});
  			trackView.$el.find('.wavforms').append(regionView.render());
  		});
    }

		var volumectx = this.$el.find('canvas.volume').get()[0].getContext("2d");
		this.drawTrackVolume(volumectx, 65);
		var highsctx = this.$el.find('canvas.highs').get()[0].getContext("2d");
		this.drawKnob(highsctx, 30, 'highs');
		var highsctx = this.$el.find('canvas.mids').get()[0].getContext("2d");
		this.drawKnob(highsctx, 30, 'mids');
		var highsctx = this.$el.find('canvas.lows').get()[0].getContext("2d");
		this.drawKnob(highsctx, 30, 'lows');
		var highsctx = this.$el.find('canvas.pan').get()[0].getContext("2d");
		this.drawKnob(highsctx, 30, 'pan');
		return this.$el
	},
	volume: function (event) {
		event.preventDefault();
		var trackView = this;
		var control = event.target;
		var trackctx = control.getContext("2d");
    var value = event.pageY - Collaborave.getPosition(control)[1];
    if (value > 152) {value = 152};
    if (value < 0) {value = 0}; 
    trackView.drawTrackVolume(trackctx, value);
    trackView.model.set_filter('volume', {gain: { value: (152 - value)/152}});
    $(window).on('mousemove',function(event){
      
      value = event.pageY - Collaborave.getPosition(control)[1];
      if (value > 152) {value = 152};
	    if (value < 0) {value = 0};
      trackView.drawTrackVolume(trackctx, value);
      trackView.model.set_filter('volume', {gain: { value: (152-value)/152}});
    });
    //pause and play if was playing and unbind the dragging
    $(window).mouseup(function(f){  
      $(window).off('mousemove');
    });
	},
	drawTrackVolume: function (ctx, value){
    ctx.clearRect(0, 0, 20, 152);
    ctx.fillStyle='#999';
    ctx.fillRect(0,0,20,152);
    ctx.fillStyle='#ccc';
    ctx.fillRect(0,0,20,value);
  },
  knob: function (event) { 
  	event.preventDefault();
		var trackView = this;
		var control = event.target;
		var knobctx = control.getContext("2d");
    var value = event.pageX - Collaborave.getPosition(control)[0];
    var filter_name = $(event.target).data('name');
    trackView.drawKnob(knobctx, value, filter_name);
    trackView.model.set_filter(filter_name, {gain: {value: (value-30)/2}})

    $(window).on('mousemove',function (event) {
      value = event.pageX - Collaborave.getPosition(control)[0];
      if (value > 60) {value = 60};
      if (value < 0) {value = 0};
      trackView.drawKnob(knobctx, value, filter_name);
      trackView.model.set_filter(filter_name, {gain: {value: (value-30)/2}})
    });

    $(window).mouseup(function(f){  
      $(window).off('mousemove');
    });
  },
  drawKnob: function (ctx, value, name) {
  	ctx.clearRect(0, 0, 60, 20);
    ctx.fillStyle='#ccc';
    ctx.fillRect(0,0,60,20);

    ctx.fillStyle='#eee';
    ctx.font='15px Arial';
    ctx.fillText(name,5,15);

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
    trackView.drawKnob(knobctx, value, 'pan');
    var filter_name = $(event.target).data('name');
    trackView.model.get('filters').where({name: 'pan'})[0]

    $(window).on('mousemove',function (event) {
      value = event.pageX - Collaborave.getPosition(control)[0];
      if (value > 60) {value = 60};
      if (value < 0) {value = 0};
      trackView.drawKnob(knobctx, value, 'pan');
      var panner = trackView.model.signal_path[4];
      panner.setPosition((value-30)/30,0,0.1 )
    });

    $(window).mouseup(function(f){  
      $(window).off('mousemove');
    });
  },
  mute: function (event) {
  	var track = this.model;
  	var button = event.target;
  	if (track.muted === true) {
  		track.muted = false;
  		track.set_filter('mute', {gain: {value: 1}});
  		$(button).removeClass('btn-danger');
  	} else {
  		track.muted = true;
  		track.set_filter('mute', {gain: {value: 0}});
  		$(button).addClass('btn-danger');
  	}
  },
  solo: function () {
  	var track = this.model;
  	var button = event.target;
  	if (track.soloed === true) {
  		track.soloed = false;
  		var anySolos = false;
  		//need to account for whether any tracks are soloed...
  		Collaborave.currentProject.get('tracks').each(function (ptrack) { 
  			if (ptrack.soloed === true) {
  				track.anySolos = true;
  			}	
  		});

  		if (track.anySolos === true) {

  			track.set_filter('solo', {gain: {value: 0}})

  		} else {

  			Collaborave.currentProject.get('tracks').each(function (ptrack) {
	  				ptrack.set_filter('solo', {gain: {value: 1}});
  			});

  		}

  		$(button).removeClass('btn-success');
  	} else {
  		track.soloed = true;

  		Collaborave.currentProject.get('tracks').each(function (ptrack) {
  			if (ptrack.soloed === true) {
  				ptrack.set_filter('solo', {gain: {value: 1}});
  			} else {
  				ptrack.set_filter('solo', {gain: {value: 0}});
  			}
  		});

  		
  		$(button).addClass('btn-success');
  	}
  },
  setTime: function (event) {
    var box = event.currentTarget;
    var pos = Collaborave.getPosition(box);
    console.log(event.pageX - pos[0]);
    context.position = ((event.pageX - pos[0])/817) * context.duration;
  },
  uploadRegion: function (event) {
    var track = this.model
    $('input[name="region[track_id]"]').val(track.id);
    $('input[name="region_redirect_hash"]').val(location.hash);
  } 
});