Collaborave.Models.TrackDiff = Backbone.Model.extend({
	urlRoot: 'track_diffs',
	parse: function (data) {
		var region_diffs = data.region_diffs;
		data.region_diffs = new Collaborave.Collections.RegionDiffs(region_diffs, {parent_id: data.id, parse:true});
		var filters = data.filters;
		data.filters = new Collaborave.Collections.Filters(filters, {parent_id: data.id, parent_url: '/track_diffs/', parse: true});
		return data;
	}
})