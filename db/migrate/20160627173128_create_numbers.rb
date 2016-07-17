class CreateNumbers < ActiveRecord::Migration
  def change
    create_table :numbers do |t|
      t.string 'name', :limit => 40
      t.string 'character', :limit => 50
      t.string 'unicode', :limit => 50
      t.string 'glyphicon', :limit =>50
      t.timestamps null: false
    end
    add_index('numbers', 'name')
  end
end
