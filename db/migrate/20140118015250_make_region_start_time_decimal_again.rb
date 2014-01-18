class MakeRegionStartTimeDecimalAgain < ActiveRecord::Migration
  def change
  	change_column :regions, :start_time, :decimal
  end
end
