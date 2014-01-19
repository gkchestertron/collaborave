class ProjectsController < ApplicationController
	# before_action :signed_in_user

	def create
    @project = Project.new(project_params)
    track_params = params[:tracks]
    if @project.save
      save_tracks(track_params, @project) if track_params
      render :show
    else
      render json: @project.errors.full_messages
    end
  end

	def destroy
		@project = Project.find(params[:id])
    @project.destroy
    head :ok
	end

  def index
    render json: current_user.projects.to_json(include: :tracks)        
  end

  def show
  	@project = Project.find(params[:id])
	end

  def update
    @project = Project.find(params[:id])
    track_params = params[:tracks]
    if @project.update_attributes(project_params)
      update_tracks(track_params, @project) if track_params
      render :show
    else
      render json: @project.errors.full_messages
    end
  end


	private

		def project_params
			params.require(:project).permit(:name, :author_id)
		end	

		def correct_user
			@project = current_user.projects.find_by(id: params[:id])
			redirect_to root_url if @project.nil?
		end	

    def save_tracks(track_params, parent)
      track_params.each do |track_param|
        filter_params = track_param.delete(:filters)
        region_params = track_param.delete(:regions)
        track = parent.tracks.new(track_param)
        if track.save
          save_filters(filter_params, track) if filter_params
          save_regions(region_params, track) if region_params
        end
      end
    end

    def save_filters(filter_params, parent)
      filter_params.each do |filter_param|
        filter_automation_params = filter_param.delete(:filter_automations)
        filter = parent.filters.new(filter_param)
        if filter.save
          save_filter_automations(filter_automation_params, filter) if filter_automation_params
        end
      end
    end

    def save_filter_automations(filter_automation_params, parent)
      filter_automation_params.each do |filter_automation_param|
        filter_automation = parent.filter_automations.create(filter_automation_param)
      end
    end

    def save_regions(region_params, parent)
      region_params.each do |region_param|
        filter_params = region_param.delete(:filters)
        region = parent.regions.new(region_param)
        if region.save 
          save_filters(filter_params, region) if filter_params
        end 
      end
    end    

    def update_tracks(track_params, parent)
      track_params.each do |track_param|
        filter_params = track_param.delete(:filters)
        region_params = track_param.delete(:regions)
        track = Track.find(track_param[:id])
        if track.update_attributes(track_param)
          update_filters(filter_params, track) if filter_params
          update_regions(region_params, track) if region_params
        end
      end
    end

    def update_filters(filter_params, parent)
      filter_params.each do |filter_param|
        filter_automation_params = filter_param.delete(:filter_automations)
        filter = parent.filters.new(filter_param)
        if filter.update_attributes(filter_param)
          update_filter_automations(filter_automation_params, filter) if filter_automation_params
        end
      end
    end

    def update_filter_automations(filter_automation_params, parent)
      filter_automation_params.each do |filter_automation_param|
        filter_automation = parent.filter_automations.update_attributes(filter_automation_param)
      end
    end

    def update_regions(region_params, parent)
      region_params.each do |region_param|
        filter_params = region_param.delete(:filters)
        region = parent.regions.new(region_param)
        if region.update_attributes(region_param)
          update_filters(filter_params, region) if filter_params
        end 
      end
    end     

end
