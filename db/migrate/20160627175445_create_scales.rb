class CreateScales < ActiveRecord::Migration
  def change
    create_table :scales do |t|
      t.string 'name', :limit => 40
      t.string 'formula', :limit => 50
      t.timestamps null: false
    end
    add_index('scales', 'name')
  end
end
