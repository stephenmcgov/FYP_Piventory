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
		document.getElementById("showWarehouseSizes").style.display =  "none";
	}
	
	if($('#hasColors').prop('checked')==true)
	{
		document.getElementById("addSubStyle").style.display =  "block";

		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;

			var showWarehouseSizes = document.getElementById("showWarehouseSizes").id + currStyle;
			//var subStyle = document.getElementById("subStyle").id + currStyle;
			//var addSubStyle = document.getElementById("addSubStyle").id + currStyle;
				
			if($('#hasSizes').prop('checked')==true)
			{
				if($('#inWarehouse').prop('checked')==true)
					document.getElementById(showWarehouseSizes).style.display =  "block";
				
				else if($('#inWarehouse').prop('checked')==false)
					document.getElementById(showWarehouseSizes).style.display =  "none";
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
				
			showSubWarehouse = document.getElementById("showSubWarehouse").id + currStyle;
					
			if($('#inWarehouse').prop('checked')==true)
				document.getElementById(showSubWarehouse).style.display =  "block";
				
			else if($('#inWarehouse').prop('checked')==false)
				document.getElementById(showSubWarehouse).style.display =  "none";
		}
	}
	
	if($('#hasSizes').prop('checked')==false)
	{
		document.getElementById("showWarehouseSizes").style.display =  "none";
		
		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;
			
			if($('#inWarehouse').prop('checked')==false)
			{
				var subCountWarehouse = document.getElementById("subCountWarehouse").id + currStyle;
				document.getElementById(subCountWarehouse).value=0;
			}
		}
		
		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;

			showSubWarehouse = document.getElementById("showSubWarehouse").id + currStyle;
		
			if($('#inWarehouse').prop('checked')==true)
				document.getElementById(showSubWarehouse).style.display =  "block";
				
			else if($('#inWarehouse').prop('checked')==false)
				document.getElementById(showSubWarehouse).style.display =  "none";
		}
	}
	
	if(($('#hasSizes').prop('checked')==true) && ($('#hasColors').prop('checked')==false))
	{	
		if($('#inWarehouse').prop('checked')==true)
			document.getElementById("showWarehouseSizes").style.display =  "block";
	
		else if($('#inWarehouse').prop('checked')==false)
			document.getElementById("showWarehouseSizes").style.display =  "none";
	}
	
	if(($('#hasSizes').prop('checked')==false) && ($('#hasColors').prop('checked')==false))
	{
		if($('#inWarehouse').prop('checked')==false)
			document.getElementById("countWarehouse").value = 0;
	}
	
	updateTotals();
}

function updateTotals()
{
	var subCountWarehouse = 0;

	var countWarehouseSizeS = 0;
	var countWarehouseSizeM = 0;
	var countWarehouseSizeL = 0;
	var countWarehouseSizeXL = 0;
	var countWarehouseSize2XL = 0;
	var countWarehouseSize3XL = 0;
	var countWarehouseSize4XL = 0;

	var warehouseSizeTotal = 0;
	var warehouseTotal = 0;

	if($('#hasSizes').prop('checked')==true&&$('#hasColors').prop('checked')==true)
	{
		document.getElementById("countWarehouse").value = 0;
		
		for(i=1;i<styleIndex+1;i++)
		{
			currStyle = i;
			warehouseTotal = 0;
			
			var warehouseSizeS = document.getElementById("warehouseSizeS").id + currStyle; 
			var warehouseSizeM = document.getElementById("warehouseSizeM").id + currStyle; 
			var warehouseSizeL = document.getElementById("warehouseSizeL").id + currStyle; 
			var warehouseSizeXL = document.getElementById("warehouseSizeXL").id + currStyle; 
			var warehouseSize2XL = document.getElementById("warehouseSize2XL").id + currStyle; 
			var warehouseSize3XL = document.getElementById("warehouseSize3XL").id + currStyle; 
			var warehouseSize4XL = document.getElementById("warehouseSize4XL").id + currStyle; 
			countWarehouseSizeS = parseInt(document.getElementById(warehouseSizeS).value);
			countWarehouseSizeM = parseInt(document.getElementById(warehouseSizeM).value);
			countWarehouseSizeL = parseInt(document.getElementById(warehouseSizeL).value);
			countWarehouseSizeXL = parseInt(document.getElementById(warehouseSizeXL).value);
			countWarehouseSize2XL = parseInt(document.getElementById(warehouseSize2XL).value);
			countWarehouseSize3XL = parseInt(document.getElementById(warehouseSize3XL).value);
			countWarehouseSize4XL = parseInt(document.getElementById(warehouseSize4XL).value);
			warehouseSizeTotal = parseInt(countWarehouseSizeS) + parseInt(countWarehouseSizeM) + parseInt(countWarehouseSizeL) + parseInt(countWarehouseSizeXL) + parseInt(countWarehouseSize2XL) + parseInt(countWarehouseSize3XL) + parseInt(countWarehouseSize4XL);
			subCountWarehouse = document.getElementById("subCountWarehouse").id + currStyle;
			
			if($('#inWarehouse').prop('checked')==true&&$('#hasSizes').prop('checked')==true)
			{
				warehouseTotal += parseInt(warehouseSizeTotal);
				document.getElementById(subCountWarehouse).value = warehouseTotal;
				document.getElementById("countWarehouse").value = parseInt(document.getElementById("countWarehouse").value) + parseInt(document.getElementById(subCountWarehouse).value);
			}
			
			else if($('#inWarehouse').prop('checked')==false)
				warehouseSizeTotal = 0;
			
			var colorTotal = (document.getElementById("colorTotal").id + currStyle); 
			//console.log(colorTotal);
			document.getElementById(colorTotal).value = warehouseTotal + corkTotal + kalaTotal + galwayTotal;
		}
	}
	
	if($('#hasSizes').prop('checked')==false&&$('#hasColors').prop('checked')==true)
	{
		var subCountTotal = 0;
		var tempTotalWarehouse = 0;
			
		for(i=1;i<styleIndex+1;i++)
		{
			currStyle = i;
				
			colorTotal = document.getElementById("colorTotal").id + currStyle;
			warehouseTotal = 0;
				
			if($('#inWarehouse').prop('checked')==true)
			{						
				subCountWarehouse = document.getElementById("subCountWarehouse").id + currStyle;	
				warehouseTotal = parseInt(document.getElementById(subCountWarehouse).value) + warehouseTotal;
				tempTotalWarehouse = tempTotalWarehouse + parseInt(document.getElementById(subCountWarehouse).value);
			}	
				
			document.getElementById("countWarehouse").value = tempTotalWarehouse;
			document.getElementById(colorTotal).value = warehouseTotal + corkTotal + kalaTotal + galwayTotal;
		}
	}
		
	if($('#hasSizes').prop('checked')==true&&$('#hasColors').prop('checked')==false)
	{		
		warehouseTotal = 0;
			
		countWarehouseSizeS = parseInt(document.getElementById("warehouseSizeS").value);
		countWarehouseSizeM = parseInt(document.getElementById("warehouseSizeM").value);
		countWarehouseSizeL = parseInt(document.getElementById("warehouseSizeL").value);
		countWarehouseSizeXL = parseInt(document.getElementById("warehouseSizeXL").value);
		countWarehouseSize2XL = parseInt(document.getElementById("warehouseSize2XL").value);
		countWarehouseSize3XL = parseInt(document.getElementById("warehouseSize3XL").value);
		countWarehouseSize4XL = parseInt(document.getElementById("warehouseSize4XL").value);
		warehouseSizeTotal = parseInt(countWarehouseSizeS) + parseInt(countWarehouseSizeM) + parseInt(countWarehouseSizeL) + parseInt(countWarehouseSizeXL) + parseInt(countWarehouseSize2XL) + parseInt(countWarehouseSize3XL) + parseInt(countWarehouseSize4XL);
			
		if($('#inWarehouse').prop('checked')==true&&$('#hasSizes').prop('checked')==true)
		{
			warehouseTotal = parseInt(warehouseSizeTotal);
			document.getElementById("countWarehouse").value = warehouseTotal;
		}
			
		else if($('#inWarehouse').prop('checked')==false)
			document.getElementById("countWarehouse").value = 0;
			
	}
	
	if($('#hasColors').prop('checked')==true&&$('#inWarehouse').prop('checked')==false)
	{
		document.getElementById("countWarehouse").value = 0;
	}
}

function addForm()
{
	document.getElementById("countWarehouse").value = 0;
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
		formControl += "<div class='col-sm-2' id='showSubWarehouse"+i+"'>"
		formControl += "<p>Warehouse</p>"
		formControl += "<input type='text' class='form-control input-lg required' required='required' name='subCountWarehouse"+i+"' id='subCountWarehouse"+i+"' value='0' onchange='updateTotals()'>"
		formControl += "</div>"
		formControl += "<div class='col-sm-2' id='showSubCork"+i+"'>"
		formControl += "</div>"
		formControl += "</div>"
		formControl += "</div><br>"
		formControl += "<div class='row' id='subSizeList"+i+"'>"
		formControl +=		"<div class='col-sm-3' id='showWarehouseSizes"+i+"' style='display: none'>"
		formControl +=			"<label for='storeSizesWarehouse' class='control-label'>Warehouse Sizes</label><br>"
		formControl +=			"<input type='text' name='warehouseSizeS"+i+"' id='warehouseSizeS"+i+"' value='0' onchange='updateTotals()'><label for='warehouseSizeS"+i+"'>:S</label><br>"
		formControl +=			"<input type='text' name='warehouseSizeM"+i+"' id='warehouseSizeM"+i+"' value='0' onchange='updateTotals()'><label for='warehouseSizeM"+i+"'>:M</label><br>"
		formControl +=			"<input type='text' name='warehouseSizeL"+i+"' id='warehouseSizeL"+i+"' value='0' onchange='updateTotals()'><label for='warehouseSizeL"+i+"'>:L</label><br>"
		formControl +=			"<input type='text' name='warehouseSizeXL"+i+"' id='warehouseSizeXL"+i+"' value='0' onchange='updateTotals()'><label for='warehouseSizeXL"+i+"'>:XL</label><br>"
		formControl +=			"<input type='text' name='warehouseSize2XL"+i+"' id='warehouseSize2XL"+i+"' value='0' onchange='updateTotals()'><label for='warehouseSize2XL"+i+"'>:2XL</label><br>"
		formControl +=			"<input type='text' name='warehouseSize3XL"+i+"' id='warehouseSize3XL"+i+"' value='0' onchange='updateTotals()'><label for='warehouseSize3XL"+i+"'>:3XL</label><br>"
		formControl +=			"<input type='text' name='warehouseSize4XL"+i+"' id='warehouseSize4XL"+i+"' value='0' onchange='updateTotals()'><label for='warehouseSize4XL"+i+"'>:4XL</label><br>"
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
