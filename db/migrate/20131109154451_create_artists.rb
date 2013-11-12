class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
      t.string :name
      t.integer :age
      t.string :birthplace
      t.string :address
      t.text :profile
      t.integer :visits
      t.string :letter

      t.timestamps
    end
  end
end
