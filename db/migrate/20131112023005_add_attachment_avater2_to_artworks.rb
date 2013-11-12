class AddAttachmentAvater2ToArtworks < ActiveRecord::Migration
  def self.up
    change_table :artworks do |t|
      t.has_attached_file :avater2
    end
  end

  def self.down
    drop_attached_file :artworks, :avater2
  end
end
