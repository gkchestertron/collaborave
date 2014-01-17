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
	play: function () {
		this.get('tracks').each(function (track) {
			track.play();
		});
	},
	stop: function () {
		this.get('tracks').each(function (track) {
			track.stop();
		});
	}
});