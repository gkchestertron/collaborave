class CreateFilters < ActiveRecord::Migration
  def change
    create_table :filters do |t|
      t.string :name
      t.integer :track_id
      t.string :settings

      t.timestamps
    end
    add_index :filters, :track_id
  end
end
