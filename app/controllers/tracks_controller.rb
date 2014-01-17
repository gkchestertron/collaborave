class TracksController < ApplicationController
  def index
    @project = Project.find(params[:project_id])
    @tracks = @project.tracks
  end

  def new
    @track = Track.new
  end

  def create
    @track = Track.new(track_params)
    @project = @track.project
    if @track.save
      if params[:filters]
        params[:filters].each do |filter|
          filter_automations = filter[:filter_automations]
          filter.delete(:filter_automations)
          new_filter = @track.filters.new(filter)
          new_filter.track_id = @track.id
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
      render json: @track
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  def destroy
    @track = Track.find(params[:id])
    @track.destroy
    @project = @track.project
    redirect_to @project , notice:  "The track \"#{@track.track_name}\" has been deleted."
  end

  def show
    @track = Track.find(params[:id])
  end

private
  def track_params
    params.require(:track).permit(:name, :project_id)
  end
end
