Collaborave.Models.Region = Backbone.Model.extend({
	initialize: function (options) {
	},
	urlRoot: '/regions',
	
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
	    	//set project duration 
	    	var regionLength = parseFloat(region.get('start_time')) + buffer.duration;
	    	if (context.duration < regionLength) {
	        context.duration = regionLength;
	      }
	      region.buffer = buffer;
	      Collaborave.loadCount += 1;
	      $('#download-overlay').find('.progress-bar').css('width', 100 * Collaborave.loadCount/Collaborave.regionCount + '%');
	      
	      if (Collaborave.loadCount === Collaborave.regionCount) {
	      	Collaborave.currentProjectView.render();
	      	setTimeout(function () {
	      		$('#download-overlay').fadeOut('slow');
	      	}, 1000);
	      	
	      }
	    });
	  }
	  request.send();
	},

	parse: function (data) {
		var that = this;
		var filters = data.filters;
		data.filters = new Collaborave.Collections.Filters(filters, {parent: that, parent_url: '/regions/', parse: true}) 
		return data;
	},
	
	play: function (track_node) {
    var region = this;
    region.source = context.createBufferSource();
    region.source.buffer = region.buffer;
    region.source.connect(track_node);

    var startTime = parseFloat(region.get('start_time'));
    var when = context.currentTime + startTime - context.position; 
    var offset;
    
    if (when + region.buffer.duration <= context.currentTime) {
      return;
    } else if (when <= context.currentTime) {                        
      offset = context.position - startTime;
      region.playing = true;
      region.source.start(0, offset);
    } else {
      offset = context.position;
      region.playing = true;
      region.source.start(when, offset);
    }     
  },

	stop: function () {
		var region = this;
		if (region.playing) {
			region.playing = false;
			region.source.stop(0);
		}
	}
})