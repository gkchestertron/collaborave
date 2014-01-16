Collaborave.Collections.Versions = Backbone.Collection.extend({
	initialize: function (models, options) {
		this.parent = options.parent;
	},
	model: Collaborave.Models.Version,
  url: function () { 
  	return '/projects/' + this.parent.id + '/versions'
	}
})