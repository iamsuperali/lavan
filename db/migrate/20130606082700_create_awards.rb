class CreateAwards < ActiveRecord::Migration
  def change
    create_table :awards do |t|
      t.integer :year
      t.string :description
      t.attachment :avatar

      t.timestamps
    end
  end
end
