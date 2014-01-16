Collaborave.Models.FilterAutomation = Backbone.Model.extend({
	initialize: function (options) {
		var that = this;
		_.each(options, function (val, key) {
			that[key] = val;
		});
	},
	urlRoot: '/filter_automations'
});