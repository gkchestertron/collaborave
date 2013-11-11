class CollaboratorsController < ApplicationController

	def create
    @collaborator = collabs.new(collaborator_params)
    @project = @collabs.project

    if @collaborator.save
      redirect_to @project, notice: "The collaborator \"#{@collaborator.name}\" has been uploaded."
    else
      redirect_to @project, notice: "The collaborator did not save."
    end
  end
	
  def destroy
    @collaborator = collaborator.find(params[:id])
    @collaborator.destroy
    @project = @collaborator.project
    redirect_to @project , notice:  "The collaborator \"#{@collaborator.name}\" has been removed."
  end

  private

  	def collaborator_params
    	params.require(:collaborator).permit(:collaborator_id, :project_id)
  	end
end

