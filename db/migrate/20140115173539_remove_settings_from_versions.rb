class RemoveSettingsFromVersions < ActiveRecord::Migration
  def change
  	remove_column :versions, :settings
  end
end
