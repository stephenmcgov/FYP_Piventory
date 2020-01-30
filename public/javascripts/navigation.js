/*eslint-env jquery*/
$(document).ready(

function ()
{
    $("#shopNav").click(function() 
    {
        $(location).attr('href', '/catalogue' );
    })

    $("#backEndNav").click(function() 
    {
        $(location).attr('href', '/management' );
    })
	
	$("#reportsNav").click(function() 
    {
        $(location).attr('href', '/reports' );
    })

    /*$("#toLoginPageButton").click(function()
    {
        $(location).attr('href', '/index');
    })*/
	
    $("#createAccount").click(function() 
    {
        $(location).attr('href', '/catalogue' );
    })
});

