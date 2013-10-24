class ProjectsController < ApplicationController
	before_action :signed_in_user

	def create
		@project = current_user.projects.build(project_params)
		if @project.save
			flash[:success] = "Project created!"
			redirect_to root_url
		else
			render 'static_pages/home'
		end	
	end

	def destroy
	end

	def show
		
		
    	@project = Project.find(params[:id])
    	@user = @project.author
    	@version = Version.new
    	
    	@versions = @project.versions.paginate(page: params[:page])
    	@track = @project.tracks.new
    	@track.project_id = @project.id
    	@tracks = @project.tracks.all
    	@track_urls = []
    	@tracks.each {|track| @track_urls << track.path.url if track.path.url != nil}
  	end


	private

		def project_params
			params.require(:project).permit(:name)
		end	

		def correct_user
			@project = current_user.projects.find_by(id: params[:id])
			redirect_to root_url if @project.nil?
		end	

end
