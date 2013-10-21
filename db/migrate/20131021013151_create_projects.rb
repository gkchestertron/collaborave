class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :files
      t.integer :author_id
      t.string :collaborator_ids

      t.timestamps
    end
  end
end
