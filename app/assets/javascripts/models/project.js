Collaborave.Models.Project = Backbone.Model.extend({
	initialize: function () {
		Collaborave.regionCount = 0;
		Collaborave.loadCount = 0;
		//need to initialize with a collection
		// if (!this.get('tracks')) {
		// 	this.set('tracks', new Collaborave.Collections.Tracks({name:"track 1"}, {parent: this}));
		// }
	},
	urlRoot: '/projects',
	parse: function (data) {
		var that = this;
		var tracks = data.tracks;
		data.tracks = new Collaborave.Collections.Tracks(tracks, { project: this, parse: true });
		var versions = data.versions;
		data.versions = new Collaborave.Collections.Versions(versions, { parent: that, parse: true });
		return data;
	},
	load: function () {
		this.get('tracks').each(function (track) {
			Collaborave.regionCount += track.get('regions').length;
		});

		if (Collaborave.regionCount === 0) {
    	setTimeout(function () {
    		$('#download-overlay').fadeOut('slow');
    	}, 1000);	
    }
		this.get('tracks').each(function (track) {
			track.load();
		});
	},
	pause: function () {
		if (context.playing) {
			context.playing = false;
			
			this.get('tracks').each(function (track) {
				track.stop();
			});
			if (Collaborave.Recorder.trackId) {
				Collaborave.Recorder.toggleRecording();
			}
		}
	},
	play: function () {
		var project = this;
		if ((context.position + (context.currentTime - context.position_diff) > context.duration) && (!Collaborave.Recorder.trackId)) {
			project.stop();
		}
		if (!context.playing) {	
			context.playing = true;
			// context.position_diff = context.currentTime;
			if (Collaborave.Recorder.trackId) {
				Collaborave.Recorder.toggleRecording();
			}
			
			this.get('tracks').each(function (track) {
				track.play();
			});
		}
	},
	stop: function () {
		if (Collaborave.Recorder.trackId) {
				Collaborave.Recorder.toggleRecording();
			}
		context.playing = false;
		context.position = 0;
		document.getElementById("timer").innerHTML = '00:00.00';   
		this.get('tracks').each(function (track) {
			track.stop();
		});
		
	},
	fastForward: function () {
		if (context.position <= context.duration) {
			if (context.playing) {
				this.pause();
				context.position += 3;
				this.play();
			} else {
				context.position += 3;
			}
		} else {
			context.position = context.duration
			this.pause();
		}
		
	},
	rewind: function () {
		if (context.position >= 0) {	
			if (context.playing) {
				this.pause();
				context.position -= 3;
				this.play();
			} else {
				context.position -= 3;
			}
		} else {
			context.position = 0;
		}
	}
});