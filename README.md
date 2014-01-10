# Collaborave html5-based social audio mixer & recorder built on rails

Collaborave makes collaborating on music projects easy over a distance. The mixer is implemented mostly on the client side, while managing users, social aspects and saving parameters are handled server-side.

# To do

I've got a long list of things to do:

Recording & Editing:
* associate multiple files with each track and add ability to start them at appropriate times
* build graphic editing interface (handling edits with timed cross-fades)
* add metronome (programmable with changing tempos and ability to adjust to specific time (for non-tempo breaks))
	* don't forget count-in for recording
* Sync metronome and graphic interface so recording and clips can sync
* add basic effects

Social:
* add sharing and invitation (via social media or email) function on fron-end

Code:
* refactor to remove redundancies in recording and playback (should only need one audioContext)
* add model for controlling upload limit - current loop in controller causes slow loading (set as attribute in database on upload)

Design:
* make a non-ugly interface... maybe something that looks like a mixer

Misc:
* tighten security - I have a lot of pieces to review
* add emails to login procedure

//snippets - including audio stuff
//put back in (or use tree to include)
<%= javascript_include_tag "AudioContextMonkeyPatch" %>
<%= javascript_include_tag "audiodisplay" %>
<%= javascript_include_tag "recorder" %>
<%= javascript_include_tag "main" %>
<%= javascript_include_tag "board" %>