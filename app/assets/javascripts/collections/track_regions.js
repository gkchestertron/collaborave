Collaborave.Collections.Regions = Backbone.Collection.extend({
	initialize: function (models, options) {
		this.track = options.track;
	},
	model: Collaborave.Models.Region,
	url: function () {
		return '/tracks/' + this.track.get('id') + '/regions'
	}
});