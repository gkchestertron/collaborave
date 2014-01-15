class CreateRegionSettings < ActiveRecord::Migration
  def change
    create_table :region_settings do |t|
      t.integer :region_id, null: false
      t.string :start_time, null: false
      t.text :settings, null: false

      t.timestamps
    end
    add_index :region_settings, :region_id
  end
end
