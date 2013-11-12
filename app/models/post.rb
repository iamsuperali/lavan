#coding: utf-8
class Post < ActiveRecord::Base
  belongs_to :user
  belongs_to :category
  default_scope order('top desc,created_at DESC')
  attr_accessible :order,
    :status,
    :category_id,
    :comment_status,
    :content,
    :org_id,
    :title,
    :user_id,
    :attachment,
    :grade,
    :subject,
    :author,
    :approved,
    :top
  has_attached_file :attachment
  
  COMMENT_STATUS_LIST = [["允许评论",1],["不允许评论",0]]
  BOOLEAN_LIST = [["否",false],["是",true]]
  
  #  def parent_id
  #    self.category.parent ? self.category.parent_id : self.category.id
  #  end
  #
  #  def parent_id=(value)
  #    self.category_id ||= value
  #  end
  
  def thumb_id
    regex_url = /pictures[\/][\d]+[\/]/  
    string_url = self.content.scan(regex_url).to_s  
    regex_id = /[\d]+/  
    picture_id = string_url.scan(regex_id)[0]
    return picture_id
  end
  
  
  private
  
end