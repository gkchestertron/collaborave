window.AudioContext = window.AudioContext||window.webkitAudioContext;
context = new AudioContext();

window.Collaborave = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Collaborave.Routers.Router();
		Backbone.history.start();
  }
};

$(document).ready(function(){
  Collaborave.initialize();
});
