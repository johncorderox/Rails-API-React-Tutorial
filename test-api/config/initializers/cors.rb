# config/initializers/cors.rb
class Application < Rails::Application

   config.middleware.insert_before 0, "Rack::Cors" do
     allow do
       origins '*'
       resource '*', :headers => :any, :methods => [:get, :post, :patch, :options]
     end
   end

 end
