class CreateFilterAutomations < ActiveRecord::Migration
  def change
    create_table :filter_automations do |t|
      t.integer :region_id
      t.integer :region_diff_id
      t.string :method_name
      t.string :args

      t.timestamps
    end
    add_index :filter_automations, :region_id
    add_index :filter_automations, :region_diff_id
  end
end
