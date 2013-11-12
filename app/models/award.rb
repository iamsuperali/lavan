class Award < ActiveRecord::Base
  attr_accessible :avatar, :description, :year
  has_attached_file :avatar, 
    :url => "/images/awards/avatar/:id/:basename_:style.:extension",
    :path => ":rails_root/public/images/awards/avatar/:id/:basename_:style.:extension",
    :styles => { :medium => "820x600>", :thumb => "100x100>" }
end
