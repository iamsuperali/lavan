class AddAttachmentAvater1ToArtworks < ActiveRecord::Migration
  def self.up
    change_table :artworks do |t|
      t.has_attached_file :avater1
    end
  end

  def self.down
    drop_attached_file :artworks, :avater1
  end
end
