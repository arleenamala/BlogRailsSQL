var BlogController = function() {
	this.showLoginPage = function() {
    	
    };
    
    this.getBlogs = function() {
      var url = '/blogs/jsonview.json';
      var options = {type: 'GET', contentType: "application/json"};      
      $.ajax(url, options).done(function(data) {
      	
      	//Hide all existing containers
      	
      	//Show the Blog list container with the buttons
      	
      	//setup the blog list
      	$("#blogEntries").empty();
        $("#blogEntryTemplate").tmpl( data.blogs ).appendTo("#blogEntries");
      });
    };
};
