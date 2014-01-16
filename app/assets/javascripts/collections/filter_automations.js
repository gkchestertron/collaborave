Collaborave.Collections.FilterAutomations = Backbone.Collection.extend({
	initialize: function (models, options) {
		this.parent = options.parent;
	},
	model: Collaborave.Models.FilterAutomation,
	url: function () { 
		return '/filters/' + this.parent.id + '/fiter_automations';
	}
});