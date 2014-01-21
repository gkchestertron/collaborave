window.AudioContext = window.AudioContext||window.webkitAudioContext;
context = new AudioContext();
context.position = 0;
context.position_diff = 0;
context.duration = 0;



window.Collaborave = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Collaborave.getPosition = function (element){
      var el = $(element);
      var position = [el.offset().left, el.offset().top];
      return position;
    };
    Collaborave.router = new Collaborave.Routers.Router({$rootEl: $("#content")});
		Backbone.history.start();
		Collaborave.masterTrack = context.createGain();
		Collaborave.masterTrack.gain.value = 1;
		Collaborave.mainMeter = context.createAnalyser();
		Collaborave.mainMeter.smoothingTimeConstant = 0.5;
		Collaborave.mainMeter.fftSize = 32;

		Collaborave.mainMeter2 = context.createAnalyser();
		Collaborave.mainMeter.smoothingTimeConstant = 0.5;
		Collaborave.mainMeter.fftSize = 32;  

		Collaborave.analyzer = context.createAnalyser();
		Collaborave.analyzer.smoothingTimeConstant = 0.5;
		Collaborave.analyzer.fftsize = 32;  

		Collaborave.mainSplitter = context.createChannelSplitter();  

		//main connections  
		Collaborave.mainMeterNode = context.createScriptProcessor(2048, 1, 1);  
		Collaborave.mainMeterNode.connect(context.destination);
		Collaborave.masterTrack.connect(Collaborave.mainSplitter);
		Collaborave.mainSplitter.connect(Collaborave.mainMeter,0,0);
		Collaborave.mainSplitter.connect(Collaborave.mainMeter2,1,0);
		Collaborave.masterTrack.connect(Collaborave.analyzer);
		Collaborave.analyzer.connect(context.destination);
		Collaborave.mainMeter.connect(Collaborave.mainMeterNode);
		Collaborave.masterTrack.connect(context.destination);
  }
};

Collaborave.updateTimer = function (){

  //set max time
  if (context.duration < context.position) {
    context.position = context.duration;
    Collaborave.currentProject.pause();
    document.getElementById("timer").innerHTML = timerString(context.position);  
  }

  //set minimum time
  if (context.position < 0) {
    context.position = 0;
    Collaborave.currentProject.pause();
    document.getElementById("timer").innerHTML = timerString(context.position); 
  } 

  //update timer (made acurate thanks to the web audio API's currentTimer)
  if (context.playing === true) {
    context.position += (context.currentTime - context.position_diff);      
  }
  if (context.position != 0) document.getElementById("timer").innerHTML = timerString(context.position); 
  context.position_diff = context.currentTime;
  // drawSlider(); 

  //draw time slider
  // function drawSlider(){
  //   ctxt.clearRect(0, 0, 10, 1000);
  //       ctxt.fillStyle='#ccc';
  //       ctxt.fillRect(0,0,duration,6);
  //       ctxt.fillStyle='#999';
  //       ctxt.fillRect(0,0,timeoffset,6);
  // }

  //make string for timer (use floor/rounding and pad with zeros)
  function timerString(time){
    minutes = Math.floor(time/60);
    seconds = Math.floor(time - (minutes*60));
    centiseconds = time - Math.floor(time);
    string = zeroPad(minutes,2) + ":" + zeroPad(seconds,2) + '.' + zeroPad(Math.floor(centiseconds*100),2);
    return string;  
  }  

  //zero padding function
  function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }
}

Collaborave.Recorder = {};

Collaborave.Recorder.initAudio = function () {
  if (!navigator.getUserMedia)
      navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  if (!navigator.cancelAnimationFrame)
      navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
  if (!navigator.requestAnimationFrame)
      navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

  function gotStream(stream) {
    Collaborave.Recorder.inputPoint = context.createGain();

    // Create an AudioNode from the stream.
    Collaborave.Recorder.realAudioInput = context.createMediaStreamSource(stream);
    Collaborave.Recorder.realAudioInput.connect(Collaborave.Recorder.inputPoint);

    //    audioInput = convertToMono( input );

    Collaborave.Recorder.analyserNode = context.createAnalyser();
    Collaborave.Recorder.analyserNode.fftSize = 2048;
    Collaborave.Recorder.inputPoint.connect( Collaborave.Recorder.analyserNode );

    // audioRecorder = new Recorder( inputPoint );

    Collaborave.Recorder.monitorGain = context.createGain();
    Collaborave.Recorder.monitorGain.gain.value = 0;
    Collaborave.Recorder.inputPoint.connect( Collaborave.Recorder.monitorGain );
    Collaborave.Recorder.monitorGain.connect( Collaborave.masterTrack );
    
}

    navigator.getUserMedia({audio:true}, gotStream, function(e) {
            alert('Error getting audio');
            console.log(e);
        });
}


