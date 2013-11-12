#coding: utf-8
class SlidesController < ApplicationController
  load_and_authorize_resource
  layout "admin"
  # GET /slides
  # GET /slides.json
  def index
    @slides_grid = initialize_grid(Slide,:per_page => 10)
  end

  # GET /slides/1
  # GET /slides/1.json
  def show
    @slide = Slide.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @slide }
    end
  end

  # GET /slides/new
  # GET /slides/new.json
  def new
    @slide = Slide.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @slide }
    end
  end

  # GET /slides/1/edit
  def edit
    @slide = Slide.find(params[:id])
  end

  # POST /slides
  # POST /slides.json
  def create
    @slide = Slide.new(params[:slide])

    respond_to do |format|
      if @slide.save
        format.html { redirect_to slides_url, notice: '幻灯片创建成功.' }
        format.json { render json: @slide, status: :created, location: @slide }
      else
        format.html { render action: "new" }
        format.json { render json: @slide.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /slides/1
  # PUT /slides/1.json
  def update
    @slide = Slide.find(params[:id])

    respond_to do |format|
      if @slide.update_attributes(params[:slide])
        format.html { redirect_to slides_url, notice: '幻灯片修改成功.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @slide.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /slides/1
  # DELETE /slides/1.json
  def destroy
    @slide = Slide.find(params[:id])
    @slide.destroy

    respond_to do |format|
      format.html { redirect_to slides_url }
      format.json { head :no_content }
    end
  end
  
  def sort
    Slide.all.each do | w |
      w.position = params["item"].index(w.id.to_s)+1
      w.save
    end
    render :nothing => true
  end
end
