class Track < ActiveRecord::Base
	belongs_to :project
	validates :name, presence: true
	has_many :regions, dependent: :destroy
	has_many :filters, dependent: :destroy

end
