Collaborave.Models.RegionDiff = Backbone.Model.extend({
	urlRoot: '/region_diffs',
	parse: function (data) {
		var filters = data.filters;
		data.filters = new Collaborave.Collections.Filters(filters, {parent_id: data.id, parent_url: '/track_diffs/', parse: true});
		return data;
	}
})