class AddDescToCategories < ActiveRecord::Migration
  def change
    add_column :categories, :desc, :string
  end
end
