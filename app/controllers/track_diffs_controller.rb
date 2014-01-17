class TrackDiffsController < ApplicationController
	def index
		@version = Version.find(params[:version_id])
		@track_diffs = @version.track_diffs
	end

	def create
    @track_diff = TrackDiff.new(track_diff_params)
    if @track_diff.save
      if params[:filters]
        params[:filters].each do |filter|
          filter_automations = filter[:filter_automations]
          filter.delete(:filter_automations)
          new_filter = @track_diff.filters.new(filter)
          new_filter.track_diff_id = @track_diff.id
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
      render json: @track_diff.errors.full_messages, status: 422
    end
  end

  def destroy
    @track_diff = TrackDiff.find(params[:id])
    @track_diff.destroy
    head :ok
  end

  def update
    @track_diff = TrackDiff.find(params[:id])
    if @track_diff.update_attributes(track_diff_params)
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
      render json: @track_diff.errors.full_messages, status: 422
    end
  end

	def show
		@track_diff = TrackDiff.find(params[:id])
	end

	private
  def track_diff_params
    params.require(:track_diff).permit(:version_id, :track_id)
  end
end
