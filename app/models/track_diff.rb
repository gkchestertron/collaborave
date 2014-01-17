class TrackDiff < ActiveRecord::Base
	has_many :region_diffs
	has_many :filters
	belongs_to :version
end
