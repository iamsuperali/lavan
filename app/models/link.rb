#coding: utf-8
class Link < ActiveRecord::Base
  attr_accessible :name, :order, :url
end
