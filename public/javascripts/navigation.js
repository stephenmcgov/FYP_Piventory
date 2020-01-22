$(document).ready(

function (){
    $("#shopNav").click(function (event) {
            $(location).attr('href', '/catalogue' );
        }
    )

    $("#backEndNav").click(function (event) {
            $(location).attr('href', '/management' );
        }
    )
	
	$("#reportsNav").click(function (event) {
            $(location).attr('href', '/reports' );
        }
    )

    /*$("#toLoginPageButton").click(function (event){
            $(location).attr('href', '/index');
        }
    )*/
	
    $("#createAccount").click(function (event){
            $(location).attr('href', '/catalogue' );
        }
    )
});

