class RegionsController < ApplicationController
	def index
		@track = Track.find(params[:track_id])
		@regions = @track.regions 
	end

	def show
		@region = Region.find(params[:id])
	end

	def create
    @region = Region.new(region_params)
    if @region.save
      if params[:filters]
        params[:filters].each do |filter|
          filter_automations = filter[:filter_automations]
          filter.delete(:filter_automations)
          new_filter = @region.filters.new(filter)
          new_filter.region_id = @region.id
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
      redirect_to "/#{region_params[:redirect_hash]}"
    else
      render json: @region.errors.full_messages, status: 422
    end
  end

  def destroy
    @region = Region.find(params[:id])
    @region.destroy
    head :ok
  end

  def update
    @region = Region.find(params[:id])
    if @region.update_attributes(region_params)
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
      render json: @region.errors.full_messages, status: 422
    end
  end


  private
    def region_params
      params.require(:region).permit(:path, :track_id, :start_time)
    end
end
