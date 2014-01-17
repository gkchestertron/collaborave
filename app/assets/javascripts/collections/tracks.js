Collaborave.Collections.Tracks = Backbone.Collection.extend({
	initialize: function (models, options) {
		this.parent = options.parent;
	},
	model: Collaborave.Models.Track,
	url: function () { 
		return "/projects/" + this.project.id + "/tracks"
	}
});