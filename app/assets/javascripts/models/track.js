Collaborave.Models.Track = Backbone.Model.extend({
	urlRoot: '/tracks',
	parse: function (data) {
		var that = this;
		var regions = data.regions;
		data.regions = new Collaborave.Collections.Regions(regions, {track: this, parse: true});
		var filters = data.filters
		data.filters = new Collaborave.Collections.Filters(filters, {parent: that, parent_url: '/tracks/', parse: true});
		return data;
	}
});
