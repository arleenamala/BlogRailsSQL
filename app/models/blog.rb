class Blog < ActiveRecord::Base
  attr_accessible :content, :created, :name, :title
  validates :name, :presence => true
  validates :title, :presence => true
  validates :content, :presence => true
  validates :created, :presence => true
end
