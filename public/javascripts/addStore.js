/*eslint-env jquery*/

//add store to system
$(document).ready(
    function() 
    {
        $("#newStoreForm").submit(function (event) 
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
        });
	
        $.ajax(
        {
            type: 'GET',
            url: '/getStores/',
            success: function (data) 
            {
				//populate store list using forms to submit data to API
				//need 'action' in form to force API
                var storeList = "";
                var storeListArray = [];
             
                for (var i = 0; i < data.length; i++) 
                {
                    if (storeListArray.includes(data[i].storeName)) 
                    {
                        continue;
                    }
                    
                    else 
                    {
                        storeList += "<option name=" + data[i].storeName + " value=" + data[i].storeName + ">" + data[i].storeName + "</option>";
                        storeListArray.push(data[i].storeName);
                    }
                }

				//pass the stores variable to the stores div id in Management
                $("#storeList").html(storeList);
				$("#storeReportList").html(storeList);
				$("#storeCountList").html(storeList);
                $("#storeSearchList").html(storeList);
            }
        });
});

//use dropdown in add-product field to fill value with pre-existing store value
function fillStoreField() 
{
    document.getElementById("storeName").value = document.getElementById("storeList").value;
}

function fillStoreCountField() 
{
	document.getElementById("storeCountName").value = document.getElementById("storeCountList").value;
}

function fillStoreReportField() 
{
	document.getElementById("storeReportName").value = document.getElementById("storeReportList").value;
}
