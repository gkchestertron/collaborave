class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email

      t.timestamps
    end

    create_table :regions do |t|
    	t.decimal :start_time
    	t.integer :track_id

    	t.timestamps
    end
  end
end
