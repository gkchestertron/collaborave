Collaborave.Collections.TrackDiffs = Backbone.Collection.extend({
	initialize: function (models, options) {
		this.parent = options.parent;
	},
	model: Collaborave.Models.TrackDiff,
	url: function () {
		return '/versions/' + this.parent.id + '/track_diffs'
	}
})