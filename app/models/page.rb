class Page < ActiveRecord::Base
  attr_accessible :content, :permalink, :status, :title,:subtitle
end
