Collaborave.Models.Project = Backbone.Model.extend({
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
	}
});