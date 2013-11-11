class AddEmailToCollabs < ActiveRecord::Migration
  def change
  	add_column :collabs, :email, :string
  end
end
