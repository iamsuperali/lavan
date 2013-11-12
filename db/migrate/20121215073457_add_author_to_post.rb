class AddAuthorToPost < ActiveRecord::Migration
  def change
    add_column :posts, :author, :string,:limit=>20
  end
end
