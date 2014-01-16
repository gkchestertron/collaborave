Collaborave.Collections.RegionDiffs = Backbone.Collection.extend({
	initialize: function (models, options) {
		this.parent_id = options.parent_id;
	},
	model: Collaborave.Models.RegionDiff,
	url: '/track_diffs/' + this.parent_id + 'region_diffs' 
})