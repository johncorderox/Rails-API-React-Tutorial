class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :name
      t.integer :rating

      t.timestamps
    end
  end
end
