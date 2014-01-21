class RemoveNullFromRegions < ActiveRecord::Migration
  def change
  	change_column_null :regions, :path, true
  end
end
