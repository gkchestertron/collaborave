class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

 after_filter :set_access_control_headers

def set_access_control_headers
  headers['Access-Control-Allow-Origin'] = '*'
  headers['Access-Control-Request-Method'] = '*'
end 
  include SessionsHelper
end
