class CreateRegionDiffs < ActiveRecord::Migration
  def change
    create_table :region_diffs do |t|
      t.integer :track_diff_id, null: false
      t.integer :region_id, null: false

      t.timestamps
    end
    add_column :regions, :start_time, :float 
  	add_index :region_diffs, :track_diff_id
  end
end
