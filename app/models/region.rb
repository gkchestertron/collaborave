class Region < ActiveRecord::Base
	mount_uploader :path, TrackFileUploader
end
