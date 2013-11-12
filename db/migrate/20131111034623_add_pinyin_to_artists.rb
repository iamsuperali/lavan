class AddPinyinToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :pinyin, :string
  end
end
