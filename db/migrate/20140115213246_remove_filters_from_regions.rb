class RemoveFiltersFromRegions < ActiveRecord::Migration
  def change
  	remove_column :filters, :region_id
  	remove_column :filters, :region_diff_id
  end
end
