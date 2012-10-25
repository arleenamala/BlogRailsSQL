class UserDetailsController < ApplicationController

  def check_user(users,pword)
    pword_enc = Digest::SHA256.hexdigest(pword)
    if UserDetail.authenticate_safely(users,pword_enc)
      return 1
    end
  end
   
  # POST /user_details/login.json
  def login
    name = params[:name]
    password = params[:password]
    respond_to do |format|
      if check_user(name,password)
        format.json {render :json => "{" + "hashedname".to_json + ":" + Digest::SHA256.hexdigest(params[:name]).to_json + "}"}
      else
        format.json {render :json => "{" + "hashedname".to_json + ":" + "".to_json + "}" }
      end
    end        
  end
  
  # POST /user_details/signup.json
  def signup
    pword_enc = Digest::SHA256.hexdigest(params[:password])
    user_detail = UserDetail.new
    user_detail.name = params[:name]
    user_detail.password = pword_enc
    respond_to do |format|
      if user_detail.save
        format.json { render :json => "{" + "hashedname".to_json + ":" + Digest::SHA256.hexdigest(params[:name]).to_json + "}"}
      else
        format.json { render :json => "{" + "hashedname".to_json + ":" + "".to_json + "}" }
      end
    end
  end
  
end