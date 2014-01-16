class RegionsController < ApplicationController
	def index
		@track = Track.find(params[:track_id])
		@regions = @track.regions 
	end

	def show
		@region = Region.find(params[:id])
	end
end
