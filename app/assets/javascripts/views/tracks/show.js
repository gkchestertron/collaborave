Collaborave.Views.Track = Backbone.View.extend({
	template: JST['tracks/show'],
	render: function () {
		var trackView = this;
		var track = this.model;
		var content = this.template({track: this.model});
		this.$el.html(content);
		this.model.get('regions').each(function (region) {
			var regionView = new Collaborave.Views.Region({model: region, height: 198/track.get('regions').length});
			trackView.$el.find('.wavforms').append(regionView.render());
		});
		return this.$el
	}	
});