#coding: utf-8
module PostsHelper
  
  def comment_status_list
    return Post::COMMENT_STATUS_LIST
  end

  def org_list
    return Post::ORG_LIST
  end
  def subject_list
    return Post::SUBJECT_LIST
  end

  def grade_list
    return Post::GRADE_LIST
  end

  def permit_list
    return Post::PERMIT_LIST
  end

  def format_org(org_id)
    result = (Post::ORG_LIST.find{|s| s[1] == org_id})
    result ? result[0] : "无"
  end

  def format_boolean(status)
    result = (Post::BOOLEAN_LIST.find{|s| s[1] == status})
    result ? result[0] : "无"
  end

end
