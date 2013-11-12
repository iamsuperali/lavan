class AddGradeAndSubjectToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :grade,:integer
    add_column :posts, :subject,:integer
  end
end
