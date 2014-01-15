Collaborave.Models.Project = Backbone.Model.extend({
	urlRoot: '/projects',
	parse: function (data) {
		//can do because it's still just json
		var tracks = data.tracks;
		//constructor will make models
		data.tracks = new Collaborave.Collections.ProjectTracks(tracks, {project: this});
		return data
	}
})