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
						
						/*if(data[i].inStoreCork=="on")
							$("#inCorkEdit").prop("checked", true);
						
						else
							$("#inCorkEdit").prop("checked", false);
						
						if(data[i].inStoreKala=="on")
							$("#inKalaEdit").prop("checked", true);
						
						else
							$("#inKalaEdit").prop("checked", false);
						
						if(data[i].inStoreGalway=="on")
							$("#inGalwayEdit").prop("checked", true);
						
						else
							$("#inGalwayEdit").prop("checked", false);*/
						
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
						//document.getElementById("editCountCork").value = data[i].totalCork;
						//document.getElementById("editCountKala").value = data[i].totalKala;
						//document.getElementById("editCountGalway").value = data[i].totalGalway;
						
						if($('#hasSizesEdit').prop('checked')==false&&$('#hasColorsEdit').prop('checked')==false)
						{
							document.getElementById("editShowWarehouseSizes").style.display =  "none";
							//document.getElementById("editShowCorkSizes").style.display =  "none";
							//document.getElementById("editShowKalaSizes").style.display =  "none";
							//document.getElementById("editShowGalwaySizes").style.display =  "none";
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
							
							/*if($('#inCorkEdit').prop('checked')==true)
							{
								document.getElementById("editShowCorkSizes").style.display =  "block";
								document.getElementById("editCorkSizeS").value =  data[i].CorkSizeS;
								document.getElementById("editCorkSizeM").value =  data[i].CorkSizeM;
								document.getElementById("editCorkSizeL").value =  data[i].CorkSizeL;
								document.getElementById("editCorkSizeXL").value =  data[i].CorkSizeXL;
								document.getElementById("editCorkSize2XL").value =  data[i].CorkSize2XL;
								document.getElementById("editCorkSize3XL").value =  data[i].CorkSize3XL;
								document.getElementById("editCorkSize4XL").value =  data[i].CorkSize4XL;
							}
							
							if($('#inKalaEdit').prop('checked')==true)
							{
								document.getElementById("editShowKalaSizes").style.display =  "block";
								document.getElementById("editKalaSizeS").value =  data[i].KalaSizeS;
								document.getElementById("editKalaSizeM").value =  data[i].KalaSizeM;
								document.getElementById("editKalaSizeL").value =  data[i].KalaSizeL;
								document.getElementById("editKalaSizeXL").value =  data[i].KalaSizeXL;
								document.getElementById("editKalaSize2XL").value =  data[i].KalaSize2XL;
								document.getElementById("editKalaSize3XL").value =  data[i].KalaSize3XL;
								document.getElementById("editKalaSize4XL").value =  data[i].KalaSize4XL;
							}
							
							if($('#inGalwayEdit').prop('checked')==true)
							{
								document.getElementById("editShowGalwaySizes").style.display =  "block";
								document.getElementById("editGalwaySizeS").value =  data[i].GalwaySizeS;
								document.getElementById("editGalwaySizeM").value =  data[i].GalwaySizeM;
								document.getElementById("editGalwaySizeL").value =  data[i].GalwaySizeL;
								document.getElementById("editGalwaySizeXL").value =  data[i].GalwaySizeXL;
								document.getElementById("editGalwaySize2XL").value =  data[i].GalwaySize2XL;
								document.getElementById("editGalwaySize3XL").value =  data[i].GalwaySize3XL;
								document.getElementById("editGalwaySize4XL").value =  data[i].GalwaySize4XL;
							}*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork1'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork1' id='editSubCountCork1' value='"+data[i].color1CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala1'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala1' id='editSubCountKala1' value='"+data[i].color1KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway1'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway1' id='editSubCountGalway1' value='"+data[i].color1GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork2'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork2' id='editSubCountCork2' value='"+data[i].color2CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala2'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala2' id='editSubCountKala2' value='"+data[i].color2KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway2'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway2' id='editSubCountGalway2' value='"+data[i].color2GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork3'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork3' id='editSubCountCork3' value='"+data[i].color3CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala3'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala3' id='editSubCountKala3' value='"+data[i].color3KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway3'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway3' id='editSubCountGalway3' value='"+data[i].color3GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork4'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork4' id='editSubCountCork4' value='"+data[i].color4CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala4'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala4' id='editSubCountKala4' value='"+data[i].color4KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway4'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway4' id='editSubCountGalway4' value='"+data[i].color4GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork5'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork5' id='editSubCountCork5' value='"+data[i].color5CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala5'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala5' id='editSubCountKala5' value='"+data[i].color5KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway5'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway5' id='editSubCountGalway5' value='"+data[i].color5GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork6'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork6' id='editSubCountCork6' value='"+data[i].color6CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala6'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala6' id='editSubCountKala6' value='"+data[i].color6KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway6'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway6' id='editSubCountGalway6' value='"+data[i].color6GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork7'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork7' id='editSubCountCork7' value='"+data[i].color7CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala7'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala7' id='editSubCountKala7' value='"+data[i].color7KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway7'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway7' id='editSubCountGalway7' value='"+data[i].color7GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork8'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork8' id='editSubCountCork8' value='"+data[i].color8CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala8'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala8' id='editSubCountKala8' value='"+data[i].color8KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway8'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway8' id='editSubCountGalway8' value='"+data[i].color8GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork9'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork9' id='editSubCountCork9' value='"+data[i].color9CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala9'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala9' id='editSubCountKala9' value='"+data[i].color9KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway9'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway9' id='editSubCountGalway9' value='"+data[i].color9GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork10'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork10' id='editSubCountCork10' value='"+data[i].color10CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala10'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala10' id='editSubCountKala10' value='"+data[i].color10KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway10'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway10' id='editSubCountGalway10' value='"+data[i].color10GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork1'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork1' id='editSubCountCork1' value='"+data[i].color1CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala1'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala1' id='editSubCountKala1' value='"+data[i].color1KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway1'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway1' id='editSubCountGalway1' value='"+data[i].color1GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								/*formControl +=		"<div class='col-sm-3' id='editShowCorkSizes1' style='display: none'>"
								formControl +=			"<label for='storeSizesCork' class='control-label'>Cork Sizes</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeS1' id='editCorkSizeS1' value='"+data[i].color1CorkSizeS+"' onchange='updateEditTotals()'><label for='editCorkSizeS1'>:S</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeM1' id='editCorkSizeM1' value='"+data[i].color1CorkSizeM+"' onchange='updateEditTotals()'><label for='editCorkSizeM1'>:M</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeL1' id='editCorkSizeL1' value='"+data[i].color1CorkSizeL+"' onchange='updateEditTotals()'><label for='editCorkSizeL1'>:L</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeXL1' id='editCorkSizeXL1' value='"+data[i].color1CorkSizeXL+"' onchange='updateEditTotals()'><label for='editCorkSizeXL1'>:XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize2XL1' id='editCorkSize2XL1' value='"+data[i].color1CorkSize2XL+"' onchange='updateEditTotals()'><label for='editCorkSize2XL1'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize3XL1' id='editCorkSize3XL1' value='"+data[i].color1CorkSize3XL+"' onchange='updateEditTotals()'><label for='editCorkSize3XL1'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize4XL1' id='editCorkSize4XL1' value='"+data[i].color1CorkSize4XL+"' onchange='updateEditTotals()'><label for='editCorkSize4XL1'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowKalaSizes1' style='display: none'>"
								formControl +=			"<label for='storeSizesKala' class='control-label'>Kala Sizes</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeS1' id='editKalaSizeS1' value='"+data[i].color1KalaSizeS+"' onchange='updateEditTotals()'><label for='editKalaSizeS1'>:S</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeM1' id='editKalaSizeM1' value='"+data[i].color1KalaSizeM+"' onchange='updateEditTotals()'><label for='editKalaSizeM1'>:M</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeL1' id='editKalaSizeL1' value='"+data[i].color1KalaSizeL+"' onchange='updateEditTotals()'><label for='editKalaSizeL1'>:L</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeXL1' id='editKalaSizeXL1' value='"+data[i].color1KalaSizeXL+"' onchange='updateEditTotals()'><label for='editKalaSizeXL1'>:XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize2XL1' id='editKalaSize2XL1' value='"+data[i].color1KalaSize2XL+"' onchange='updateEditTotals()'><label for='editKalaSize2XL1'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize3XL1' id='editKalaSize3XL1' value='"+data[i].color1KalaSize3XL+"' onchange='updateEditTotals()'><label for='editKalaSize3XL1'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize4XL1' id='editKalaSize4XL1' value='"+data[i].color1KalaSize4XL+"' onchange='updateEditTotals()'><label for='editKalaSize4XL1'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowGalwaySizes1' style='display: none'>"
								formControl +=			"<label for='storeSizesGalway' class='control-label'>Galway Sizes</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeS1' id='editGalwaySizeS1' value='"+data[i].color1GalwaySizeS+"' onchange='updateEditTotals()'><label for='editGalwaySizeS1'>:S</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeM1' id='editGalwaySizeM1' value='"+data[i].color1GalwaySizeM+"' onchange='updateEditTotals()'><label for='editGalwaySizeM1'>:M</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeL1' id='editGalwaySizeL1' value='"+data[i].color1GalwaySizeL+"' onchange='updateEditTotals()'><label for='editGalwaySizeL1'>:L</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeXL1' id='editGalwaySizeXL1' value='"+data[i].color1GalwaySizeXL+"' onchange='updateEditTotals()'><label for='editGalwaySizeXL1'>:XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize2XL1' id='editGalwaySize2XL1' value='"+data[i].color1GalwaySize2XL+"' onchange='updateEditTotals()'><label for='editGalwaySize2XL1'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize3XL1' id='editGalwaySize3XL1' value='"+data[i].color1GalwaySize3XL+"' onchange='updateEditTotals()'><label for='editGalwaySize3XL1'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize4XL1' id='editGalwaySize4XL1' value='"+data[i].color1GalwaySize4XL+"' onchange='updateEditTotals()'><label for='editGalwaySize4XL1'>:4XL</label><br>"
								formControl +=		"</div>"*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork2'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork2' id='editSubCountCork2' value='"+data[i].color2CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala2'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala2' id='editSubCountKala2' value='"+data[i].color2KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway2'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway2' id='editSubCountGalway2' value='"+data[i].color2GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								formControl +=		/*"<div class='col-sm-3' id='editShowCorkSizes2' style='display: none'>"
								formControl +=			"<label for='storeSizesCork' class='control-label'>Cork Sizes</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeS2' id='editCorkSizeS2' value='"+data[i].color2CorkSizeS+"' onchange='updateEditTotals()'><label for='editCorkSizeS2'>:S</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeM2' id='editCorkSizeM2' value='"+data[i].color2CorkSizeM+"' onchange='updateEditTotals()'><label for='editCorkSizeM2'>:M</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeL2' id='editCorkSizeL2' value='"+data[i].color2CorkSizeL+"' onchange='updateEditTotals()'><label for='editCorkSizeL2'>:L</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeXL2' id='editCorkSizeXL2' value='"+data[i].color2CorkSizeXL+"' onchange='updateEditTotals()'><label for='editCorkSizeXL2'>:XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize2XL2' id='editCorkSize2XL2' value='"+data[i].color2CorkSize2XL+"' onchange='updateEditTotals()'><label for='editCorkSize2XL2'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize3XL2' id='editCorkSize3XL2' value='"+data[i].color2CorkSize3XL+"' onchange='updateEditTotals()'><label for='editCorkSize3XL2'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize4XL2' id='editCorkSize4XL2' value='"+data[i].color2CorkSize4XL+"' onchange='updateEditTotals()'><label for='editCorkSize4XL2'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowKalaSizes2' style='display: none'>"
								formControl +=			"<label for='storeSizesKala' class='control-label'>Kala Sizes</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeS2' id='editKalaSizeS2' value='"+data[i].color2KalaSizeS+"' onchange='updateEditTotals()'><label for='editKalaSizeS2'>:S</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeM2' id='editKalaSizeM2' value='"+data[i].color2KalaSizeM+"' onchange='updateEditTotals()'><label for='editKalaSizeM2'>:M</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeL2' id='editKalaSizeL2' value='"+data[i].color2KalaSizeL+"' onchange='updateEditTotals()'><label for='editKalaSizeL2'>:L</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeXL2' id='editKalaSizeXL2' value='"+data[i].color2KalaSizeXL+"' onchange='updateEditTotals()'><label for='editKalaSizeXL2'>:XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize2XL2' id='editKalaSize2XL2' value='"+data[i].color2KalaSize2XL+"' onchange='updateEditTotals()'><label for='editKalaSize2XL2'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize3XL2' id='editKalaSize3XL2' value='"+data[i].color2KalaSize3XL+"' onchange='updateEditTotals()'><label for='editKalaSize3XL2'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize4XL2' id='editKalaSize4XL2' value='"+data[i].color2KalaSize4XL+"' onchange='updateEditTotals()'><label for='editKalaSize4XL2'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowGalwaySizes2' style='display: none'>"
								formControl +=			"<label for='storeSizesGalway' class='control-label'>Galway Sizes</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeS2' id='editGalwaySizeS2' value='"+data[i].color2GalwaySizeS+"' onchange='updateEditTotals()'><label for='editGalwaySizeS2'>:S</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeM2' id='editGalwaySizeM2' value='"+data[i].color2GalwaySizeM+"' onchange='updateEditTotals()'><label for='editGalwaySizeM2'>:M</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeL2' id='editGalwaySizeL2' value='"+data[i].color2GalwaySizeL+"' onchange='updateEditTotals()'><label for='editGalwaySizeL2'>:L</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeXL2' id='editGalwaySizeXL2' value='"+data[i].color2GalwaySizeXL+"' onchange='updateEditTotals()'><label for='editGalwaySizeXL2'>:XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize2XL2' id='editGalwaySize2XL2' value='"+data[i].color2GalwaySize2XL+"' onchange='updateEditTotals()'><label for='editGalwaySize2XL2'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize3XL2' id='editGalwaySize3XL2' value='"+data[i].color2GalwaySize3XL+"' onchange='updateEditTotals()'><label for='editGalwaySize3XL2'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize4XL2' id='editGalwaySize4XL2' value='"+data[i].color2GalwaySize4XL+"' onchange='updateEditTotals()'><label for='editGalwaySize4XL2'>:4XL</label><br>"
								formControl +=		"</div>"*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork3'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork3' id='editSubCountCork3' value='"+data[i].color3CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala3'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala3' id='editSubCountKala3' value='"+data[i].color3KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway3'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway3' id='editSubCountGalway3' value='"+data[i].color3GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								/*formControl +=		"<div class='col-sm-3' id='editShowCorkSizes3' style='display: none'>"
								formControl +=			"<label for='storeSizesCork' class='control-label'>Cork Sizes</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeS3' id='editCorkSizeS3' value='"+data[i].color3CorkSizeS+"' onchange='updateEditTotals()'><label for='editCorkSizeS3'>:S</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeM3' id='editCorkSizeM3' value='"+data[i].color3CorkSizeM+"' onchange='updateEditTotals()'><label for='editCorkSizeM3'>:M</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeL3' id='editCorkSizeL3' value='"+data[i].color3CorkSizeL+"' onchange='updateEditTotals()'><label for='editCorkSizeL3'>:L</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeXL3' id='editCorkSizeXL3' value='"+data[i].color3CorkSizeXL+"' onchange='updateEditTotals()'><label for='editCorkSizeXL1'>:XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize2XL3' id='editCorkSize2XL3' value='"+data[i].color3CorkSize2XL+"' onchange='updateEditTotals()'><label for='editCorkSize2XL3'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize3XL3' id='editCorkSize3XL3' value='"+data[i].color3CorkSize3XL+"' onchange='updateEditTotals()'><label for='editCorkSize3XL3'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize4XL3' id='editCorkSize4XL3' value='"+data[i].color3CorkSize4XL+"' onchange='updateEditTotals()'><label for='editCorkSize4XL3'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowKalaSizes3' style='display: none'>"
								formControl +=			"<label for='storeSizesKala' class='control-label'>Kala Sizes</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeS3' id='editKalaSizeS3' value='"+data[i].color3KalaSizeS+"' onchange='updateEditTotals()'><label for='editKalaSizeS3'>:S</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeM3' id='editKalaSizeM3' value='"+data[i].color3KalaSizeM+"' onchange='updateEditTotals()'><label for='editKalaSizeM3'>:M</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeL3' id='editKalaSizeL3' value='"+data[i].color3KalaSizeL+"' onchange='updateEditTotals()'><label for='editKalaSizeL3'>:L</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeXL3' id='editKalaSizeXL3' value='"+data[i].color3KalaSizeXL+"' onchange='updateEditTotals()'><label for='editKalaSizeXL3'>:XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize2XL3' id='editKalaSize2XL3' value='"+data[i].color3KalaSize2XL+"' onchange='updateEditTotals()'><label for='editKalaSize2XL3'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize3XL3' id='editKalaSize3XL3' value='"+data[i].color3KalaSize3XL+"' onchange='updateEditTotals()'><label for='editKalaSize3XL3'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize4XL3' id='editKalaSize4XL3' value='"+data[i].color3KalaSize4XL+"' onchange='updateEditTotals()'><label for='editKalaSize4XL3'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowGalwaySizes3' style='display: none'>"
								formControl +=			"<label for='storeSizesGalway' class='control-label'>Galway Sizes</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeS3' id='editGalwaySizeS3' value='"+data[i].color3GalwaySizeS+"' onchange='updateEditTotals()'><label for='editGalwaySizeS3'>:S</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeM3' id='editGalwaySizeM3' value='"+data[i].color3GalwaySizeM+"' onchange='updateEditTotals()'><label for='editGalwaySizeM3'>:M</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeL3' id='editGalwaySizeL3' value='"+data[i].color3GalwaySizeL+"' onchange='updateEditTotals()'><label for='editGalwaySizeL3'>:L</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeXL3' id='editGalwaySizeXL3' value='"+data[i].color3GalwaySizeXL+"' onchange='updateEditTotals()'><label for='editGalwaySizeXL3'>:XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize2XL3' id='editGalwaySize2XL3' value='"+data[i].color3GalwaySize2XL+"' onchange='updateEditTotals()'><label for='editGalwaySize2XL3'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize3XL3' id='editGalwaySize3XL3' value='"+data[i].color3GalwaySize3XL+"' onchange='updateEditTotals()'><label for='editGalwaySize3XL3'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize4XL3' id='editGalwaySize4XL3' value='"+data[i].color3GalwaySize4XL+"' onchange='updateEditTotals()'><label for='editGalwaySize4XL3'>:4XL</label><br>"
								formControl +=		"</div>"*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork4'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork4' id='editSubCountCork4' value='"+data[i].color4CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala4'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala4' id='editSubCountKala4' value='"+data[i].color4KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway4'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway4' id='editSubCountGalway4' value='"+data[i].color4GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								/*formControl +=		"<div class='col-sm-3' id='editShowCorkSizes4' style='display: none'>"
								formControl +=			"<label for='storeSizesCork' class='control-label'>Cork Sizes</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeS4' id='editCorkSizeS4' value='"+data[i].color4CorkSizeS+"' onchange='updateEditTotals()'><label for='editCorkSizeS4'>:S</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeM4' id='editCorkSizeM4' value='"+data[i].color4CorkSizeM+"' onchange='updateEditTotals()'><label for='editCorkSizeM4'>:M</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeL4' id='editCorkSizeL4' value='"+data[i].color4CorkSizeL+"' onchange='updateEditTotals()'><label for='editCorkSizeL4'>:L</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeXL4' id='editCorkSizeXL4' value='"+data[i].color4CorkSizeXL+"' onchange='updateEditTotals()'><label for='editCorkSizeXL4'>:XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize2XL4' id='editCorkSize2XL4' value='"+data[i].color4CorkSize2XL+"' onchange='updateEditTotals()'><label for='editCorkSize2XL4'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize3XL4' id='editCorkSize3XL4' value='"+data[i].color4CorkSize3XL+"' onchange='updateEditTotals()'><label for='editCorkSize3XL4'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize4XL4' id='editCorkSize4XL4' value='"+data[i].color4CorkSize4XL+"' onchange='updateEditTotals()'><label for='editCorkSize4XL4'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowKalaSizes4' style='display: none'>"
								formControl +=			"<label for='storeSizesKala' class='control-label'>Kala Sizes</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeS4' id='editKalaSizeS4' value='"+data[i].color4KalaSizeS+"' onchange='updateEditTotals()'><label for='editKalaSizeS4'>:S</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeM4' id='editKalaSizeM4' value='"+data[i].color4KalaSizeM+"' onchange='updateEditTotals()'><label for='editKalaSizeM4'>:M</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeL4' id='editKalaSizeL4' value='"+data[i].color4KalaSizeL+"' onchange='updateEditTotals()'><label for='editKalaSizeL4'>:L</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeXL4' id='editKalaSizeXL4' value='"+data[i].color4KalaSizeXL+"' onchange='updateEditTotals()'><label for='editKalaSizeXL4'>:XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize2XL4' id='editKalaSize2XL4' value='"+data[i].color4KalaSize2XL+"' onchange='updateEditTotals()'><label for='editKalaSize2XL4'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize3XL4' id='editKalaSize3XL4' value='"+data[i].color4KalaSize3XL+"' onchange='updateEditTotals()'><label for='editKalaSize3XL4'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize4XL4' id='editKalaSize4XL4' value='"+data[i].color4KalaSize4XL+"' onchange='updateEditTotals()'><label for='editKalaSize4XL4'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowGalwaySizes4' style='display: none'>"
								formControl +=			"<label for='storeSizesGalway' class='control-label'>Galway Sizes</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeS4' id='editGalwaySizeS4' value='"+data[i].color4GalwaySizeS+"' onchange='updateEditTotals()'><label for='editGalwaySizeS4'>:S</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeM4' id='editGalwaySizeM4' value='"+data[i].color4GalwaySizeM+"' onchange='updateEditTotals()'><label for='editGalwaySizeM4'>:M</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeL4' id='editGalwaySizeL4' value='"+data[i].color4GalwaySizeL+"' onchange='updateEditTotals()'><label for='editGalwaySizeL4'>:L</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeXL4' id='editGalwaySizeXL4' value='"+data[i].color4GalwaySizeXL+"' onchange='updateEditTotals()'><label for='editGalwaySizeXL4'>:XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize2XL4' id='editGalwaySize2XL4' value='"+data[i].color4GalwaySize2XL+"' onchange='updateEditTotals()'><label for='editGalwaySize2XL4'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize3XL4' id='editGalwaySize3XL4' value='"+data[i].color4GalwaySize3XL+"' onchange='updateEditTotals()'><label for='editGalwaySize3XL4'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize4XL4' id='editGalwaySize4XL4' value='"+data[i].color4GalwaySize4XL+"' onchange='updateEditTotals()'><label for='editGalwaySize4XL4'>:4XL</label><br>"
								formControl +=		"</div>"*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork5'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork5' id='editSubCountCork5' value='"+data[i].color5CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala5'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala5' id='editSubCountKala5' value='"+data[i].color5KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway5'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway5' id='editSubCountGalway5' value='"+data[i].color5GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								/*formControl +=		"<div class='col-sm-3' id='editShowCorkSizes5' style='display: none'>"
								formControl +=			"<label for='storeSizesCork' class='control-label'>Cork Sizes</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeS5' id='editCorkSizeS5' value='"+data[i].color5CorkSizeS+"' onchange='updateEditTotals()'><label for='editCorkSizeS5'>:S</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeM5' id='editCorkSizeM5' value='"+data[i].color5CorkSizeM+"' onchange='updateEditTotals()'><label for='editCorkSizeM5'>:M</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeL5' id='editCorkSizeL5' value='"+data[i].color5CorkSizeL+"' onchange='updateEditTotals()'><label for='editCorkSizeL5'>:L</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeXL5' id='editCorkSizeXL5' value='"+data[i].color5CorkSizeXL+"' onchange='updateEditTotals()'><label for='editCorkSizeXL5'>:XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize2XL5' id='editCorkSize2XL5' value='"+data[i].color5CorkSize2XL+"' onchange='updateEditTotals()'><label for='editCorkSize2XL5'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize3XL5' id='editCorkSize3XL5' value='"+data[i].color5CorkSize3XL+"' onchange='updateEditTotals()'><label for='editCorkSize3XL5'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize4XL5' id='editCorkSize4XL5' value='"+data[i].color5CorkSize4XL+"' onchange='updateEditTotals()'><label for='editCorkSize4XL5'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowKalaSizes5' style='display: none'>"
								formControl +=			"<label for='storeSizesKala' class='control-label'>Kala Sizes</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeS5' id='editKalaSizeS5' value='"+data[i].color5KalaSizeS+"' onchange='updateEditTotals()'><label for='editKalaSizeS5'>:S</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeM5' id='editKalaSizeM5' value='"+data[i].color5KalaSizeM+"' onchange='updateEditTotals()'><label for='editKalaSizeM5'>:M</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeL5' id='editKalaSizeL5' value='"+data[i].color5KalaSizeL+"' onchange='updateEditTotals()'><label for='editKalaSizeL5'>:L</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeXL5' id='editKalaSizeXL5' value='"+data[i].color5KalaSizeXL+"' onchange='updateEditTotals()'><label for='editKalaSizeXL5'>:XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize2XL5' id='editKalaSize2XL5' value='"+data[i].color5KalaSize2XL+"' onchange='updateEditTotals()'><label for='editKalaSize2XL5'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize3XL5' id='editKalaSize3XL5' value='"+data[i].color5KalaSize3XL+"' onchange='updateEditTotals()'><label for='editKalaSize3XL5'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize4XL5' id='editKalaSize4XL5' value='"+data[i].color5KalaSize4XL+"' onchange='updateEditTotals()'><label for='editKalaSize4XL5'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowGalwaySizes5' style='display: none'>"
								formControl +=			"<label for='storeSizesGalway' class='control-label'>Galway Sizes</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeS5' id='editGalwaySizeS5' value='"+data[i].color5GalwaySizeS+"' onchange='updateEditTotals()'><label for='editGalwaySizeS5'>:S</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeM5' id='editGalwaySizeM5' value='"+data[i].color5GalwaySizeM+"' onchange='updateEditTotals()'><label for='editGalwaySizeM5'>:M</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeL5' id='editGalwaySizeL5' value='"+data[i].color5GalwaySizeL+"' onchange='updateEditTotals()'><label for='editGalwaySizeL5'>:L</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeXL5' id='editGalwaySizeXL5' value='"+data[i].color5GalwaySizeXL+"' onchange='updateEditTotals()'><label for='editGalwaySizeXL5'>:XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize2XL5' id='editGalwaySize2XL5' value='"+data[i].color5GalwaySize2XL+"' onchange='updateEditTotals()'><label for='editGalwaySize2XL5'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize3XL5' id='editGalwaySize3XL5' value='"+data[i].color5GalwaySize3XL+"' onchange='updateEditTotals()'><label for='editGalwaySize3XL5'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize4XL5' id='editGalwaySize4XL5' value='"+data[i].color5GalwaySize4XL+"' onchange='updateEditTotals()'><label for='editGalwaySize4XL5'>:4XL</label><br>"
								formControl +=		"</div>"*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork6'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork6' id='editSubCountCork6' value='"+data[i].color6CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala6'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala6' id='editSubCountKala6' value='"+data[i].color6KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway6'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway6' id='editSubCountGalway6' value='"+data[i].color6GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								/*formControl +=		"<div class='col-sm-3' id='editShowCorkSizes6' style='display: none'>"
								formControl +=			"<label for='storeSizesCork' class='control-label'>Cork Sizes</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeS6' id='editCorkSizeS6' value='"+data[i].color6CorkSizeS+"' onchange='updateEditTotals()'><label for='editCorkSizeS6'>:S</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeM6' id='editCorkSizeM6' value='"+data[i].color6CorkSizeM+"' onchange='updateEditTotals()'><label for='editCorkSizeM6'>:M</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeL6' id='editCorkSizeL6' value='"+data[i].color6CorkSizeL+"' onchange='updateEditTotals()'><label for='editCorkSizeL6'>:L</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeXL6' id='editCorkSizeXL6' value='"+data[i].color6CorkSizeXL+"' onchange='updateEditTotals()'><label for='editCorkSizeXL6'>:XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize2XL6' id='editCorkSize2XL6' value='"+data[i].color6CorkSize2XL+"' onchange='updateEditTotals()'><label for='editCorkSize2XL6'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize3XL6' id='editCorkSize3XL6' value='"+data[i].color6CorkSize3XL+"' onchange='updateEditTotals()'><label for='editCorkSize3XL6'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize4XL6' id='editCorkSize4XL6' value='"+data[i].color6CorkSize4XL+"' onchange='updateEditTotals()'><label for='editCorkSize4XL6'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowKalaSizes6' style='display: none'>"
								formControl +=			"<label for='storeSizesKala' class='control-label'>Kala Sizes</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeS6' id='editKalaSizeS6' value='"+data[i].color6KalaSizeS+"' onchange='updateEditTotals()'><label for='editKalaSizeS6'>:S</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeM6' id='editKalaSizeM6' value='"+data[i].color6KalaSizeM+"' onchange='updateEditTotals()'><label for='editKalaSizeM6'>:M</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeL6' id='editKalaSizeL6' value='"+data[i].color6KalaSizeL+"' onchange='updateEditTotals()'><label for='editKalaSizeL6'>:L</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeXL6' id='editKalaSizeXL6' value='"+data[i].color6KalaSizeXL+"' onchange='updateEditTotals()'><label for='editKalaSizeXL6'>:XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize2XL6' id='editKalaSize2XL6' value='"+data[i].color6KalaSize2XL+"' onchange='updateEditTotals()'><label for='editKalaSize2XL6'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize3XL6' id='editKalaSize3XL6' value='"+data[i].color6KalaSize3XL+"' onchange='updateEditTotals()'><label for='editKalaSize3XL6'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize4XL6' id='editKalaSize4XL6' value='"+data[i].color6KalaSize4XL+"' onchange='updateEditTotals()'><label for='editKalaSize4XL6'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowGalwaySizes6' style='display: none'>"
								formControl +=			"<label for='storeSizesGalway' class='control-label'>Galway Sizes</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeS6' id='editGalwaySizeS6' value='"+data[i].color6GalwaySizeS+"' onchange='updateEditTotals()'><label for='editGalwaySizeS6'>:S</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeM6' id='editGalwaySizeM6' value='"+data[i].color6GalwaySizeM+"' onchange='updateEditTotals()'><label for='editGalwaySizeM6'>:M</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeL6' id='editGalwaySizeL6' value='"+data[i].color6GalwaySizeL+"' onchange='updateEditTotals()'><label for='editGalwaySizeL6'>:L</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeXL6' id='editGalwaySizeXL6' value='"+data[i].color6GalwaySizeXL+"' onchange='updateEditTotals()'><label for='editGalwaySizeXL6'>:XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize2XL6' id='editGalwaySize2XL6' value='"+data[i].color6GalwaySize2XL+"' onchange='updateEditTotals()'><label for='editGalwaySize2XL6'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize3XL6' id='editGalwaySize3XL6' value='"+data[i].color6GalwaySize3XL+"' onchange='updateEditTotals()'><label for='editGalwaySize3XL6'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize4XL6' id='editGalwaySize4XL6' value='"+data[i].color6GalwaySize4XL+"' onchange='updateEditTotals()'><label for='editGalwaySize4XL6'>:4XL</label><br>"
								formControl +=		"</div>"*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork7'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork7' id='editSubCountCork7' value='"+data[i].color7CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala7'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala7' id='editSubCountKala7' value='"+data[i].color7KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway7'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway7' id='editSubCountGalway7' value='"+data[i].color7GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								/*formControl +=		"<div class='col-sm-3' id='editShowCorkSizes7' style='display: none'>"
								formControl +=			"<label for='storeSizesCork' class='control-label'>Cork Sizes</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeS7' id='editCorkSizeS7' value='"+data[i].color7CorkSizeS+"' onchange='updateEditTotals()'><label for='editCorkSizeS7'>:S</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeM7' id='editCorkSizeM7' value='"+data[i].color7CorkSizeM+"' onchange='updateEditTotals()'><label for='editCorkSizeM7'>:M</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeL7' id='editCorkSizeL7' value='"+data[i].color7CorkSizeL+"' onchange='updateEditTotals()'><label for='editCorkSizeL7'>:L</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeXL7' id='editCorkSizeXL7' value='"+data[i].color7CorkSizeXL+"' onchange='updateEditTotals()'><label for='editCorkSizeXL7'>:XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize2XL7' id='editCorkSize2XL7' value='"+data[i].color7CorkSize2XL+"' onchange='updateEditTotals()'><label for='editCorkSize2XL7'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize3XL7' id='editCorkSize3XL7' value='"+data[i].color7CorkSize3XL+"' onchange='updateEditTotals()'><label for='editCorkSize3XL7'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize4XL7' id='editCorkSize4XL7' value='"+data[i].color7CorkSize4XL+"' onchange='updateEditTotals()'><label for='editCorkSize4XL7'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowKalaSizes7' style='display: none'>"
								formControl +=			"<label for='storeSizesKala' class='control-label'>Kala Sizes</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeS7' id='editKalaSizeS7' value='"+data[i].color7KalaSizeS+"' onchange='updateEditTotals()'><label for='editKalaSizeS7'>:S</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeM7' id='editKalaSizeM7' value='"+data[i].color7KalaSizeM+"' onchange='updateEditTotals()'><label for='editKalaSizeM7'>:M</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeL7' id='editKalaSizeL7' value='"+data[i].color7KalaSizeL+"' onchange='updateEditTotals()'><label for='editKalaSizeL7'>:L</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeXL7' id='editKalaSizeXL7' value='"+data[i].color7KalaSizeXL+"' onchange='updateEditTotals()'><label for='editKalaSizeXL7'>:XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize2XL7' id='editKalaSize2XL7' value='"+data[i].color7KalaSize2XL+"' onchange='updateEditTotals()'><label for='editKalaSize2XL7'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize3XL7' id='editKalaSize3XL7' value='"+data[i].color7KalaSize3XL+"' onchange='updateEditTotals()'><label for='editKalaSize3XL7'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize4XL7' id='editKalaSize4XL7' value='"+data[i].color7KalaSize4XL+"' onchange='updateEditTotals()'><label for='editKalaSize4XL7'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowGalwaySizes7' style='display: none'>"
								formControl +=			"<label for='storeSizesGalway' class='control-label'>Galway Sizes</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeS7' id='editGalwaySizeS7' value='"+data[i].color7GalwaySizeS+"' onchange='updateEditTotals()'><label for='editGalwaySizeS7'>:S</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeM7' id='editGalwaySizeM7' value='"+data[i].color7GalwaySizeM+"' onchange='updateEditTotals()'><label for='editGalwaySizeM7'>:M</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeL7' id='editGalwaySizeL7' value='"+data[i].color7GalwaySizeL+"' onchange='updateEditTotals()'><label for='editGalwaySizeL7'>:L</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeXL7' id='editGalwaySizeXL7' value='"+data[i].color7GalwaySizeXL+"' onchange='updateEditTotals()'><label for='editGalwaySizeXL7'>:XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize2XL7' id='editGalwaySize2XL7' value='"+data[i].color7GalwaySize2XL+"' onchange='updateEditTotals()'><label for='editGalwaySize2XL7'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize3XL7' id='editGalwaySize3XL7' value='"+data[i].color7GalwaySize3XL+"' onchange='updateEditTotals()'><label for='editGalwaySize3XL7'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize4XL7' id='editGalwaySize4XL7' value='"+data[i].color7GalwaySize4XL+"' onchange='updateEditTotals()'><label for='editGalwaySize4XL7'>:4XL</label><br>"
								formControl +=		"</div>"*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork8'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork8' id='editSubCountCork8' value='"+data[i].color8CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala8'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala8' id='editSubCountKala8' value='"+data[i].color8KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway8'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway8' id='editSubCountGalway8' value='"+data[i].color8GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								/*formControl +=		"<div class='col-sm-3' id='editShowCorkSizes8' style='display: none'>"
								formControl +=			"<label for='storeSizesCork' class='control-label'>Cork Sizes</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeS8' id='editCorkSizeS8' value='"+data[i].color8CorkSizeS+"' onchange='updateEditTotals()'><label for='editCorkSizeS8'>:S</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeM8' id='editCorkSizeM8' value='"+data[i].color8CorkSizeM+"' onchange='updateEditTotals()'><label for='editCorkSizeM8'>:M</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeL8' id='editCorkSizeL8' value='"+data[i].color8CorkSizeL+"' onchange='updateEditTotals()'><label for='editCorkSizeL8'>:L</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeXL8' id='editCorkSizeXL8' value='"+data[i].color8CorkSizeXL+"' onchange='updateEditTotals()'><label for='editCorkSizeXL8'>:XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize2XL8' id='editCorkSize2XL8' value='"+data[i].color8CorkSize2XL+"' onchange='updateEditTotals()'><label for='editCorkSize2XL8'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize3XL8' id='editCorkSize3XL8' value='"+data[i].color8CorkSize3XL+"' onchange='updateEditTotals()'><label for='editCorkSize3XL8'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize4XL8' id='editCorkSize4XL8' value='"+data[i].color8CorkSize4XL+"' onchange='updateEditTotals()'><label for='editCorkSize4XL8'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowKalaSizes8' style='display: none'>"
								formControl +=			"<label for='storeSizesKala' class='control-label'>Kala Sizes</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeS8' id='editKalaSizeS8' value='"+data[i].color8KalaSizeS+"' onchange='updateEditTotals()'><label for='editKalaSizeS8'>:S</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeM8' id='editKalaSizeM8' value='"+data[i].color8KalaSizeM+"' onchange='updateEditTotals()'><label for='editKalaSizeM8'>:M</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeL8' id='editKalaSizeL8' value='"+data[i].color8KalaSizeL+"' onchange='updateEditTotals()'><label for='editKalaSizeL8'>:L</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeXL8' id='editKalaSizeXL8' value='"+data[i].color8KalaSizeXL+"' onchange='updateEditTotals()'><label for='editKalaSizeXL8'>:XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize2XL8' id='editKalaSize2XL8' value='"+data[i].color8KalaSize2XL+"' onchange='updateEditTotals()'><label for='editKalaSize2XL8'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize3XL8' id='editKalaSize3XL8' value='"+data[i].color8KalaSize3XL+"' onchange='updateEditTotals()'><label for='editKalaSize3XL8'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize4XL8' id='editKalaSize4XL8' value='"+data[i].color8KalaSize4XL+"' onchange='updateEditTotals()'><label for='editKalaSize4XL8'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowGalwaySizes8' style='display: none'>"
								formControl +=			"<label for='storeSizesGalway' class='control-label'>Galway Sizes</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeS8' id='editGalwaySizeS8' value='"+data[i].color8GalwaySizeS+"' onchange='updateEditTotals()'><label for='editGalwaySizeS8'>:S</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeM8' id='editGalwaySizeM8' value='"+data[i].color8GalwaySizeM+"' onchange='updateEditTotals()'><label for='editGalwaySizeM8'>:M</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeL8' id='editGalwaySizeL8' value='"+data[i].color8GalwaySizeL+"' onchange='updateEditTotals()'><label for='editGalwaySizeL8'>:L</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeXL8' id='editGalwaySizeXL8' value='"+data[i].color8GalwaySizeXL+"' onchange='updateEditTotals()'><label for='editGalwaySizeXL8'>:XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize2XL8' id='editGalwaySize2XL8' value='"+data[i].color8GalwaySize2XL+"' onchange='updateEditTotals()'><label for='editGalwaySize2XL8'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize3XL8' id='editGalwaySize3XL8' value='"+data[i].color8GalwaySize3XL+"' onchange='updateEditTotals()'><label for='editGalwaySize3XL8'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize4XL8' id='editGalwaySize4XL8' value='"+data[i].color8GalwaySize4XL+"' onchange='updateEditTotals()'><label for='editGalwaySize4XL8'>:4XL</label><br>"
								formControl +=		"</div>"*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork9'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork9' id='editSubCountCork9' value='"+data[i].color9CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala9'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala9' id='editSubCountKala9' value='"+data[i].color9KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway9'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway9' id='editSubCountGalway9' value='"+data[i].color9GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								/*formControl +=		"<div class='col-sm-3' id='editShowCorkSizes9' style='display: none'>"
								formControl +=			"<label for='storeSizesCork' class='control-label'>Cork Sizes</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeS9' id='editCorkSizeS9' value='"+data[i].color9CorkSizeS+"' onchange='updateEditTotals()'><label for='editCorkSizeS9'>:S</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeM9' id='editCorkSizeM9' value='"+data[i].color9CorkSizeM+"' onchange='updateEditTotals()'><label for='editCorkSizeM9'>:M</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeL9' id='editCorkSizeL9' value='"+data[i].color9CorkSizeL+"' onchange='updateEditTotals()'><label for='editCorkSizeL9'>:L</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeXL9' id='editCorkSizeXL9' value='"+data[i].color9CorkSizeXL+"' onchange='updateEditTotals()'><label for='editCorkSizeXL9'>:XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize2XL9' id='editCorkSize2XL9' value='"+data[i].color9CorkSize2XL+"' onchange='updateEditTotals()'><label for='editCorkSize2XL9'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize3XL9' id='editCorkSize3XL9' value='"+data[i].color9CorkSize3XL+"' onchange='updateEditTotals()'><label for='editCorkSize3XL9'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize4XL9' id='editCorkSize4XL9' value='"+data[i].color9CorkSize4XL+"' onchange='updateEditTotals()'><label for='editCorkSize4XL9'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowKalaSizes9' style='display: none'>"
								formControl +=			"<label for='storeSizesKala' class='control-label'>Kala Sizes</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeS9' id='editKalaSizeS9' value='"+data[i].color9KalaSizeS+"' onchange='updateEditTotals()'><label for='editKalaSizeS9'>:S</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeM9' id='editKalaSizeM9' value='"+data[i].color9KalaSizeM+"' onchange='updateEditTotals()'><label for='editKalaSizeM9'>:M</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeL9' id='editKalaSizeL9' value='"+data[i].color9KalaSizeL+"' onchange='updateEditTotals()'><label for='editKalaSizeL9'>:L</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeXL9' id='editKalaSizeXL9' value='"+data[i].color9KalaSizeXL+"' onchange='updateEditTotals()'><label for='editKalaSizeXL9'>:XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize2XL9' id='editKalaSize2XL9' value='"+data[i].color9KalaSize2XL+"' onchange='updateEditTotals()'><label for='editKalaSize2XL9'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize3XL9' id='editKalaSize3XL9' value='"+data[i].color9KalaSize3XL+"' onchange='updateEditTotals()'><label for='editKalaSize3XL9'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize4XL9' id='editKalaSize4XL9' value='"+data[i].color9KalaSize4XL+"' onchange='updateEditTotals()'><label for='editKalaSize4XL9'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowGalwaySizes9' style='display: none'>"
								formControl +=			"<label for='storeSizesGalway' class='control-label'>Galway Sizes</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeS9' id='editGalwaySizeS9' value='"+data[i].color9GalwaySizeS+"' onchange='updateEditTotals()'><label for='editGalwaySizeS9'>:S</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeM9' id='editGalwaySizeM9' value='"+data[i].color9GalwaySizeM+"' onchange='updateEditTotals()'><label for='editGalwaySizeM9'>:M</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeL9' id='editGalwaySizeL9' value='"+data[i].color9GalwaySizeL+"' onchange='updateEditTotals()'><label for='editGalwaySizeL9'>:L</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeXL9' id='editGalwaySizeXL9' value='"+data[i].color9GalwaySizeXL+"' onchange='updateEditTotals()'><label for='editGalwaySizeXL9'>:XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize2XL9' id='editGalwaySize2XL9' value='"+data[i].color9GalwaySize2XL+"' onchange='updateEditTotals()'><label for='editGalwaySize2XL9'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize3XL9' id='editGalwaySize3XL9' value='"+data[i].color9GalwaySize3XL+"' onchange='updateEditTotals()'><label for='editGalwaySize3XL9'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize4XL9' id='editGalwaySize4XL9' value='"+data[i].color9GalwaySize4XL+"' onchange='updateEditTotals()'><label for='editGalwaySize4XL9'>:4XL</label><br>"
								formControl +=		"</div>"*/
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
								/*formControl += "<div class='col-sm-2' id='editShowSubCork10'>"
								formControl += "<p>Cork</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork10' id='editSubCountCork10' value='"+data[i].color10CorkTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubKala10'>"
								formControl += "<p>Kala</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala10' id='editSubCountKala10' value='"+data[i].color10KalaTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "<div class='col-sm-2' id='editShowSubGalway10'>"
								formControl += "<p>Galway</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway10' id='editSubCountGalway10' value='"+data[i].color10GalwayTotal+"'' onchange='updateEditTotals()'>"
								formControl += "</div>"*/
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
								/*formControl +=		"<div class='col-sm-3' id='editShowCorkSizes10' style='display: none'>"
								formControl +=			"<label for='storeSizesCork' class='control-label'>Cork Sizes</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeS10' id='editCorkSizeS10' value='"+data[i].color10CorkSizeS+"' onchange='updateEditTotals()'><label for='editCorkSizeS10'>:S</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeM10' id='editCorkSizeM10' value='"+data[i].color10CorkSizeM+"' onchange='updateEditTotals()'><label for='editCorkSizeM10'>:M</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeL10' id='editCorkSizeL10' value='"+data[i].color10CorkSizeL+"' onchange='updateEditTotals()'><label for='editCorkSizeL10'>:L</label><br>"
								formControl +=			"<input type='text' name='editCorkSizeXL10' id='editCorkSizeXL10' value='"+data[i].color10CorkSizeXL+"' onchange='updateEditTotals()'><label for='editCorkSizeXL10'>:XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize2XL10' id='editCorkSize2XL10' value='"+data[i].color10CorkSize2XL+"' onchange='updateEditTotals()'><label for='editCorkSize2XL10'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize3XL10' id='editCorkSize3XL10' value='"+data[i].color10CorkSize3XL+"' onchange='updateEditTotals()'><label for='editCorkSize3XL10'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editCorkSize4XL10' id='editCorkSize4XL10' value='"+data[i].color10CorkSize4XL+"' onchange='updateEditTotals()'><label for='editCorkSize4XL10'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowKalaSizes10' style='display: none'>"
								formControl +=			"<label for='storeSizesKala' class='control-label'>Kala Sizes</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeS10' id='editKalaSizeS10' value='"+data[i].color10KalaSizeS+"' onchange='updateEditTotals()'><label for='editKalaSizeS10'>:S</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeM10' id='editKalaSizeM10' value='"+data[i].color10KalaSizeM+"' onchange='updateEditTotals()'><label for='editKalaSizeM10'>:M</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeL10' id='editKalaSizeL10' value='"+data[i].color10KalaSizeL+"' onchange='updateEditTotals()'><label for='editKalaSizeL10'>:L</label><br>"
								formControl +=			"<input type='text' name='editKalaSizeXL10' id='editKalaSizeXL10' value='"+data[i].color10KalaSizeXL+"' onchange='updateEditTotals()'><label for='editKalaSizeXL10'>:XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize2XL10' id='editKalaSize2XL10' value='"+data[i].color10KalaSize2XL+"' onchange='updateEditTotals()'><label for='editKalaSize2XL10'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize3XL10' id='editKalaSize3XL10' value='"+data[i].color10KalaSize3XL+"' onchange='updateEditTotals()'><label for='editKalaSize3XL10'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editKalaSize4XL10' id='editKalaSize4XL10' value='"+data[i].color10KalaSize4XL+"' onchange='updateEditTotals()'><label for='editKalaSize4XL10'>:4XL</label><br>"
								formControl +=		"</div>"
								formControl +=		"<div class='col-sm-3' id='editShowGalwaySizes10' style='display: none'>"
								formControl +=			"<label for='storeSizesGalway' class='control-label'>Galway Sizes</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeS10' id='editGalwaySizeS10' value='"+data[i].color10GalwaySizeS+"' onchange='updateEditTotals()'><label for='editGalwaySizeS10'>:S</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeM10' id='editGalwaySizeM10' value='"+data[i].color10GalwaySizeM+"' onchange='updateEditTotals()'><label for='editGalwaySizeM10'>:M</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeL10' id='editGalwaySizeL10' value='"+data[i].color10GalwaySizeL+"' onchange='updateEditTotals()'><label for='editGalwaySizeL10'>:L</label><br>"
								formControl +=			"<input type='text' name='editGalwaySizeXL10' id='editGalwaySizeXL10' value='"+data[i].color10GalwaySizeXL+"' onchange='updateEditTotals()'><label for='editGalwaySizeXL10'>:XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize2XL10' id='editGalwaySize2XL10' value='"+data[i].color10GalwaySize2XL+"' onchange='updateEditTotals()'><label for='editGalwaySize2XL10'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize3XL10' id='editGalwaySize3XL10' value='"+data[i].color10GalwaySize3XL+"' onchange='updateEditTotals()'><label for='editGalwaySize3XL10'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editGalwaySize4XL10' id='editGalwaySize4XL10' value='"+data[i].color10GalwaySize4XL+"' onchange='updateEditTotals()'><label for='editGalwaySize4XL10'>:4XL</label><br>"
								formControl +=		"</div>"*/
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
								
							/*if($('#inCorkEdit').prop('checked')==true)
							{
								if(styleIndex>=1)
									document.getElementById("editShowCorkSizes1").style.display = "block";
									
								if(styleIndex>=2)
									document.getElementById("editShowCorkSizes2").style.display = "block";
									
								if(styleIndex>=3)
									document.getElementById("editShowCorkSizes3").style.display = "block";
									
								if(styleIndex>=4)
									document.getElementById("editShowCorkSizes4").style.display = "block";
									
								if(styleIndex>=5)
									document.getElementById("editShowCorkSizes5").style.display = "block";
									
								if(styleIndex>=6)
									document.getElementById("editShowCorkSizes6").style.display = "block";
									
								if(styleIndex>=7)
									document.getElementById("editShowCorkSizes7").style.display = "block";
									
								if(styleIndex>=8)
									document.getElementById("editShowCorkSizes8").style.display = "block";
									
								if(styleIndex>=9)
									document.getElementById("editShowCorkSizes9").style.display = "block";
									
								if(styleIndex>=10)
									document.getElementById("editShowCorkSizes10").style.display = "block";
							}
									
							if($('#inKalaEdit').prop('checked')==true)
							{
								if(styleIndex>=1)
									document.getElementById("editShowKalaSizes1").style.display = "block";
									
								if(styleIndex>=2)
									document.getElementById("editShowKalaSizes2").style.display = "block";
									
								if(styleIndex>=3)
									document.getElementById("editShowKalaSizes3").style.display = "block";
									
								if(styleIndex>=4)
									document.getElementById("editShowKalaSizes4").style.display = "block";
									
								if(styleIndex>=5)
									document.getElementById("editShowKalaSizes5").style.display = "block";
									
								if(styleIndex>=6)
									document.getElementById("editShowKalaSizes6").style.display = "block";
									
								if(styleIndex>=7)
									document.getElementById("editShowKalaSizes7").style.display = "block";
									
								if(styleIndex>=8)
									document.getElementById("editShowKalaSizes8").style.display = "block";
									
								if(styleIndex>=9)
									document.getElementById("editShowKalaSizes9").style.display = "block";
									
								if(styleIndex>=10)
									document.getElementById("editShowKalaSizes10").style.display = "block";
							}
									
							if($('#inGalwayEdit').prop('checked')==true)
							{
								if(styleIndex>=1)
									document.getElementById("editShowGalwaySizes1").style.display = "block";
									
								if(styleIndex>=2)
									document.getElementById("editShowGalwaySizes2").style.display = "block";
									
								if(styleIndex>=3)
									document.getElementById("editShowGalwaySizes3").style.display = "block";
									
								if(styleIndex>=4)
									document.getElementById("editShowGalwaySizes4").style.display = "block";
									
								if(styleIndex>=5)
									document.getElementById("editShowGalwaySizes5").style.display = "block";
								
								if(styleIndex>=6)
									document.getElementById("editShowGalwaySizes6").style.display = "block";
									
								if(styleIndex>=7)
									document.getElementById("editShowGalwaySizes7").style.display = "block";
									
								if(styleIndex>=8)
									document.getElementById("editShowGalwaySizes8").style.display = "block";
									
								if(styleIndex>=9)
									document.getElementById("editShowGalwaySizes9").style.display = "block";
									
								if(styleIndex>=10)
									document.getElementById("editShowGalwaySizes10").style.display = "block";
							}*/
							
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
				/*formControl += "<div class='col-sm-2' id='editShowSubCork"+i+"'>"
				formControl += "<p>Cork</p>"
				formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountCork"+i+"' id='editSubCountCork"+i+"' value='0' onchange='updateEditTotals()'>"
				formControl += "</div>"
				formControl += "<div class='col-sm-2' id='editShowSubKala"+i+"'>"
				formControl += "<p>Kala</p>"
				formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountKala"+i+"' id='editSubCountKala"+i+"' value='0' onchange='updateEditTotals()'>"
				formControl += "</div>"
				formControl += "<div class='col-sm-2' id='editShowSubGalway"+i+"'>"
				formControl += "<p>Galway</p>"
				formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCountGalway"+i+"' id='editSubCountGalway"+i+"' value='0' onchange='updateEditTotals()'>"
				formControl += "</div>"*/
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
				/*formControl +=		"<div class='col-sm-3' id='editShowCorkSizes"+i+"' style='display: none'>"
				formControl +=			"<label for='storeSizesCork' class='control-label'>Cork Sizes</label><br>"
				formControl +=			"<input type='text' name='editCorkSizeS"+i+"' id='editCorkSizeS"+i+"' value='0' onchange='updateEditTotals()'><label for='editCorkSizeS"+i+"'>:S</label><br>"
				formControl +=			"<input type='text' name='editCorkSizeM"+i+"' id='editCorkSizeM"+i+"' value='0' onchange='updateEditTotals()'><label for='editCorkSizeM"+i+"'>:M</label><br>"
				formControl +=			"<input type='text' name='editCorkSizeL"+i+"' id='editCorkSizeL"+i+"' value='0' onchange='updateEditTotals()'><label for='editCorkSizeL"+i+"'>:L</label><br>"
				formControl +=			"<input type='text' name='editCorkSizeXL"+i+"' id='editCorkSizeXL"+i+"' value='0' onchange='updateEditTotals()'><label for='editCorkSizeXL"+i+"'>:XL</label><br>"
				formControl +=			"<input type='text' name='editCorkSize2XL"+i+"' id='editCorkSize2XL"+i+"' value='0' onchange='updateEditTotals()'><label for='editCorkSize2XL"+i+"'>:2XL</label><br>"
				formControl +=			"<input type='text' name='editCorkSize3XL"+i+"' id='editCorkSize3XL"+i+"' value='0' onchange='updateEditTotals()'><label for='editCorkSize3XL"+i+"'>:3XL</label><br>"
				formControl +=			"<input type='text' name='editCorkSize4XL"+i+"' id='editCorkSize4XL"+i+"' value='0' onchange='updateEditTotals()'><label for='editCorkSize4XL"+i+"'>:4XL</label><br>"
				formControl +=		"</div>"
				formControl +=		"<div class='col-sm-3' id='editShowKalaSizes"+i+"' style='display: none'>"
				formControl +=			"<label for='storeSizesKala' class='control-label'>Kala Sizes</label><br>"
				formControl +=			"<input type='text' name='editKalaSizeS"+i+"' id='editKalaSizeS"+i+"' value='0' onchange='updateEditTotals()'><label for='editKalaSizeS"+i+"'>:S</label><br>"
				formControl +=			"<input type='text' name='editKalaSizeM"+i+"' id='editKalaSizeM"+i+"' value='0' onchange='updateEditTotals()'><label for='editKalaSizeM"+i+"'>:M</label><br>"
				formControl +=			"<input type='text' name='editKalaSizeL"+i+"' id='editKalaSizeL"+i+"' value='0' onchange='updateEditTotals()'><label for='editKalaSizeL"+i+"'>:L</label><br>"
				formControl +=			"<input type='text' name='editKalaSizeXL"+i+"' id='editKalaSizeXL"+i+"' value='0' onchange='updateEditTotals()'><label for='editKalaSizeXL"+i+"'>:XL</label><br>"
				formControl +=			"<input type='text' name='editKalaSize2XL"+i+"' id='editKalaSize2XL"+i+"' value='0' onchange='updateEditTotals()'><label for='editKalaSize2XL"+i+"'>:2XL</label><br>"
				formControl +=			"<input type='text' name='editKalaSize3XL"+i+"' id='editKalaSize3XL"+i+"' value='0' onchange='updateEditTotals()'><label for='editKalaSize3XL"+i+"'>:3XL</label><br>"
				formControl +=			"<input type='text' name='editKalaSize4XL"+i+"' id='editKalaSize4XL"+i+"' value='0' onchange='updateEditTotals()'><label for='editKalaSize4XL"+i+"'>:4XL</label><br>"
				formControl +=		"</div>"
				formControl +=		"<div class='col-sm-3' id='editShowGalwaySizes"+i+"' style='display: none'>"
				formControl +=			"<label for='storeSizesGalway' class='control-label'>Galway Sizes</label><br>"
				formControl +=			"<input type='text' name='editGalwaySizeS"+i+"' id='editGalwaySizeS"+i+"' value='0' onchange='updateEditTotals()'><label for='editGalwaySizeS"+i+"'>:S</label><br>"
				formControl +=			"<input type='text' name='editGalwaySizeM"+i+"' id='editGalwaySizeM"+i+"' value='0' onchange='updateEditTotals()'><label for='editGalwaySizeM"+i+"'>:M</label><br>"
				formControl +=			"<input type='text' name='editGalwaySizeL"+i+"' id='editGalwaySizeL"+i+"' value='0' onchange='updateEditTotals()'><label for='editGalwaySizeL"+i+"'>:L</label><br>"
				formControl +=			"<input type='text' name='editGalwaySizeXL"+i+"' id='editGalwaySizeXL"+i+"' value='0' onchange='updateEditTotals()'><label for='editGalwaySizeXL"+i+"'>:XL</label><br>"
				formControl +=			"<input type='text' name='editGalwaySize2XL"+i+"' id='editGalwaySize2XL"+i+"' value='0' onchange='updateEditTotals()'><label for='editGalwaySize2XL"+i+"'>:2XL</label><br>"
				formControl +=			"<input type='text' name='editGalwaySize3XL"+i+"' id='editGalwaySize3XL"+i+"' value='0' onchange='updateEditTotals()'><label for='editGalwaySize3XL"+i+"'>:3XL</label><br>"
				formControl +=			"<input type='text' name='editGalwaySize4XL"+i+"' id='editGalwaySize4XL"+i+"' value='0' onchange='updateEditTotals()'><label for='editGalwaySize4XL"+i+"'>:4XL</label><br>"
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
		//document.getElementById("editShowCorkSizes").style.display =  "none";
		//document.getElementById("editShowKalaSizes").style.display =  "none";
		//document.getElementById("editShowGalwaySizes").style.display =  "none";
		document.getElementById("editShowWarehouseSizes").style.display =  "none";
	}
	
	if($('#hasColorsEdit').prop('checked')==true)
	{
		document.getElementById("editAddSubStyle").style.display =  "block";
		
		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;
			//var subStyle = document.getElementById("subStyle").id + currStyle;
			//var editShowCorkSizes = document.getElementById("editShowCorkSizes").id + currStyle;
			//var editShowKalaSizes = document.getElementById("editShowKalaSizes").id + currStyle;
			//var editShowGalwaySizes = document.getElementById("editShowGalwaySizes").id + currStyle;
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
						
				/*if($('#inCorkEdit').prop('checked')==true)
					document.getElementById(editShowCorkSizes).style.display =  "block";
				
				else if($('#inCorkEdit').prop('checked')==false)
					document.getElementById(editShowCorkSizes).style.display =  "none";
						
				if($('#inKalaEdit').prop('checked')==true)
					document.getElementById(editShowKalaSizes).style.display =  "block";
				
				else if($('#inKalaEdit').prop('checked')==false)
					document.getElementById(editShowKalaSizes).style.display =  "none";
				
				if($('#inGalwayEdit').prop('checked')==true)
					document.getElementById(editShowGalwaySizes).style.display =  "block";
				
				else if($('#inGalwayEdit').prop('checked')==false)
					document.getElementById(editShowGalwaySizes).style.display =  "none";*/
			}
				
			else if($('#hasSizesEdit').prop('checked')==false)
			{
				document.getElementById(editShowWarehouseSizes).style.display =  "none";
				//document.getElementById(editShowCorkSizes).style.display =  "none";
				//document.getElementById(editShowKalaSizes).style.display =  "none";
				//document.getElementById(editShowGalwaySizes).style.display =  "none";
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
			//editShowSubCork = document.getElementById("editShowSubCork").id + currStyle;
			//editShowSubKala = document.getElementById("editShowSubKala").id + currStyle;
			//editShowSubGalway = document.getElementById("editShowSubGalway").id + currStyle;
			editShowSubWarehouse = document.getElementById("editShowSubWarehouse").id + currStyle;
			//var subStyle = document.getElementById("subStyle").id + currStyle;
			//var addSubStyle = document.getElementById("addSubStyle").id + currStyle;
			
			//document.getElementById(addSubStyle).style.display =  "block";
					
			if($('#inWarehouseEdit').prop('checked')==true)
				document.getElementById(editShowSubWarehouse).style.display =  "block";
				
			else if($('#inWarehouseEdit').prop('checked')==false)
				document.getElementById(editShowSubWarehouse).style.display =  "none";
				
			/*if($('#inCorkEdit').prop('checked')==true)
				document.getElementById(editShowSubCork).style.display =  "block";
				
			else if($('#inCorkEdit').prop('checked')==false)
				document.getElementById(editShowSubCork).style.display =  "none";
						
			if($('#inKalaEdit').prop('checked')==true)
				document.getElementById(editShowSubKala).style.display =  "block";
				
			else if($('#inKalaEdit').prop('checked')==false)
				document.getElementById(editShowSubKala).style.display =  "none";
				
			if($('#inGalwayEdit').prop('checked')==true)
				document.getElementById(editShowSubGalway).style.display =  "block";
				
			else if($('#inGalwayEdit').prop('checked')==false)
				document.getElementById(editShowSubGalway).style.display =  "none";*/
		}
	}
	
	if($('#hasSizesEdit').prop('checked')==false)
	{
		document.getElementById("editShowWarehouseSizes").style.display =  "none";
		//document.getElementById("editShowCorkSizes").style.display =  "none";
		//document.getElementById("editShowKalaSizes").style.display =  "none";
		//document.getElementById("editShowGalwaySizes").style.display =  "none";
		
		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;
			
			if($('#inWarehouseEdit').prop('checked')==false)
			{
				var editSubCountWarehouse = document.getElementById("editSubCountWarehouse").id + currStyle;
				document.getElementById(editSubCountWarehouse).value=0;
			}
			
			/*if($('#inCorkEdit').prop('checked')==false)
			{
				var editSubCountCork = document.getElementById("editSubCountCork").id + currStyle;
				document.getElementById(editSubCountCork).value=0;
			}
					
			if($('#inKalaEdit').prop('checked')==false)
			{
				var editSubCountKala = document.getElementById("editSubCountKala").id + currStyle;
				document.getElementById(editSubCountKala).value=0;
			}
				
			if($('#inGalwayEdit').prop('checked')==false)
			{
				var editSubCountGalway = document.getElementById("editSubCountGalway").id + currStyle;
				document.getElementById(editSubCountGalway).value=0;
			}*/
		}
		
		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;
			//var subStyle = document.getElementById("subStyle").id + currStyle;
			editShowSubWarehouse = document.getElementById("editShowSubWarehouse").id + currStyle;
			//editShowSubCork = document.getElementById("editShowSubCork").id + currStyle;
			//editShowSubKala = document.getElementById("editShowSubKala").id + currStyle;
			//editShowSubGalway = document.getElementById("editShowSubGalway").id + currStyle;
			//var subStyle = document.getElementById("subStyle").id + currStyle;
			//var addSubStyle = document.getElementById("addSubStyle").id + currStyle;
				
			//document.getElementById(addSubStyle).style.display =  "block";
					
			if($('#inWarehouseEdit').prop('checked')==true)
				document.getElementById(editShowSubWarehouse).style.display =  "block";
				
			else if($('#inWarehouseEdit').prop('checked')==false)
				document.getElementById(editShowSubWarehouse).style.display =  "none";
				
			/*if($('#inCorkEdit').prop('checked')==true)
				document.getElementById(editShowSubCork).style.display =  "block";
				
			else if($('#inCorkEdit').prop('checked')==false)
				document.getElementById(editShowSubCork).style.display =  "none";
						
			if($('#inKalaEdit').prop('checked')==true)
				document.getElementById(editShowSubKala).style.display =  "block";
				
			else if($('#inKalaEdit').prop('checked')==false)
				document.getElementById(editShowSubKala).style.display =  "none";
				
			if($('#inGalwayEdit').prop('checked')==true)
				document.getElementById(editShowSubGalway).style.display =  "block";
				
			else if($('#inGalwayEdit').prop('checked')==false)
				document.getElementById(editShowSubGalway).style.display =  "none";*/				
		}
	}
	
	if(($('#hasSizesEdit').prop('checked')==true) && ($('#hasColorsEdit').prop('checked')==false))
	{	
		if($('#inWarehouseEdit').prop('checked')==true)
			document.getElementById("editShowWarehouseSizes").style.display =  "block";
	
		else if($('#inWarehouseEdit').prop('checked')==false)
			document.getElementById("editShowWarehouseSizes").style.display =  "none";
		
		/*if($('#inCorkEdit').prop('checked')==true)
			document.getElementById("editShowCorkSizes").style.display =  "block";
	
		else if($('#inCorkEdit').prop('checked')==false)
			document.getElementById("editShowCorkSizes").style.display =  "none";
			
		if($('#inKalaEdit').prop('checked')==true)
			document.getElementById("editShowKalaSizes").style.display =  "block";
	
		else if($('#inKalaEdit').prop('checked')==false)
			document.getElementById("editShowKalaSizes").style.display =  "none";
	
		if($('#inGalwayEdit').prop('checked')==true)
			document.getElementById("editShowGalwaySizes").style.display =  "block";
	
		else if($('#inGalwayEdit').prop('checked')==false)
			document.getElementById("editShowGalwaySizes").style.display =  "none";*/
	}
	
	if(($('#hasSizesEdit').prop('checked')==false) && ($('#hasColorsEdit').prop('checked')==false))
	{
		if($('#inWarehouseEdit').prop('checked')==false)
			document.getElementById("editCountWarehouse").value = 0;
	
		/*if($('#inCorkEdit').prop('checked')==false)
			document.getElementById("editCountCork").value = 0;
		
		if($('#inKalaEdit').prop('checked')==false)
			document.getElementById("editCountKala").value = 0;
	
		if($('#inGalwayEdit').prop('checked')==false)
			document.getElementById("editCountGalway").value = 0;*/
	}

	updateEditTotals();
}

function updateEditTotals()
{
	var i=0;
	var currStyle=0;

	var editWarehouseTotal = 0;
	//var editCorkTotal = 0;
	//var editKalaTotal = 0;
	//var editGalwayTotal = 0;

	var editCountWarehouseSizeS = 0;
	var editCountWarehouseSizeM = 0;
	var editCountWarehouseSizeL = 0;
	var editCountWarehouseSizeXL = 0;
	var editCountWarehouseSize2XL = 0;
	var editCountWarehouseSize3XL = 0;
	var editCountWarehouseSize4XL = 0;
	var editWarehouseSizeTotal = 0;

	/*var editCountCorkSizeS = 0;
	var editCountCorkSizeM = 0;
	var editCountCorkSizeL = 0;
	var editCountCorkSizeXL = 0;
	var editCountCorkSize2XL = 0;
	var editCountCorkSize3XL = 0;
	var editCountCorkSize4XL = 0;
	var editCorkSizeTotal = 0;

	var editCountKalaSizeS = 0;
	var editCountKalaSizeM = 0;
	var editCountKalaSizeL = 0;
	var editCountKalaSizeXL = 0;
	var editCountKalaSize2XL = 0;
	var editCountKalaSize3XL = 0;
	var editCountKalaSize4XL = 0;
	var editKalaSizeTotal = 0;

	var editCountGalwaySizeS = 0;
	var editCountGalwaySizeM = 0;
	var editCountGalwaySizeL = 0;
	var editCountGalwaySizeXL = 0;
	var editCountGalwaySize2XL = 0;
	var editCountGalwaySize3XL = 0;
	var editCountGalwaySize4XL = 0;
	var editGalwaySizeTotal = 0;*/

	var editSubCountWarehouse = 0;
	//var editSubCountCork = 0;
	//var editSubCountKala = 0;
	//var editSubCountGalway = 0;

	//var editTempTotalCork = 0;
	//var editTempTotalKala = 0;
	//var editTempTotalGalway = 0;
	var editTempTotalWarehouse = 0;

	if($('#hasSizesEdit').prop('checked')==true&&$('#hasColorsEdit').prop('checked')==true)
	{
		document.getElementById("editCountWarehouse").value = 0;
		//document.getElementById("editCountCork").value = 0;
		//document.getElementById("editCountKala").value = 0;
		//document.getElementById("editCountGalway").value = 0;
			
		for(i=1;i<styleIndex+1;i++)
		{
			currStyle = i;
			editWarehouseTotal = 0;
			//editCorkTotal = 0;
			//editKalaTotal = 0;
			//editGalwayTotal = 0;
			
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
			
			/*var editCorkSizeS = document.getElementById("editCorkSizeS").id + currStyle; 
			var editCorkSizeM = document.getElementById("editCorkSizeM").id + currStyle; 
			var editCorkSizeL = document.getElementById("editCorkSizeL").id + currStyle; 
			var editCorkSizeXL = document.getElementById("editCorkSizeXL").id + currStyle; 
			var editCorkSize2XL = document.getElementById("editCorkSize2XL").id + currStyle; 
			var editCorkSize3XL = document.getElementById("editCorkSize3XL").id + currStyle; 
			var editCorkSize4XL = document.getElementById("editCorkSize4XL").id + currStyle; 
			editCountCorkSizeS = parseInt(document.getElementById(editCorkSizeS).value);
			editCountCorkSizeM = parseInt(document.getElementById(editCorkSizeM).value);
			editCountCorkSizeL = parseInt(document.getElementById(editCorkSizeL).value);
			editCountCorkSizeXL = parseInt(document.getElementById(editCorkSizeXL).value);
			editCountCorkSize2XL = parseInt(document.getElementById(editCorkSize2XL).value);
			editCountCorkSize3XL = parseInt(document.getElementById(editCorkSize3XL).value);
			editCountCorkSize4XL = parseInt(document.getElementById(editCorkSize4XL).value);
			editCorkSizeTotal = parseInt(editCountCorkSizeS) + parseInt(editCountCorkSizeM) + parseInt(editCountCorkSizeL) + parseInt(editCountCorkSizeXL) + parseInt(editCountCorkSize2XL) + parseInt(editCountCorkSize3XL) + parseInt(editCountCorkSize4XL);
			editSubCountCork = document.getElementById("editSubCountCork").id + currStyle;
			
			if($('#inCorkEdit').prop('checked')==true&&$('#hasSizesEdit').prop('checked')==true)
			{
				editCorkTotal += parseInt(editCorkSizeTotal);
				document.getElementById(editSubCountCork).value = editCorkTotal;
				document.getElementById("editCountCork").value = parseInt(document.getElementById("editCountCork").value) + parseInt(document.getElementById(editSubCountCork).value);
			}
			
			else if($('#inCorkEdit').prop('checked')==false)
				editCorkSizeTotal = 0;
			
			var editKalaSizeS = document.getElementById("editKalaSizeS").id + currStyle; 
			var editKalaSizeM = document.getElementById("editKalaSizeM").id + currStyle; 
			var editKalaSizeL = document.getElementById("editKalaSizeL").id + currStyle; 
			var editKalaSizeXL = document.getElementById("editKalaSizeXL").id + currStyle; 
			var editKalaSize2XL = document.getElementById("editKalaSize2XL").id + currStyle; 
			var editKalaSize3XL = document.getElementById("editKalaSize3XL").id + currStyle; 
			var editKalaSize4XL = document.getElementById("editKalaSize4XL").id + currStyle; 
			editCountKalaSizeS = parseInt(document.getElementById(editKalaSizeS).value);
			editCountKalaSizeM = parseInt(document.getElementById(editKalaSizeM).value);
			editCountKalaSizeL = parseInt(document.getElementById(editKalaSizeL).value);
			editCountKalaSizeXL = parseInt(document.getElementById(editKalaSizeXL).value);
			editCountKalaSize2XL = parseInt(document.getElementById(editKalaSize2XL).value);
			editCountKalaSize3XL = parseInt(document.getElementById(editKalaSize3XL).value);
			editCountKalaSize4XL = parseInt(document.getElementById(editKalaSize4XL).value);
			editKalaSizeTotal = editCountKalaSizeS + editCountKalaSizeM + editCountKalaSizeL + editCountKalaSizeXL + editCountKalaSize2XL + editCountKalaSize3XL + editCountKalaSize4XL;
			editSubCountKala = document.getElementById("editSubCountKala").id + currStyle;
			
			if($('#inKalaEdit').prop('checked')==true&&$('#hasSizesEdit').prop('checked')==true)
			{
				editKalaTotal += parseInt(editKalaSizeTotal);
				document.getElementById(editSubCountKala).value = editKalaTotal;
				document.getElementById("editCountKala").value = parseInt(document.getElementById("editCountKala").value) + parseInt(document.getElementById(editSubCountKala).value);
			}
			
			else if($('#inKalaEdit').prop('checked')==false)
				editKalaSizeTotal = 0;
			
			var editGalwaySizeS = document.getElementById("editGalwaySizeS").id + currStyle; 
			var editGalwaySizeM = document.getElementById("editGalwaySizeM").id + currStyle; 
			var editGalwaySizeL = document.getElementById("editGalwaySizeL").id + currStyle; 
			var editGalwaySizeXL = document.getElementById("editGalwaySizeXL").id + currStyle; 
			var editGalwaySize2XL = document.getElementById("editGalwaySize2XL").id + currStyle; 
			var editGalwaySize3XL = document.getElementById("editGalwaySize3XL").id + currStyle; 
			var editGalwaySize4XL = document.getElementById("editGalwaySize4XL").id + currStyle; 
			editCountGalwaySizeS = parseInt(document.getElementById(editGalwaySizeS).value);
			editCountGalwaySizeM = parseInt(document.getElementById(editGalwaySizeM).value);
			editCountGalwaySizeL = parseInt(document.getElementById(editGalwaySizeL).value);
			editCountGalwaySizeXL = parseInt(document.getElementById(editGalwaySizeXL).value);
			editCountGalwaySize2XL = parseInt(document.getElementById(editGalwaySize2XL).value);
			editCountGalwaySize3XL = parseInt(document.getElementById(editGalwaySize3XL).value);
			editCountGalwaySize4XL = parseInt(document.getElementById(editGalwaySize4XL).value);
			editGalwaySizeTotal = editCountGalwaySizeS + editCountGalwaySizeM + editCountGalwaySizeL + editCountGalwaySizeXL + editCountGalwaySize2XL + editCountGalwaySize3XL + editCountGalwaySize4XL;
			editSubCountGalway = document.getElementById("editSubCountGalway").id + currStyle;
			
			if($('#inGalwayEdit').prop('checked')==true&&$('#hasSizesEdit').prop('checked')==true)
			{
				editGalwayTotal += parseInt(editGalwaySizeTotal);
				document.getElementById(editSubCountGalway).value = editGalwayTotal;
				document.getElementById("editCountGalway").value = parseInt(document.getElementById("editCountGalway").value) + parseInt(document.getElementById(editSubCountGalway).value);
			}	
			
			if($('#inGalwayEdit').prop('checked')==false)
				editGalwaySizeTotal = 0;*/
			
			var editColorTotal = (document.getElementById("editColorTotal").id + currStyle); 
			//console.log(editColorTotal);
			document.getElementById(editColorTotal).value = editWarehouseTotal + editCorkTotal + editKalaTotal + editGalwayTotal;
		}
	}
	
	if($('#hasSizesEdit').prop('checked')==false&&$('#hasColorsEdit').prop('checked')==true)
	{
		//editTempTotalCork = 0;
		//editTempTotalKala = 0;
		//editTempTotalGalway = 0;
		editTempTotalWarehouse = 0;
			
		for(i=1;i<styleIndex+1;i++)
		{
			currStyle = i;
				
			editColorTotal = document.getElementById("editColorTotal").id + currStyle;
			//editCorkTotal = 0;
			//editKalaTotal = 0;
			//editGalwayTotal = 0;
			editWarehouseTotal = 0;
				
			if($('#inWarehouseEdit').prop('checked')==true)
			{						
				editSubCountWarehouse = document.getElementById("editSubCountWarehouse").id + currStyle;	
				editWarehouseTotal = parseInt(document.getElementById(editSubCountWarehouse).value) + editWarehouseTotal;
				editTempTotalWarehouse = editTempTotalWarehouse + parseInt(document.getElementById(editSubCountWarehouse).value);
			}	
				
			/*if($('#inCorkEdit').prop('checked')==true)
			{						
				editSubCountCork = document.getElementById("editSubCountCork").id + currStyle;	
				editCorkTotal = parseInt(document.getElementById(editSubCountCork).value) + editCorkTotal;
				editTempTotalCork = editTempTotalCork + parseInt(document.getElementById(editSubCountCork).value);
			}	
				
			if($('#inKalaEdit').prop('checked')==true)
			{
				editSubCountKala = document.getElementById("editSubCountKala").id + currStyle;	
				editKalaTotal = parseInt(document.getElementById(editSubCountKala).value) + editKalaTotal;
				editTempTotalKala = editTempTotalKala + parseInt(document.getElementById(editSubCountKala).value);
			}
				
			if($('#inGalwayEdit').prop('checked')==true)
			{
				editSubCountGalway = document.getElementById("editSubCountGalway").id + currStyle;	
				editGalwayTotal = parseInt(document.getElementById(editSubCountGalway).value) + editGalwayTotal;
				editTempTotalGalway = editTempTotalGalway + parseInt(document.getElementById(editSubCountGalway).value);
			}*/
				
			document.getElementById("editCountWarehouse").value = editTempTotalWarehouse;
			//document.getElementById("editCountCork").value = editTempTotalCork;
			//document.getElementById("editCountKala").value = editTempTotalKala;
			//document.getElementById("editCountGalway").value = editTempTotalGalway;
			document.getElementById(editColorTotal).value = editWarehouseTotal + editCorkTotal + editKalaTotal + editGalwayTotal;
		}
	}
		
	if($('#hasSizesEdit').prop('checked')==true&&$('#hasColorsEdit').prop('checked')==false)
	{		
		editWarehouseTotal = 0;
		//editCorkTotal = 0;
		//editKalaTotal = 0;
		//editGalwayTotal = 0;
			
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
			
		/*editCountCorkSizeS = parseInt(document.getElementById("editCorkSizeS").value);
		editCountCorkSizeM = parseInt(document.getElementById("editCorkSizeM").value);
		editCountCorkSizeL = parseInt(document.getElementById("editCorkSizeL").value);
		editCountCorkSizeXL = parseInt(document.getElementById("editCorkSizeXL").value);
		editCountCorkSize2XL = parseInt(document.getElementById("editCorkSize2XL").value);
		editCountCorkSize3XL = parseInt(document.getElementById("editCorkSize3XL").value);
		editCountCorkSize4XL = parseInt(document.getElementById("editCorkSize4XL").value);
		editCorkSizeTotal = parseInt(editCountCorkSizeS) + parseInt(editCountCorkSizeM) + parseInt(editCountCorkSizeL) + parseInt(editCountCorkSizeXL) + parseInt(editCountCorkSize2XL) + parseInt(editCountCorkSize3XL) + parseInt(editCountCorkSize4XL);
			
		if($('#inCorkEdit').prop('checked')==true&&$('#hasSizesEdit').prop('checked')==true)
		{
			editCorkTotal = parseInt(editCorkSizeTotal);
			document.getElementById("editCountCork").value = editCorkTotal;
		}
			
		else if($('#inCorkEdit').prop('checked')==false)
			document.getElementById("editCountCork").value = 0;
			
		editCountKalaSizeS = parseInt(document.getElementById("editKalaSizeS").value);
		editCountKalaSizeM = parseInt(document.getElementById("editKalaSizeM").value);
		editCountKalaSizeL = parseInt(document.getElementById("editKalaSizeL").value);
		editCountKalaSizeXL = parseInt(document.getElementById("editKalaSizeXL").value);
		editCountKalaSize2XL = parseInt(document.getElementById("editKalaSize2XL").value);
		editCountKalaSize3XL = parseInt(document.getElementById("editKalaSize3XL").value);
		editCountKalaSize4XL = parseInt(document.getElementById("editKalaSize4XL").value);
		editKalaSizeTotal = parseInt(editCountKalaSizeS) + parseInt(editCountKalaSizeM) + parseInt(editCountKalaSizeL) + parseInt(editCountKalaSizeXL) + parseInt(editCountKalaSize2XL) + parseInt(editCountKalaSize3XL) + parseInt(editCountKalaSize4XL);
			
		if($('#inKalaEdit').prop('checked')==true&&$('#hasSizesEdit').prop('checked')==true)
		{
			editKalaTotal = parseInt(editKalaSizeTotal);
			document.getElementById("editCountKala").value = editKalaTotal;
		}
			
		else if($('#inKalaEdit').prop('checked')==false)
			document.getElementById("editCountKala").value = 0;
			
		editCountGalwaySizeS = parseInt(document.getElementById("editGalwaySizeS").value);
		editCountGalwaySizeM = parseInt(document.getElementById("editGalwaySizeM").value);
		editCountGalwaySizeL = parseInt(document.getElementById("editGalwaySizeL").value);
		editCountGalwaySizeXL = parseInt(document.getElementById("editGalwaySizeXL").value);
		editCountGalwaySize2XL = parseInt(document.getElementById("editGalwaySize2XL").value);
		editCountGalwaySize3XL = parseInt(document.getElementById("editGalwaySize3XL").value);
		editCountGalwaySize4XL = parseInt(document.getElementById("editGalwaySize4XL").value);
		editGalwaySizeTotal = parseInt(editCountGalwaySizeS) + parseInt(editCountGalwaySizeM) + parseInt(editCountGalwaySizeL) + parseInt(editCountGalwaySizeXL) + parseInt(editCountGalwaySize2XL) + parseInt(editCountGalwaySize3XL) + parseInt(editCountGalwaySize4XL);
			
		if($('#inGalwayEdit').prop('checked')==true&&$('#hasSizesEdit').prop('checked')==true)
		{
			editGalwayTotal = parseInt(editGalwaySizeTotal);
			document.getElementById("editCountGalway").value = editGalwayTotal;
		}
			
		else if($('#inGalwayEdit').prop('checked')==false)
			document.getElementById("editCountGalway").value = 0;*/	
	}
	
	if($('#hasColorsEdit').prop('checked')==true&&$('#inWarehouseEdit').prop('checked')==false)
	{
		document.getElementById("editCountWarehouse").value = 0;
	}
	/*if($('#hasColorsEdit').prop('checked')==true&&$('#inCorkEdit').prop('checked')==false)
	{
		document.getElementById("editCountCork").value = 0;
	}
	if($('#hasColorsEdit').prop('checked')==true&&$('#inKalaEdit').prop('checked')==false)
	{
		document.getElementById("editCountKala").value = 0;
	}
	if($('#hasColorsEdit').prop('checked')==true&&$('#inGalwayEdit').prop('checked')==false)
	{
		document.getElementById("editCountGalway").value = 0;
	}*/
	
	if($('#hasSizesEdit').prop('checked')==false&&$('#hasColorsEdit').prop('checked')==false)
	{
		if($('#inWarehouseEdit').prop('checked')==false)
			document.getElementById("editCountWarehouse").value = 0;
	
		/*if($('#inCorkEdit').prop('checked')==false)
			document.getElementById("editCountCork").value = 0;
		
		if($('#inKalaEdit').prop('checked')==false)
			document.getElementById("editCountKala").value = 0;
		
		if($('#inGalwayEdit').prop('checked')==false)
			document.getElementById("editCountGalway").value = 0;*/
	}
}
