#coding: utf-8
module ApplicationHelper
  STATUS_LIST = [["可见",1],["屏蔽",0]]
  
  def status_list
    return STATUS_LIST
  end

  def resource_name
    :user
  end
 
  def resource
    @resource ||= User.new
  end
 
  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end
end
