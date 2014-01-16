Collaborave.Models.Region = Backbone.Model.extend({
	urlRoot: '/regions',
	parse: function (data) {
		var that = this;
		var filters = data.filters;
		data.filters = new Collaborave.Collections.Filters(filters, {parent: that, parent_url: '/regions/', parse: true}) 
		return data;
	}
})