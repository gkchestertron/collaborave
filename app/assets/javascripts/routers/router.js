Collaborave.Routers.Router = Backbone.Router.extend({
	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},
	routes: {
		'': 'projectShow',
		'projects/:id': 'projectShow'
	},
	projectShow: function (id) {

		if (!id) {
			var id = 2;
		}

		var that = this;
		var project = new Collaborave.Models.Project({ id: id });

		project.fetch({
			success: function () {
				project.load();
				Collaborave.currentProject = project;
				var view = new Collaborave.Views.Project({ model: project });
				that._swapView(view);
				that.setupMainFilters();
			}
		})
	},
	_swapView: function (view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render());
	},
	setupMainFilters: function () {


		
	  
		//all metering / analyzer functions fired from the main scriptProcessorNode
		Collaborave.mainMeterNode.onaudioprocess = function() {
			Collaborave.analyzerctx = $('#analyzer').get()[0].getContext("2d");
			// get the average, bincount is fftsize / 2
		  var array =  new Uint8Array(Collaborave.analyzer.frequencyBinCount);
		  Collaborave.analyzer.getByteFrequencyData(array);
		  var average = getAverageVolume(array)

		  var array2 =  new Uint8Array(Collaborave.mainMeter.frequencyBinCount);
		  Collaborave.mainMeter.getByteFrequencyData(array2);
		  var leftAverage = getAverageVolume(array2);

		  var array3 =  new Uint8Array(Collaborave.mainMeter2.frequencyBinCount);
		  Collaborave.mainMeter2.getByteFrequencyData(array3);
		  var rightAverage = getAverageVolume(array3);

		  // //master track volume
		  // // clear the current state
		  // Collaborave.analyzerctx.clearRect(0, 0, 17, 130);
		  // // set the fill style
		  // Collaborave.analyzerctx.fillStyle='#999999';
		  // // create the left meter
		  // Collaborave.analyzerctx.fillRect(10,130-leftAverage,3,130);
		  // //create the right meter
		  // Collaborave.analyzerctx.fillRect(14,130-rightAverage,3,130);

		  //analyzer
		  // clear the current state
		  Collaborave.analyzerctx.clearRect(0, 0, 1025, 300);
		  // set the fill style
		  Collaborave.analyzerctx.fillStyle='#ccc';
		  // create the bars
		  drawSpectrum(array);

		  function drawSpectrum(array) {
		    for ( var i = 0, j = 0; i < (array.length); i++, j++ ){
		          var value2 = array[i];
		          Collaborave.analyzerctx.fillRect(i,299-value2,1,300);
		    }
		  };  

		  function getAverageVolume(array) {
		    var values = 0;
		    var average;

		    var length = array.length;

		    // get all the frequency amplitudes
		    for (var i = 0; i < length; i++) {
		        values += array[i];
		    }

		    average = values / length;
		    return average;
		  }    
		}
	} 
});