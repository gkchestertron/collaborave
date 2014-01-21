class Region < ActiveRecord::Base
	mount_uploader :path, RegionUploader
  belongs_to :track
  has_many :filters, dependent: :destroy
end
