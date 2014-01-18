class AddNulls < ActiveRecord::Migration
  def change
  	change_column_null :versions, :project_id, false
  	change_column_null :versions, :collaborator_id, false
  	change_column_null :versions, :name, false

  	change_column_null :tracks, :project_id, false
  	change_column_null :tracks, :name, false

  	change_column_null :regions, :track_id, false
  	change_column_null :regions, :path, false
  	change_column_default :regions, :start_time, 0
  	change_column_null :regions, :start_time, false

  	change_column_null :track_diffs, :version_id, false
  	change_column_null :track_diffs, :track_id, false

  	change_column_null :region_diffs, :track_diff_id, false
  	change_column_null :region_diffs, :region_id, false
  	change_column :region_diffs, :start_time, :decimal
  	change_column_default :region_diffs, :start_time, 0
  	change_column_null :region_diffs, :start_time, false

		change_column_null :projects, :name, false  
		change_column_null :projects, :author_id, false  	

		change_column_null :filters, :name, false
		change_column_null :filters, :filter_type, false


  end
end
