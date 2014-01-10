Collaborave.Collections.Regions = Backbone.Colection.extend({
	initialize: function (options) {
		this.track = options.track;
	},
	url: '/tracks/' + this.track + '/regions'
})