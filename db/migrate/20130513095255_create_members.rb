class CreateMembers < ActiveRecord::Migration
  def change
    create_table :members do |t|
      t.string :cname
      t.string :ename
      t.string :info
      t.attachment :avatar1
      t.attachment :avater2
      t.attachment :title_img

      t.timestamps
    end
  end
end
