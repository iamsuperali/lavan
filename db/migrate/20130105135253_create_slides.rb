class CreateSlides < ActiveRecord::Migration
  def change
    create_table :slides do |t|
      t.string :title
      t.string :link
      t.attachment :image
      t.integer :order

      t.timestamps
    end
  end
end
