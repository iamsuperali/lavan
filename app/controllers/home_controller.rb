#coding: utf-8
class HomeController < ApplicationController
  def index
    @slides = Slide.find(:all)
    @artworks = Artwork.find(:all,:limit=>6)
  end
  
  def search
    q = "%#{params[:keyword]}%"
    @winecoolers = Winecooler.where("model like ?",q).paginate(:page => params[:page], :per_page =>10)
  end
  
  def news
    @posts = Post.find(:all,:limit=>4)

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @post }
    end
  end
  
  def categories
    @categories = Category.find(:all,:limit=>4)

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @categories }
    end
  end
  
  def about
    @page = Page.find(1)
  end
  
  def contactus
    
  end
  
  def members
    @members = Member.find(:all)
  end
  
  def artists
    @letters = Artist.select(:letter).map(&:letter).uniq
  end
  
  def artworks
    @artworks = Artwork.find(:all,:limit=>6)
  end
  
  
end
