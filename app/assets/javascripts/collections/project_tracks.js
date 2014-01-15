Collaborave.Collections.ProjectTracks = Backbone.Collection.extend({
	initialize: function (models, options) {
		this.project = options.project;
	},
	model: Collaborave.Models.Track,
	url: function () { 
		return "/projects/" + this.project.id + "/tracks"
	}
});