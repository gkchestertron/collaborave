class CreateCollabs < ActiveRecord::Migration
  def change
    create_table :collabs do |t|
      t.integer :project_id
      t.integer :collaborator_id

      t.timestamps
    end
    add_index :collabs, :project_id
    add_index :collabs, :collaborator_id
    add_index :collabs, [:project_id, :collaborator_id], unique: true
  end
end
