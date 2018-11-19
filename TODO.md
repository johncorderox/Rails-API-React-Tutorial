# TO DO 

1. Rails Serializers
2. JWT
3. Rack::Attack



# Rails Serializers

What are Serializers? Well Rails API's returns JSON data in full, so serializers allows us to cherry pick the exact data we want in a much organized fashion. Instead of getting every column from the returned data, we can grab which ever we allow to pass through.

| Normal Model        | Serializer Model    | 
| ------------- |:-------------:|
| id, name, rating, director, score, actors_id, created_at, updated_at| id, name, rating|

We are able to tell the Rails API what to fetch rather than the frontend; making it much more simple and faster to scaffold your next project.

1. Installation

Open your ```gemfile``` and add the serializer gem into your project 
```ruby
# Serializer
gem 'active_model_serializers'
``` 
