/*eslint-env jquery*/
//change name of doc and var list to menuFunctions!
var styleIndex=0;
var currStyle = 0;
var i = 0;

$(document).ready(

//call API @routes/index.js to return products from db
    function popList() 
    {
        $.ajax(
        {
            type: 'GET',
            url: '/getProducts/',
            success: function (data) 
            {
				//populate products list using formControls to submit data to API
				//need 'action' in formControl to force API
                var categoryList = "";
                var categoryListArray = [];
                
                for (i = 0; i < data.length; i++) 
                {
                    if (categoryListArray.includes(data[i].category)) 
                    {
                        continue;
                    }
                    else 
                    {
                        categoryListArray.push(data[i].category);
                    }
                }
				
				//sort options before passing to dropdowns
				categoryListArray.sort();
				for (i = 0; i < categoryListArray.length; i++)
				categoryList += "<option name=" + categoryListArray[i] + " value=" + categoryListArray[i] + ">" + categoryListArray[i] + "</option>";

				//pass the products variable to the feedproducts div id in management
                $("#categoryList").html(categoryList);
				$("#categoryEditList").html(categoryList);
                $("#categorySearchList").html(categoryList);
            }
        });
	}
);
	
//use dropdown in add-product field to fill value with pre-existing category value
function fillCategoryField() 
{
    document.getElementById("category").value = document.getElementById("categoryList").value;
}

function fillCategoryEditField() 
{
    document.getElementById("editCategory").value = document.getElementById("categoryEditList").value;
}

$(function() 
{
	$('#toggleAdvanced').bootstrapToggle('off')
	$('#toggleStore').bootstrapToggle('off')
	$('#toggleCategory').bootstrapToggle('off')
	$('#toggleName').bootstrapToggle('off')
	$('#toggleStore').bootstrapToggle('disable')
	$('#toggleCategory').bootstrapToggle('disable')
	$('#toggleName').bootstrapToggle('disable')
})

function toggleSwitches() 
{
	if($('#toggleAdvanced').prop('checked')==true)
	{	
		$('#toggleStore').bootstrapToggle('enable')
		$('#toggleCategory').bootstrapToggle('enable')
		$('#toggleName').bootstrapToggle('enable')
		$('#toggleStore').prop('checked', true).change()
		$('#toggleCategory').prop('checked', true).change()
		$('#toggleName').prop('checked', true).change()	
	}

	else if($('#toggleAdvanced').prop('checked')==false)
	{
		$('#toggleStore').prop('checked', false).change()
		$('#toggleCategory').prop('checked', false).change()
		$('#toggleName').prop('checked', false).change()
		$('#toggleStore').bootstrapToggle('disable')
		$('#toggleCategory').bootstrapToggle('disable')
		$('#toggleName').bootstrapToggle('disable')
	}
}

function controlForm()
{
	var showSubWarehouse = '';

	if($('#singlePrice').prop('checked')==true)
	{
		$("#multiPrice").prop("checked", false);
		document.getElementById("priceLabel").style.display =  "none";
		document.getElementById("salePriceLabel").style.display =  "none";
		
		document.getElementById("priceS").value =  "0";
		document.getElementById("priceM").value =  "0";
		document.getElementById("priceL").value =  "0";
		document.getElementById("priceXL").value =  "0";
		document.getElementById("price2XL").value =  "0";
		document.getElementById("price3XL").value =  "0";
		document.getElementById("price4XL").value =  "0";
		document.getElementById("inputSinglePrice").style.display =  "block";
		document.getElementById("inputPriceS").style.display =  "none";
		document.getElementById("inputPriceM").style.display =  "none";
		document.getElementById("inputPriceL").style.display =  "none";
		document.getElementById("inputPriceXL").style.display =  "none";
		document.getElementById("inputPrice2XL").style.display =  "none";
		document.getElementById("inputPrice3XL").style.display =  "none";
		document.getElementById("inputPrice4XL").style.display =  "none";
	}
	
	if($('#multiPrice').prop('checked')==true)
	{
		$("#singlePrice").prop("checked", false);
		document.getElementById("priceLabel").style.display =  "block";
		document.getElementById("salePriceLabel").style.display =  "block";
		
		document.getElementById("price").value =  "0";
		document.getElementById("salePrice").value =  "0";
		document.getElementById("inputPriceS").style.display =  "block";
		document.getElementById("inputPriceM").style.display =  "block";
		document.getElementById("inputPriceL").style.display =  "block";
		document.getElementById("inputPriceXL").style.display =  "block";
		document.getElementById("inputPrice2XL").style.display =  "block";
		document.getElementById("inputPrice3XL").style.display =  "block";
		document.getElementById("inputPrice4XL").style.display =  "block";
		document.getElementById("inputSinglePrice").style.display =  "none";
	}
	
	if($('#multiPrice').prop('checked')==false)
	{
		document.getElementById("priceLabel").style.display =  "none";
		document.getElementById("salePriceLabel").style.display =  "none";
		
		document.getElementById("inputPriceS").style.display =  "none";
		document.getElementById("inputPriceM").style.display =  "none";
		document.getElementById("inputPriceL").style.display =  "none";
		document.getElementById("inputPriceXL").style.display =  "none";
		document.getElementById("inputPrice2XL").style.display =  "none";
		document.getElementById("inputPrice3XL").style.display =  "none";
		document.getElementById("inputPrice4XL").style.display =  "none";
		document.getElementById("inputSalePriceS").style.display =  "none";
		document.getElementById("inputSalePriceM").style.display =  "none";
		document.getElementById("inputSalePriceL").style.display =  "none";
		document.getElementById("inputSalePriceXL").style.display =  "none";
		document.getElementById("inputSalePrice2XL").style.display =  "none";
		document.getElementById("inputSalePrice3XL").style.display =  "none";
		document.getElementById("inputSalePrice4XL").style.display =  "none";
	}
	
	if($('#singlePrice').prop('checked')==false)
	{
		document.getElementById("inputSinglePrice").style.display =  "none";
		document.getElementById("inputSalePrice").style.display =  "none";
	}
	
	if($('#singlePrice').prop('checked')==true && $('#onSale').prop('checked')==true)
	{
		document.getElementById("inputSalePrice").style.display =  "block";
	}
	
	else
	{
		document.getElementById("inputSalePrice").style.display =  "none";
		document.getElementById("salePrice").value =  "0";
	}
	
	if($('#multiPrice').prop('checked')==true && $('#onSale').prop('checked')==true)
	{
		document.getElementById("inputSalePriceS").style.display =  "block";
		document.getElementById("inputSalePriceM").style.display =  "block";
		document.getElementById("inputSalePriceL").style.display =  "block";
		document.getElementById("inputSalePriceXL").style.display =  "block";
		document.getElementById("inputSalePrice2XL").style.display =  "block";
		document.getElementById("inputSalePrice3XL").style.display =  "block";
		document.getElementById("inputSalePrice4XL").style.display =  "block";
	}
	
	else
	{
		document.getElementById("salePriceS").value =  "0";
		document.getElementById("salePriceM").value =  "0";
		document.getElementById("salePriceL").value =  "0";
		document.getElementById("salePriceXL").value =  "0";
		document.getElementById("salePrice2XL").value =  "0";
		document.getElementById("salePrice3XL").value =  "0";
		document.getElementById("salePrice4XL").value =  "0";
		document.getElementById("inputSalePriceS").style.display =  "none";
		document.getElementById("inputSalePriceM").style.display =  "none";
		document.getElementById("inputSalePriceL").style.display =  "none";
		document.getElementById("inputSalePriceXL").style.display =  "none";
		document.getElementById("inputSalePrice2XL").style.display =  "none";
		document.getElementById("inputSalePrice3XL").style.display =  "none";
		document.getElementById("inputSalePrice4XL").style.display =  "none";
	}
	
	if($('#hasColors').prop('checked')==true&&$('#hasSizes').prop('checked')==true)
	{
		document.getElementById("showSizes").style.display =  "none";
	}
	
	if($('#hasColors').prop('checked')==true)
	{
		document.getElementById("addSubStyle").style.display =  "block";

		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;

			var showSizes = document.getElementById("showSizes").id + currStyle;
			//var subStyle = document.getElementById("subStyle").id + currStyle;
			//var addSubStyle = document.getElementById("addSubStyle").id + currStyle;
				
			if($('#hasSizes').prop('checked')==true)
			{
				document.getElementById(showSizes).style.display =  "block";
			}
				
			else if($('#hasSizes').prop('checked')==false)
			{
				document.getElementById(showWarehouseSizes).style.display =  "none";
			}
		}
			
		if(styleIndex>0)
		for(i=1; i<styleIndex+1; i++)	
		{
			currStyle = i;
			var addSubStyle = document.getElementById("addSubStyle").id + currStyle;
			document.getElementById(addSubStyle).style.display =  "none";
		}
	}

	if($('#hasColors').prop('checked')==false)
	{	
		styleIndex=0;
		var clearMenu = "";
		document.getElementById("subStyle").style.display =  "none";
		document.getElementById("addSubStyle").style.display =  "none";
		$("#subStyleMenu").html(clearMenu);
	}
	
	if($('#hasSizes').prop('checked')==true)
	{
		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;
				
			showSubWarehouse = document.getElementById("showSub").id + currStyle;
			document.getElementById(showSub).style.display =  "block";
		}
	}
	
	if($('#hasSizes').prop('checked')==false)
	{
		document.getElementById("showSizes").style.display =  "none";
		
		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;

			var subCount = document.getElementById("subCount").id + currStyle;
			document.getElementById(subCount).value=0;
		}

		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;

			showSub = document.getElementById("showSub").id + currStyle;
			document.getElementById(showSub).style.display =  "block";
		}
	}
	
	if(($('#hasSizes').prop('checked')==true) && ($('#hasColors').prop('checked')==false))
	{	
		document.getElementById("showSizes").style.display =  "block";
	}
	
	if(($('#hasSizes').prop('checked')==false) && ($('#hasColors').prop('checked')==false))
	{
		document.getElementById("countTotal").value = 0;
	}
	
	updateTotals();
}

function updateTotals()
{
	/* REPLACE WITH 1 STORE TOTAL & CHANGE CALCS BELOW */
	var countSizeS = 0;
	var countSizeM = 0;
	var countSizeL = 0;
	var countSizeXL = 0;
	var countSize2XL = 0;
	var countSize3XL = 0;
	var countSize4XL = 0;

	var countTotal = 0;

	if($('#hasSizes').prop('checked')==true&&$('#hasColors').prop('checked')==true)
	{
		document.getElementById("countTotal").value = 0;
		
		for(i=1;i<styleIndex+1;i++)
		{
			currStyle = i;
			sizeTotal = 0;
			subCount = 0;
			
			var SizeS = document.getElementById("SizeS").id + currStyle; 
			var SizeM = document.getElementById("SizeM").id + currStyle; 
			var SizeL = document.getElementById("SizeL").id + currStyle; 
			var SizeXL = document.getElementById("SizeXL").id + currStyle; 
			var Size2XL = document.getElementById("Size2XL").id + currStyle; 
			var Size3XL = document.getElementById("Size3XL").id + currStyle; 
			var Size4XL = document.getElementById("Size4XL").id + currStyle; 
			countSizeS = parseInt(document.getElementById(SizeS).value);
			countSizeM = parseInt(document.getElementById(SizeM).value);
			countSizeL = parseInt(document.getElementById(SizeL).value);
			countSizeXL = parseInt(document.getElementById(SizeXL).value);
			countSize2XL = parseInt(document.getElementById(Size2XL).value);
			countSize3XL = parseInt(document.getElementById(Size3XL).value);
			countSize4XL = parseInt(document.getElementById(Size4XL).value);
			sizeTotal = parseInt(couneSizeS) + parseInt(countSizeM) + parseInt(countSizeL) + parseInt(countSizeXL) + parseInt(countSize2XL) + parseInt(countSize3XL) + parseInt(countSize4XL);
			subCount = document.getElementById("subCount").id + currStyle;
			
			countTotal += parseInt(sizeTotal);
			document.getElementById(subCount).value = countTotal;
			document.getElementById("countTotal").value = parseInt(document.getElementById("countTotal").value) + parseInt(document.getElementById(subCount).value);
			
			var colorTotal = (document.getElementById("colorTotal").id + currStyle); 
			//console.log(colorTotal);
			document.getElementById(colorTotal).value = Total;
		}
	}
	
	if($('#hasSizes').prop('checked')==false&&$('#hasColors').prop('checked')==true)
	{
		var subCountTotal = 0;
		var tempTotal = 0;
			
		for(i=1;i<styleIndex+1;i++)
		{
			currStyle = i;
				
			colorTotal = document.getElementById("colorTotal").id + currStyle;
			countTotal = 0;
									
			subCount = document.getElementById("subCount").id + currStyle;	
			countTotal = parseInt(document.getElementById(subCount).value) + countTotal;
			tempTotal = tempTotal + parseInt(document.getElementById(subCount).value);
				
			document.getElementById("countTotal").value = tempTotal;
			document.getElementById(colorTotal).value = countTotal;
		}
	}
		
	if($('#hasSizes').prop('checked')==true&&$('#hasColors').prop('checked')==false)
	{		
		countTotal = 0;
			
		countSizeS = parseInt(document.getElementById("SizeS").value);
		countSizeM = parseInt(document.getElementById("SizeM").value);
		countSizeL = parseInt(document.getElementById("SizeL").value);
		countSizeXL = parseInt(document.getElementById("SizeXL").value);
		countSize2XL = parseInt(document.getElementById("Size2XL").value);
		countSize3XL = parseInt(document.getElementById("Size3XL").value);
		countSize4XL = parseInt(document.getElementById("Size4XL").value);
		sizeTotal = parseInt(countSizeS) + parseInt(countSizeM) + parseInt(countWarehouseSizeL) + parseInt(countWarehouseSizeXL) + parseInt(countWarehouseSize2XL) + parseInt(countWarehouseSize3XL) + parseInt(countWarehouseSize4XL);

		countTotal = parseInt(SizeTotal);
		document.getElementById("countTotal").value = countTotal;
	}
	
	if($('#hasColors').prop('checked')==true&&$('#inWarehouse').prop('checked')==false)
	{
		document.getElementById("countTotal").value = 0;
	}
}

function addForm()
{
	document.getElementById("countTotal").value = 0;
	styleIndex = parseInt(document.getElementById("numSubStyles").value);
	
	var formControl = "";
	
	for(i=1; i<styleIndex+1;i++)
	{	
		formControl += "<div class='row' id='subStyle"+i+"'>"
		formControl += "<br>"
		formControl += "<div class='col-sm-2'>"
		formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='color"+i+"' id='color"+i+"' placeholder='Style Code'>"
		formControl += "</div>"
		formControl += "<br>"
		formControl += "<div class='col-sm-2'>"
		formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='colorTotal"+i+"' id='colorTotal"+i+"' placeholder='0'>"
		formControl += "</div>"
		formControl += "<div class='col-sm-2' id='showSub"+i+"'>"
		formControl += "<p>Totals</p>"
		formControl += "<input type='text' class='form-control input-lg required' required='required' name='subCount"+i+"' id='subCount"+i+"' value='0' onchange='updateTotals()'>"
		formControl += "</div>"
		formControl += "</div>"
		formControl += "</div>"
		formControl += "</div><br>"
		formControl += "<div class='row' id='subSizeList"+i+"'>"
		formControl +=		"<div class='col-sm-3' id='showSizes"+i+"' style='display: none'>"
		formControl +=			"<label for='storeSizes' class='control-label'>Sizes</label><br>"
		formControl +=			"<input type='text' name='SizeS"+i+"' id='SizeS"+i+"' value='0' onchange='updateTotals()'><label for='SizeS"+i+"'>:S</label><br>"
		formControl +=			"<input type='text' name='SizeM"+i+"' id='SizeM"+i+"' value='0' onchange='updateTotals()'><label for='SizeM"+i+"'>:M</label><br>"
		formControl +=			"<input type='text' name='SizeL"+i+"' id='SizeL"+i+"' value='0' onchange='updateTotals()'><label for='SizeL"+i+"'>:L</label><br>"
		formControl +=			"<input type='text' name='SizeXL"+i+"' id='SizeXL"+i+"' value='0' onchange='updateTotals()'><label for='SizeXL"+i+"'>:XL</label><br>"
		formControl +=			"<input type='text' name='Size2XL"+i+"' id='Size2XL"+i+"' value='0' onchange='updateTotals()'><label for='Size2XL"+i+"'>:2XL</label><br>"
		formControl +=			"<input type='text' name='Size3XL"+i+"' id='Size3XL"+i+"' value='0' onchange='updateTotals()'><label for='Size3XL"+i+"'>:3XL</label><br>"
		formControl +=			"<input type='text' name='Size4XL"+i+"' id='Size4XL"+i+"' value='0' onchange='updateTotals()'><label for='Size4XL"+i+"'>:4XL</label><br>"
		formControl +=		"</div>"
		formControl +=	"</div>"	
		formControl +=	"<br>"
		formControl +=	"<div class='row' id='addSubStyle"+i+"' style='display: none'>"
		formControl +=		"<div class='col-sm-3'>"
		formControl +=			"<button type='button' onclick='addForm()'>Add Sub-Style</button>"
		formControl +=		"</div>"
		formControl +=		"<div class='col-sm-9'>"			
		formControl +=		"</div>"	
		formControl +=	"</div>"
		formControl +=	"<br>"
	}
	
	document.getElementById("subStyleMenu").innerHTML = formControl;
	
	controlForm();
}
