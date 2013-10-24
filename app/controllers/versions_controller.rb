class VersionsController < ApplicationController
	def create
    @version = Version.new(version_params)
    @project = @version.project

    if @version.save
      redirect_to @project, notice: "The version \"#{@version.name}\" has been uploaded."
    else
      redirect_to @project, notice: "The version did not save."
    end
  end
	
  def destroy
    @version = Version.find(params[:id])
    @version.destroy
    @project = @version.project
    redirect_to @project , notice:  "The version \"#{@version.name}\" has been deleted."
  end

  private

  	def version_params
    	params.require(:version).permit(:name, :collaborator_id, :project_id, :settings)
  	end
end

