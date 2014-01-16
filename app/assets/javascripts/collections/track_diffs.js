Collaborave.Collections.TrackDiffs = Backbone.Collection.extend({
	initialize: function (models, options) {
		this.parent_id = options.parent_id;
	},
	model: Collaborave.Models.TrackDiff,
	url: function () {
		return '/versions/' + this.parent_id + '/track_diffs'
	}
})