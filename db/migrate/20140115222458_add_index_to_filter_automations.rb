class AddIndexToFilterAutomations < ActiveRecord::Migration
  def change
  	add_index :filter_automations, :filter_id
  end
end
