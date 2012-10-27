var BlogController = function() {
	
	this.urls = {
		'login': 'user_details/login.json'
	};
	
	this.globalGetRequestOptions = {
		type: 'GET',
		contentType: 'application/json'
	};
	
	this.showLoginScreen = function() {
		//clear the username and password values
		$("#username").attr('value', '');
		$("#password").attr('value', '');
		
    	$("#loginContainer").css("display", "");
		$("#username").focus();
    };
    
    this.login = function() {
    	var username = $("#username").val();
    	var password = $("#password").val();
		$.post(this.urls['login'], {"name": username, "password": password}, this.loginResponseHandler, "json");
    };
    
    this.loginResponseHandler = function(data) {
    	var loginResult = data.hashedname;
    	if(loginResult) {
    		//Valid result, login success, show the blogs list page
    		blogController.getBlogs();
    	} else {
    		//TODO: Report incorrect login 
    	}
    }
    this.logout = function() {
    	//hide all existing containers
    	$(".container").css("display", "none");
    	
    	//reset the blogController state
    	
    	//Clear the login page details and show it
    	this.showLoginScreen();
    };
    
    this.getBlogs = function() {
      var url = '/blogs/jsonview.json';
      $.ajax(url, this.globalGetRequestOptions).done(function(data) {
      	
      	//Hide all existing containers
      	$(".container").css("display", "none");
      	
      	//Show the Blog list container with the buttons
      	$("#blogsContainer").css("display", "");
      	
      	//setup the blog list
      	$("#blogEntries").empty();
        $("#blogEntryTemplate").tmpl( data.blogs ).appendTo("#blogEntries");
      });
    };
};
