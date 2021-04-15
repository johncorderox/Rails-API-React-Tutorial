class MovieSerializer < ActiveModel::Serializer
  attributes :id, :name, :rating
end
