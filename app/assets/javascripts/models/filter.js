Collaborave.Models.Filter = Backbone.Model.extend({
	urlRoot: '/filters',
	parse: function (data) {
		var filter_automations = data.filter_automations;
		data.filter_automations = new Collaborave.Collections.FilterAutomations(filter_automations, {parent_id: data.id});
		return data;
	}
})