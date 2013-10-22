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
		@user = User.find(params[:id])
    	@projects = @user.projects.paginate(page: params[:page])
    	@project = Project.find(params[:id])
    	@versions = @project.versions.paginate(page: params[:page])
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
