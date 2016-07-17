class AddDescriptionToNumber < ActiveRecord::Migration
  def change
    add_column :numbers, :description, :text
  end
end
