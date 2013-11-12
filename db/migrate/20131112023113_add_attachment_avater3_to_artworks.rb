class AddAttachmentAvater3ToArtworks < ActiveRecord::Migration
  def self.up
    change_table :artworks do |t|
      t.has_attached_file :avater3
    end
  end

  def self.down
    drop_attached_file :artworks, :avater3
  end
end
