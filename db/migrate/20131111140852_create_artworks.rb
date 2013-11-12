class CreateArtworks < ActiveRecord::Migration
  def change
    create_table :artworks do |t|
      t.integer :artist_id
      t.integer :category_id
      t.string :title
      t.string :medium
      t.string :dimensions
      t.integer :year
      t.date :listed
      t.string :markings
      t.string :exhibition
      t.string :edition
      t.string :literature
      t.string :condition_report
      t.text :description
      t.integer :click_count

      t.timestamps
    end
  end
end
