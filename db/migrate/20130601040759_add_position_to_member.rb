class AddPositionToMember < ActiveRecord::Migration
  def change
    add_column :members, :position, :integer,:default=>0
    add_column :slides, :position, :integer,:default=>0
    add_column :posts, :position, :integer,:default=>0
  end
end
