class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.string :title
      t.string :content
      t.integer :status
      t.string :permalink

      t.timestamps
    end
  end
end
