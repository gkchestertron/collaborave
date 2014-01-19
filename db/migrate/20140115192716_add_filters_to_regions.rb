class AddFiltersToRegions < ActiveRecord::Migration
  def change
  	#remove_column :regions, :settings
  	add_column :filters, :region_id, :integer
  	add_column :filters, :region_diff_id, :integer
  	add_index :filters, :region_id
	  add_index :filters, :track_diff_id
	  add_index :filters, :region_diff_id 
  end
end
