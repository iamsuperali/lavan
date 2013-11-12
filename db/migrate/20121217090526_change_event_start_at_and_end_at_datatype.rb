class ChangeEventStartAtAndEndAtDatatype < ActiveRecord::Migration
  def up
    change_column("events","start_at","date")
    change_column("events","end_at","date")
  end

  def down
    change_column("events","start_at","datetime")
    change_column("events","end_at","datetime")
  end
end
