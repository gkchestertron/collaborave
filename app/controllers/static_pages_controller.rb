class StaticPagesController < ApplicationController
  def home 
    if signed_in?
      @new_project  = current_user.projects.build(author_id: current_user)
      @user = current_user
      @projects = @user.projects.paginate(page: params[:page])
      @total_files_size = 0
    @user.projects.each do |project| 
      project.tracks.each {|track| @total_files_size = @total_files_size + track.path.file.size }
    end
    @collab_projects = @user.collab_projects.paginate(page: params[:page])
    else
      @project = Project.find(1)
      @user = @project.author
      @version = Version.new
      
      @versions = @project.versions.paginate(page: params[:page])
      @track = @project.tracks.new
      @track.project_id = @project.id
      @tracks = @project.tracks.all
      @track_urls = []
      @track_names = []
      @tracks.each  do |track| 
        @track_urls << track.path.url if track.path.url != nil
        @track_names << track.track_name if track.path.url != nil
      end
    end

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
