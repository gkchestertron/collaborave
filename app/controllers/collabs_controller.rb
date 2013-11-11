class CollabsController < ApplicationController

	def create
    @collab = Collab.new(collab_params)
    @project = @collab.project
    @collaborator = User.find_by_email(@collab.email)
    @collab.collaborator_id = @collaborator.id

    if @collab.save
      redirect_to @project, notice: "\"#{@collaborator.name}\" has been added."
    else
      redirect_to @project, notice: "The user could not be found."
    end
  end
	
  def destroy
    @collab = collab.find(params[:id])
    @collab.destroy
    @project = @collab.project
    redirect_to @project , notice:  "The collab \"#{@collab.name}\" has been removed."
  end

  private

  	def collab_params
    	params.require(:collab).permit(:project_id, :email)
  	end
end



