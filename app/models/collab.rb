class Collab < ActiveRecord::Base
	belongs_to :collaborator, class_name: "User"
	belongs_to :project, class_name: "Project"
	validates :collaborator_id, presence: true
	validates :project_id, presence: true
end
