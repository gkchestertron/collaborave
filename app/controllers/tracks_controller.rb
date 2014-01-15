class TracksController < ApplicationController
  def index
    @project = Project.find(params[:project_id])
    @tracks = @project.tracks
    render json: @tracks 
  end

  def new
    @track = Track.new
  end

  def create
    @track = Track.new(track_params)
    @project = @track.project

    if @track.save
      redirect_to @project, notice: "The track \"#{@track.track_name}\" has been uploaded."
    else
      redirect_to @project, notice: "The track did not save."
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
    render json: @track.to_json(include: :regions)
  end

private
  def track_params
    params.require(:track).permit(:track_name, :path, :project_id)
  end
end
