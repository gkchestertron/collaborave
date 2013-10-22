class CreateVersionFiles < ActiveRecord::Migration
  def change
    create_table :version_files do |t|
      t.integer :version_id
      t.integer :track_id

      t.timestamps
    end
    add_index :version_files, :version_id
    add_index :version_files, :track_id
    add_index :version_files, [:version_id, :track_id], unique: true
  end
end
