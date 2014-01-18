class ChangeRegionStartTimeToDecimal < ActiveRecord::Migration
  def change
  	change_column :regions, :start_time, :decimal
  end
end
