/*eslint-env jquery*/

// remove/replace w/set storename method & rename
//add store to system
$(document).ready(
    function() 
    {
        /*$("#newStoreForm").submit(function (event) 
        {
            event.preventDefault();
            $.ajax(
            {
                type: 'POST',
                url: '/addStore',
                dataType: 'json',
                data: 
                {
                    'storeName': event.target.newStoreName.value
                },
                success: function()
                {
                    $(location).attr('href', '/Catalogue' );
                    // Redirect to catalogue page
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
        });*/
    }
);

//use dropdown in add-product field to fill value with pre-existing store value
function fillStoreField() 
{
    document.getElementById("storeName").value = document.getElementById("store").value;
}

function fillStoreCountField() 
{
	document.getElementById("storeCountName").value = document.getElementById("store").value;
}

function fillStoreReportField() 
{
	document.getElementById("storeReportName").value = document.getElementById("store").value;
}
