class Slide < ActiveRecord::Base
  attr_accessible :image, :link, :order, :title
  has_attached_file :image, 
    :url => "/images/slide/:id/:basename_:style.:extension",
    :path => ":rails_root/public/images/slide/:id/:basename_:style.:extension",
    :styles => { :content => "960x540>", :thumb => "150x85#" }
end
