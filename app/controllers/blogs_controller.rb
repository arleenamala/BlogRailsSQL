class BlogsController < ApplicationController

  # GET /blogs/jsonview.json
  def jsonview
    @blogs = Blog.limit(100).order('created DESC')

    respond_to do |format|
      count = @blogs.count
      js = "{" + "blogs".to_json + ":["
      @blogs.each do |blog|
       js += "{" + "name".to_json + ":" +(blog.name).to_json + ","
       js += "subject".to_json + ":" +(blog.title).to_json + ","
       js += "content".to_json + ":" +(blog.content).to_json + ","
       t = blog.created.asctime
       js += "created".to_json + ":" + (t).to_json + "}"
       if count > 1
          js += ","
          count -= 1
       end
      end
      js += "]}"
      format.json { render :json => js }
    end
  end

 
  # POST /blogs/newpost.json
  def newpost
    @blog = Blog.new
    @blog.name = params[:name]
    @blog.title = params[:title]
    @blog.content = params[:content]
    @blog.created = Time.now

    respond_to do |format|
      if @blog.save
        format.json { render :json => "{" + "success".to_json + ":" + "yes".to_json + "}" }
      else
        format.json { render :json => "{" + "success".to_json + ":" + "no".to_json + "}"}
      end
    end
  end


end
