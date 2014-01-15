class RemovePathFromTracks < ActiveRecord::Migration
  def change
  	remove_column :tracks, :path
  end
end
