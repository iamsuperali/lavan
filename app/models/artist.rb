# encoding: utf-8
require 'ruby-pinyin'

class Artist < ActiveRecord::Base
  attr_accessible :address, :age, :birthplace, :letter,:name, :profile, :visits,:avater,:pinyin
  has_attached_file :avater, :styles => { :content =>  "300x300>",:thumb=> "100x100>" }
  
  before_save :add_letter
  has_many :artworks
  
  
  private
  
  def add_letter
    pinyin = PinYin.of_string(self.name)
    self.letter =  pinyin[0][0]
    self.pinyin =  pinyin.join("_")
  end
end
