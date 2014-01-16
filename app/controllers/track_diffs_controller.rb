class TrackDiffsController < ApplicationController
	def index
		@version = Version.find(params[:version_id])
		@track_diffs = @version.track_diffs
	end

	def show
		@track_diff = TrackDiff.find(params[:id])
	end
end
