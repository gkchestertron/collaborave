#Readme
###Collaborave is an online recording/mixing app for music collaboration
I relied heavily on the mixer.js chrome experiment by Kevin Ennis, as well as the Audio Recorder library by Chris Wilson.

####check it out at www.collaborave.com

##Recording
Collaborave uses getUserMedia to obtain a stream from the user's audio hardware. I utilized the web worker from the AudioRecorder library to push the audio data into a float array for encoding once recording was finished. The app then uploads to an ftp server and saves the url in the main database for use later, while also rerendering the track with the new buffer and wavform.

##Playback/Mixing
The mixing features are simple audio nodes from the web audio api. The controls are presently linear, which is less than natural - another nicety I plan on implementing in the near future. The back-end holds the parameters needed to build filters/nodes dynamically via meta-programming on initializing the objects in backbone. It is ready for any dsp that can be created via the web audio api (well... it may need some tweaking).  It is also ready to receive automations for all of these parameters to allow for more powerful editing of tracks/regions by the user. I hope to get a graphic interface for basic editing in place soon.

##Social
This app is intended for collaboration. I'm almost done with versioning and comments/notes and adding collaborator users to each project. It's just about ready, but I've only had two weeks to build this so far.

##Backbone
The structure of Collaborave relies heavily on backbone for the passing of objects/data back and forth - some parts of the api are very messy and need some refactoring. Also, it is by no means a one-page app. I mostly used backbone for handling the massive amounts of ajax calls necessary for fetching and updating projects and their nested objects (tracks, regions, filters, and filter automations).

##Versioning
I also built that back-end for versioning of projects. Each version has associated track and region diffs that will be used to change filter and filter automation settings so that multiple users can work on the same project, create different versions and share their ideas without permanently altering the actual project.