Collaborave.Collections.RegionDiffs = Backbone.Collection.extend({
	initialize: function (models, options) {
		this.parent = options.parent;
	},
	model: Collaborave.Models.RegionDiff,
	url: '/track_diffs/' + this.parentid + 'region_diffs' 
})