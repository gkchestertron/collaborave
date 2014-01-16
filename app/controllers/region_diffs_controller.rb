class RegionDiffsController < ApplicationController
	def index
		@track_diff = Track_diff.find(params[:track_diff_id])
		@region_diffs = @track_diff.region_diffs
	end

	def show
		@region_diff = RegionDiff.find(params[:id])
	end
end
