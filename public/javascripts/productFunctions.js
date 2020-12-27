/*eslint-env jquery*/
var styleIndex = 0;

$(document).ready(
    function () {
		//DELETE PRODUCT METHOD
		$("#deleteForm").submit(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/deleteProduct',
                dataType: 'json',
                data: {
                    'name': event.target.deleteName.value
                },
                success: function(){
                    $(location).attr('href', '/management' );
                    // Redirect to a login page
                },
                error: function(errMsg) {
                    console.log("deletion error");
                    console.log(errMsg);
					console.log(event.target.deleteName.value);
                }
            });
        });
		
		/*
		*
		*CATALOGUE SEARCHING
		*
		*/
		
        /*code for finding 1 product in catalogue with a name*/
        $("#nameSearch").submit(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'GET',
                url: '/getName/' + event.target.inputName.value,
                dataType: 'json',
                success: function (data) {

                    var products = "";

                    for (var i = 0; i < data.length; i++) {
						products += "<div class='productCard'>";
						
                        products += "<div id='" + data[i].name + "'>";
						
						if(data[i].onSale=="on")
						{
							products += "<img src='images/sale_banner.jpg' style='width:100%' alt='no_img'>";
						}
                        
                        products += "<img src='uploads/"+data[i].name+".jpg' style='width:100%' alt='no_img'>"; 
						products += "<h3>"+ data[i].name + "</h3>";
						
						if(data[i].masterPrice>0)
						{
							if(data[i].onSale=="on"&&data[i].masterSalePrice>0)	
							{
								products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].masterPrice + "</span>";
								products += "<span class='salePrice'> €" + data[i].masterSalePrice + "</span>";
							}
							
							else
							products += "<p class='price'>€" + data[i].masterPrice + "</p>";
						}	
					
						else 
						{
							if(data[i].priceS>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>S: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].priceS + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePriceS + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].priceS + "</p>";
							}
							
							if(data[i].priceM>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>M: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].priceM + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePriceM + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].priceM + "</p>";
							}
							
							if(data[i].priceL>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>L: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].priceL + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePriceL + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].priceL + "</p>";
							}
							
							if(data[i].priceXL>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>XL: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].priceXL + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePriceXL + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].priceXL + "</p>";
							}
							
							if(data[i].price2XL>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>2XL: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].price2XL + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePrice2XL + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].price2XL + "</p>";
							}
							
							if(data[i].price3XL>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>3XL: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].price3XL + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePrice3XL + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].price3XL + "</p>";
							}
							
							if(data[i].price4XL>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>4XL: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].price4XL + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePrice4XL + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].price4XL + "</p>";
							}
						}		
						
                        products += "<p>" + data[i].description + "</p>";
						products += "</div></div>"
                    }
                    //pass the products variable to the feedproducts div id in catalogue
                    $("#feedProducts").html(products);
                },
                error: function (errMsg) {
                    console.log(errMsg);
                }
            });
        });

        /*code for finding products in catalogue with a category*/
        $("#categorySearch").submit(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'GET',
                url: '/getCategory/' + event.target.selectpicker.value,
                dataType: 'json',
                success: function (data) {

                    var products = "";

                    for (var i = 0; i < data.length; i++) {
						products += "<div class='productCard'>";
						products += "<div id='" + data[i].name + "'>";
						
						if(data[i].onSale=="on")
						{
							products += "<img src='images/sale_banner.jpg' style='width:100%' alt='no_img'>";
						}
                        
                        products += "<img src='uploads/"+data[i].name+".jpg' style='width:100%' alt='no_img'>"; 
						products += "<h3>"+ data[i].name + "</h3>";
						
						if(data[i].masterPrice>0)
						{
							if(data[i].onSale=="on"&&data[i].masterSalePrice>0)	
							{
								products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].masterPrice + "</span>";
								products += "<span class='salePrice'> €" + data[i].masterSalePrice + "</span>";
							}
							
							else
							products += "<p class='price'>€" + data[i].masterPrice + "</p>";
						}

						else 
						{
							if(data[i].priceS>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>S: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].priceS + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePriceS + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].priceS + "</p>";
							}
							
							if(data[i].priceM>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>M: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].priceM + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePriceM + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].priceM + "</p>";
							}
							
							if(data[i].priceL>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>L: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].priceL + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePriceL + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].priceL + "</p>";
							}
							
							if(data[i].priceXL>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>XL: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].priceXL + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePriceXL + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].priceXL + "</p>";
							}
							
							if(data[i].price2XL>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>2XL: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].price2XL + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePrice2XL + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].price2XL + "</p>";
							}
							
							if(data[i].price3XL>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>3XL: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].price3XL + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePrice3XL + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].price3XL + "</p>";
							}
							
							if(data[i].price4XL>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>4XL: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].price4XL + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePrice4XL + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].price4XL + "</p>";
							}
						}	
                       
						products += "<p>" + data[i].description + "</p>";
						products += "</div></div>";
                    }
                    //pass the products variable to the feedproducts div id in catalogue
                    $("#feedProducts").html(products);

                },
                error: function (errMsg) {
                    console.log(errMsg);
                }
            });
        });
		
		/*code for finding products in catalogue with a storeName*/
        $("#storeSearch").submit(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'GET',
                url: '/getStore/' + event.target.selectpicker.value,
                dataType: 'json',
                success: function (data) {

                    var products = "";

                    for (var i = 0; i < data.length; i++) {
						products += "<div class='productCard'>";
						products += "<div id='" + data[i].name + "'>";
						
						if(data[i].onSale=="on")
						{
							products += "<img src='images/sale_banner.jpg' style='width:100%' alt='no_img'>";
						}
                        
                        products += "<img src='uploads/"+data[i].name+".jpg' style='width:100%' alt='no_img'>"; 
						products += "<h3>"+ data[i].name + "</h3>";
						
						if(data[i].masterPrice>0)
						{
							if(data[i].onSale=="on"&&data[i].masterSalePrice>0)	
							{
								products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].masterPrice + "</span>";
								products += "<span class='salePrice'> €" + data[i].masterSalePrice + "</span>";
							}
							
							else
							products += "<p class='price'>€" + data[i].masterPrice + "</p>";
						}
					
						else 
						{
							if(data[i].priceS>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>S: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].priceS + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePriceS + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].priceS + "</p>";
							}
							
							if(data[i].priceM>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>M: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].priceM + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePriceM + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].priceM + "</p>";
							}
							
							if(data[i].priceL>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>L: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].priceL + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePriceL + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].priceL + "</p>";
							}
							
							if(data[i].priceXL>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>XL: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].priceXL + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePriceXL + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].priceXL + "</p>";
							}
							
							if(data[i].price2XL>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>2XL: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].price2XL + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePrice2XL + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].price2XL + "</p>";
							}
							
							if(data[i].price3XL>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>3XL: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].price3XL + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePrice3XL + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].price3XL + "</p>";
							}
							
							if(data[i].price4XL>0)
							{
								
								if(data[i].onSale=="on")
								{
									products += "<span class='price'>4XL: </span>"
									products += "<span class='price' style='color:gray;text-decoration:line-through gray;'>€" + data[i].price4XL + "</span>";
									products += "<span class='salePrice'> €" + data[i].salePrice4XL + " </span>";
								}
								
								else
									products += "<p class='price'>S: €" + data[i].price4XL + "</p>";
							}
						}	
						
                        products += "<p>" + data[i].description + "</p>";
						products += "</div></div>";
                    }
                    //pass the products variable to the feedproducts div id in catalogue
                    $("#feedProducts").html(products);

                },
                error: function (errMsg) {
                    console.log(errMsg);
                }
            });
        });
		
		/*
		*
		*PRODUCT EDIT SEARCHING
		*
		*/
		
		/*code for finding 1 product in management with a name*/
        $("#nameSearchB").submit(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'GET',
                url: '/getName/' + event.target.inputName.value,
                dataType: 'json',
                success: function (data) {
					//replace fields with data
					var products = "";
					var formControl="";
					
					for (var i = 0; i < data.length; i++) 
					{
						styleIndex = data[i].numColors;
						document.getElementById("editNumSubStyles").value = styleIndex;
						document.getElementById("editName").value = data[i].name;
						//document.getElementById("productName").value = data[i].name;
						document.getElementById("editCurrentPreview").src = "uploads/"+data[i].name+".jpg";
						
						//new Edit Div Structure////////////////
						if(data[i].masterPrice>0)
						{
							$("#editSinglePrice").prop("checked", true);
							$("#editMultiPrice").prop("checked", false);
							
							document.getElementById("inputEditSinglePrice").style.display =  "block";
							document.getElementById("inputEditPriceS").style.display =  "none";
							document.getElementById("inputEditPriceM").style.display =  "none";
							document.getElementById("inputEditPriceL").style.display =  "none";
							document.getElementById("inputEditPriceXL").style.display =  "none";
							document.getElementById("inputEditPrice2XL").style.display =  "none";
							document.getElementById("inputEditPrice3XL").style.display =  "none";
							document.getElementById("inputEditPrice4XL").style.display =  "none";
							
							document.getElementById("editPrice").value = data[i].masterPrice;
						}
					
						if(data[i].priceS>0||data[i].priceM>0||data[i].priceL>0||data[i].priceXL>0||data[i].price2XL>0||data[i].price3XL>0||data[i].price4XL>0)
						{
							$("#editSinglePrice").prop("checked", false);
							$("#editMultiPrice").prop("checked", true);
							
							document.getElementById("inputEditSinglePrice").style.display =  "none";
							document.getElementById("inputEditPriceS").style.display =  "block";
							document.getElementById("inputEditPriceM").style.display =  "block";
							document.getElementById("inputEditPriceL").style.display =  "block";
							document.getElementById("inputEditPriceXL").style.display =  "block";
							document.getElementById("inputEditPrice2XL").style.display =  "block";
							document.getElementById("inputEditPrice3XL").style.display =  "block";
							document.getElementById("inputEditPrice4XL").style.display =  "block";
							
							document.getElementById("editPriceS").value = data[i].priceS;
							document.getElementById("editPriceM").value = data[i].priceM;
							document.getElementById("editPriceL").value = data[i].priceL;
							document.getElementById("editPriceXL").value = data[i].priceXL;
							document.getElementById("editPrice2XL").value = data[i].price2XL;
							document.getElementById("editPrice3XL").value = data[i].price3XL;
							document.getElementById("editPrice4XL").value = data[i].price4XL;
						}
						
						if(data[i].onSale=="on")
						{
							$("#editOnSale").prop("checked", true);
							
							if(data[i].masterSalePrice==0)
							{
								document.getElementById("inputEditSalePrice").style.display =  "none";
								
								document.getElementById("inputEditSalePriceS").style.display =  "block";
								document.getElementById("inputEditSalePriceM").style.display =  "block";
								document.getElementById("inputEditSalePriceL").style.display =  "block";
								document.getElementById("inputEditSalePriceXL").style.display =  "block";
								document.getElementById("inputEditSalePrice2XL").style.display =  "block";
								document.getElementById("inputEditSalePrice3XL").style.display =  "block";
								document.getElementById("inputEditSalePrice4XL").style.display =  "block";
								
								document.getElementById("editSalePriceS").value = data[i].salePriceS;
								document.getElementById("editSalePriceM").value = data[i].salePriceM;
								document.getElementById("editSalePriceL").value = data[i].salePriceL;
								document.getElementById("editSalePriceXL").value = data[i].salePriceXL;
								document.getElementById("editSalePrice2XL").value = data[i].salePrice2XL;
								document.getElementById("editSalePrice3XL").value = data[i].salePrice3XL;
								document.getElementById("editSalePrice4XL").value = data[i].salePrice4XL;
								
							}
							
							else if(data[i].masterSalePrice>0)
							{	
								document.getElementById("editSalePrice").value = data[i].masterSalePrice;
								document.getElementById("inputEditSalePrice").style.display =  "block";
								
								document.getElementById("inputEditSalePriceS").style.display =  "none";
								document.getElementById("inputEditSalePriceM").style.display =  "none";
								document.getElementById("inputEditSalePriceL").style.display =  "none";
								document.getElementById("inputEditSalePriceXL").style.display =  "none";
								document.getElementById("inputEditSalePrice2XL").style.display =  "none";
								document.getElementById("inputEditSalePrice3XL").style.display =  "none";
								document.getElementById("inputEditSalePrice4XL").style.display =  "none";
							}
						}
						
						else 
							$("#editOnSale").prop("checked", false);
						
						document.getElementById("editCategory").value = data[i].category;
						document.getElementById("editDescription").value = data[i].description;
						
						if(data[i].inWarehouse=="on")
							$("#inWarehouseEdit").prop("checked", true);
						
						else
							$("#inWarehouseEdit").prop("checked", false);
						
						if(data[i].hasSizes=="on")
							$("#hasSizesEdit").prop("checked", true);
						
						else
							$("#hasSizesEdit").prop("checked", false);
						
						if(data[i].numColors>0)
							$("#hasColorsEdit").prop("checked", true);
						
						else
							$("#hasColorsEdit").prop("checked", false);
						
						document.getElementById("editCountWarehouse").value = data[i].totalWarehouse;
						
						if($('#hasSizesEdit').prop('checked')==false&&$('#hasColorsEdit').prop('checked')==false)
						{
							document.getElementById("editShowWarehouseSizes").style.display =  "none";
							document.getElementById("editAddSubStyle").style.display = "none";
							document.getElementById("editSubStyleMenu").style.display = "none";
						}
						
						if($('#hasSizesEdit').prop('checked')==true&&$('#hasColorsEdit').prop('checked')==false)
						{
							document.getElementById("editAddSubStyle").style.display = "none";
							document.getElementById("editSubStyleMenu").style.display = "none";
							
							if($('#inWarehouseEdit').prop('checked')==true)
							{
								document.getElementById("editShowWarehouseSizes").style.display =  "block";
								document.getElementById("editWarehouseSizeS").value =  data[i].WarehouseSizeS;
								document.getElementById("editWarehouseSizeM").value =  data[i].WarehouseSizeM;
								document.getElementById("editWarehouseSizeL").value =  data[i].WarehouseSizeL;
								document.getElementById("editWarehouseSizeXL").value =  data[i].WarehouseSizeXL;
								document.getElementById("editWarehouseSize2XL").value =  data[i].WarehouseSize2XL;
								document.getElementById("editWarehouseSize3XL").value =  data[i].WarehouseSize3XL;
								document.getElementById("editWarehouseSize4XL").value =  data[i].WarehouseSize4XL;
							}
						}
						
						if($('#hasSizesEdit').prop('checked')==false&&$('#hasColorsEdit').prop('checked')==true)
						{
							document.getElementById("editAddSubStyle").style = "block";
							formControl = "";
							
							if(styleIndex>=1)
							{	
								formControl += "<div class='row' id='editSubStyle1'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor1' id='editColor1' value='"+data[i].colorCode1+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal1' id='editColorTotal1' value='"+data[i].color1Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse1'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse1' id='editSubCountWarehouse1' value='"+data[i].color1WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
							}
							
							if(styleIndex>=2)
							{	
								formControl += "<div class='row' id='editSubStyle2'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor2' id='editColor2' value='"+data[i].colorCode2+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal2' id='editColorTotal2' value='"+data[i].color2Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse2'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse2' id='editSubCountWarehouse2' value='"+data[i].color2WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
							}
							
							if(styleIndex>=3)
							{	
								formControl += "<div class='row' id='editSubStyle3'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor3' id='editColor3' value='"+data[i].colorCode3+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal3' id='editColorTotal3' value='"+data[i].color3Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse3'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse3' id='editSubCountWarehouse3' value='"+data[i].color3WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
							}
							
							if(styleIndex>=4)
							{	
								formControl += "<div class='row' id='editSubStyle4'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor4' id='editColor4' value='"+data[i].colorCode4+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal4' id='editColorTotal4' value='"+data[i].color4Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse4'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse4' id='editSubCountWarehouse4' value='"+data[i].color4WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
							}
							
							if(styleIndex>=5)
							{	
								formControl += "<div class='row' id='editSubStyle5'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor5' id='editColor5' value='"+data[i].colorCode5+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal5' id='editColorTotal5' value='"+data[i].color5Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse5'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse5' id='editSubCountWarehouse5' value='"+data[i].color5WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
							}
							
							if(styleIndex>=6)
							{	
								formControl += "<div class='row' id='editSubStyle6'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor6' id='editColor6' value='"+data[i].colorCode6+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal6' id='editColorTotal6' value='"+data[i].color6Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse6'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse6' id='editSubCountWarehouse6' value='"+data[i].color6WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
							}
							
							if(styleIndex>=7)
							{	
								formControl += "<div class='row' id='editSubStyle7'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor7' id='editColor7' value='"+data[i].colorCode7+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal7' id='editColorTotal7' value='"+data[i].color7Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse7'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse7' id='editSubCountWarehouse7' value='"+data[i].color7WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
							}
							
							if(styleIndex>=8)
							{	
								formControl += "<div class='row' id='editSubStyle8'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor8' id='editColor8' value='"+data[i].colorCode8+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal8' id='editColorTotal8' value='"+data[i].color8Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse8'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse8' id='editSubCountWarehouse8' value='"+data[i].color8WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
							}
							
							if(styleIndex>=9)
							{	
								formControl += "<div class='row' id='editSubStyle9'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor9' id='editColor9' value='"+data[i].colorCode9+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal9' id='editColorTotal9' value='"+data[i].color9Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse9'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse9' id='editSubCountWarehouse9' value='"+data[i].color9WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
							}
							
							if(styleIndex>=10)
							{	
								formControl += "<div class='row' id='editSubStyle10'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor10' id='editColor10' value='"+data[i].colorCode10+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal10' id='editColorTotal10' value='"+data[i].color10Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse10'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse10' id='editSubCountWarehouse10' value='"+data[i].color10WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
							}
							
							document.getElementById("editSubStyleMenu").innerHTML = formControl;
							document.getElementById("editSubStyleMenu").style.display = "block";
						}
						
						if($('#hasSizesEdit').prop('checked')==true&&$('#hasColorsEdit').prop('checked')==true)
						{
							document.getElementById("editAddSubStyle").style = "block";
							formControl = "";
							
							if(styleIndex>=1)
							{	
								formControl += "<div class='row' id='editSubStyle1'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor1' id='editColor1' value='"+data[i].colorCode1+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal1' id='editColorTotal1' value='"+data[i].color1Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse1'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse1' id='editSubCountWarehouse1' value='"+data[i].color1WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList1'>"
								formControl +=		"<div class='col-sm-3' id='editShowWarehouseSizes1' style='display: none'>"
								formControl +=			"<label for='editStoreSizesWarehouse' class='control-label'>Warehouse Sizes</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeS1' id='editWarehouseSizeS1' value='"+data[i].color1WarehouseSizeS+"' onchange='updateEditTotals()'><label for='editWarehouseSizeS1'>:S</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeM1' id='editWarehouseSizeM1' value='"+data[i].color1WarehouseSizeM+"' onchange='updateEditTotals()'><label for='editWarehouseSizeM1'>:M</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeL1' id='editWarehouseSizeL1' value='"+data[i].color1WarehouseSizeL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeL1'>:L</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeXL1' id='editWarehouseSizeXL1' value='"+data[i].color1WarehouseSizeXL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeXL1'>:XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize2XL1' id='editWarehouseSize2XL1' value='"+data[i].color1WarehouseSize2XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize2XL1'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize3XL1' id='editWarehouseSize3XL1' value='"+data[i].color1WarehouseSize3XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize3XL1'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize4XL1' id='editWarehouseSize4XL1' value='"+data[i].color1WarehouseSize4XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize4XL1'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=	"</div>"	
								formControl +=	"<br>"
								formControl +=	"<div class='row' id='addSubStyle1' style='display: none'>"
								formControl +=		"<div class='col-sm-3'>"
								formControl +=			"<button type='button' onclick='addForm()'>Add Sub-Style</button>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-9'>"			
								formControl +=		"</div>"	
								formControl +=	"</div>"
								formControl +=	"<br>"
							}
							
							if(styleIndex>=2)
							{	
								formControl += "<div class='row' id='editSubStyle2'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor2' id='editColor2' value='"+data[i].colorCode2+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal2' id='editColorTotal2' value='"+data[i].color2Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse2'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse2' id='editSubCountWarehouse2' value='"+data[i].color2WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList2'>"
								formControl +=		"<div class='col-sm-3' id='editShowWarehouseSizes2' style='display: none'>"
								formControl +=			"<label for='storeSizesWarehouse' class='control-label'>Warehouse Sizes</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeS2' id='editWarehouseSizeS2' value='"+data[i].color2WarehouseSizeS+"' onchange='updateEditTotals()'><label for='editWarehouseSizeS2'>:S</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeM2' id='editWarehouseSizeM2' value='"+data[i].color2WarehouseSizeM+"' onchange='updateEditTotals()'><label for='editWarehouseSizeM2'>:M</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeL2' id='editWarehouseSizeL2' value='"+data[i].color2WarehouseSizeL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeL2'>:L</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeXL2' id='editWarehouseSizeXL2' value='"+data[i].color2WarehouseSizeXL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeXL2'>:XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize2XL2' id='editWarehouseSize2XL2' value='"+data[i].color2WarehouseSize2XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize2XL2'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize3XL2' id='editWarehouseSize3XL2' value='"+data[i].color2WarehouseSize3XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize3XL2'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize4XL2' id='editWarehouseSize4XL2' value='"+data[i].color2WarehouseSize4XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize4XL2'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=	"</div>"	
								formControl +=	"<br>"
								formControl +=	"<div class='row' id='addSubStyle2' style='display: none'>"
								formControl +=		"<div class='col-sm-3'>"
								formControl +=			"<button type='button' onclick='addForm()'>Add Sub-Style</button>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-9'>"			
								formControl +=		"</div>"	
								formControl +=	"</div>"
								formControl +=	"<br>"
							}
							
							if(styleIndex>=3)
							{	
								formControl += "<div class='row' id='editSubStyle3'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor3' id='editColor3' value='"+data[i].colorCode3+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal3' id='editColorTotal3' value='"+data[i].color3Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse3'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse3' id='editSubCountWarehouse3' value='"+data[i].color3WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList3'>"
								formControl +=		"<div class='col-sm-3' id='editShowWarehouseSizes3' style='display: none'>"
								formControl +=			"<label for='storeSizesWarehouse' class='control-label'>Warehouse Sizes</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeS3' id='editWarehouseSizeS3' value='"+data[i].color3WarehouseSizeS+"' onchange='updateEditTotals()'><label for='editWarehouseSizeS3'>:S</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeM3' id='editWarehouseSizeM3' value='"+data[i].color3WarehouseSizeM+"' onchange='updateEditTotals()'><label for='editWarehouseSizeM3'>:M</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeL3' id='editWarehouseSizeL3' value='"+data[i].color3WarehouseSizeL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeL3'>:L</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeXL3' id='editWarehouseSizeXL3' value='"+data[i].color3WarehouseSizeXL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeXL3'>:XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize2XL3' id='editWarehouseSize2XL3' value='"+data[i].color3WarehouseSize2XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize2XL3'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize3XL3' id='editWarehouseSize3XL3' value='"+data[i].color3WarehouseSize3XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize3XL3'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize4XL3' id='editWarehouseSize4XL3' value='"+data[i].color3WarehouseSize4XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize4XL3'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=	"</div>"	
								formControl +=	"<br>"
								formControl +=	"<div class='row' id='addSubStyle3' style='display: none'>"
								formControl +=		"<div class='col-sm-3'>"
								formControl +=			"<button type='button' onclick='addForm()'>Add Sub-Style</button>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-9'>"			
								formControl +=		"</div>"	
								formControl +=	"</div>"
								formControl +=	"<br>"
							}
							
							if(styleIndex>=4)
							{	
								formControl += "<div class='row' id='editSubStyle4'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor4' id='editColor4' value='"+data[i].colorCode4+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal4' id='editColorTotal4' value='"+data[i].color4Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse4'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse4' id='editSubCountWarehouse4' value='"+data[i].color4WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList4'>"
								formControl +=		"<div class='col-sm-3' id='editShowWarehouseSizes4' style='display: none'>"
								formControl +=			"<label for='storeSizesWarehouse' class='control-label'>Warehouse Sizes</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeS4' id='editWarehouseSizeS4' value='"+data[i].color4WarehouseSizeS+"' onchange='updateEditTotals()'><label for='editWarehouseSizeS4'>:S</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeM4' id='editWarehouseSizeM4' value='"+data[i].color4WarehouseSizeM+"' onchange='updateEditTotals()'><label for='editWarehouseSizeM4'>:M</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeL4' id='editWarehouseSizeL4' value='"+data[i].color4WarehouseSizeL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeL4'>:L</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeXL4' id='editWarehouseSizeXL4' value='"+data[i].color4WarehouseSizeXL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeXL4'>:XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize2XL4' id='editWarehouseSize2XL4' value='"+data[i].color4WarehouseSize2XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize2XL4'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize3XL4' id='editWarehouseSize3XL4' value='"+data[i].color4WarehouseSize3XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize3XL4'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize4XL4' id='editWarehouseSize4XL4' value='"+data[i].color4WarehouseSize4XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize4XL4'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=	"</div>"	
								formControl +=	"<br>"
								formControl +=	"<div class='row' id='addSubStyle4' style='display: none'>"
								formControl +=		"<div class='col-sm-3'>"
								formControl +=			"<button type='button' onclick='addForm()'>Add Sub-Style</button>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-9'>"			
								formControl +=		"</div>"	
								formControl +=	"</div>"
								formControl +=	"<br>"
							}
							
							if(styleIndex>=5)
							{	
								formControl += "<div class='row' id='editSubStyle5'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor5' id='editColor5' value='"+data[i].colorCode5+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal5' id='editColorTotal5' value='"+data[i].color5Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse5'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse5' id='editSubCountWarehouse5' value='"+data[i].color5WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList5'>"
								formControl +=		"<div class='col-sm-3' id='editShowWarehouseSizes5' style='display: none'>"
								formControl +=			"<label for='storeSizesWarehouse' class='control-label'>Warehouse Sizes</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeS5' id='editWarehouseSizeS5' value='"+data[i].color5WarehouseSizeS+"' onchange='updateEditTotals()'><label for='editWarehouseSizeS5'>:S</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeM5' id='editWarehouseSizeM5' value='"+data[i].color5WarehouseSizeM+"' onchange='updateEditTotals()'><label for='editWarehouseSizeM5'>:M</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeL5' id='editWarehouseSizeL5' value='"+data[i].color5WarehouseSizeL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeL5'>:L</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeXL5' id='editWarehouseSizeXL5' value='"+data[i].color5WarehouseSizeXL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeXL5'>:XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize2XL5' id='editWarehouseSize2XL5' value='"+data[i].color5WarehouseSize2XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize2XL5'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize3XL5' id='editWarehouseSize3XL5' value='"+data[i].color5WarehouseSize3XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize3XL5'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize4XL5' id='editWarehouseSize4XL5' value='"+data[i].color5WarehouseSize4XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize4XL5'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=	"</div>"	
								formControl +=	"<br>"
								formControl +=	"<div class='row' id='addSubStyle5' style='display: none'>"
								formControl +=		"<div class='col-sm-3'>"
								formControl +=			"<button type='button' onclick='addForm()'>Add Sub-Style</button>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-9'>"			
								formControl +=		"</div>"	
								formControl +=	"</div>"
								formControl +=	"<br>"
							}
							
							if(styleIndex>=6)
							{	
								formControl += "<div class='row' id='editSubStyle6'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor6' id='editColor6' value='"+data[i].colorCode6+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal6' id='editColorTotal6' value='"+data[i].color6Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse6'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse6' id='editSubCountWarehouse6' value='"+data[i].color6WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList6'>"
								formControl +=		"<div class='col-sm-3' id='editShowWarehouseSizes6' style='display: none'>"
								formControl +=			"<label for='storeSizesWarehouse' class='control-label'>Warehouse Sizes</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeS6' id='editWarehouseSizeS6' value='"+data[i].color6WarehouseSizeS+"' onchange='updateEditTotals()'><label for='editWarehouseSizeS6'>:S</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeM6' id='editWarehouseSizeM6' value='"+data[i].color6WarehouseSizeM+"' onchange='updateEditTotals()'><label for='editWarehouseSizeM6'>:M</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeL6' id='editWarehouseSizeL6' value='"+data[i].color6WarehouseSizeL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeL6'>:L</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeXL6' id='editWarehouseSizeXL6' value='"+data[i].color6WarehouseSizeXL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeXL6'>:XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize2XL6' id='editWarehouseSize2XL6' value='"+data[i].color6WarehouseSize2XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize2XL6'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize3XL6' id='editWarehouseSize3XL6' value='"+data[i].color6WarehouseSize3XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize3XL6'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize4XL6' id='editWarehouseSize4XL6' value='"+data[i].color6WarehouseSize4XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize4XL6'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=	"</div>"	
								formControl +=	"<br>"
								formControl +=	"<div class='row' id='addSubStyle6' style='display: none'>"
								formControl +=		"<div class='col-sm-3'>"
								formControl +=			"<button type='button' onclick='addForm()'>Add Sub-Style</button>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-9'>"			
								formControl +=		"</div>"	
								formControl +=	"</div>"
								formControl +=	"<br>"
							}
							
							if(styleIndex>=7)
							{	
								formControl += "<div class='row' id='editSubStyle7'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor7' id='editColor7' value='"+data[i].colorCode7+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal7' id='editColorTotal7' value='"+data[i].color7Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse7'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse7' id='editSubCountWarehouse7' value='"+data[i].color7WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList7'>"
								formControl +=		"<div class='col-sm-3' id='editShowWarehouseSizes7' style='display: none'>"
								formControl +=			"<label for='storeSizesWarehouse' class='control-label'>Warehouse Sizes</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeS7' id='editWarehouseSizeS7' value='"+data[i].color7WarehouseSizeS+"' onchange='updateEditTotals()'><label for='editWarehouseSizeS7'>:S</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeM7' id='editWarehouseSizeM7' value='"+data[i].color7WarehouseSizeM+"' onchange='updateEditTotals()'><label for='editWarehouseSizeM7'>:M</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeL7' id='editWarehouseSizeL7' value='"+data[i].color7WarehouseSizeL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeL7'>:L</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeXL7' id='editWarehouseSizeXL7' value='"+data[i].color7WarehouseSizeXL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeXL7'>:XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize2XL7' id='editWarehouseSize2XL7' value='"+data[i].color7WarehouseSize2XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize2XL7'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize3XL7' id='editWarehouseSize3XL7' value='"+data[i].color7WarehouseSize3XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize3XL7'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize4XL7' id='editWarehouseSize4XL7' value='"+data[i].color7WarehouseSize4XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize4XL7'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=	"</div>"	
								formControl +=	"<br>"
								formControl +=	"<div class='row' id='addSubStyle7' style='display: none'>"
								formControl +=		"<div class='col-sm-3'>"
								formControl +=			"<button type='button' onclick='addForm()'>Add Sub-Style</button>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-9'>"			
								formControl +=		"</div>"	
								formControl +=	"</div>"
								formControl +=	"<br>"
							}
							
							if(styleIndex>=8)
							{	
								formControl += "<div class='row' id='editSubStyle8'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor8' id='editColor8' value='"+data[i].colorCode8+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal8' id='editColorTotal8' value='"+data[i].color8Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse8'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse8' id='editSubCountWarehouse8' value='"+data[i].color8WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList8'>"
								formControl +=		"<div class='col-sm-3' id='editShowWarehouseSizes8' style='display: none'>"
								formControl +=			"<label for='storeSizesWarehouse' class='control-label'>Warehouse Sizes</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeS8' id='editWarehouseSizeS8' value='"+data[i].color8WarehouseSizeS+"' onchange='updateEditTotals()'><label for='editWarehouseSizeS8'>:S</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeM8' id='editWarehouseSizeM8' value='"+data[i].color8WarehouseSizeM+"' onchange='updateEditTotals()'><label for='editWarehouseSizeM8'>:M</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeL8' id='editWarehouseSizeL8' value='"+data[i].color8WarehouseSizeL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeL8'>:L</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeXL8' id='editWarehouseSizeXL8' value='"+data[i].color8WarehouseSizeXL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeXL8'>:XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize2XL8' id='editWarehouseSize2XL8' value='"+data[i].color8WarehouseSize2XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize2XL8'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize3XL8' id='editWarehouseSize3XL8' value='"+data[i].color8WarehouseSize3XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize3XL8'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize4XL8' id='editWarehouseSize4XL8' value='"+data[i].color8WarehouseSize4XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize4XL8'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=	"</div>"	
								formControl +=	"<br>"
								formControl +=	"<div class='row' id='addSubStyle8' style='display: none'>"
								formControl +=		"<div class='col-sm-3'>"
								formControl +=			"<button type='button' onclick='addForm()'>Add Sub-Style</button>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-9'>"			
								formControl +=		"</div>"	
								formControl +=	"</div>"
								formControl +=	"<br>"
							}
							
							if(styleIndex>=9)
							{	
								formControl += "<div class='row' id='editSubStyle9'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor9' id='editColor9' value='"+data[i].colorCode9+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal9' id='editColorTotal9' value='"+data[i].color9Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse9'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse9' id='editSubCountWarehouse9' value='"+data[i].color9WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList9'>"
								formControl +=		"<div class='col-sm-3' id='editShowWarehouseSizes9' style='display: none'>"
								formControl +=			"<label for='storeSizesWarehouse' class='control-label'>Warehouse Sizes</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeS9' id='editWarehouseSizeS9' value='"+data[i].color9WarehouseSizeS+"' onchange='updateEditTotals()'><label for='editWarehouseSizeS9'>:S</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeM9' id='editWarehouseSizeM9' value='"+data[i].color9WarehouseSizeM+"' onchange='updateEditTotals()'><label for='editWarehouseSizeM9'>:M</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeL9' id='editWarehouseSizeL9' value='"+data[i].color9WarehouseSizeL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeL9'>:L</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeXL9' id='editWarehouseSizeXL9' value='"+data[i].color9WarehouseSizeXL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeXL9'>:XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize2XL9' id='editWarehouseSize2XL9' value='"+data[i].color9WarehouseSize2XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize2XL9'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize3XL9' id='editWarehouseSize3XL9' value='"+data[i].color9WarehouseSize3XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize3XL9'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize4XL9' id='editWarehouseSize4XL9' value='"+data[i].color9WarehouseSize4XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize4XL9'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=	"</div>"	
								formControl +=	"<br>"
								formControl +=	"<div class='row' id='addSubStyle9' style='display: none'>"
								formControl +=		"<div class='col-sm-3'>"
								formControl +=			"<button type='button' onclick='addForm()'>Add Sub-Style</button>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-9'>"			
								formControl +=		"</div>"	
								formControl +=	"</div>"
								formControl +=	"<br>"
							}
							
							if(styleIndex>=10)
							{	
								formControl += "<div class='row' id='editSubStyle10'>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor10' id='editColor10' value='"+data[i].colorCode10+"'>"
								formControl += "</div>"
								formControl += "<br>"
								formControl += "<div class='col-sm-2'>"
								formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal10' id='editColorTotal10' value='"+data[i].color10Total+"'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubWarehouse10'>"
								formControl += "<p>Warehouse</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse10' id='editSubCountWarehouse10' value='"+data[i].color10WarehouseTotal+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList10'>"
								formControl +=		"<div class='col-sm-3' id='editShowWarehouseSizes10' style='display: none'>"
								formControl +=			"<label for='storeSizesWarehouse' class='control-label'>Warehouse Sizes</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeS10' id='editWarehouseSizeS10' value='"+data[i].color10WarehouseSizeS+"' onchange='updateEditTotals()'><label for='editWarehouseSizeS10'>:S</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeM10' id='editWarehouseSizeM10' value='"+data[i].color10WarehouseSizeM+"' onchange='updateEditTotals()'><label for='editWarehouseSizeM10'>:M</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeL10' id='editWarehouseSizeL10' value='"+data[i].color10WarehouseSizeL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeL10'>:L</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSizeXL10' id='editWarehouseSizeXL10' value='"+data[i].color10WarehouseSizeXL+"' onchange='updateEditTotals()'><label for='editWarehouseSizeXL10'>:XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize2XL10' id='editWarehouseSize2XL10' value='"+data[i].color10WarehouseSize2XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize2XL10'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize3XL10' id='editWarehouseSize3XL10' value='"+data[i].color10WarehouseSize3XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize3XL10'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editWarehouseSize4XL10' id='editWarehouseSize4XL10' value='"+data[i].color10WarehouseSize4XL+"' onchange='updateEditTotals()'><label for='editWarehouseSize4XL10'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=	"</div>"	
								formControl +=	"<br>"
								formControl +=	"<div class='row' id='addSubStyle10' style='display: none'>"
								formControl +=		"<div class='col-sm-3'>"
								formControl +=			"<button type='button' onclick='addForm()'>Add Sub-Style</button>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-9'>"			
								formControl +=		"</div>"	
								formControl +=	"</div>"
								formControl +=	"<br>"
							}
							
							document.getElementById("editSubStyleMenu").innerHTML = formControl;
							
							if($('#inWarehouseEdit').prop('checked')==true)
							{
								if(styleIndex>=1)
									document.getElementById("editShowWarehouseSizes1").style.display = "block";
									
								if(styleIndex>=2)
									document.getElementById("editShowWarehouseSizes2").style.display = "block";
									
								if(styleIndex>=3)
									document.getElementById("editShowWarehouseSizes3").style.display = "block";
									
								if(styleIndex>=4)
									document.getElementById("editShowWarehouseSizes4").style.display = "block";
									
								if(styleIndex>=5)
									document.getElementById("editShowWarehouseSizes5").style.display = "block";
									
								if(styleIndex>=6)
									document.getElementById("editShowWarehouseSizes6").style.display = "block";
									
								if(styleIndex>=7)
									document.getElementById("editShowWarehouseSizes7").style.display = "block";
									
								if(styleIndex>=8)
									document.getElementById("editShowWarehouseSizes8").style.display = "block";
									
								if(styleIndex>=9)
									document.getElementById("editShowWarehouseSizes9").style.display = "block";
									
								if(styleIndex>=10)
									document.getElementById("editShowWarehouseSizes10").style.display = "block";
							}
							document.getElementById("editSubStyleMenu").style = "block";
						}
						
						////////////////////////////////////////
						
						//create button for Product DELETE route
						products += "<form method='post' action='/deleteProduct' name='deleteForm' id='deleteForm'>";
                        products += "<br><input type='text' name='deleteName' id='deleteName' value='" + data[i].name + "' style='display:none' readonly><br><input type='submit' id='deleteButton' value='DELETE PRODUCT'></form><br>";
						document.getElementById("editProduct").style.display = "block";
						//controlEditForm();
					}
					
					$("#deleteHTML").html(products);
					
                },
                error: function (errMsg) {
                    console.log(errMsg);
                }
            });
        });
		
		
    });//doc.rdy

//show image preview in add/edit product field
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#preview').attr('src', e.target.result);
			$('#editPreview').attr('src', e.target.result);
        }
	
	reader.onloadend = function () {
	reader.fileName = input.files[0].name;
        //console.log(reader.fileName); // here you can access the original file name
	var fileName = reader.fileName;
	var newName = fileName.replace(".jpg","")
	document.getElementById("name").value = newName;
    }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#uploadInput").change(function () {
    readURL(this);
});

//cannot change image name => cannot upload new image!
/*function readNewURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#preview').attr('src', e.target.result);
			$('#editPreview').attr('src', e.target.result);
        }
	
	reader.onloadend = function () {
	//input.files[0].name = document.getElementById("editName").value;
	reader.fileName = input.files[0].name;
        //console.log(reader.fileName); // here you can access the original file name
	var fileName = reader.fileName;
	var newName = fileName.replace(".jpg","")
	}
	
	if(newName==document.getElementById("editName").value)
	{
		reader.readAsDataURL(input.files[0]);
	}
    
	else
		document.getElementById("editPreview").setAttribute("alt", "Cannot Upload! Image Name Must Match Product Name!");
	//document.getElementById("editName").value = newName;
    //}
        //reader.readAsDataURL(input.files[0]);
    }
}*/

/*$("#editUploadInput").change(function () {
	if(newName==document.getElementById("editName").value)
	{
		readNewURL(this);
	}
    
	else
		document.getElementById("editPreview").setAttribute("alt", "Cannot Upload! Image Name Must Match Product Name!");
});*/

function addEditForm()
{
	document.getElementById("editCountWarehouse").value = 0;
	document.getElementById("editCountCork").value = 0;
	document.getElementById("editCountKala").value = 0;
	document.getElementById("editCountGalway").value = 0;
	styleIndex = parseInt(document.getElementById("editNumSubStyles").value);
	console.log(styleIndex);
	
			var formControl = "";
			for(var i=1; i<styleIndex+1; i++)
			{	
				formControl += "<div class='row' id='editSubStyle"+i+"'>"
				formControl += "<br>"
				formControl += "<div class='col-sm-2'>"
				formControl += "<p>Sub-Style Code:</p><input type='text' class='form-control input-lg required' required='required' name='editColor"+i+"' id='editColor"+i+"' placeholder='Style Code'>"
				formControl += "</div>"
				formControl += "<br>"
				formControl += "<div class='col-sm-2'>"
				formControl += "<p>Sub-Style Total:</p><input type='text' class='form-control input-lg required' required='required' name='editColorTotal"+i+"' id='editColorTotal"+i+"' placeholder='0'>"
				formControl += "</div>"
				formControl += "<div class='col-sm-2' id='editShowSubWarehouse"+i+"'>"
				formControl += "<p>Warehouse</p>"
				formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountWarehouse"+i+"' id='editSubCountWarehouse"+i+"' value='0' onchange='updateEditTotals()'>"
				formControl += "</div>"
				formControl += "</div>"
				formControl += "</div><br>"
				formControl += "<div class='row' id='editSubSizeList"+i+"'>"
				formControl +=		"<div class='col-sm-3' id='editShowWarehouseSizes"+i+"' style='display: none'>"
				formControl +=			"<label for='storeSizesWarehouse' class='control-label'>Warehouse Sizes</label><br>"
				formControl +=			"<input type='text' name='editWarehouseSizeS"+i+"' id='editWarehouseSizeS"+i+"' value='0' onchange='updateEditTotals()'><label for='editWarehouseSizeS"+i+"'>:S</label><br>"
				formControl +=			"<input type='text' name='editWarehouseSizeM"+i+"' id='editWarehouseSizeM"+i+"' value='0' onchange='updateEditTotals()'><label for='editWarehouseSizeM"+i+"'>:M</label><br>"
				formControl +=			"<input type='text' name='editWarehouseSizeL"+i+"' id='editWarehouseSizeL"+i+"' value='0' onchange='updateEditTotals()'><label for='editWarehouseSizeL"+i+"'>:L</label><br>"
				formControl +=			"<input type='text' name='editWarehouseSizeXL"+i+"' id='editWarehouseSizeXL"+i+"' value='0' onchange='updateEditTotals()'><label for='editWarehouseSizeXL"+i+"'>:XL</label><br>"
				formControl +=			"<input type='text' name='editWarehouseSize2XL"+i+"' id='editWarehouseSize2XL"+i+"' value='0' onchange='updateEditTotals()'><label for='editWarehouseSize2XL"+i+"'>:2XL</label><br>"
				formControl +=			"<input type='text' name='editWarehouseSize3XL"+i+"' id='editWarehouseSize3XL"+i+"' value='0' onchange='updateEditTotals()'><label for='editWarehouseSize3XL"+i+"'>:3XL</label><br>"
				formControl +=			"<input type='text' name='editWarehouseSize4XL"+i+"' id='editWarehouseSize4XL"+i+"' value='0' onchange='updateEditTotals()'><label for='editWarehouseSize4XL"+i+"'>:4XL</label><br>"
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
			document.getElementById("editSubStyleMenu").innerHTML = formControl;
			document.getElementById("editSubStyleMenu").style.display =  "block";
			
	controlEditForm();
}

function controlEditForm()
{
	var i=0;
	var currStyle=0;

	var editShowSubCork = '';
	var editShowSubKala = '';
	var editShowSubGalway = '';
	var editShowSubWarehouse = '';

	if($('#editSinglePrice').value!="on")
	{
		document.getElementById("editPrice").value = 0;
		document.getElementById("inputEditSinglePrice").style.display =  "none";
		document.getElementById("editSalePrice").value = 0;
		document.getElementById("inputEditSalePrice").style.display =  "none";
	}
	
	if($('#editSinglePrice').prop('checked')==true)
	{
		$("#editMultiPrice").prop("checked", false);
		document.getElementById("editPriceLabel").style.display =  "none";
		document.getElementById("editSalePriceLabel").style.display =  "none";
		
		document.getElementById("editPriceS").value = 0;
		document.getElementById("editPriceM").value = 0;
		document.getElementById("editPriceL").value = 0;
		document.getElementById("editPriceXL").value = 0;
		document.getElementById("editPrice2XL").value = 0;
		document.getElementById("editPrice3XL").value = 0;
		document.getElementById("editPrice4XL").value = 0;
		document.getElementById("inputEditSinglePrice").style.display =  "block";
		document.getElementById("inputEditPriceS").style.display =  "none";
		document.getElementById("inputEditPriceM").style.display =  "none";
		document.getElementById("inputEditPriceL").style.display =  "none";
		document.getElementById("inputEditPriceXL").style.display =  "none";
		document.getElementById("inputEditPrice2XL").style.display =  "none";
		document.getElementById("inputEditPrice3XL").style.display =  "none";
		document.getElementById("inputEditPrice4XL").style.display =  "none";
		document.getElementById("editSalePriceS").value = 0;
		document.getElementById("editSalePriceM").value = 0;
		document.getElementById("editSalePriceL").value = 0;
		document.getElementById("editSalePriceXL").value = 0;
		document.getElementById("editSalePrice2XL").value = 0;
		document.getElementById("editSalePrice3XL").value = 0;
		document.getElementById("editSalePrice4XL").value = 0;
		document.getElementById("inputEditSalePrice").style.display =  "block";
		document.getElementById("inputEditSalePriceS").style.display =  "none";
		document.getElementById("inputEditSalePriceM").style.display =  "none";
		document.getElementById("inputEditSalePriceL").style.display =  "none";
		document.getElementById("inputEditSalePriceXL").style.display =  "none";
		document.getElementById("inputEditSalePrice2XL").style.display =  "none";
		document.getElementById("inputEditSalePrice3XL").style.display =  "none";
		document.getElementById("inputEditSalePrice4XL").style.display =  "none";
	}
	
	if($('#editMultiPrice').prop('checked')==false)
	{
		document.getElementById("editPriceLabel").style.display =  "none";
		document.getElementById("editSalePriceLabel").style.display =  "none";
		
		document.getElementById("editPriceS").value = 0;
		document.getElementById("editPriceM").value = 0;
		document.getElementById("editPriceL").value = 0;
		document.getElementById("editPriceXL").value = 0;
		document.getElementById("editPrice2XL").value = 0;
		document.getElementById("editPrice3XL").value = 0;
		document.getElementById("editPrice4XL").value = 0;
		document.getElementById("inputEditPriceS").style.display =  "none";
		document.getElementById("inputEditPriceM").style.display =  "none";
		document.getElementById("inputEditPriceL").style.display =  "none";
		document.getElementById("inputEditPriceXL").style.display =  "none";
		document.getElementById("inputEditPrice2XL").style.display =  "none";
		document.getElementById("inputEditPrice3XL").style.display =  "none";
		document.getElementById("inputEditPrice4XL").style.display =  "none";
		document.getElementById("editSalePriceS").value = 0;
		document.getElementById("editSalePriceM").value = 0;
		document.getElementById("editSalePriceL").value = 0;
		document.getElementById("editSalePriceXL").value = 0;
		document.getElementById("editSalePrice2XL").value = 0;
		document.getElementById("editSalePrice3XL").value = 0;
		document.getElementById("editSalePrice4XL").value = 0;
		document.getElementById("inputEditSalePriceS").style.display =  "none";
		document.getElementById("inputEditSalePriceM").style.display =  "none";
		document.getElementById("inputEditSalePriceL").style.display =  "none";
		document.getElementById("inputEditSalePriceXL").style.display =  "none";
		document.getElementById("inputEditSalePrice2XL").style.display =  "none";
		document.getElementById("inputEditSalePrice3XL").style.display =  "none";
		document.getElementById("inputEditSalePrice4XL").style.display =  "none";
	}
	
	if($('#editMultiPrice').prop('checked')==true)
	{
		$("#editSinglePrice").prop("checked", false);
		document.getElementById("editPriceLabel").style.display =  "block";
		document.getElementById("editSalePriceLabel").style.display =  "block";
		
		document.getElementById("editPrice").value = 0;
		document.getElementById("inputEditPriceS").style.display =  "block";
		document.getElementById("inputEditPriceM").style.display =  "block";
		document.getElementById("inputEditPriceL").style.display =  "block";
		document.getElementById("inputEditPriceXL").style.display =  "block";
		document.getElementById("inputEditPrice2XL").style.display =  "block";
		document.getElementById("inputEditPrice3XL").style.display =  "block";
		document.getElementById("inputEditPrice4XL").style.display =  "block";
		document.getElementById("inputEditSinglePrice").style.display =  "none";
		
		document.getElementById("editSalePrice").value = 0;
		document.getElementById("inputEditSalePriceS").style.display =  "block";
		document.getElementById("inputEditSalePriceM").style.display =  "block";
		document.getElementById("inputEditSalePriceL").style.display =  "block";
		document.getElementById("inputEditSalePriceXL").style.display =  "block";
		document.getElementById("inputEditSalePrice2XL").style.display =  "block";
		document.getElementById("inputEditSalePrice3XL").style.display =  "block";
		document.getElementById("inputEditSalePrice4XL").style.display =  "block";
		document.getElementById("inputEditSalePrice").style.display =  "none";
	}
	
	if($('#editSinglePrice').prop('checked')==true && $('#editOnSale').prop('checked')==true)
	{
		document.getElementById("inputEditSalePrice").style.display =  "block";
	}
	
	else
	{
		document.getElementById("inputEditSalePrice").style.display =  "none";
		document.getElementById("editSalePrice").value =  "0";
	}
	
	if($('#editMultiPrice').prop('checked')==true && $('#editOnSale').prop('checked')==true)
	{
		document.getElementById("inputEditSalePriceS").style.display =  "block";
		document.getElementById("inputEditSalePriceM").style.display =  "block";
		document.getElementById("inputEditSalePriceL").style.display =  "block";
		document.getElementById("inputEditSalePriceXL").style.display =  "block";
		document.getElementById("inputEditSalePrice2XL").style.display =  "block";
		document.getElementById("inputEditSalePrice3XL").style.display =  "block";
		document.getElementById("inputEditSalePrice4XL").style.display =  "block";
	}
	
	else
	{
		document.getElementById("editSalePriceS").value =  "0";
		document.getElementById("editSalePriceM").value =  "0";
		document.getElementById("editSalePriceL").value =  "0";
		document.getElementById("editSalePriceXL").value =  "0";
		document.getElementById("editSalePrice2XL").value =  "0";
		document.getElementById("editSalePrice3XL").value =  "0";
		document.getElementById("editSalePrice4XL").value =  "0";
		document.getElementById("inputEditSalePriceS").style.display =  "none";
		document.getElementById("inputEditSalePriceM").style.display =  "none";
		document.getElementById("inputEditSalePriceL").style.display =  "none";
		document.getElementById("inputEditSalePriceXL").style.display =  "none";
		document.getElementById("inputEditSalePrice2XL").style.display =  "none";
		document.getElementById("inputEditSalePrice3XL").style.display =  "none";
		document.getElementById("inputEditSalePrice4XL").style.display =  "none";
	}
	
	if($('#hasColorsEdit').prop('checked')==true&&$('#hasSizesEdit').prop('checked')==true)
	{
		document.getElementById("editShowWarehouseSizes").style.display =  "none";
	}
	
	if($('#hasColorsEdit').prop('checked')==true)
	{
		document.getElementById("editAddSubStyle").style.display =  "block";
		
		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;
			//var subStyle = document.getElementById("subStyle").id + currStyle;
			var editShowWarehouseSizes = document.getElementById("editShowWarehouseSizes").id + currStyle;
			//var subStyle = document.getElementById("editSubStyle").id + currStyle;
			//var addSubStyle = document.getElementById("editAddSubStyle").id + currStyle;
				
			//document.getElementById(addSubStyle).style.display =  "block";
			if($('#hasSizesEdit').prop('checked')==true)
			{
				if($('#inWarehouseEdit').prop('checked')==true)
					document.getElementById(editShowWarehouseSizes).style.display =  "block";
				
				else if($('#inWarehouseEdit').prop('checked')==false)
					document.getElementById(editShowWarehouseSizes).style.display =  "none";
			}
				
			else if($('#hasSizesEdit').prop('checked')==false)
			{
				document.getElementById(editShowWarehouseSizes).style.display =  "none";
			}
		}
			
		/*if(styleIndex>0)
		for(var i=1; i<styleIndex+1; i++)	
		{
			currStyle = i;
			//var editAddSubStyle = document.getElementById("editAddSubStyle").id + currStyle;
			//console.log(addSubStyle);
			//document.getElementById(editAddSubStyle).style.display =  "none";
		}*/
	}

	if($('#hasColorsEdit').prop('checked')==false)
	{	
		styleIndex=0;
		var clearMenu = "";
		//document.getElementById("editSubStyle").style.display =  "none";
		document.getElementById("editAddSubStyle").style.display =  "none";
		$("#editSubStyleMenu").html(clearMenu);
	}
	
	if($('#hasSizesEdit').prop('checked')==true)
	{
		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;
			//var subStyle = document.getElementById("subStyle").id + currStyle;
			editShowSubWarehouse = document.getElementById("editShowSubWarehouse").id + currStyle;
			//var subStyle = document.getElementById("subStyle").id + currStyle;
			//var addSubStyle = document.getElementById("addSubStyle").id + currStyle;
			
			//document.getElementById(addSubStyle).style.display =  "block";
					
			if($('#inWarehouseEdit').prop('checked')==true)
				document.getElementById(editShowSubWarehouse).style.display =  "block";
				
			else if($('#inWarehouseEdit').prop('checked')==false)
				document.getElementById(editShowSubWarehouse).style.display =  "none";
		}
	}
	
	if($('#hasSizesEdit').prop('checked')==false)
	{
		document.getElementById("editShowWarehouseSizes").style.display =  "none";
		
		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;
			
			if($('#inWarehouseEdit').prop('checked')==false)
			{
				var editSubCountWarehouse = document.getElementById("editSubCountWarehouse").id + currStyle;
				document.getElementById(editSubCountWarehouse).value=0;
			}
		}
		
		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;
			//var subStyle = document.getElementById("subStyle").id + currStyle;
			editShowSubWarehouse = document.getElementById("editShowSubWarehouse").id + currStyle;
			//var subStyle = document.getElementById("subStyle").id + currStyle;
			//var addSubStyle = document.getElementById("addSubStyle").id + currStyle;
				
			//document.getElementById(addSubStyle).style.display =  "block";
					
			if($('#inWarehouseEdit').prop('checked')==true)
				document.getElementById(editShowSubWarehouse).style.display =  "block";
				
			else if($('#inWarehouseEdit').prop('checked')==false)
				document.getElementById(editShowSubWarehouse).style.display =  "none";			
		}
	}
	
	if(($('#hasSizesEdit').prop('checked')==true) && ($('#hasColorsEdit').prop('checked')==false))
	{	
		if($('#inWarehouseEdit').prop('checked')==true)
			document.getElementById("editShowWarehouseSizes").style.display =  "block";
	
		else if($('#inWarehouseEdit').prop('checked')==false)
			document.getElementById("editShowWarehouseSizes").style.display =  "none";
	}
	
	if(($('#hasSizesEdit').prop('checked')==false) && ($('#hasColorsEdit').prop('checked')==false))
	{
		if($('#inWarehouseEdit').prop('checked')==false)
			document.getElementById("editCountWarehouse").value = 0;
	}

	updateEditTotals();
}

function updateEditTotals()
{
	var i=0;
	var currStyle=0;

	var editWarehouseTotal = 0;

	var editCountWarehouseSizeS = 0;
	var editCountWarehouseSizeM = 0;
	var editCountWarehouseSizeL = 0;
	var editCountWarehouseSizeXL = 0;
	var editCountWarehouseSize2XL = 0;
	var editCountWarehouseSize3XL = 0;
	var editCountWarehouseSize4XL = 0;
	var editWarehouseSizeTotal = 0;

	var editSubCountWarehouse = 0;
	var editTempTotalWarehouse = 0;

	if($('#hasSizesEdit').prop('checked')==true&&$('#hasColorsEdit').prop('checked')==true)
	{
		document.getElementById("editCountWarehouse").value = 0;
			
		for(i=1;i<styleIndex+1;i++)
		{
			currStyle = i;
			editWarehouseTotal = 0;

			var editWarehouseSizeS = document.getElementById("editWarehouseSizeS").id + currStyle; 
			var editWarehouseSizeM = document.getElementById("editWarehouseSizeM").id + currStyle; 
			var editWarehouseSizeL = document.getElementById("editWarehouseSizeL").id + currStyle; 
			var editWarehouseSizeXL = document.getElementById("editWarehouseSizeXL").id + currStyle; 
			var editWarehouseSize2XL = document.getElementById("editWarehouseSize2XL").id + currStyle; 
			var editWarehouseSize3XL = document.getElementById("editWarehouseSize3XL").id + currStyle; 
			var editWarehouseSize4XL = document.getElementById("editWarehouseSize4XL").id + currStyle; 
			editCountWarehouseSizeS = parseInt(document.getElementById(editWarehouseSizeS).value);
			editCountWarehouseSizeM = parseInt(document.getElementById(editWarehouseSizeM).value);
			editCountWarehouseSizeL = parseInt(document.getElementById(editWarehouseSizeL).value);
			editCountWarehouseSizeXL = parseInt(document.getElementById(editWarehouseSizeXL).value);
			editCountWarehouseSize2XL = parseInt(document.getElementById(editWarehouseSize2XL).value);
			editCountWarehouseSize3XL = parseInt(document.getElementById(editWarehouseSize3XL).value);
			editCountWarehouseSize4XL = parseInt(document.getElementById(editWarehouseSize4XL).value);
			editWarehouseSizeTotal = parseInt(editCountWarehouseSizeS) + parseInt(editCountWarehouseSizeM) + parseInt(editCountWarehouseSizeL) + parseInt(editCountWarehouseSizeXL) + parseInt(editCountWarehouseSize2XL) + parseInt(editCountWarehouseSize3XL) + parseInt(editCountWarehouseSize4XL);
			editSubCountWarehouse = document.getElementById("editSubCountWarehouse").id + currStyle;
			
			if($('#inWarehouseEdit').prop('checked')==true&&$('#hasSizesEdit').prop('checked')==true)
			{
				editWarehouseTotal += parseInt(editWarehouseSizeTotal);
				document.getElementById(editSubCountWarehouse).value = editWarehouseTotal;
				document.getElementById("editCountWarehouse").value = parseInt(document.getElementById("editCountWarehouse").value) + parseInt(document.getElementById(editSubCountWarehouse).value);
			}
			
			else if($('#inWarehouseEdit').prop('checked')==false)
				editWarehouseSizeTotal = 0;

			var editColorTotal = (document.getElementById("editColorTotal").id + currStyle); 
			//console.log(editColorTotal);
			document.getElementById(editColorTotal).value = editWarehouseTotal + editCorkTotal + editKalaTotal + editGalwayTotal;
		}
	}
	
	if($('#hasSizesEdit').prop('checked')==false&&$('#hasColorsEdit').prop('checked')==true)
	{
		editTempTotalWarehouse = 0;
			
		for(i=1;i<styleIndex+1;i++)
		{
			currStyle = i;
				
			editColorTotal = document.getElementById("editColorTotal").id + currStyle;
			editWarehouseTotal = 0;
				
			if($('#inWarehouseEdit').prop('checked')==true)
			{						
				editSubCountWarehouse = document.getElementById("editSubCountWarehouse").id + currStyle;	
				editWarehouseTotal = parseInt(document.getElementById(editSubCountWarehouse).value) + editWarehouseTotal;
				editTempTotalWarehouse = editTempTotalWarehouse + parseInt(document.getElementById(editSubCountWarehouse).value);
			}	

			document.getElementById("editCountWarehouse").value = editTempTotalWarehouse;

			document.getElementById(editColorTotal).value = editWarehouseTotal;
		}
	}
		
	if($('#hasSizesEdit').prop('checked')==true&&$('#hasColorsEdit').prop('checked')==false)
	{		
		editWarehouseTotal = 0;
			
		editCountWarehouseSizeS = parseInt(document.getElementById("editWarehouseSizeS").value);
		editCountWarehouseSizeM = parseInt(document.getElementById("editWarehouseSizeM").value);
		editCountWarehouseSizeL = parseInt(document.getElementById("editWarehouseSizeL").value);
		editCountWarehouseSizeXL = parseInt(document.getElementById("editWarehouseSizeXL").value);
		editCountWarehouseSize2XL = parseInt(document.getElementById("editWarehouseSize2XL").value);
		editCountWarehouseSize3XL = parseInt(document.getElementById("editWarehouseSize3XL").value);
		editCountWarehouseSize4XL = parseInt(document.getElementById("editWarehouseSize4XL").value);
		editWarehouseSizeTotal = parseInt(editCountWarehouseSizeS) + parseInt(editCountWarehouseSizeM) + parseInt(editCountWarehouseSizeL) + parseInt(editCountWarehouseSizeXL) + parseInt(editCountWarehouseSize2XL) + parseInt(editCountWarehouseSize3XL) + parseInt(editCountWarehouseSize4XL);
			
		if($('#inWarehouseEdit').prop('checked')==true&&$('#hasSizesEdit').prop('checked')==true)
		{
			editWarehouseTotal = parseInt(editWarehouseSizeTotal);
			document.getElementById("editCountWarehouse").value = editWarehouseTotal;
		}
			
		else if($('#inWarehouseEdit').prop('checked')==false)
			document.getElementById("editCountWarehouse").value = 0;
	}
	
	if($('#hasColorsEdit').prop('checked')==true&&$('#inWarehouseEdit').prop('checked')==false)
	{
		document.getElementById("editCountWarehouse").value = 0;
	}

	if($('#hasSizesEdit').prop('checked')==false&&$('#hasColorsEdit').prop('checked')==false)
	{
		if($('#inWarehouseEdit').prop('checked')==false)
			document.getElementById("editCountWarehouse").value = 0;
	}
}
