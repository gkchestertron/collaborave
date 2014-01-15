class CreateTrackDiffs < ActiveRecord::Migration
  def change
    create_table :track_diffs do |t|
      t.integer :track_id, null: false
      t.integer :version_id, null: false

      t.timestamps
    end
    add_index :track_diffs, :version_id
    add_column :filters, :track_diff_id, :integer
  end
end
