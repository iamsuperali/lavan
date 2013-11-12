class CreateLoginLog < ActiveRecord::Migration
  def change
    create_table :login_logs do |t|
      t.integer :user_id
      t.string  :ip

      t.timestamps
    end
  end
end
