/*eslint-env jquery*/
$(document).ready(
    function() {
	/**
         * Event handler for when the user attempts to register
         */
        /* ! REQUIRES VALIDATION ! */
        $("#reg-form").submit(function (event)
        {
            event.preventDefault();
			
            var role = '';

			if($('#inputRole').prop('checked')==true)
				role='admin';
			
            else role='staff';
			
            $.ajax({
                type: 'POST',
                url: '/users/register',
                dataType: 'json',
                data: {
                    'user_name': event.target.inputUsername.value,
                    'password': event.target.inputPassword.value,
					'role': role,
                },
                success: function()
                {
                    $(location).attr('href', '/management' );
                    // BUG -> NOT REDIRECTING TO MANAGEMENT
                    // Redirect to a login page
                },
                error: function(errMsg)
                {
                    swal(
                        'Oops...',
                        errMsg.responseJSON.body,
                        'error'
                    )
                }
            });
        });

        /* ! REQUIRES VALIDATION ! */
        $("#log-form").submit(function (event)
        {
            event.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/users/login',
                dataType: 'json',
                data: {
                    'user_name': event.target.inputUsername.value,
                    'password': event.target.inputPassword.value
                },
                success: function()
                {
                    //if success, redirects to /backend page
                    $(location).attr('href', '/catalogue' );
                    // Redirect to logged in page
                },
                error: function(errMsg) 
                {
                    swal(
                        'Oops...',
                        errMsg.responseJSON.body,
                        'error'
                    )
                }
            });
        });

    });//first function



