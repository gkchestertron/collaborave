Collaborave.Models.Version = Backbone.Model.extend({
	urlRoot: '/versions',
	parse: function (data) {
		var track_diffs = data.track_diffs;
		data.track_diffs = new Collaborave.Collections.TrackDiffs(track_diffs, {parent_id: data.id, parse: true})
		return data;
	}
})