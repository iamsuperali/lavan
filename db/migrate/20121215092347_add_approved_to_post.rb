class AddApprovedToPost < ActiveRecord::Migration
  def change
    add_column :posts, :approved,:boolean, :default => false, :null => false
  end
end
