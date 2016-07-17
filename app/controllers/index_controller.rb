class IndexController < ApplicationController

  # layout false

  def home
    unless session[:user_id]
      redirect_to(:controller => 'info' , :action => 'intro')
    end
    # if session[:refresh_flag]
    #   session[:refresh_flag] = false
    #   redirect_to(:controller => 'index' , :action => 'home')
    # end
    @tempo = 120
    @notes = Note.all
    @numbers = Number.all
    @scales = Scale.all

  end
end
