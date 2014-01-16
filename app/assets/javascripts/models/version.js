Collaborave.Models.Version = Backbone.Model.extend({
	urlRoot: '/versions',
	parse: function (data) {
		var that = this;
		var track_diffs = data.track_diffs;
		data.track_diffs = new Collaborave.Collections.TrackDiffs(track_diffs, {parent: that, parse: true})
		return data;
	}
})