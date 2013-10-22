class VersionFile < ActiveRecord::Base
	belongs_to :project 	
	belongs_to :version	
	belongs_to :track
	validates :version_id, presence: true
	validates :track_id, presence: true
end
