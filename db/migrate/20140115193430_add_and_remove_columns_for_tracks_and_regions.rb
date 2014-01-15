class AddAndRemoveColumnsForTracksAndRegions < ActiveRecord::Migration
  def change
  	add_column :regions, :track_id, :integer
  	remove_column :tracks, :version_id
  	add_column :tracks, :project_id, :integer
  end
end
