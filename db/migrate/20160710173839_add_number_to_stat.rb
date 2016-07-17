class AddNumberToStat < ActiveRecord::Migration
  def change
    add_reference :stats, :number, index: true, foreign_key: true
  end
end
