class StaticPagesController < ApplicationController
  def home
    if signed_in?
      @project  = current_user.projects.build(author_id: current_user)
      @user = current_user
    
    end
  end


  def help
  end

  def about
  end	

  def contact
  end
end
