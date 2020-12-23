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
	//var showSubCork = '';
	//var showSubKala = '';
	//var showSubGalway = '';
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
		//document.getElementById("showCorkSizes").style.display =  "none";
		//document.getElementById("showKalaSizes").style.display =  "none";
		//document.getElementById("showGalwaySizes").style.display =  "none";
		document.getElementById("showWarehouseSizes").style.display =  "none";
	}
	
	if($('#hasColors').prop('checked')==true)
	{
		document.getElementById("addSubStyle").style.display =  "block";

		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;

			//var showCorkSizes = document.getElementById("showCorkSizes").id + currStyle;
			//var showKalaSizes = document.getElementById("showKalaSizes").id + currStyle;
			//var showGalwaySizes = document.getElementById("showGalwaySizes").id + currStyle;
			var showWarehouseSizes = document.getElementById("showWarehouseSizes").id + currStyle;
			//var subStyle = document.getElementById("subStyle").id + currStyle;
			//var addSubStyle = document.getElementById("addSubStyle").id + currStyle;
				
			if($('#hasSizes').prop('checked')==true)
			{
				if($('#inWarehouse').prop('checked')==true)
					document.getElementById(showWarehouseSizes).style.display =  "block";
				
				else if($('#inWarehouse').prop('checked')==false)
					document.getElementById(showWarehouseSizes).style.display =  "none";
						
				/*if($('#inCork').prop('checked')==true)
					document.getElementById(showCorkSizes).style.display =  "block";
					
				else if($('#inCork').prop('checked')==false)
					document.getElementById(showCorkSizes).style.display =  "none";
						
				if($('#inKala').prop('checked')==true)
					document.getElementById(showKalaSizes).style.display =  "block";
				
				else if($('#inKala').prop('checked')==false)
					document.getElementById(showKalaSizes).style.display =  "none";
				
				if($('#inGalway').prop('checked')==true)
					document.getElementById(showGalwaySizes).style.display =  "block";
				
				else if($('#inGalway').prop('checked')==false)
					document.getElementById(showGalwaySizes).style.display =  "none";*/
			}
				
			else if($('#hasSizes').prop('checked')==false)
			{
				document.getElementById(showWarehouseSizes).style.display =  "none";
				//document.getElementById(showCorkSizes).style.display =  "none";
				//document.getElementById(showKalaSizes).style.display =  "none";
				//document.getElementById(showGalwaySizes).style.display =  "none";
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
				
			//showSubCork = document.getElementById("showSubCork").id + currStyle;
			//showSubKala = document.getElementById("showSubKala").id + currStyle;
			//showSubGalway = document.getElementById("showSubGalway").id + currStyle;
			showSubWarehouse = document.getElementById("showSubWarehouse").id + currStyle;
					
			if($('#inWarehouse').prop('checked')==true)
				document.getElementById(showSubWarehouse).style.display =  "block";
				
			else if($('#inWarehouse').prop('checked')==false)
				document.getElementById(showSubWarehouse).style.display =  "none";
				
			/*if($('#inCork').prop('checked')==true)
				document.getElementById(showSubCork).style.display =  "block";
				
			else if($('#inCork').prop('checked')==false)
				document.getElementById(showSubCork).style.display =  "none";
						
			if($('#inKala').prop('checked')==true)
				document.getElementById(showSubKala).style.display =  "block";
				
			else if($('#inKala').prop('checked')==false)
				document.getElementById(showSubKala).style.display =  "none";
				
			if($('#inGalway').prop('checked')==true)
				document.getElementById(showSubGalway).style.display =  "block";
				
			else if($('#inGalway').prop('checked')==false)
				document.getElementById(showSubGalway).style.display =  "none";*/
		}
	}
	
	if($('#hasSizes').prop('checked')==false)
	{
		document.getElementById("showWarehouseSizes").style.display =  "none";
		//document.getElementById("showCorkSizes").style.display =  "none";
		//document.getElementById("showKalaSizes").style.display =  "none";
		//document.getElementById("showGalwaySizes").style.display =  "none";
		
		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;
			
			if($('#inWarehouse').prop('checked')==false)
			{
				var subCountWarehouse = document.getElementById("subCountWarehouse").id + currStyle;
				document.getElementById(subCountWarehouse).value=0;
			}
			
			/*if($('#inCork').prop('checked')==false)
			{
				var subCountCork = document.getElementById("subCountCork").id + currStyle;
				document.getElementById(subCountCork).value=0;
			}
					
			if($('#inKala').prop('checked')==false)
			{
				var subCountKala = document.getElementById("subCountKala").id + currStyle;
				document.getElementById(subCountKala).value=0;
			}
				
			if($('#inGalway').prop('checked')==false)
			{
				var subCountGalway = document.getElementById("subCountGalway").id + currStyle;
				document.getElementById(subCountGalway).value=0;
			}*/
		}
		
		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;

			showSubWarehouse = document.getElementById("showSubWarehouse").id + currStyle;
			//showSubCork = document.getElementById("showSubCork").id + currStyle;
			//showSubKala = document.getElementById("showSubKala").id + currStyle;
			//showSubGalway = document.getElementById("showSubGalway").id + currStyle;
		
			if($('#inWarehouse').prop('checked')==true)
				document.getElementById(showSubWarehouse).style.display =  "block";
				
			else if($('#inWarehouse').prop('checked')==false)
				document.getElementById(showSubWarehouse).style.display =  "none";
				
			/*if($('#inCork').prop('checked')==true)
				document.getElementById(showSubCork).style.display =  "block";
				
			else if($('#inCork').prop('checked')==false)
				document.getElementById(showSubCork).style.display =  "none";
						
			if($('#inKala').prop('checked')==true)
				document.getElementById(showSubKala).style.display =  "block";
				
			else if($('#inKala').prop('checked')==false)
				document.getElementById(showSubKala).style.display =  "none";
				
			if($('#inGalway').prop('checked')==true)
				document.getElementById(showSubGalway).style.display =  "block";
				
			else if($('#inGalway').prop('checked')==false)
				document.getElementById(showSubGalway).style.display =  "none";*/
		}
	}
	
	if(($('#hasSizes').prop('checked')==true) && ($('#hasColors').prop('checked')==false))
	{	
		if($('#inWarehouse').prop('checked')==true)
			document.getElementById("showWarehouseSizes").style.display =  "block";
	
		else if($('#inWarehouse').prop('checked')==false)
			document.getElementById("showWarehouseSizes").style.display =  "none";
		
		/*if($('#inCork').prop('checked')==true)
			document.getElementById("showCorkSizes").style.display =  "block";
	
		else if($('#inCork').prop('checked')==false)
			document.getElementById("showCorkSizes").style.display =  "none";
			
		if($('#inKala').prop('checked')==true)
			document.getElementById("showKalaSizes").style.display =  "block";
	
		else if($('#inKala').prop('checked')==false)
			document.getElementById("showKalaSizes").style.display =  "none";
	
		if($('#inGalway').prop('checked')==true)
			document.getElementById("showGalwaySizes").style.display =  "block";
	
		else if($('#inGalway').prop('checked')==false)
			document.getElementById("showGalwaySizes").style.display =  "none";*/
	}
	
	if(($('#hasSizes').prop('checked')==false) && ($('#hasColors').prop('checked')==false))
	{
		if($('#inWarehouse').prop('checked')==false)
			document.getElementById("countWarehouse").value = 0;
	
		/*if($('#inCork').prop('checked')==false)
			document.getElementById("countCork").value = 0;
		
		if($('#inKala').prop('checked')==false)
			document.getElementById("countKala").value = 0;
	
		if($('#inGalway').prop('checked')==false)
			document.getElementById("countGalway").value = 0;*/
	}
	
	updateTotals();
}

function updateTotals()
{
	var subCountWarehouse = 0;
	//var subCountCork = 0;
	//var subCountKala = 0;
	//var subCountGalway = 0;

	var countWarehouseSizeS = 0;
	var countWarehouseSizeM = 0;
	var countWarehouseSizeL = 0;
	var countWarehouseSizeXL = 0;
	var countWarehouseSize2XL = 0;
	var countWarehouseSize3XL = 0;
	var countWarehouseSize4XL = 0;

	/*var countCorkSizeS = 0;
	var countCorkSizeM = 0;
	var countCorkSizeL = 0;
	var countCorkSizeXL = 0;
	var countCorkSize2XL = 0;
	var countCorkSize3XL = 0;
	var countCorkSize4XL = 0;

	var countKalaSizeS = 0;
	var countKalaSizeM = 0;
	var countKalaSizeL = 0;
	var countKalaSizeXL = 0;
	var countKalaSize2XL = 0;
	var countKalaSize3XL = 0;
	var countKalaSize4XL = 0;

	var countGalwaySizeS = 0;
	var countGalwaySizeM = 0;
	var countGalwaySizeL = 0;
	var countGalwaySizeXL = 0;
	var countGalwaySize2XL = 0;
	var countGalwaySize3XL = 0;
	var countGalwaySize4XL = 0;*/

	var warehouseSizeTotal = 0;
	//var corkSizeTotal = 0;
	//var kalaSizeTotal = 0;
	//var galwaySizeTotal = 0;

	var warehouseTotal = 0;
	//var corkTotal = 0;
	//var kalaTotal = 0;
	//var galwayTotal = 0;

	if($('#hasSizes').prop('checked')==true&&$('#hasColors').prop('checked')==true)
	{
		document.getElementById("countWarehouse").value = 0;
		//document.getElementById("countCork").value = 0;
		//document.getElementById("countKala").value = 0;
		//document.getElementById("countGalway").value = 0;
			
		for(i=1;i<styleIndex+1;i++)
		{
			currStyle = i;
			warehouseTotal = 0;
			//corkTotal = 0;
			//kalaTotal = 0;
			//galwayTotal = 0;
			
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
			
			/*var corkSizeS = document.getElementById("corkSizeS").id + currStyle; 
			var corkSizeM = document.getElementById("corkSizeM").id + currStyle; 
			var corkSizeL = document.getElementById("corkSizeL").id + currStyle; 
			var corkSizeXL = document.getElementById("corkSizeXL").id + currStyle; 
			var corkSize2XL = document.getElementById("corkSize2XL").id + currStyle; 
			var corkSize3XL = document.getElementById("corkSize3XL").id + currStyle; 
			var corkSize4XL = document.getElementById("corkSize4XL").id + currStyle; 
			countCorkSizeS = parseInt(document.getElementById(corkSizeS).value);
			countCorkSizeM = parseInt(document.getElementById(corkSizeM).value);
			countCorkSizeL = parseInt(document.getElementById(corkSizeL).value);
			countCorkSizeXL = parseInt(document.getElementById(corkSizeXL).value);
			countCorkSize2XL = parseInt(document.getElementById(corkSize2XL).value);
			countCorkSize3XL = parseInt(document.getElementById(corkSize3XL).value);
			countCorkSize4XL = parseInt(document.getElementById(corkSize4XL).value);
			corkSizeTotal = parseInt(countCorkSizeS) + parseInt(countCorkSizeM) + parseInt(countCorkSizeL) + parseInt(countCorkSizeXL) + parseInt(countCorkSize2XL) + parseInt(countCorkSize3XL) + parseInt(countCorkSize4XL);
			subCountCork = document.getElementById("subCountCork").id + currStyle;
			
			if($('#inCork').prop('checked')==true&&$('#hasSizes').prop('checked')==true)
			{
				corkTotal += parseInt(corkSizeTotal);
				document.getElementById(subCountCork).value = corkTotal;
				document.getElementById("countCork").value = parseInt(document.getElementById("countCork").value) + parseInt(document.getElementById(subCountCork).value);
			}
			
			else if($('#inCork').prop('checked')==false)
				corkSizeTotal = 0;
			
			var kalaSizeS = document.getElementById("kalaSizeS").id + currStyle; 
			var kalaSizeM = document.getElementById("kalaSizeM").id + currStyle; 
			var kalaSizeL = document.getElementById("kalaSizeL").id + currStyle; 
			var kalaSizeXL = document.getElementById("kalaSizeXL").id + currStyle; 
			var kalaSize2XL = document.getElementById("kalaSize2XL").id + currStyle; 
			var kalaSize3XL = document.getElementById("kalaSize3XL").id + currStyle; 
			var kalaSize4XL = document.getElementById("kalaSize4XL").id + currStyle; 
			countKalaSizeS = parseInt(document.getElementById(kalaSizeS).value);
			countKalaSizeM = parseInt(document.getElementById(kalaSizeM).value);
			countKalaSizeL = parseInt(document.getElementById(kalaSizeL).value);
			countKalaSizeXL = parseInt(document.getElementById(kalaSizeXL).value);
			countKalaSize2XL = parseInt(document.getElementById(kalaSize2XL).value);
			countKalaSize3XL = parseInt(document.getElementById(kalaSize3XL).value);
			countKalaSize4XL = parseInt(document.getElementById(kalaSize4XL).value);
			kalaSizeTotal = countKalaSizeS + countKalaSizeM + countKalaSizeL + countKalaSizeXL + countKalaSize2XL + countKalaSize3XL + countKalaSize4XL;
			subCountKala = document.getElementById("subCountKala").id + currStyle;
			
			if($('#inKala').prop('checked')==true&&$('#hasSizes').prop('checked')==true)
			{
				kalaTotal += parseInt(kalaSizeTotal);
				document.getElementById(subCountKala).value = kalaTotal;
				document.getElementById("countKala").value = parseInt(document.getElementById("countKala").value) + parseInt(document.getElementById(subCountKala).value);
			}
			
			else if($('#inKala').prop('checked')==false)
				kalaSizeTotal = 0;
			
			var galwaySizeS = document.getElementById("galwaySizeS").id + currStyle; 
			var galwaySizeM = document.getElementById("galwaySizeM").id + currStyle; 
			var galwaySizeL = document.getElementById("galwaySizeL").id + currStyle; 
			var galwaySizeXL = document.getElementById("galwaySizeXL").id + currStyle; 
			var galwaySize2XL = document.getElementById("galwaySize2XL").id + currStyle; 
			var galwaySize3XL = document.getElementById("galwaySize3XL").id + currStyle; 
			var galwaySize4XL = document.getElementById("galwaySize4XL").id + currStyle; 
			countGalwaySizeS = parseInt(document.getElementById(galwaySizeS).value);
			countGalwaySizeM = parseInt(document.getElementById(galwaySizeM).value);
			countGalwaySizeL = parseInt(document.getElementById(galwaySizeL).value);
			countGalwaySizeXL = parseInt(document.getElementById(galwaySizeXL).value);
			countGalwaySize2XL = parseInt(document.getElementById(galwaySize2XL).value);
			countGalwaySize3XL = parseInt(document.getElementById(galwaySize3XL).value);
			countGalwaySize4XL = parseInt(document.getElementById(galwaySize4XL).value);
			galwaySizeTotal = countGalwaySizeS + countGalwaySizeM + countGalwaySizeL + countGalwaySizeXL + countGalwaySize2XL + countGalwaySize3XL + countGalwaySize4XL;
			subCountGalway = document.getElementById("subCountGalway").id + currStyle;
			
			if($('#inGalway').prop('checked')==true&&$('#hasSizes').prop('checked')==true)
			{
				galwayTotal += parseInt(galwaySizeTotal);
				document.getElementById(subCountGalway).value = galwayTotal;
				document.getElementById("countGalway").value = parseInt(document.getElementById("countGalway").value) + parseInt(document.getElementById(subCountGalway).value);
			}	
			
			if($('#inGalway').prop('checked')==false)
				galwaySizeTotal = 0;*/
			
			var colorTotal = (document.getElementById("colorTotal").id + currStyle); 
			//console.log(colorTotal);
			document.getElementById(colorTotal).value = warehouseTotal + corkTotal + kalaTotal + galwayTotal;
		}
	}
	
	if($('#hasSizes').prop('checked')==false&&$('#hasColors').prop('checked')==true)
	{
		//var subCountTotal = 0;
		//var tempTotalCork = 0;
		//var tempTotalKala = 0;
		//var tempTotalGalway = 0;
		var tempTotalWarehouse = 0;
			
		for(i=1;i<styleIndex+1;i++)
		{
			currStyle = i;
				
			colorTotal = document.getElementById("colorTotal").id + currStyle;
			//corkTotal = 0;
			//kalaTotal = 0;
			//galwayTotal = 0;
			warehouseTotal = 0;
				
			if($('#inWarehouse').prop('checked')==true)
			{						
				subCountWarehouse = document.getElementById("subCountWarehouse").id + currStyle;	
				warehouseTotal = parseInt(document.getElementById(subCountWarehouse).value) + warehouseTotal;
				tempTotalWarehouse = tempTotalWarehouse + parseInt(document.getElementById(subCountWarehouse).value);
			}	
				
			/*if($('#inCork').prop('checked')==true)
			{						
				subCountCork = document.getElementById("subCountCork").id + currStyle;	
				corkTotal = parseInt(document.getElementById(subCountCork).value) + corkTotal;
				tempTotalCork = tempTotalCork + parseInt(document.getElementById(subCountCork).value);
			}	
				
			if($('#inKala').prop('checked')==true)
			{
				subCountKala = document.getElementById("subCountKala").id + currStyle;	
				kalaTotal = parseInt(document.getElementById(subCountKala).value) + kalaTotal;
				tempTotalKala = tempTotalKala + parseInt(document.getElementById(subCountKala).value);
			}
				
			if($('#inGalway').prop('checked')==true)
			{
				subCountGalway = document.getElementById("subCountGalway").id + currStyle;	
				galwayTotal = parseInt(document.getElementById(subCountGalway).value) + galwayTotal;
				tempTotalGalway = tempTotalGalway + parseInt(document.getElementById(subCountGalway).value);
			}*/
				
			document.getElementById("countWarehouse").value = tempTotalWarehouse;
			//document.getElementById("countCork").value = tempTotalCork;
			//document.getElementById("countKala").value = tempTotalKala;
			//document.getElementById("countGalway").value = tempTotalGalway;
			document.getElementById(colorTotal).value = warehouseTotal + corkTotal + kalaTotal + galwayTotal;
		}
	}
		
	if($('#hasSizes').prop('checked')==true&&$('#hasColors').prop('checked')==false)
	{		
		warehouseTotal = 0;
		//corkTotal = 0;
		//kalaTotal = 0;
		//galwayTotal = 0;
			
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
			
		/*countCorkSizeS = parseInt(document.getElementById("corkSizeS").value);
		countCorkSizeM = parseInt(document.getElementById("corkSizeM").value);
		countCorkSizeL = parseInt(document.getElementById("corkSizeL").value);
		countCorkSizeXL = parseInt(document.getElementById("corkSizeXL").value);
		countCorkSize2XL = parseInt(document.getElementById("corkSize2XL").value);
		countCorkSize3XL = parseInt(document.getElementById("corkSize3XL").value);
		countCorkSize4XL = parseInt(document.getElementById("corkSize4XL").value);
		corkSizeTotal = parseInt(countCorkSizeS) + parseInt(countCorkSizeM) + parseInt(countCorkSizeL) + parseInt(countCorkSizeXL) + parseInt(countCorkSize2XL) + parseInt(countCorkSize3XL) + parseInt(countCorkSize4XL);
		
		if($('#inCork').prop('checked')==true&&$('#hasSizes').prop('checked')==true)
		{
			corkTotal = parseInt(corkSizeTotal);
			document.getElementById("countCork").value = corkTotal;
		}
			
		else if($('#inCork').prop('checked')==false)
			document.getElementById("countCork").value = 0;
			
		countKalaSizeS = parseInt(document.getElementById("kalaSizeS").value);
		countKalaSizeM = parseInt(document.getElementById("kalaSizeM").value);
		countKalaSizeL = parseInt(document.getElementById("kalaSizeL").value);
		countKalaSizeXL = parseInt(document.getElementById("kalaSizeXL").value);
		countKalaSize2XL = parseInt(document.getElementById("kalaSize2XL").value);
		countKalaSize3XL = parseInt(document.getElementById("kalaSize3XL").value);
		countKalaSize4XL = parseInt(document.getElementById("kalaSize4XL").value);
		kalaSizeTotal = parseInt(countKalaSizeS) + parseInt(countKalaSizeM) + parseInt(countKalaSizeL) + parseInt(countKalaSizeXL) + parseInt(countKalaSize2XL) + parseInt(countKalaSize3XL) + parseInt(countKalaSize4XL);
			
		if($('#inKala').prop('checked')==true&&$('#hasSizes').prop('checked')==true)
		{
			kalaTotal = parseInt(kalaSizeTotal);
			document.getElementById("countKala").value = kalaTotal;
		}
			
		else if($('#inKala').prop('checked')==false)
			document.getElementById("countKala").value = 0;
			
		countGalwaySizeS = parseInt(document.getElementById("galwaySizeS").value);
		countGalwaySizeM = parseInt(document.getElementById("galwaySizeM").value);
		countGalwaySizeL = parseInt(document.getElementById("galwaySizeL").value);
		countGalwaySizeXL = parseInt(document.getElementById("galwaySizeXL").value);
		countGalwaySize2XL = parseInt(document.getElementById("galwaySize2XL").value);
		countGalwaySize3XL = parseInt(document.getElementById("galwaySize3XL").value);
		countGalwaySize4XL = parseInt(document.getElementById("galwaySize4XL").value);
		galwaySizeTotal = parseInt(countGalwaySizeS) + parseInt(countGalwaySizeM) + parseInt(countGalwaySizeL) + parseInt(countGalwaySizeXL) + parseInt(countGalwaySize2XL) + parseInt(countGalwaySize3XL) + parseInt(countGalwaySize4XL);
		
		if($('#inGalway').prop('checked')==true&&$('#hasSizes').prop('checked')==true)
		{
			galwayTotal = parseInt(galwaySizeTotal);
				document.getElementById("countGalway").value = galwayTotal;
		}
			
		else if($('#inGalway').prop('checked')==false)
			document.getElementById("countGalway").value = 0;*/
	}
	
	if($('#hasColors').prop('checked')==true&&$('#inWarehouse').prop('checked')==false)
	{
		document.getElementById("countWarehouse").value = 0;
	}
	
	/*if($('#hasColors').prop('checked')==true&&$('#inCork').prop('checked')==false)
	{
		document.getElementById("countCork").value = 0;
	}
	
	if($('#hasColors').prop('checked')==true&&$('#inKala').prop('checked')==false)
	{
		document.getElementById("countKala").value = 0;
	}
	
	if($('#hasColors').prop('checked')==true&&$('#inGalway').prop('checked')==false)
	{
		document.getElementById("countGalway").value = 0;
	}*/
}

function addForm()
{
	document.getElementById("countWarehouse").value = 0;
	//document.getElementById("countCork").value = 0;
	//document.getElementById("countKala").value = 0;
	//document.getElementById("countGalway").value = 0;
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
		/*formControl += "<p>Cork</p>"
		formControl += "<input type='text' class='form-control input-lg required' required='required' name='subCountCork"+i+"' id='subCountCork"+i+"' value='0' onchange='updateTotals()'>"
		formControl += "</div>"
		formControl += "<div class='col-sm-2' id='showSubKala"+i+"'>"
		formControl += "<p>Kala</p>"
		formControl += "<input type='text' class='form-control input-lg required' required='required' name='subCountKala"+i+"' id='subCountKala"+i+"' value='0' onchange='updateTotals()'>"
		formControl += "</div>"
		formControl += "<div class='col-sm-2' id='showSubGalway"+i+"'>"
		formControl += "<p>Galway</p>"
		formControl += "<input type='text' class='form-control input-lg required' required='required' name='subCountGalway"+i+"' id='subCountGalway"+i+"' value='0' onchange='updateTotals()'>"*/
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
		/*formControl +=		"<div class='col-sm-3' id='showCorkSizes"+i+"' style='display: none'>"
		formControl +=			"<label for='storeSizesCork' class='control-label'>Cork Sizes</label><br>"
		formControl +=			"<input type='text' name='corkSizeS"+i+"' id='corkSizeS"+i+"' value='0' onchange='updateTotals()'><label for='corkSizeS"+i+"'>:S</label><br>"
		formControl +=			"<input type='text' name='corkSizeM"+i+"' id='corkSizeM"+i+"' value='0' onchange='updateTotals()'><label for='corkSizeM"+i+"'>:M</label><br>"
		formControl +=			"<input type='text' name='corkSizeL"+i+"' id='corkSizeL"+i+"' value='0' onchange='updateTotals()'><label for='corkSizeL"+i+"'>:L</label><br>"
		formControl +=			"<input type='text' name='corkSizeXL"+i+"' id='corkSizeXL"+i+"' value='0' onchange='updateTotals()'><label for='corkSizeXL"+i+"'>:XL</label><br>"
		formControl +=			"<input type='text' name='corkSize2XL"+i+"' id='corkSize2XL"+i+"' value='0' onchange='updateTotals()'><label for='corkSize2XL"+i+"'>:2XL</label><br>"
		formControl +=			"<input type='text' name='corkSize3XL"+i+"' id='corkSize3XL"+i+"' value='0' onchange='updateTotals()'><label for='corkSize3XL"+i+"'>:3XL</label><br>"
		formControl +=			"<input type='text' name='corkSize4XL"+i+"' id='corkSize4XL"+i+"' value='0' onchange='updateTotals()'><label for='corkSize4XL"+i+"'>:4XL</label><br>"
		formControl +=		"</div>"
		formControl +=		"<div class='col-sm-3' id='showKalaSizes"+i+"' style='display: none'>"
		formControl +=			"<label for='storeSizesKala' class='control-label'>Kala Sizes</label><br>"
		formControl +=			"<input type='text' name='kalaSizeS"+i+"' id='kalaSizeS"+i+"' value='0' onchange='updateTotals()'><label for='kalaSizeS"+i+"'>:S</label><br>"
		formControl +=			"<input type='text' name='kalaSizeM"+i+"' id='kalaSizeM"+i+"' value='0' onchange='updateTotals()'><label for='kalaSizeM"+i+"'>:M</label><br>"
		formControl +=			"<input type='text' name='kalaSizeL"+i+"' id='kalaSizeL"+i+"' value='0' onchange='updateTotals()'><label for='kalaSizeL"+i+"'>:L</label><br>"
		formControl +=			"<input type='text' name='kalaSizeXL"+i+"' id='kalaSizeXL"+i+"' value='0' onchange='updateTotals()'><label for='kalaSizeXL"+i+"'>:XL</label><br>"
		formControl +=			"<input type='text' name='kalaSize2XL"+i+"' id='kalaSize2XL"+i+"' value='0' onchange='updateTotals()'><label for='kalaSize2XL"+i+"'>:2XL</label><br>"
		formControl +=			"<input type='text' name='kalaSize3XL"+i+"' id='kalaSize3XL"+i+"' value='0' onchange='updateTotals()'><label for='kalaSize3XL"+i+"'>:3XL</label><br>"
		formControl +=			"<input type='text' name='kalaSize4XL"+i+"' id='kalaSize4XL"+i+"' value='0' onchange='updateTotals()'><label for='kalaSize4XL"+i+"'>:4XL</label><br>"
		formControl +=		"</div>"
		formControl +=		"<div class='col-sm-3' id='showGalwaySizes"+i+"' style='display: none'>"
		formControl +=			"<label for='storeSizesGalway' class='control-label'>Galway Sizes</label><br>"
		formControl +=			"<input type='text' name='galwaySizeS"+i+"' id='galwaySizeS"+i+"' value='0' onchange='updateTotals()'><label for='galwaySizeS"+i+"'>:S</label><br>"
		formControl +=			"<input type='text' name='galwaySizeM"+i+"' id='galwaySizeM"+i+"' value='0' onchange='updateTotals()'><label for='galwaySizeM"+i+"'>:M</label><br>"
		formControl +=			"<input type='text' name='galwaySizeL"+i+"' id='galwaySizeL"+i+"' value='0' onchange='updateTotals()'><label for='galwaySizeL"+i+"'>:L</label><br>"
		formControl +=			"<input type='text' name='galwaySizeXL"+i+"' id='galwaySizeXL"+i+"' value='0' onchange='updateTotals()'><label for='galwaySizeXL"+i+"'>:XL</label><br>"
		formControl +=			"<input type='text' name='galwaySize2XL"+i+"' id='galwaySize2XL"+i+"' value='0' onchange='updateTotals()'><label for='galwaySize2XL"+i+"'>:2XL</label><br>"
		formControl +=			"<input type='text' name='galwaySize3XL"+i+"' id='galwaySize3XL"+i+"' value='0' onchange='updateTotals()'><label for='galwaySize3XL"+i+"'>:3XL</label><br>"
		formControl +=			"<input type='text' name='galwaySize4XL"+i+"' id='galwaySize4XL"+i+"' value='0' onchange='updateTotals()'><label for='galwaySize4XL"+i+"'>:4XL</label><br>"
		formControl +=		"</div>"*/
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
