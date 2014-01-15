class RemoveTableVersionFiles < ActiveRecord::Migration
  def change
  	drop_table :version_files
  end
end
