class AddRealNameInfoToUser < ActiveRecord::Migration
  def change
    add_column :users, :real_name, :string,:limit => 20
    add_column :users, :id_card, :string,:limit => 18
    add_column :users, :tel, :string,:limit => 30
    add_column :users, :company, :string,:limit => 100
  end
end
