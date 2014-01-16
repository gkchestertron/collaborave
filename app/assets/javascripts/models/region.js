Collaborave.Models.Region = Backbone.Model.extend({
	rootUrl: '/regions',
	parse: function (data) {
		var filters = data.filters;
		data.filters = new Collaborave.Collections.Filters(filters, {parent_id: data.id, parent_url: '/regions/', parse: true}) 
		return data;
	}
})