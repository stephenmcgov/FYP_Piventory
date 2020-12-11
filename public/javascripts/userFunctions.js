
//show reports list on shopfront page
//going to replace this with search reports function
//CHECK BRACKETS HERE
$(document).ready(
    //call API @routes/index.js
    function getUsers() 
    {
        $.ajax(
        {
            type: 'GET',
            url: '/getUsers',
            dataType: 'json',
            success: function (data) 
            {
                var userList = "";
            
                for (i = 0; i < data.length; i++) 
				{
                    userList += "<div class='panel'><br>";
                    userList += "<p>Name: " + data[i].user_name + "</p>";
                    userList += "<br>";
                    userList += "<p>Role: " + data[i].role + "</p>";
                    userList += "<br>";
                    userList += "</div><br>"
                }
                $("#user_list").html(userList);
            }
        });
    },
);

$(document).ready(
function getLoggedInUser()
{
    var name = "name" + "=";
    var ca = document.cookie.split(';');

    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
    
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
    
        if (c.indexOf(name) == 0) {
            var loggedInUser = c.substring(name.length, c.length);
        }
    }

    $("#loggedInUser").html(loggedInUser);
}
);