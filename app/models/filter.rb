class Filter < ActiveRecord::Base
	belongs_to :track
	belongs_to :track_diff
	belongs_to :region
	belongs_to :region_diff
	has_many :filter_automations, dependent: :destroy

end
