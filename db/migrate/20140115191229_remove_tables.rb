class RemoveTables < ActiveRecord::Migration
  def change
  	drop_table :track_regions
  end
end
