#coding: utf-8
class AdminController < ApplicationController
  before_filter :authenticate_user!
  before_filter :admin?
  
  def index
  end
end
