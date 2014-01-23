class StaticPagesController < ApplicationController


  def home 
    @region = Region.new
    # if signed_in?
    #   @new_project  = current_user.projects.build(author_id: current_user)
    #   @user = current_user
    #   @projects = @user.projects.paginate(page: params[:page])
      
    # @collab_projects = @user.collab_projects.paginate(page: params[:page])
    # else
    #   @project = Project.find(1)
    #   @user = @project.author
    #   @version = Version.new
      
    #   @versions = @project.versions.paginate(page: params[:page])
    #   @track = @project.tracks.new
    #   @track.project_id = @project.id
    #   @tracks = @project.tracks.all
    #   @track_urls = []
    #   @track_names = []
    #   # @tracks.each  do |track| 
    #   #   @track_urls << track.path.url if track.path.url != nil
    #   #   @track_names << track.track_name if track.path.url != nil
    #   # end
    # end

  end

  def show
  end


  def help
  end

  def about
  end 

  def contact
  end
end
