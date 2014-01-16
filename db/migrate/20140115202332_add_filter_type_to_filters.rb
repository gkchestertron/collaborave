class AddFilterTypeToFilters < ActiveRecord::Migration
  def change
  	add_column :filters, :filter_type, :string
  end
end
