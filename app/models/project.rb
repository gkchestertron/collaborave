class Project < ActiveRecord::Base
	has_many :collabs, dependent: :destroy
	has_many :collaborators, through: :collabs, dependent: :destroy
	has_many :versions, dependent: :destroy
	has_many :tracks, dependent: :destroy
	has_many :notes, dependent: :destroy
	belongs_to :author, class_name: "User"
	default_scope -> { order('created_at DESC') }
	validates :author_id, presence: true
end
