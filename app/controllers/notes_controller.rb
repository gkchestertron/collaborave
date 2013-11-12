class NotesController < ApplicationController
	def create
    @note = Note.new(note_params)
    @project = @note.project

    if @note.save
      redirect_to @project, notice: "The project notes have been uploaded."
    else
      redirect_to @project, notice: "The note did not save."
    end
  end
	
  def destroy
    @note = Note.find(params[:id])
    @note.destroy
    @project = @note.project
    redirect_to @project , notice:  "The note has been deleted."
  end

  private

  	def note_params
    	params.require(:note).permit(:name, :collaborator_id, :project_id, :content)
  	end
end
