Collaborave.Models.Track = Backbone.Model.extend({
	initialize: function () {
		this.setup_default_filters();
		this.signal_path = [];
		this.create_signal_path();
		this.add_track_div();
		this.muted = false;
		this.soloed = false;
	},
	add_track_div: function () {
		var track = this;
		trackDiv = $('<div><b>' + track.get('name') + '</div>').appendTo('#mixer');
      },
	create_signal_path: function () {
		var track = this;

		//create array of audio context nodes
		track.get('filters').each(function (filter) {
			var filter_type = filter.get('filter_type');
			var settings = JSON.parse(filter.get('settings'));
			var name = filter.get('name');
			var filter = context[filter_type]();
			filter.name = name
			_.each(settings, function (val, key) {

				if (typeof val === 'object') {
					_.each(val, function (val1, key1) {
						filter[key][key1] = val1;
					});
				} else {
					filter[key] = val;
				}
			});
			track.signal_path.push(filter);	
		});

		//connect filters
		for (var i = 1; i < this.signal_path.length; i++) {
			this.signal_path[i-1].connect(this.signal_path[i]);
		}
		track.signal_path[track.signal_path.length - 1].connect(Collaborave.masterTrack);
	},
	urlRoot: '/tracks',
	parse: function (data) {
		var that = this;
		var regions = data.regions;
		data.regions = new Collaborave.Collections.Regions(regions, {track: this, parse: true});
		var filters = data.filters
		data.filters = new Collaborave.Collections.Filters(filters, {parent: that, parent_url: '/tracks/', parse: true});
		return data;
	},
	toJSON: function () {
		var attrs = _.clone(this.attributes);
		if (attrs.filter_automations) {
			attrs.filters = attrs.filters.toJSON();
		};
		return attrs;
	},
	load: function () {
		this.get('regions').each(function (region) {
			region.load();
		});
	},
	play: function () {
		var track = this;
		this.get('regions').each(function (region) {
			region.play(track.signal_path[0]);
		});
	},
	stop: function () {
		this.get('regions').each(function (region) {
			region.stop();
		});
	},
	setup_default_filters: function () {
		var track = this;
		
		var volume = new Collaborave.Models.Filter({
			name: 'volume',
			filter_type: 'createGain',
			settings: JSON.stringify({gain: { value: 1 }})
		});	
		this.set('filters', new Collaborave.Collections.Filters(volume, {parent: track}));
		this.get('filters').add({
			name: 'highs',
			filter_type: 'createBiquadFilter',
			settings: JSON.stringify({type: "highshelf", frequency: { value: 7000 }, gain: { value: 0 }})
		});
		this.get('filters').add({
			name: 'mids',
			filter_type: 'createBiquadFilter',
			settings: JSON.stringify({type: 'peaking', frequency: { value: 3500 }, Q: { value: 0.9 }, gain: { value: 0 }})
		});
		this.get('filters').add({
			name: 'lows',
			filter_type: 'createBiquadFilter',
			settings: JSON.stringify({type: 'lowshelf', frequency: { value: 440 }, gain: { value: 0 }})
		});
		this.get('filters').add({
			name: 'pan',
			filter_type: 'createPanner',
			settings: JSON.stringify({panningModel: "equalpower"})
		});
		this.get('filters').add({
			name: 'mute',
			filter_type: 'createGain',
			settings: JSON.stringify({gain: { value: 1 }})
		});
		this.get('filters').add({
			name: 'solo',
			filter_type: 'createGain',
			settings: JSON.stringify({gain: { value: 1 }})
		});
	},
	set_filter: function(name, settings) {
		var track = this;
		filter = _.find(track.signal_path, function (obj) {return obj.name == name});
		_.each(settings, function (val, key) {
			
			if (typeof val === 'object') {
				_.each(val, function (val1, key1) {
					filter[key][key1] = val1;
				});
			} else {
				filter[key] = val;
			}
		});
	}
});
