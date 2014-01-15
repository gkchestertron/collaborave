class Region < ActiveRecord::Base
	mount_uploader :path, TrackFileUploader
  belongs_to :track
end
