#coding: utf-8
class PostsController < ApplicationController
  load_and_authorize_resource
  layout "admin"
  # GET /posts
  # GET /posts.json
  def index
    @posts_grid = initialize_grid(Post,
      :include => [:category],
      :per_page => 10)
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    @post = Post.find(params[:id])
    @next_post = Post.where("category_id = ? and id > ?",@post.category_id,@post.id).limit(1).first
    @pre_post = Post.order("id desc").where("category_id = ? and id < ?",@post.category_id,@post.id).limit(1).first
    #面包屑导航的数据
    @posts_breadcrumb_items = [
      {:key => :main, :name => 'Main',:url => '/main',:items => [
          {:key => :sub1, :name => 'Submenu 1', :url => '/sub1'},
          {:key => :sub2, :name => 'Submenu 2', :url => '/sub2'}
        ]}
    ]

    respond_to do |format|
      format.html { render :layout=>"application"}# show.html.erb
      format.json { render json: @post }
    end
  end

  # GET /posts/new
  # GET /posts/new.json
  def new
    @post = Post.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @post }
    end
  end

  # GET /posts/1/edit
  def edit
    @post = Post.find(params[:id])
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(params[:post])
    @post.user_id = current_user.id

    respond_to do |format|
      if @post.save
        format.html { redirect_to posts_url, notice: '文章创建成功.' }
        format.json { render json: @post, status: :created, location: @post }
      else
        format.html { render action: "new" }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /posts/1
  # PUT /posts/1.json
  def update
    @post = Post.find(params[:id])

    respond_to do |format|
      if @post.update_attributes(params[:post])
        format.html { redirect_to posts_url, notice: '文章修改成功。' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post = Post.find(params[:id])
    @post.destroy

    respond_to do |format|
      format.html { redirect_to posts_url }
      format.json { head :no_content }
    end
  end
  
  def sort
    Post.all.each do | w |
      w.position = params["item"].index(w.id.to_s)+1
      w.save
    end
    render :nothing => true
  end

  
end
