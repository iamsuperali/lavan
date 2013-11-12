class Artwork < ActiveRecord::Base
  attr_accessible :artist_id, :category_id, :click_count, :condition_report,
    :description, :dimensions, :edition, :exhibition, :listed, :literature, 
    :markings, :medium, :title, :year,:avater1,:avater2,:avater3
  belongs_to :artist
  belongs_to :category
  
  has_attached_file :avater1, :styles => { :content =>  "1000x1000>",:medium=>"700x500>",:thumb=> "77x77#" }
  has_attached_file :avater2, :styles => { :content =>  "1000x1000>",:medium=>"700x500>",:thumb=> "77x77#" }
  has_attached_file :avater3, :styles => { :content =>  "1000x1000>",:medium=>"700x500>",:thumb=> "77x77#" }
  
end
