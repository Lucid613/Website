require 'sinatra'
require 'rubygems'

set :root, File.dirname(__FILE__)

enable :sessions

set :public_folder, 'public'

get '/' do
	erb :index
end	
