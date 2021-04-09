# Rails-API-React-Tutorial 💻 ![GitHub last commit](https://img.shields.io/github/last-commit/johncorderox/Rails-API-React-Tutorial?style=flat-square) ![GitHub contributors](https://img.shields.io/github/contributors/johncorderox/Rails-API-React-Tutorial?color=blue&style=flat-square)

Hey! This is a super-easy to follow Rails/React API tutorial that is fully in depth from start to finish. This guide shows you how to install a Ruby on Rails 6 API with React JS via Webpacker and connecting the frontend with the backend. <br>

<b>Stack:</b> Rails 6 API + React JS located in ```app/javascript``` + Webpacker

<p align="center">
  <img width="460" height="320" src="https://media.giphy.com/media/14wHxi7D45grRK/giphy.gif">
</p>

## System Requirements 
```Ruby
ruby "2.6.3" +

gem "rails", "~> 6.1.3"

```

## Table of Contents
- [Creating a Rails API](#rails-api)
- [Create a react frontend](#create-a-react-frontend)
- [Connect the API with React](#downloading-react-into-our-project)
- [Contributing](#contributing)

## Rails API 💎

Now that have our virtual enviorment ready, we can create our first ever Rails API. The new rails api command scaffolds everything we need to get up and ready for our project. Let's start our vagrant server and ssh into our project folder.

1.  Run the following: `rails new my_app -T --database=postgresql`

What's going on here?  The `-T` command also tells rails that we don't want Minitest as our testing suite. You'll most likely be used to Rspec so we'll talk about that later in the guide. The ```--database=postgresql``` line is pretty much self explanatory!

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
```
Don't forget to ```rails db:create``` if it was not yet initialized!

Then we can use ``` rails db:migrate``` for our scaffold.

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
module Api
  module V1
    class MoviesController < ApplicationController
    # The scaffold ruby code is here~
    end
  end
end
```

This makes it so we can INHERIT from the application controller without any additional tinkering.

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

6.  Let's seed our PG database with some classic movies so we can practice getting data with GET requests to the API.

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

Seed the DB using `rails db:seed`.

7.  Test the API using a GET request.

Start your Rails server `rails s` or ```rails s -b 0.0.0.0 ``` and navigate to `localhost:3000/api/v1/movies` and if it is successful you should see the following JSON output: <br><br>
<img src="https://i.ibb.co/KXPQ1cd/Screen-Shot-2021-04-06-at-12-58-12-PM.png" /><br>
(Optional) I'm using a pretty JSON viewer for chrome which you can download.

Congrats! You have successfully created a Rails API and completed your first GET request!

## Webpacker/React Integration

React is a component based front end framework that makes it easy to make frontend calls to our Rails API. Let's make this organized as possible and add our react directory inside our rails ```app/javascript``` directory.

1.  Open your terminal and run the following webpacker commands to init the React Process.

```
bundle exec rails webpacker:install:react
```

And wait for the ```Webpacker now supports react.js 🎉``` message to finally use React! Woah :) 

2. Locate the javascript directory inside /app and see the new file we have with React.

<b>Note:</b> Notice the H1 tag on the ```Hello {props.name}!```, this is so we can see it clearly. When intalling, the H1 tag will not be there. It is purely cosmetic for now. 

```
# app/javascript/packs/hello_react.jsx
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Hello = props => (
  <div><h1>Hello {props.name}!</h1></div>
)

Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: PropTypes.string
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
```
We can hook this file into any view we want React to send, so lets try this out now and add this to a demo view.

3. Let's create a Home controller + view so can we load React to it. Run the following 
```
rails g controller Home index
```
and locate your routes in ```config/routes.rb```

Open the route file and ROOT your application to the home controller
```
Rails.application.routes.draw do
  root 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
```
4. We now need to load our ```hello_react.jsx``` file to the HOME view, so let's include that now.
``` app/views/home/index.html.erb
<%= javascript_pack_tag "hello_react.jsx" %>
```

5. Run the rails server, and check out the React magic at hand! YAHOO!!

<img src="https://i.ibb.co/DLPVvXr/Screen-Shot-2021-04-09-at-3-11-22-PM.png" alt="Screen-Shot-2021-04-09-at-3-11-22-PM" border="0"></a><br /><br />

React has been linked, successfully. You can take a small break now if you wish. 













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
{ movies: 
          {
            id: 1,
            name: "A Quiet Place"
          },
          {
            id: 2
            name: "The Avengers"
          },
          {
            id: 3
            name: "Midsommar"
          }
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

