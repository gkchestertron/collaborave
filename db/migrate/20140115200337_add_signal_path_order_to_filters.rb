class AddSignalPathOrderToFilters < ActiveRecord::Migration
  def change
  	add_column :filters, :signal_path_order, :integer
  end
end
