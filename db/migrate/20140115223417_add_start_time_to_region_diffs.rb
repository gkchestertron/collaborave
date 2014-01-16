class AddStartTimeToRegionDiffs < ActiveRecord::Migration
  def change
  	add_column :region_diffs, :start_time, :float
  end
end
