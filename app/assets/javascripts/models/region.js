Collaborave.Models.Region = Backbone.Model.extend({
	initialize: function (options) {
	},
	urlRoot: '/regions',
	parse: function (data) {
		var that = this;
		var filters = data.filters;
		data.filters = new Collaborave.Collections.Filters(filters, {parent: that, parent_url: '/regions/', parse: true}) 
		return data;
	},
	load: function () {
		var region = this;
	  var request = new XMLHttpRequest();
	  request.open('GET', region.get('path'), true);
	  request.responseType = 'arraybuffer';

	  // Decode asynchronously
	  request.onload = function() {
	    context.decodeAudioData(request.response, function(buffer) {
	    	//set project duration (eventually will need to adjust for non-full-length regions)
	    	if (context.duration < buffer.duration) {
	        context.duration = buffer.duration;
	      }
	      region.buffer = buffer;
	    });
	  }
	  request.send();
	},
	play: function (track_node) {
		var region = this;
		region.source = context.createBufferSource();
		region.source.buffer = region.buffer;
		region.source.connect(track_node);
		region.source.start(context.currentTime + parseInt(region.get('start_time')) || 0, context.position);
		
	},

	stop: function () {
		var region = this;
		region.source.stop(0);
	}
})