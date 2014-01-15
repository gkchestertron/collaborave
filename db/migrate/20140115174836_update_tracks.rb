class UpdateTracks < ActiveRecord::Migration
  def change
  	remove_column :tracks, :track_name
  	remove_column :tracks, :project_id
  	add_column :tracks, :version_id, :integer
  	add_column :tracks, :name, :string

  end
end
