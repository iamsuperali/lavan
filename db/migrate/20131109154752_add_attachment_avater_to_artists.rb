class AddAttachmentAvaterToArtists < ActiveRecord::Migration
  def self.up
    change_table :artists do |t|
      t.has_attached_file :avater
    end
  end

  def self.down
    drop_attached_file :artists, :avater
  end
end
