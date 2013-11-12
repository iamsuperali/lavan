class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :category_id
      t.integer :user_id
      t.integer :org_id
      t.string  :title
      t.string  :content
      t.integer :comment_status
      t.integer :order
      t.integer :status

      t.timestamps
    end
  end
end
