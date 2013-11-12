# coding: UTF-8
class MembersController < ApplicationController
  layout "admin"
  
  def index
    @members_grid = initialize_grid(Member,:per_page => 10,:order => 'position')

    respond_to do |format|
      format.html # index.html.erb
      format.json
    end
  end

  def show
    @member = Member.find(params[:id])

    respond_to do |format|
      format.html {render :layout=>"application"}# show.html.erb
      format.json
    end
  end
  
  def new
    @member = Member.new

    respond_to do |format|
      format.html # new.html.erb
      format.json
    end
  end
  
  def edit
    @member = Member.find(params[:id])
  end
  
  def create
    @member = Member.new(params[:member])

    respond_to do |format|
      if @member.save
        format.html { redirect_to(members_path, :notice => 'Member 创建成功。') }
        format.json
      else
        format.html { render :action => "new" }
        format.json
      end
    end
  end
  
  def update
    @member = Member.find(params[:id])

    respond_to do |format|
      if @member.update_attributes(params[:member])
        format.html { redirect_to(members_path, :notice => 'Member 更新成功。') }
        format.json
      else
        format.html { render :action => "edit" }
        format.json
      end
    end
  end
  
  def destroy
    @member = Member.find(params[:id])
    @member.destroy

    respond_to do |format|
      format.html { redirect_to(members_path,:notice => "删除成功。") }
      format.json
    end
  end
  
  def sort
    Member.all.each do | w |
      w.position = params["item"].index(w.id.to_s)+1
      w.save
    end
    render :nothing => true
  end
end