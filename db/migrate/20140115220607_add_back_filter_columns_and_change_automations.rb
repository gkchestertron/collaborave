class AddBackFilterColumnsAndChangeAutomations < ActiveRecord::Migration
  def change
  	add_column :filters, :region_id, :integer
  	add_column :filters, :region_diff_id, :integer
  	add_column :filters, :filter_automation_id, :integer
  	add_index :filters, :region_id
  	add_index :filters, :region_diff_id

  	remove_column :filter_automations, :region_id
  	remove_column :filter_automations, :region_diff_id
  	add_column :filter_automations, :filter_id, :integer
  end
end
