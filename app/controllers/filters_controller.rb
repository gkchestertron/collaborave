class FiltersController < ApplicationController
	def create
		@filter = Filter.new(filter_params)

		if @filter.save
			if params[:filter_automations] 
				params[:filter_automations].each do |filter_automation|
				new_filter_automation = @filter.filter_automations.new(filter_automation)
				new_filter_automation.filter_id = @filter.id
				new_filter_automation.save
			end
		end
			render json: @filter
		else
			render json: @filter.errors.full_messages, status: 422
		end
	end

	def destroy
		Filter.find(params[:id]).destroy
		head :ok
	end

	def index
		@parent = Track.find(params[:track_id]) || Region.find(params[:region_id]) || TrackDiff.find(params[:track_diff_id]) || RegionDiff.find(params[:region_diff_id])
		@filters = @parent.filters 
	end

	def show
		@filter = Filter.find(params[:id])
	end

	def update
		@filter = Filter.find(params[:id])

		if @filter.update_parameters(filter_params)
			render json: @filter
		else
			render json: @filter.errors.full_messages, status: 402
		end
	end

	private
		def filter_params
			params.require(:filter).permit(:name, :track_id, :track_diff_id, :region_id, :region_diff_id, :signal_path_order, :settings, :filter_type)
		end
end
