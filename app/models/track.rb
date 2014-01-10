class Track < ActiveRecord::Base
	belongs_to :version, class_name: "Version"
	belongs_to :project, class_name: "Project"
	mount_uploader :path, TrackFileUploader
	validates :track_name, presence: true
	has_many :regions

end
