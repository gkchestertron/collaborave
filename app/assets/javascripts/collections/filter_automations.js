Collaborave.Collections.FilterAutomations = Backbone.Collection.extend({
	initialize: function (models, options) {
		this.parent_id = options.parent_id;
	},
	model: Collaborave.Models.FilterAutomation,
	url: '/filters/' + this.parent_id + '/fiter_automations'
});