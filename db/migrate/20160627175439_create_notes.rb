class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string 'name', :limit => 40
      t.string 'note', :limit => 50
      t.string 'qualifier', :limit =>40
      t.timestamps null: false
    end
    add_index('notes', 'name')
  end
end
