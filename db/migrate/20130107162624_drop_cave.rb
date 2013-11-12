class DropCave < ActiveRecord::Migration
  def up
    drop_table :caves
  end

  def down
    
  end
end
