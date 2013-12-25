class User < ActiveRecord::Base
  # attr_protected :admin
  has_many :projects, foreign_key: "author_id", dependent: :destroy
  has_many :collabs, foreign_key: "collaborator_id", dependent: :destroy
  has_many :reverse_collabs, foreign_key: "collaborator_id", class_name: "Collab", dependent: :destroy
  has_many :collab_projects, through: :reverse_collabs, source: :project, dependent: :destroy
  has_many :versions, foreign_key: "collaborator_id", dependent: :destroy
  has_many :notes, foreign_key: "collaborator_id"
  belongs_to :project, class_name: "Project"
  before_save { self.email = email.downcase }
  before_create :create_remember_token
  validates :name, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  validates :email, presence:   true,
                    format:     { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  has_secure_password
  validates :password, length: { minimum: 6 }

  def User.new_remember_token
    SecureRandom.urlsafe_base64
  end

  def User.encrypt(token)
    Digest::SHA1.hexdigest(token.to_s)
  end

  private

    def create_remember_token
      self.remember_token = User.encrypt(User.new_remember_token)
    end
end
