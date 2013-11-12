class AddTopToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :top, :boolean
  end
end
