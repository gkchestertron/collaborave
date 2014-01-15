class AddColumnPathToRegions < ActiveRecord::Migration
  def change
  	add_column :regions, :path, :string
  end
end
