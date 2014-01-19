Collaborave.Views.Region = Backbone.View.extend({
	initialize: function (options) {
		this.height = options.height;
	},
	template: JST['regions/show'],
	render: function () {
		var regionView = this;
		var region = this.model;
		var content = this.template({region: this.model, height: this.height});
		this.$el.html(content);
		this.model.context = this.$el.find('canvas').get()[0].getContext("2d");
		this.model.height = this.height;
		return this.$el
	}	
});