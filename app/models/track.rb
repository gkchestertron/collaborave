class Track < ActiveRecord::Base
	belongs_to :version, class_name: "Version"
	validates :track_name, presence: true
	has_many :regions

end
