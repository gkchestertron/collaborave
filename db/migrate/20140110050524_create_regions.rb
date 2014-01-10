class CreateRegions < ActiveRecord::Migration
  def change
    create_table :regions do |t|
      t.integer :track_id, null: false
      t.float :start_time, null: false

      t.timestamps
    end
    add_index :regions, :track_id
  end
end
