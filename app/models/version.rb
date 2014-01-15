class Version < ActiveRecord::Base
	belongs_to :project, class_name: "Project"
	belongs_to :collaborator, class_name: "User"
	has_many :track_diffs, dependent: :destroy
	default_scope -> { order('created_at DESC') }
	validates :project_id, presence: true
end
