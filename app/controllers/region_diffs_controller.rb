class RegionDiffsController < ApplicationController
	def index
		@track_diff = TrackDiff.find(params[:track_diff_id])
		@region_diffs = @track_diff.region_diffs
	end

	def show
		@region_diff = RegionDiff.find(params[:id])
	end

	def create
    @region_diff = RegionDiff.new(region_diff_params)
    if @region_diff.save
      if params[:filters]
        params[:filters].each do |filter|
          filter_automations = filter[:filter_automations]
          filter.delete(:filter_automations)
          new_filter = @region_diff.filters.new(filter)
          new_filter.region_diff_id = @region_diff.id
          if new_filter.save
            if filter_automations 
              filter_automations.each do |filter_automation|
                new_filter_automation = new_filter.filter_automations.new(filter_automation)
                new_filter_automation.filter_id = new_filter.id
                new_filter_automation.save
              end
            end
          end
        end
      end
      render :show
    else
      render json: @region_diff.errors.full_messages, status: 422
    end
  end

  def destroy
    @region_diff = RegionDiff.find(params[:id])
    @region_diff.destroy
    head :ok
  end

  def update
    @region_diff = RegionDiff.find(params[:id])
    if @region_diff.update_attributes(region_diff_params)
      if params[:filters]
        params[:filters].each do |filter|
          update_filter = Filter.find(filter[:id])
          filter_automations = filter[:filter_automations]
          filter.delete(:filter_automations)
          if update_filter.update_attributes(filter)
            if filter_automations 
              filter_automations.each do |filter_automation|
                update_filter_automation = update_filter.filter_automations.find(filter_automation[:id])
                update_filter_automation.filter_id = update_filter.id
                update_filter_automation.save
              end
            end
          end
        end
      end
      render :show
    else
      render json: @region_diff.errors.full_messages, status: 422
    end
  end

end
