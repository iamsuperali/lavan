class Member < ActiveRecord::Base
  attr_accessible :avatar1, :avater2, :cname, :ename, :info, :title_img
  has_attached_file :avatar1, 
    :url => "/images/avatar1/:id/:basename_:style.:extension",
    :path => ":rails_root/public/images/avatar1/:id/:basename_:style.:extension",
    :styles => { :medium => "420x420>", :thumb => "100x100>" }
  
  has_attached_file :avater2, 
    :url => "/images/avatar2/:id/:basename_:style.:extension",
    :path => ":rails_root/public/images/avatar2/:id/:basename_:style.:extension",
    :styles => { :medium => "420x420>", :thumb => "100x100>" }
  
  has_attached_file :title_img, 
    :url => "/images/title_img/:id/:basename_:style.:extension",
    :path => ":rails_root/public/images/title_img/:id/:basename_:style.:extension",
    :styles => { :medium => "400x69>", :thumb => "100x100>" }
  
  default_scope order('position')
end
