class Version < ActiveRecord::Base
	belongs_to :project, class_name: "Project"
	belongs_to :collaborator, class_name: "User"
	has_many :version_files, dependent: :destroy
	has_many :tracks, through: :version_files, dependent: :destroy
	default_scope -> { order('created_at DESC') }
	validates :settings, presence: true
	validates :project_id, presence: true
end
