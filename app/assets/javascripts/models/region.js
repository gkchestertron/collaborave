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
	drawBuffer: function ( width, height ) {
		var data = this.buffer.getChannelData(0);
		var context = this.context;
    var step = Math.ceil( data.length / width );
    var amp = height / 2;
    context.fillStyle = '#ccc';
    context.clearRect(0,0,width,height);
    for(var i=0; i < width; i++){
      var min = 1.0;
      var max = -1.0;
      for (j=0; j<step; j++) {
          var datum = data[(i*step)+j]; 
          if (datum < min)
              min = datum;
          if (datum > max)
              max = datum;
      }
      context.fillRect(i,(1+min)*amp,1,Math.max(1,(max-min)*amp));
    }
	},
	load: function () {
		var region = this;
	  var request = new XMLHttpRequest();
	  request.open('GET', region.get('path').path.url, true);
	  request.responseType = 'arraybuffer';

	  // Decode asynchronously
	  request.onload = function() {
	    context.decodeAudioData(request.response, function(buffer) {
	    	//set project duration (eventually will need to adjust for non-full-length regions)
	    	if (context.duration < buffer.duration) {
	        context.duration = buffer.duration;
	      }
	      region.buffer = buffer;
	      region.drawBuffer(817, region.height)
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