Collaborave.Models.Filter = Backbone.Model.extend({
	urlRoot: '/filters',
	parse: function (data) {
		var that = this;
		var filter_automations = data.filter_automations;
		data.filter_automations = new Collaborave.Collections.FilterAutomations(filter_automations, {parent: that});
		return data;
	},
	toJSON: function () {
		var attrs = _.clone(this.attributes);
		if (attrs.filter_automations) {
			console.log("logging: " + attrs.filter_automations)
			attrs.filter_automations = attrs.filter_automations.toJSON();
		};
		return attrs;
	}
});