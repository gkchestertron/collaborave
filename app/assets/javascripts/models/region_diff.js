Collaborave.Models.RegionDiff = Backbone.Model.extend({
	urlRoot: '/region_diffs',
	parse: function (data) {
		var that = this;
		var filters = data.filters;
		data.filters = new Collaborave.Collections.Filters(filters, {parent: that, parent_url: '/track_diffs/', parse: true});
		return data;
	}
})