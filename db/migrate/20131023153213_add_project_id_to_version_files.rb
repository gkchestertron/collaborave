class AddProjectIdToVersionFiles < ActiveRecord::Migration
  def change
  	add_column :version_files, :project_id, :integer
  end
end
