//Device Envent Listener
$( document ).ready(function() {
      document.addEventListener("deviceready",function(){
			getRepos(); 
        });
   
$(".ui-input-clear").click(function() {
	    $('#user_info').empty();
      	$('#search_list').empty();
  });
});

$("#search_btn").click(function(e) {
  e.preventDefault();
  var search_html='';
  var user_html='';
  var username=$('#username').val();
  var user_url='https://api.github.com/users/'+username;
  var repo_url='https://api.github.com/users/'+username+'/repos';
  
   $.ajax({
   	   url:repo_url,
   	   dataType:'jsonp',
   	   success: function(responce){
      	$.each(responce.data,function() {
      		user_html= '<img class="thub" src='+this.owner.avatar_url+'>'+ '<h2>'+this.owner.login+'</h2>';
      		search_html+='<li>'+
                  '<h1><a target="_blank" href='+this.html_url+'>'+this.name+'</a>'+ 
                  '<p>By::'+this.owner.login+'</p>'+  
      		 	  '</li>'

      	});
      	$('#user_info').append(user_html);
      	$('#search_list').append(search_html);
      	$('#search_list').listview('refresh');

      }

   });

});

function getRepos() {
  var html="";
  $.ajax({
      url:"https://api.github.com/repositories",
      dataType:"jsonp",
      success: function(responce){
      	$.each(responce.data,function(i,item) {
      		 if (i<10) {
      		 	html+='<li>'+
                  '<img class="thub" src='+this.owner.avatar_url+'>'+
                  '<h1><a target="_blank" href='+this.html_url+'>'+this.name+'</a>'+ 
                  '<p>By::'+this.owner.login+'</p>'+  
      		 	  '</li>'
      		 };

      	});
      	$('#repos_list').append(html);
      	$('#repos_list').listview('refresh');
      }

  });
}