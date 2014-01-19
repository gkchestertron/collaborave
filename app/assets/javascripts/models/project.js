Collaborave.Models.Project = Backbone.Model.extend({
	initialize: function () {
		this.setup_master_filters();
	},
	urlRoot: '/projects',
	parse: function (data) {
		var that = this;
		var tracks = data.tracks;
		data.tracks = new Collaborave.Collections.Tracks(tracks, { project: this, parse: true });
		var versions = data.versions;
		data.versions = new Collaborave.Collections.Versions(versions, { parent: that, parse: true });
		return data;
	},
	load: function () {
		this.get('tracks').each(function (track) {
			track.load();
		});
	},
	pause: function () {
		if (context.playing) {
			context.playing = false;
			context.position += (context.currentTime - context.position_diff);
			this.get('tracks').each(function (track) {
				track.stop();
			});
		}
	},
	play: function () {
		var project = this;
		if (context.position + (context.currentTime - context.position_diff) > context.duration) {
			project.stop();
		}
		if (!context.playing) {	
			context.playing = true;
			context.position_diff = context.currentTime;
			this.get('tracks').each(function (track) {
				track.play();
			});
		}
	},
	stop: function () {
		context.playing = false;
		context.position = 0;
		this.get('tracks').each(function (track) {
			track.stop();
		});
	},
	fastForward: function () {
		this.pause();
		if (context.position <= context.duration) {
			context.position += 3;
			this.play();
		} else {
			context.position = context.duration
			this.pause();
		}
		
	},
	rewind: function () {
		this.pause();
		if (context.position >= 0) {	
			context.position -= 3;
		} else {
			context.position = 0;
		}
		this.play();
	}, setup_master_filters: function () {
		var masterVolume = new Collaborave.Models.Filter({
			name: 'masterVolume',
			filter_type: 'createGain',
			settings: JSON.stringify({gain: { value: 1 }})
		});	
		this.set('filters', new Collaborave.Collections.Filters(masterVolume, {parent: track}));
		this.get('filters').add({
			name: 'analyzer',
			filter_type: 'createAnalyzer',
			settings: JSON.stringify({smoothingTimeConstant: 0.5, fftsize: 32})
		});
	}
});