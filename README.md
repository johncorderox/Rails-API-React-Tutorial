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
- [React Integration](#react-integration)
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

## React Integration

React is a component based front end framework that makes it easy to make frontend calls to our Rails API. Let's make this organized as possible and add our react directory inside our rails ```app/javascript``` directory.

1.  Open your terminal and run the following webpacker commands to init the React Process.

```
bundle exec rails webpacker:install:react
```

And wait for the ```Webpacker now supports react.js 🎉``` message to finally use React! Woah :) 

2. Locate the javascript directory inside /app and see the new file we have with React.

<b>Note:</b> Notice the H1 tag on the ```Hello {props.name}!```, this is so we can see it clearly. When intalling, the H1 tag will not be there. It is purely cosmetic for now. 

```js
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

React has been linked, successfully. 

## Restructure our React Project

Personally, I don't like the structure of React in this concept, so let's add something more "neater" so we can find our components easier. 

1. Delete all of the contents inside the javascript directory so we can start fresh. 
2. Create 2 new folders named ```components``` and `packs` inside the javascript folder.
3. Inside your `packs` folder, create a file named ```application.js``` and add the following to it:
4. 
```js
import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"

Rails.start()
Turbolinks.start()
ActiveStorage.start()
```

Let's also create a hello_react.jsx file and add the following:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
```

4. Next, let's create a new folder named `components` and create a file named `App.js`

Add the following to `App.js`

```js
import React, { Component } from 'react'

class App extends Component {
  render(){
    return(
      <div>
      <h1> React says Hello! </h1>
      </div>

    )
  }
}

export default App

```

5. You should now be able to see the structure better with a `components` folder and add any new component you wish!. Let's run the rails server to see if its calling our new H1 text.

<img src="https://i.ibb.co/jT5Cq5c/Screen-Shot-2021-04-09-at-3-23-48-PM.png" alt="Screen-Shot-2021-04-09-at-3-23-48-PM" border="0">

6. Our new structure is complete! You can stop here and make your own API to your own liking. In the next section, we can create a new component and test the data being called!

## Our First Component

React JS is all about components! Assuming we know basic React workflow, lets create a new component under the `component` direct named `MovieInfo.js`

1. We can add the following to `MovieInfo.js` as the basic skeleton.

```js
# app/js/components/MovieInfo.js

import React from 'react'

export class MovieInfo extends React.Component {

  constructor() {
     super();
   }

  render() {
    return (
      <div>
      </div>
  )
}

}
export default MovieInfo;
```

2. Let us add a state method so we can fill the array with the API call. Add this under the export class line

```js
  constructor() {
     super();
     this.state = {
       movies: []
     };
   }
```

3. We should ass add the `componentDidMount` function so the data can be created in the virtual DOM on page load.

```js
  componentDidMount(){
    fetch("/api/v1/movies")
    .then(resp => resp.json())
    .then(m => {
      this.setState({
        movies: m
      })
    })
    .catch(error => console.log(error))
  }
```

4. Our final file should look like this.

```js
import React from 'react'

export class MovieInfo extends React.Component {

  constructor() {
     super();
     this.state = {
       movies: []
     };
   }

  componentDidMount(){
    fetch("/api/v1/movies")
    .then(resp => resp.json())
    .then(a => {
      this.setState({
        movies: a
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
      {this.state.movies.map(obj =>
        <p key={obj.id}>{obj.name}</p>

      )}
     </div>
  )
}

}
export default MovieInfo;

```

5. Import the file to our `App.js` file.

```js
import React, { Component } from 'react'
import MovieInfo from './MovieInfo'. <------


class App extends Component {
  render(){
    return(
      <div>
        <MovieInfo /> <------
      </div>

    )
  }
}

export default App

```


6. Start the rails server! And Success!! We can now make API calls to our backend!
<img src="https://i.ibb.co/ys2SQFd/Screen-Shot-2021-04-09-at-3-47-16-PM.png" alt="Screen-Shot-2021-04-09-at-3-47-16-PM" border="0">



💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘💘 <br>
Congratulations! Our Rails API and React Client is done!  <br>
If you enjoyed this API tutorial please give it a star and share it with your friends!


## Contributing
- Fork it
- Create your feature branch (git checkout -b my-new-feature)
- Commit your changes (git commit -am 'Add some feature')
- Push to the branch (git push origin my-new-feature)
- Create new Pull Request

I love collaboration! Please feel free to contribute or add your insights ✨ 

## About the Author

I am a Software Engineer based in Los Angeles who can't stop building in rails 💎. You can find my site <a href="https://johncorderox.com">here.</a> 

