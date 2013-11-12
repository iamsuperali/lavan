class AddAttachmentAttachmentToPosts < ActiveRecord::Migration
  def self.up
    change_table :posts do |t|
      t.has_attached_file :attachment1
      t.has_attached_file :attachment2
      t.has_attached_file :attachment3
    end
  end

  def self.down
    drop_attached_file :posts, :attachment1
    drop_attached_file :posts, :attachment2
    drop_attached_file :posts, :attachment3
  end
end
