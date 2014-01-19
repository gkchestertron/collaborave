Collaborave.Views.Project = Backbone.View.extend({
	template: JST['projects/show'],
	events: {
		'click button#stop': 'stop',
		'click button#play': 'play',
		'click button#pause': 'pause',
		'click button#rewind': 'rewind',
		'click button#fast-forward': 'fastForward'
	},
	render: function () {
		var projectView = this;
		var content = this.template({ project: this.model });
		this.$el.html(content);
		this.model.get('tracks').each(function (track) {
			var trackView = new Collaborave.Views.Track({model: track});
			projectView.$el.find('#mixer').append(trackView.render());
		});
		return this.$el;
	},
	play: function () {
		console.log(this.model);
		this.model.play.bind(this.model)();
	},
	stop: function () {
		console.log(this.model);
		this.model.stop.bind(this.model)();
	},
	rewind: function () {
		console.log(this.model);
		this.model.rewind.bind(this.model)();
	},
	fastForward: function () {
		console.log(this.model);
		this.model.fastForward.bind(this.model)();
	},
	pause: function () {
		console.log(this.model);
		this.model.pause.bind(this.model)();
	}
});
