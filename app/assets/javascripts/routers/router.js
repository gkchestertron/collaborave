Collaborave.Routers.Router = Backbone.Router.extend({
	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},
	routes: {
		'projects/:id': 'projectShow'
	},
	projectShow: function (id) {
		var that = this;
		var project = new Collaborave.Models.Project({ id: id });

		project.fetch({
			success: function () {
				project.load();
				Collaborave.project = project;
				var view = new Collaborave.Views.Project({ model: project });
				that._swapView(view);

			}
		})
	},
	_swapView: function (view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render());
	} 
});