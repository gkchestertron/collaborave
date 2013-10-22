class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.integer :author_id
      t.string :name

      t.timestamps
    end
    add_index :projects, [:author_id, :created_at]
  end
end
