class RegionDiff < ActiveRecord::Base
	has_many :filters
	belongs_to :track_diff
end
