class Region < ActiveRecord::Base
	mount_uploader :path, RegionUploader
  belongs_to :track
  has_many :filters, dependent: :destroy
  before_destroy :destroy_file

  def destroy_file
  	self.remove_path!
  end
end
