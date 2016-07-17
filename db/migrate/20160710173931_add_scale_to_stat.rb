class AddScaleToStat < ActiveRecord::Migration
  def change
    add_reference :stats, :scale, index: true, foreign_key: true
  end
end
