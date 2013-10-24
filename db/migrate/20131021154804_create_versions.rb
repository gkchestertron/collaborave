class CreateVersions < ActiveRecord::Migration
  def change
    create_table :versions do |t|
      t.string :settings
      t.integer :project_id
      t.integer :collaborator_id
      t.string :name

      t.timestamps
    end
    add_index :versions, [:project_id, :created_at]
    add_index :versions, [:collaborator_id, :created_at]
    
  end
end
