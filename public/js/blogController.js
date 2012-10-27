var BlogController = function() {

	this.urls = {
		'login' : 'user_details/login.json',
		'newPost' : 'blogs/newpost.json'
	};

	this.username = null;
	this.usernameAuthenticated = false;

	this.globalGetRequestOptions = {
		type : 'GET',
		contentType : 'application/json'
	};

	this.setAuthenticatedState = function(authenticated) {
		this.usernameAuthenticated = authenticated;
	};

	this.isUserAuthenticated = function() {
		return this.usernameAuthenticated;
	}

	this.showLoginScreen = function() {
		//clear the user name and password values
		$("#username").attr('value', '');
		$("#password").attr('value', '');

		//show the login page
		$("#loginContainer").css("display", "");
		$("#username").focus();
	};

	this.login = function() {
		var username = $("#username").val();
		var password = $("#password").val();
		this.username = username;
		$.post(this.urls['login'], {
			"name" : username,
			"password" : password
		}, this.loginResponseHandler, "json");
	};

	this.loginResponseHandler = function(data) {
		var loginResult = data.hashedname;
		if (loginResult) {
			//Set authenticated state
			blogController.setAuthenticatedState(true);
			//Valid result, login success, show the blogs list page
			blogController.getBlogs();
		} else {
			blogController.setAuthenticatedState(false);
			//TODO: Report incorrect login
		}
	}

	this.showNewPostScreen = function() {
		if (this.isUserAuthenticated()) {
			//Hide all existing containers
			$(".container").css("display", "none");

			//Clear the new post form 
			$("#title").attr("value", '');
			$("#content").attr("value", '');

			//Show the new post page
			$("#newPostContainer").css("display", "");

			$("#blogTitle").focus();
		}
	};

	this.postBlogEntry = function() {
		if (this.isUserAuthenticated()) {
			var blogTitle = $("#title").val();
			var blogContent = $("#content").val();
			var authorName = this.username;

			$.post(this.urls['newPost'], {
				"title": blogTitle,
				"content": blogContent,
				"name": authorName
			}, this.newPostResponseHandler, "json");
		}
	};

	this.newPostResponseHandler = function(data) {
		//on success show blogs list page
		var test = data;
		console.log("received the post response..."+data);
		if(data && data.success == "yes") {
			//hide all containers 
			$(".container").css("display", "none");
			
			//Show the blogs list page
			blogController.getBlogs();
		} else {
			
		}
		//on failure show error
	}

	this.getBlogs = function() {
		var url = '/blogs/jsonview.json';
		$.ajax(url, this.globalGetRequestOptions).done(function(data) {

			//Hide all existing containers
			$(".container").css("display", "none");

			//Show the Blog list container with the buttons
			$("#blogsContainer").css("display", "");

			//setup the blog list
			$("#blogEntries").empty();
			$("#blogEntryTemplate").tmpl(data.blogs).appendTo("#blogEntries");
		});
	};

	this.logout = function() {
		//hide all existing containers
		$(".container").css("display", "none");

		//reset the blogController state

		//Clear the login page details and show it
		this.showLoginScreen();
	};
};
