class StaticPagesController < ApplicationController
  def home 
    if signed_in?
      @new_project  = current_user.projects.build(author_id: current_user)
      @user = current_user
      @projects = @user.projects.paginate(page: params[:page])
    
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
