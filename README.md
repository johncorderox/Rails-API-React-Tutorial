# Rails-API-React-Tutorial 💻 ![GitHub last commit](https://img.shields.io/github/last-commit/johncorderox/Rails-API-React-Tutorial?style=flat-square) ![GitHub contributors](https://img.shields.io/github/contributors/johncorderox/Rails-API-React-Tutorial?color=blue&style=flat-square)

Hey! This is a super-easy to follow Rails/React API tutorial that is fully in depth from start to finish. This guide shows you how to install a Ruby on Rails 5 API with React JS via create-react-app and connecting the frontend and backend. <br>

Note: <b>This API has been getting some attention and I'm so thankful. I will be making a Rails 6 API + React JS soon! ❤️</b>
<br>

<p align="center">
  <img width="460" height="320" src="https://media.giphy.com/media/TNf5oSRelTeI8/giphy.gif">
</p>

## System Requirements 
```Ruby
ruby '2.3.1'

gem 'rails', '~> 5.2.1'

```

## Table of Contents
- [Downloading create-react-app](#downloading-create-react-app)
- [Creating a Rails API](#rails-api)
- [Create a react frontend](#create-a-react-frontend)
- [Connect the API with React](#downloading-react-into-our-project)
- [Contributing](#contributing)

## Downloading create-react-app

First we need Node Packet Manager if you dont already. You can download it [here.](https://www.npmjs.com/get-npm) Run the installer and save settings so npm is saved globally.

Let's begin!

1.  run `npm install -g create-react-app` and let the files download to your drive.

1a. If you are running problems with the `ERR!` message, try using `sudo` to run privileges as administrator.

2.  Let's create a test app to see if everything is running smoothly. type `create-react-app my-cool-app` in the command line and see if everything installs. `my-cool-app` will be the name of your react project.

3.  Run `npm start` and type Y in case there are some conflicting port configs in your local host. You should see the bottom image in your browser if everything was installed correctly!


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
mkdir app/controllers/api && mkdir app/controllers/api/v1
```


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

(Optional) I'm using a pretty JSON viewer for chrome which you can download [here.]

Congrats! You have successfully created a Rails API and completed your first GET request!

## Downloading React into our Project

React is a component based front end framework that makes it easy to make frontend calls to our Rails API. Let's make this organized as possible and add our react directory inside our rails app.

1.  Open your terminal and create a new project inside your API.

```
create-react-app client
```
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
6. Let's open our ```App.js``` file in the /src directory to add our new Button Component to the App itself. Check below to see the example. Don't forget that we need to enclose the ```<Button />``` in two ```<div></div>``` tags!
```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Button from './components/Button';

class App extends Component {
  render() {
    return (
      <div>
      <Button />
      </div>
    );
  }
}

export default App;
```

Start your server `npm start` and check if your bootstrap import works as well as the test button! If all is displaying then we are almost done. We are sooooo close!

7. We want our button to actually call the API now so lets create the function with the appropriate call. We want to add an onclick event to the button html like so:

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

Congratulations! Our Rails API and React Client is done! If you enjoyed this API tutorial please give it a star and share it with your friends!


## Rails Serializers

What are Serializers? Well Rails API's returns JSON data in full, so serializers allows us to cherry pick the exact data we want in a much organized fashion. Instead of getting every column from the returned data, we can grab which ever we allow to pass through.

| Normal Model        | Serializer Model    | 
| ------------- |:-------------:|
| id, name, rating, director, score, actors_id, created_at, updated_at| id, name, rating|

We are able to tell the Rails API what to fetch rather than the frontend; making it much more simple and faster to scaffold your next project.

1. Installation

Open your ```gemfile``` and add the serializer gem into your project. Don't forget to ```bundle install``` !
```ruby
# Serializer
gem 'active_model_serializers'
``` 

We want to create a clone of any current model we have so when we make requests in the backend, the request will read the serializer file <strong>first</strong>, then it will find the rails model/controller to finisht the request. We have a model called Movie so we'll duplicate that by running:

```
rails g serializer movie
```
You can see that a new directory was made in the ```app/``` directory and we now have ```app/serializers/movie_serializer``` file in our project. 

Let's open that file and see what we have: 
```ruby
class MovieSerializer < ActiveModel::Serializer
  attributes :id, :name 
end

```

We have our Movie Class inheriting from the serializer class on the first line, and the returned attribute on the second. So far the default returned attribute is just an ID. Let's test this now!

1a. Turn on your rails server and go to the url ``` localhost:3000/api/v1/movies ```

You should see that only the ```id``` and ```name``` attribute is being returned from the database. 
```json
{
  id: 1,
  name: "A Quiet Place"
},
{
  id: 2
  name: "The Avengers
},
{
  id: 3
  name: "Midsommar"
}
```

You can add any attribute to your liking to the serializer file for your next big project. But that's the end of the serializer section! 

## Contributing
- Fork it
- Create your feature branch (git checkout -b my-new-feature)
- Commit your changes (git commit -am 'Add some feature')
- Push to the branch (git push origin my-new-feature)
- Create new Pull Request

I love collaboration! Please feel free to contribute or add your insights ✨ 

## About the Author

I am a Software Engineer based in Los Angeles who can't stop building in rails 💎. You can find my site <a href="https://johncorderox.com">here.</a> 

