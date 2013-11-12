# coding: UTF-8
class ArtworksController < ApplicationController
  layout "admin"
  
  def index
    @artworks_grid = initialize_grid(Artwork,:per_page => 20)

    respond_to do |format|
      format.html # index.html.erb
      format.json
    end
  end

  def show
    @artwork = Artwork.find(params[:id])

    respond_to do |format|
      format.html {render :layout=>"application"}# show.html.erb
      format.json
    end
  end
  
  def new
    @artwork = Artwork.new

    respond_to do |format|
      format.html # new.html.erb
      format.json
    end
  end
  
  def edit
    @artwork = Artwork.find(params[:id])
  end
  
  def create
    @artwork = Artwork.new(params[:artwork])

    respond_to do |format|
      if @artwork.save
        format.html { redirect_to(artworks_path, :notice => '艺术品 创建成功。') }
        format.json
      else
        format.html { render :action => "new" }
        format.json
      end
    end
  end
  
  def update
    @artwork = Artwork.find(params[:id])

    respond_to do |format|
      if @artwork.update_attributes(params[:artwork])
        format.html { redirect_to(artworks_path, :notice => '艺术品 更新成功。') }
        format.json
      else
        format.html { render :action => "edit" }
        format.json
      end
    end
  end
  
  def destroy
    @artwork = Artwork.find(params[:id])
    @artwork.destroy

    respond_to do |format|
      format.html { redirect_to(artworks_path,:notice => "删除成功。") }
      format.json
    end
  end
end