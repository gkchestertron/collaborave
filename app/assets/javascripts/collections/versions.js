Collaborave.Collections.Versions = Backbone.Collection.extend({
	initialize: function (models, options) {
		this.parent_id = options.parent_id;
	},
	model: Collaborave.Models.Version,
  url: function () { 
  	return '/projects/' + this.parent_id + '/versions'
	}
})