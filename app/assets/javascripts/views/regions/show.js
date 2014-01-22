Collaborave.Views.Region = Backbone.View.extend({
	initialize: function (options) {
		this.height = options.height;
		if (this.model.buffer) {
			this.width = 817 * (this.model.buffer.duration/context.duration);
			this.offset = 817 * (parseFloat(this.model.get('start_time'))/context.duration);
		}
	},
	template: JST['regions/show'],
	render: function () {
		var regionView = this;
		var region = this.model;
		var content = this.template({region: this.model, height: this.height, width: this.width, offset: this.offset});
		this.$el.html(content);
		this.model.context = this.$el.find('canvas').get()[0].getContext("2d");
		if (this.model.buffer) {
			this.model.drawBuffer(this.width, this.height, this.offset);
		}
		this.model.height = this.height;
		return this.$el
	}	
});