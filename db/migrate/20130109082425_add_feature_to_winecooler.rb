class AddFeatureToWinecooler < ActiveRecord::Migration
  def change
    add_column :winecoolers, :feature, :string
  end
end
