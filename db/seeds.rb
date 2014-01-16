# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

author_1 = User.create(name:"gkchestertron", email: "john.fellman@gmail.com", password: "foobies", password_confirmation: "foobies")
project_1 = author_1.projects.create(name: "Radium Girl")
track_1 = project_1.tracks.create(name: "Bass")
filter_1 = track_1.filters.create(name: "high_shelf", settings: "json hash of values to set", filter_type: "highshelf")
region_1 = track_1.regions.create(path: "bass.mp3", start_time: 0)
filter_2 = region_1.filters.create(name: "gain", settings: "json hash of values to set", filter_type: "gain")
filter_automation_1 = filter_2.filter_automations.create(method_name:"setValueAtTime", args:"json hash of args array")

version_1 = project_1.versions.create(collaborator_id: 1, name: "version 1")
track_diff_1 = version_1.track_diffs.create(track_id: 1)
filter_3 = track_diff_1.filters.create(name: "high_shelf", settings: "json hash of values to set", filter_type: "highshelf")
region_diff_1 = track_diff_1.region_diffs.create(region_id: 1, start_time: 0)
filter_4 = region_diff_1.filters.create(name: "gain", settings: "json hash of values to set", filter_type: "gain")
filter_automation_2 = filter_4.filter_automations.create(method_name:"setValueAtTime", args:"json hash of new args array")

 



