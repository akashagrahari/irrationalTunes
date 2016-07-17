class InfoController < ApplicationController
  def intro
    session[:user_id] = 1
    # session[:refresh_flag] = true
  end

  def about
    # session[:refresh_flag] = true
  end

  def support
    # session[:refresh_flag] = true
  end
end
