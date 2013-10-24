class StaticPagesController < ApplicationController
  def home
    if signed_in?
      @project  = current_user.projects.build(author_id: current_user)
      @user = current_user
    else
      @project = Project.find(1)
      @user = @project.author
      @version = Version.new
      
      @versions = @project.versions.paginate(page: params[:page])
      @track = @project.tracks.new
      @track.project_id = @project.id
      @tracks = @project.tracks.all
      @track_urls = []
      @tracks.each {|track| @track_urls << track.path.url if track.path.url != nil}

    end

  end


  def help
  end

  def about
  end	

  def contact
  end
end
