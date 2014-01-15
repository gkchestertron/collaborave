Collaborave.Models.Track = Backbone.Model.extend({
	urlRoot: '/tracks',
	parse: function (data) {
		var regions = data.regions;
		data.regions = new Collaborave.Collections.Regions(regions, {track: this});
		return data;
	}
})