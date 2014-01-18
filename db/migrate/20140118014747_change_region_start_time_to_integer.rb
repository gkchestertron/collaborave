class ChangeRegionStartTimeToInteger < ActiveRecord::Migration
  def change
  	change_column :regions, :start_time, :integer
  end
end
