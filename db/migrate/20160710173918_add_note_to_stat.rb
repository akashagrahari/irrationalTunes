class AddNoteToStat < ActiveRecord::Migration
  def change
    add_reference :stats, :note, index: true, foreign_key: true
  end
end
