class Stat < ActiveRecord::Base
  belongs_to :note
  belongs_to :number
  belongs_to :scale

end
