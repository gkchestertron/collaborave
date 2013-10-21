class CreateVersions < ActiveRecord::Migration
  def change
    create_table :versions do |t|
      t.string :settings
      t.integer :project_id
      t.integer :collaborator_id

      t.timestamps
    end
    add_index :versions, :project_id
    add_index :versions, :collaborator_id
    add_index :versions, [:collaborator_id, :project_id], unique: true
  end
end
