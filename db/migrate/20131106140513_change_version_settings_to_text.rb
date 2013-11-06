class ChangeVersionSettingsToText < ActiveRecord::Migration
  def change
  	change_column :versions, :settings, :text, :limit => nil
  end
end
