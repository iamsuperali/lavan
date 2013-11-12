# coding: UTF-8
class ArtistsController < ApplicationController
  layout "admin"
  
  def index
    @artists_grid = initialize_grid(Artist,:per_page => 20)

    respond_to do |format|
      format.html # index.html.erb
      format.json
    end
  end

  def show
    @artist = Artist.find_by_pinyin(params[:pinyin])

    respond_to do |format|
       format.html {render :layout=>"application"}# show.html.erb
      format.json
    end
  end
  
  def new
    @artist = Artist.new

    respond_to do |format|
      format.html # new.html.erb
      format.json
    end
  end
  
  def edit
    @artist = Artist.find(params[:id])
  end
  
  def create
    @artist = Artist.new(params[:artist])

    respond_to do |format|
      if @artist.save
        format.html { redirect_to(artists_path, :notice => '艺术家 创建成功。') }
        format.json
      else
        format.html { render :action => "new" }
        format.json
      end
    end
  end
  
  def update
    @artist = Artist.find(params[:id])

    respond_to do |format|
      if @artist.update_attributes(params[:artist])
        format.html { redirect_to(artists_path, :notice => '艺术家 更新成功。') }
        format.json
      else
        format.html { render :action => "edit" }
        format.json
      end
    end
  end
  
  def destroy
    @artist = Artist.find(params[:id])
    @artist.destroy

    respond_to do |format|
      format.html { redirect_to(artists_path,:notice => "删除成功。") }
      format.json
    end
  end
end