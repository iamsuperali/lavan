#coding: utf-8
class Category < ActiveRecord::Base
  attr_accessible :name, :order, :parent_id, :status,:bg,:desc
  has_attached_file :bg, :styles => { :content => "941x207>", :thumb => "120x90#" }
  default_scope order('position')
  has_many :artworks
end
