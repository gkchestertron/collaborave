Collaborave.Collections.Tracks = Backbone.Collection.extend({
	initialize: function (options) {
		this.project = options.project
	},
	model: Collaborave.Models.Track,
	url: '/projects/' + this.project.id + '/tracks'
});