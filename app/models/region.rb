class Region < ActiveRecord::Base
	# mount_uploader :path, TrackRegionUploader
  belongs_to :track
  has_many :filters, dependent: :destroy
end
