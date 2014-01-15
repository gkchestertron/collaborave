class RemoveColumnsFromRegions < ActiveRecord::Migration
  def change
  	remove_column :regions, :start_time
  	remove_column :regions, :track_id
  end
end
