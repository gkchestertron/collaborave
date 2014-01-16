class RemoveFilterAutomationIdFromFiltersAgain < ActiveRecord::Migration
  def change
  	remove_column :filters, :filter_automation_id
  end
end
