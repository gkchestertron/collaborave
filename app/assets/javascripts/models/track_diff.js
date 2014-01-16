Collaborave.Models.TrackDiff = Backbone.Model.extend({
	urlRoot: 'track_diffs',
	parse: function (data) {
		var that = this;
		var region_diffs = data.region_diffs;
		data.region_diffs = new Collaborave.Collections.RegionDiffs(region_diffs, {parent: that, parse:true});
		var filters = data.filters;
		data.filters = new Collaborave.Collections.Filters(filters, {parent: that, parent_url: '/track_diffs/', parse: true});
		return data;
	}
})