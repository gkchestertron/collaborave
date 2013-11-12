class Note < ActiveRecord::Base
	belongs_to :project, class_name: "Project"
	belongs_to :collaborator, class_name: "User"
	default_scope -> { order('created_at DESC') }
	validates :collaborator_id, presence: true
	validates :project_id, presence: true
	validates :content, presence: true
end
