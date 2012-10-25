class UserDetail < ActiveRecord::Base
  attr_accessible :name, :password
  validates :name, :uniqueness => true, :presence => true
  validates :password, :presence => true
  def self.authenticate_safely(user_name, password)
    where("name = ? AND password = ?", user_name, password).first
  end
end
