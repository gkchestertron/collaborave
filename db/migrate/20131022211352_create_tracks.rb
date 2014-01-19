class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :track_name
      t.integer :project_id
      t.string :path

      t.timestamps
    end
  end
end
