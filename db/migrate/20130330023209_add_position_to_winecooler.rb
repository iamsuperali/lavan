class AddPositionToWinecooler < ActiveRecord::Migration
  def change
    add_column :winecoolers, :position, :integer,:default=>0
  end
end
