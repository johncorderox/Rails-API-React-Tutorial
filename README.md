# Rails-API-React-Tutorial 💻 [![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

Hey! This is a super-easy to follow Rails/React API tutorial that is fully in depth from start to finish. This guide shows you how to install Ruby
and Rails 5 in a Virtual Box, React JS via create-react-app and connecting the frontend and backend.<br>

<p align="center">
  <img width="460" height="320" src="https://media.giphy.com/media/oZKuC9DJUK2yc/giphy.gif">
</p>

## Table of Contents

- [Downloading Virtual Box](#downloading-virtual-box)
- Downloading create-react-app
- Creating a Rails API
- Create a react frontend
- Connect the API with React

## Downloading Virtual Box

- Why Virtual Box? What is it?
  We'll be using Ubuntu to work with our rails applications so it'll be more organized for us to be working in a virtual enviorment! You can always destroy
  the enviorment and reconfigure whenever you want.

1.  Download VirtualBox 5.2.22 for Mac OSX [here,](https://download.virtualbox.org/virtualbox/5.2.22/VirtualBox-5.2.22-126460-OSX.dmg) or Windows [here](https://download.virtualbox.org/virtualbox/5.2.22/VirtualBox-5.2.22-126460-Win.exe)
2.  Run the installer.
3.  Download Vagrant for Mac OSX [here,](https://releases.hashicorp.com/vagrant/2.2.0/vagrant_2.2.0_x86_64.dmg) or Windows [here](https://releases.hashicorp.com/vagrant/2.2.0/vagrant_2.2.0_x86_64.msi)
4.  Let's create our first enviorment. You can run the script below to keep your rails projects on your Desktop.

```
cd /Desktop && mkdir rails && cd rails && vagrant init
```

5.  Download the OS to VirtualBox

```
vagrant box add ubuntu/trusty64
```

6.  Double check and make sure our new box is there

```
vagrant box list
```

7.  Add this script to the Vagrant File

```
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
end
```

8.  Start the vagrant server

```
vagrant up && vagrant ssh
```

9.  Direct yourself to the vagrant directory

```
cd /vagrant
```

10. Add our Bootstrap File

```
mkdir new_project && cd new_project && touch bootstrap.sh
```

11. Copy this script to configure our virtual enviorment

```
#!/usr/bin/env bash
# upgrade and update the system
echo upgrading and updating the system
sudo apt-get update
sudo apt-get -y upgrade
# install node.js for js runtime when using Rails
echo installing nodejs for ExecJS runtime and git
sudo apt-get install -y nodejs
sudo apt-get install -y git
# install RVM
echo installing RVM
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
\curl -sSL https://get.rvm.io | bash -s stable
source /home/vagrant/.rvm/scripts/rvm
rvm requirements
# install Ruby and make 2.3.1 the default
echo installing ruby
rvm install 2.3.1
rvm use 2.3.1 --default
# install Bundler and Rails
echo installing bundler and rails
gem install bundler --no-ri --no-rdoc
gem install rails -v 4.2.7 --no-ri --no-rdoc
# install postgres and its dependencies
echo installing psql and its dependencies
sudo apt-get install -y postgresql postgresql-contrib libpq-dev
```

12. Re-edit the vagrant file for our newest editions + new bootstrap file

```
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network "forwarded_port", guest: 3000, host: 3000, host_ip: "127.0.0.1"
  config.vm.provision :shell, path: "bootstrap.sh", privileged: false
  config.vm.provider "virtualbox" do |vb|
    vb.customize ["modifyvm", :id, "--memory", "2048"]
    vb.customize ["modifyvm", :id, "--cpus", "2"]
  end
end
```

13. Open a new tab in your terminal and lets test the vagrant configs

```
vagrant halt && vagrant up --provision
```

14. Last step. whew...! Once your vagrant server is on (vagrant up and vagrant ssh!), check that Ruby and Rails was installed!

```
ruby -v
```

## Downloading create-react-app

First we need Node Packet Manager if you dont already. You can download it [here.](https://www.npmjs.com/get-npm) Run the installer and save settings so npm is saved globally.

Let's begin!

1.  run `npm install -g create-react-app` and let the files download to your drive.

1a. If you are running problems with the `ERR!` message, try using `sudo` to run privileges as administrator.

2.  Let's create a test app to see if everything is running smoothly. type `create-react-app my-cool-app` in the command line and see if everything installs. `my-cool-app` will be the name of your react project.

3.  Run `npm start` and type Y in case there are some conflicting port configs in your local host. You should see the bottom image in your browser if everything was installed correctly!

<a href="http://tinypic.com?ref=2gwysso" target="_blank"><img src="http://i68.tinypic.com/2gwysso.png" border="0" alt="Image and video hosting by TinyPic"></a>

## Rails API 💎

Now that have our virtual enviorment ready, we can create our first ever Rails API. The new rails api command scaffolds everything we need to get up and ready for our project. Let's start our vagrant server and ssh into our project folder.

1.  Run the following: `rails new my-first-api --api -T`

What's going on here? The `--api` command tells rails that we want an API structure application instead of a standard rails structure. The `-T` command also tells rails that we don't want Minitest as our testing suite. You'll most likely be used to Rspec so we'll talk about that later in the guide.

2.  Enable Cross-Origin Resource Sharing (CORS) in your gem and config directory. Locate your gemfile and uncomment the following

```ruby
# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
 gem 'rack-cors'
```

Do not forget to `bundle install` !

Now in your config/initializers directory, you should now see a `cors.rb` file. Add the following to

```ruby
# config/initializers/cors.rb
class Application < Rails::Application

   config.middleware.insert_before 0, "Rack::Cors" do
     allow do
       origins '*'
       resource '*', :headers => :any, :methods => [:get, :post, :patch, :options]
     end
   end

 end
```

Since this tutorial is mainly for testing and toy projects, we are allowing ALL methods from another domain. You should tailor the header and methods to your liking.

## Rails API Versioning

Versioning is the process of seperating and creating new features/data/endpoints for your API. Since this is our first API, let's make our `test-api` v1.

1.  Run the following in your terminal

```shell
mkdir mkdir app/controllers/api && mkdir app/controllers/api/v1
```

If everything looks right you should see your directory identical as below. <br><br>
<a href="http://tinypic.com?ref=3589c11" target="_blank"><img src="http://i67.tinypic.com/3589c11.png" height="280" width="280" border="0" alt="Image and video hosting by TinyPic"></a>

 Now that our versioning is complete, let's test out a model and controller to work with our new url of `localhost:3000/api/v1`.

2.  Let's scaffold a test model/controller and call it `movies`


```ruby
rails g scaffold Movies name:string rating:integer

rails db:migrate
```

The Rails engine creates your controller in the default `/controllers` directory but we need to move our new controller into the `api/v1` directory.

3.  You can either move it manually or the following:


```shell
mv app/controllers/movies_controller.rb app/controllers/api/v1
```

4.  Update the Movies Controller

Our newly generated controller does not properly inherit from the namespace api/v1 (We will update the routes later in the tutorial) so let's change our controller class from

```ruby
class MoviesController < ApplicationController
```

TO

```ruby
class Api::V1::MoviesController < ApplicationController
```

5.  Update the Routes
    Locate to your config folder and open your `routes.rb` file.

```ruby
Rails.application.routes.draw do
  resources :movies
end
```

If we go to `localhost:3000/movies` we will not call the controller. We must update our Routes to:

```ruby
Rails.application.routes.draw do
 namespace :api do
  namespace :v1 do
   resources :movies
  end
 end
end
```

which allows us to call the json data from `localhost:3000/api/v1/movies`

6.  Let's seed our sqlite database with some classic movies so we can practice getting data with GET requests to the API.

Copy and paste the following data to your `db/seeds.rb` file.

```ruby
Movie.create(name: "The Nightmare Before Christmas", rating: 5)
Movie.create(name: "Titanic", rating: 5)
Movie.create(name: "Venom", rating: 4)
Movie.create(name: "A Quiet Place", rating: 5)
Movie.create(name: "Nobody's Fool", rating: 2)
Movie.create(name: "Suspiria", rating: 4)
Movie.create(name: "Hereditary", rating: 4)
Movie.create(name: "Office Space", rating: 5)
Movie.create(name: "Elf", rating: 4)
Movie.create(name: "Dawn of the Planet of the Apes", rating: 3)
Movie.create(name: "Secret life of Pets", rating: 4)
Movie.create(name: "Overlord", rating: 3)
Movie.create(name: "Wonder Woman", rating: 5)
Movie.create(name: "Bohemian Rhapsody", rating: 4)
Movie.create(name: "Ocean's 8", rating: 5)
```

Seed the DB using `rails db:seed && rails db:migrate`

7.  Test the API using a GET request.

Start your Rails server `rails s` and navigate to `localhost:3000/api/v1/movies` and if it is successful you should see the following JSON output: <br><br>

(Optional) I'm using a pretty JSON viewer for chrome which you can download [here.](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc)
<a href="http://tinypic.com?ref=2m60ahx" target="_blank"><img src="http://i63.tinypic.com/2m60ahx.png" width="450" height="450" border="0" alt="Image and video hosting by TinyPic"></a>

Congrats! You have successfully created a Rails API and completed your first GET request!

## Downloading React into our Project

React is a component based front end framework that makes it easy to make frontend calls to our Rails API. Let's make this organized as possible and add our react directory inside our rails app.

1.  Open your terminal and create a new project inside your API.

```
create-react-app client
```

<br>
<a href="http://tinypic.com?ref=1zya22t" target="_blank"><img src="http://i64.tinypic.com/358xiu0.png" border="0" height="300" width="280" alt="Image and video hosting by TinyPic"></a>
<br>

2.  Download Boostrap into the react directory:

```
npm install --save reactstrap bootstrap@4
```

Then open your `index.js` file inside the `/src` directory and add the following import line:

```javascript
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// Import goes below for Bootstrap
import "bootstrap/dist/css/bootstrap.css";
```

3.  Let's proxy our client so we know where to get the requests from!

Open `package.json` from our react folder and add the following json code to your package.

```javascript
  "proxy": "http://127.0.0.1:3000",
```

Heres mine as an example!

```javascript
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://127.0.0.1:3000",
  "dependencies": {
    "bootstrap": "^4.1.3",
    "react": "^16.6.3",
    "react-dom": "^16.6.3",
    "react-scripts": "2.1.1",
    "reactstrap": "^6.5.0"
  },
```

4.  We'll make a default Component directory inside the `/src` folder and create our first component.


```
cd client/src && mkdir components && cd components && touch Button.js
```

5.  Open your `Button.js` file and lets create a sample button to activate our call function to the API.

```javascript
import React, { Component } from "react";

class Button extends Component {
  render() {
    return (
      <div>
        <div class="card container mt-3">
          <div class="card-body">
            <div class="row">
              <center>
                <button class="btn btn-primary">Test Call!</button>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Button;
```

6.  Start your server `npm start` and check if your bootstrap import works as well as the test button! If all is displaying then we are almost done. We are sooooo close!

We want our button to actually call the API now so lets create the function with the appropriate call. We want to add an onclick event to the button html like so:

```javascript
<button class="btn btn-primary" onClick={this.callApi}>
  Test Call!
</button>
```

and our custom function PLUS the initial state set to null

```javascript
state = {
  results: []
};

callApi = async () => {
  const api_call = await fetch("http://localhost:3000/api/v1/movies");

  const data = await api_call.json();

  this.setState({
    results: data
  });
};
```

After copying and pasting both snippets inside the `Button.js` file, we fetch from the url `http://localhost:3000/api/v1/movies` in a json format and once we return a true response we will set the response to the data variable and console log the results into the browser.

This should be the complete Button.js file below!

```javascript
import React, { Component } from "react";

class Button extends Component {
  state = {
    results: []
  };

  callApi = async () => {
    const api_call = await fetch("http://localhost:3000/api/v1/movies");

    const data = await api_call.json();

    this.setState({
      results: data
    });
  };

  render() {
    return (
      <div>
        <div className="card container mt-3">
          <div className="card-body">
            <div className="row">
              <center>
                <button className="btn btn-primary" onClick={this.callApi}>
                  Test Call!
                </button>
                <br />
              </center>
              <br />
              <br />
              <br />
              <br />
              <br />
              <p className="m-5">
                {this.state.results.map(obj => <li>{obj.name}</li>)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Button;
```

This should be everything we need to setup the API. Simply click our test api call button and see the magic work!

<a href="http://tinypic.com?ref=ere5n5" target="_blank"><img src="http://i68.tinypic.com/ere5n5.png" height="300" width="310" border="0" alt="Image and video hosting by TinyPic"></a>

### Congratulations! Our Rails API and React Client is done!
