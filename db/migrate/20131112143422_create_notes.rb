class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|


      t.text :content
      t.integer :project_id
      t.integer :collaborator_id

      t.timestamps
    end
    add_index :notes, [:project_id, :created_at]
    add_index :notes, [:collaborator_id, :created_at]
    
  end      
end
