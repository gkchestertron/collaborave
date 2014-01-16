Collaborave.Collections.Filters = Backbone.Collection.extend({
	initialize: function (models, options) {
		this.parent_id = options.parent_id;
		this.parent_url = options.parent_url;
	},

	model: Collaborave.Models.Filter,

	url: function () {
		return this.parent_url + this.parent_id + '/filters';
	} 
})