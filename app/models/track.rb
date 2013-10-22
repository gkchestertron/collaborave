class Track < ActiveRecord::Base
	belongs_to :version, class_name: "Version"
end
