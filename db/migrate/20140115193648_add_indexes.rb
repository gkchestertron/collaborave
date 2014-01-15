class AddIndexes < ActiveRecord::Migration
  def change
  	add_index :regions, :track_id
  	add_index :tracks, :project_id

  end
end
