/*eslint-env jquery*/
var styleIndex = 0;

$(document).ready(
    function () {
		//DELETE PRODUCT METHOD
		/* ! REQUIRES VALIDATION ! */
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
		/* ! REQUIRES VALIDATION ! */
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
		/* ! REQUIRES VALIDATION ! */
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
		/*
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
        });*/
		
		/*
		*
		*PRODUCT EDIT SEARCHING
		*
		*/
		
		/*code for finding 1 product in management with a name*/
		/* ! REQURIES VALIDATION ! */
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
						
						if(data[i].hasSizes=="on")
							$("#hasSizesEdit").prop("checked", true);
						
						else
							$("#hasSizesEdit").prop("checked", false);
						
						if(data[i].numColors>0)
							$("#hasColorsEdit").prop("checked", true);
						
						else
							$("#hasColorsEdit").prop("checked", false);
						
						document.getElementById("editCount").value = data[i].total;
						
						if($('#hasSizesEdit').prop('checked')==false&&$('#hasColorsEdit').prop('checked')==false)
						{
							document.getElementById("editShowSizes").style.display =  "none";
							document.getElementById("editAddSubStyle").style.display = "none";
							document.getElementById("editSubStyleMenu").style.display = "none";
						}
						
						if($('#hasSizesEdit').prop('checked')==true&&$('#hasColorsEdit').prop('checked')==false)
						{
							document.getElementById("editAddSubStyle").style.display = "none";
							document.getElementById("editSubStyleMenu").style.display = "none";

								document.getElementById("editShowSizes").style.display =  "block";
								document.getElementById("editSizeS").value =  data[i].SizeS;
								document.getElementById("editSizeM").value =  data[i].SizeM;
								document.getElementById("editSizeL").value =  data[i].SizeL;
								document.getElementById("editSizeXL").value =  data[i].SizeXL;
								document.getElementById("editSize2XL").value =  data[i].Size2XL;
								document.getElementById("editSize3XL").value =  data[i].Size3XL;
								document.getElementById("editSize4XL").value =  data[i].Size4XL;
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
								formControl += "<div class='col-sm-2' id='editShowSub1'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount1' id='editSubCount1' value='"+data[i].color1Total+"' onchange='updateEditTotals()'>"
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
								formControl += "<div class='col-sm-2' id='editShowSub2'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount2' id='editSubCount2' value='"+data[i].color2Total+"' onchange='updateEditTotals()'>"
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
								formControl += "<div class='col-sm-2' id='editShowSub3'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount3' id='editSubCount3' value='"+data[i].color3Total+"' onchange='updateEditTotals()'>"
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
								formControl += "<div class='col-sm-2' id='editShowSub4'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount4' id='editSubCount4' value='"+data[i].color4Total+"' onchange='updateEditTotals()'>"
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
								formControl += "<div class='col-sm-2' id='editShowSub5'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount5' id='editSubCount5' value='"+data[i].color5Total+"' onchange='updateEditTotals()'>"
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
								formControl += "<div class='col-sm-2' id='editShowSub6'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount6' id='editSubCount6' value='"+data[i].color6Total+"' onchange='updateEditTotals()'>"
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
								formControl += "<div class='col-sm-2' id='editShowSub7'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount7' id='editSubCount7' value='"+data[i].color7Total+"' onchange='updateEditTotals()'>"
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
								formControl += "<div class='col-sm-2' id='editShowSub8'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount8' id='editSubCount8' value='"+data[i].color8Total+"' onchange='updateEditTotals()'>"
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
								formControl += "<div class='col-sm-2' id='editShowSub9'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount9' id='editSubCount9' value='"+data[i].color9Total+"' onchange='updateEditTotals()'>"
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
								formControl += "<div class='col-sm-2' id='editShowSub10'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount10' id='editSubCount10' value='"+data[i].color10Total+"' onchange='updateEditTotals()'>"
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
								formControl += "<div class='col-sm-2' id='editShowSub1'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount1' id='editSubCount1' value='"+data[i].color1Total+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList1'>"
								formControl +=		"<div class='col-sm-3' id='editShowSizes1' style='display: none'>"
								formControl +=			"<label for='editStoreSizes' class='control-label'> Sizes</label><br>"
								formControl +=			"<input type='text' name='editSizeS1' id='editSizeS1' value='"+data[i].color1SizeS+"' onchange='updateEditTotals()'><label for='editSizeS1'>:S</label><br>"
								formControl +=			"<input type='text' name='editSizeM1' id='editSizeM1' value='"+data[i].color1SizeM+"' onchange='updateEditTotals()'><label for='editSizeM1'>:M</label><br>"
								formControl +=			"<input type='text' name='editSizeL1' id='editSizeL1' value='"+data[i].color1SizeL+"' onchange='updateEditTotals()'><label for='editSizeL1'>:L</label><br>"
								formControl +=			"<input type='text' name='editSizeXL1' id='editSizeXL1' value='"+data[i].color1SizeXL+"' onchange='updateEditTotals()'><label for='editSizeXL1'>:XL</label><br>"
								formControl +=			"<input type='text' name='editSize2XL1' id='editSize2XL1' value='"+data[i].color1Size2XL+"' onchange='updateEditTotals()'><label for='editSize2XL1'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editSize3XL1' id='editSize3XL1' value='"+data[i].color1Size3XL+"' onchange='updateEditTotals()'><label for='editSize3XL1'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editSize4XL1' id='editSize4XL1' value='"+data[i].color1Size4XL+"' onchange='updateEditTotals()'><label for='editSize4XL1'>:4XL</label><br>"
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
								formControl += "<div class='col-sm-2' id='editShowSub2'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount2' id='editSubCount2' value='"+data[i].color2Total+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList2'>"
								formControl +=		"<div class='col-sm-3' id='editShowSizes2' style='display: none'>"
								formControl +=			"<label for='storeSizes' class='control-label'> Sizes</label><br>"
								formControl +=			"<input type='text' name='editSizeS2' id='editSizeS2' value='"+data[i].color2SizeS+"' onchange='updateEditTotals()'><label for='editSizeS2'>:S</label><br>"
								formControl +=			"<input type='text' name='editSizeM2' id='editSizeM2' value='"+data[i].color2SizeM+"' onchange='updateEditTotals()'><label for='editSizeM2'>:M</label><br>"
								formControl +=			"<input type='text' name='editSizeL2' id='editSizeL2' value='"+data[i].color2SizeL+"' onchange='updateEditTotals()'><label for='editSizeL2'>:L</label><br>"
								formControl +=			"<input type='text' name='editSizeXL2' id='editSizeXL2' value='"+data[i].color2SizeXL+"' onchange='updateEditTotals()'><label for='editSizeXL2'>:XL</label><br>"
								formControl +=			"<input type='text' name='editSize2XL2' id='editSize2XL2' value='"+data[i].color2Size2XL+"' onchange='updateEditTotals()'><label for='editSize2XL2'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editSize3XL2' id='editSize3XL2' value='"+data[i].color2Size3XL+"' onchange='updateEditTotals()'><label for='editSize3XL2'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editSize4XL2' id='editSize4XL2' value='"+data[i].color2Size4XL+"' onchange='updateEditTotals()'><label for='editSize4XL2'>:4XL</label><br>"
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
								formControl += "<div class='col-sm-2' id='editShowSub3'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount3' id='editSubCount3' value='"+data[i].color3Total+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList3'>"
								formControl +=		"<div class='col-sm-3' id='editShowSizes3' style='display: none'>"
								formControl +=			"<label for='storeSizes' class='control-label'> Sizes</label><br>"
								formControl +=			"<input type='text' name='editSizeS3' id='editSizeS3' value='"+data[i].color3SizeS+"' onchange='updateEditTotals()'><label for='editSizeS3'>:S</label><br>"
								formControl +=			"<input type='text' name='editSizeM3' id='editSizeM3' value='"+data[i].color3SizeM+"' onchange='updateEditTotals()'><label for='editSizeM3'>:M</label><br>"
								formControl +=			"<input type='text' name='editSizeL3' id='editSizeL3' value='"+data[i].color3SizeL+"' onchange='updateEditTotals()'><label for='editSizeL3'>:L</label><br>"
								formControl +=			"<input type='text' name='editSizeXL3' id='editSizeXL3' value='"+data[i].color3SizeXL+"' onchange='updateEditTotals()'><label for='editSizeXL3'>:XL</label><br>"
								formControl +=			"<input type='text' name='editSize2XL3' id='editSize2XL3' value='"+data[i].color3Size2XL+"' onchange='updateEditTotals()'><label for='editSize2XL3'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editSize3XL3' id='editSize3XL3' value='"+data[i].color3Size3XL+"' onchange='updateEditTotals()'><label for='editSize3XL3'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editSize4XL3' id='editSize4XL3' value='"+data[i].color3Size4XL+"' onchange='updateEditTotals()'><label for='editSize4XL3'>:4XL</label><br>"
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
								formControl += "<div class='col-sm-2' id='editShowSub4'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount4' id='editSubCount4' value='"+data[i].color4Total+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList4'>"
								formControl +=		"<div class='col-sm-3' id='editShowSizes4' style='display: none'>"
								formControl +=			"<label for='storeSizes' class='control-label'> Sizes</label><br>"
								formControl +=			"<input type='text' name='editSizeS4' id='editSizeS4' value='"+data[i].color4SizeS+"' onchange='updateEditTotals()'><label for='editSizeS4'>:S</label><br>"
								formControl +=			"<input type='text' name='editSizeM4' id='editSizeM4' value='"+data[i].color4SizeM+"' onchange='updateEditTotals()'><label for='editSizeM4'>:M</label><br>"
								formControl +=			"<input type='text' name='editSizeL4' id='editSizeL4' value='"+data[i].color4SizeL+"' onchange='updateEditTotals()'><label for='editSizeL4'>:L</label><br>"
								formControl +=			"<input type='text' name='editSizeXL4' id='editSizeXL4' value='"+data[i].color4SizeXL+"' onchange='updateEditTotals()'><label for='editSizeXL4'>:XL</label><br>"
								formControl +=			"<input type='text' name='editSize2XL4' id='editSize2XL4' value='"+data[i].color4Size2XL+"' onchange='updateEditTotals()'><label for='editSize2XL4'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editSize3XL4' id='editSize3XL4' value='"+data[i].color4Size3XL+"' onchange='updateEditTotals()'><label for='editSize3XL4'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editSize4XL4' id='editSize4XL4' value='"+data[i].color4Size4XL+"' onchange='updateEditTotals()'><label for='editSize4XL4'>:4XL</label><br>"
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
								formControl += "<div class='col-sm-2' id='editShowSub5'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount5' id='editSubCount5' value='"+data[i].color5Total+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList5'>"
								formControl +=		"<div class='col-sm-3' id='editShowSizes5' style='display: none'>"
								formControl +=			"<label for='storeSizes' class='control-label'> Sizes</label><br>"
								formControl +=			"<input type='text' name='editSizeS5' id='editSizeS5' value='"+data[i].color5SizeS+"' onchange='updateEditTotals()'><label for='editSizeS5'>:S</label><br>"
								formControl +=			"<input type='text' name='editSizeM5' id='editSizeM5' value='"+data[i].color5SizeM+"' onchange='updateEditTotals()'><label for='editSizeM5'>:M</label><br>"
								formControl +=			"<input type='text' name='editSizeL5' id='editSizeL5' value='"+data[i].color5SizeL+"' onchange='updateEditTotals()'><label for='editSizeL5'>:L</label><br>"
								formControl +=			"<input type='text' name='editSizeXL5' id='editSizeXL5' value='"+data[i].color5SizeXL+"' onchange='updateEditTotals()'><label for='editSizeXL5'>:XL</label><br>"
								formControl +=			"<input type='text' name='editSize2XL5' id='editSize2XL5' value='"+data[i].color5Size2XL+"' onchange='updateEditTotals()'><label for='editSize2XL5'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editSize3XL5' id='editSize3XL5' value='"+data[i].color5Size3XL+"' onchange='updateEditTotals()'><label for='editSize3XL5'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editSize4XL5' id='editSize4XL5' value='"+data[i].color5Size4XL+"' onchange='updateEditTotals()'><label for='editSize4XL5'>:4XL</label><br>"
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
								formControl += "<div class='col-sm-2' id='editShowSub6'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount6' id='editSubCount6' value='"+data[i].color6Total+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList6'>"
								formControl +=		"<div class='col-sm-3' id='editShowSizes6' style='display: none'>"
								formControl +=			"<label for='storeSizes' class='control-label'> Sizes</label><br>"
								formControl +=			"<input type='text' name='editSizeS6' id='editSizeS6' value='"+data[i].color6SizeS+"' onchange='updateEditTotals()'><label for='editSizeS6'>:S</label><br>"
								formControl +=			"<input type='text' name='editSizeM6' id='editSizeM6' value='"+data[i].color6SizeM+"' onchange='updateEditTotals()'><label for='editSizeM6'>:M</label><br>"
								formControl +=			"<input type='text' name='editSizeL6' id='editSizeL6' value='"+data[i].color6SizeL+"' onchange='updateEditTotals()'><label for='editSizeL6'>:L</label><br>"
								formControl +=			"<input type='text' name='editSizeXL6' id='editSizeXL6' value='"+data[i].color6SizeXL+"' onchange='updateEditTotals()'><label for='editSizeXL6'>:XL</label><br>"
								formControl +=			"<input type='text' name='editSize2XL6' id='editSize2XL6' value='"+data[i].color6Size2XL+"' onchange='updateEditTotals()'><label for='editSize2XL6'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editSize3XL6' id='editSize3XL6' value='"+data[i].color6Size3XL+"' onchange='updateEditTotals()'><label for='editSize3XL6'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editSize4XL6' id='editSize4XL6' value='"+data[i].color6Size4XL+"' onchange='updateEditTotals()'><label for='editSize4XL6'>:4XL</label><br>"
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
								formControl += "<div class='col-sm-2' id='editShowSub7'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount7' id='editSubCount7' value='"+data[i].color7Total+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList7'>"
								formControl +=		"<div class='col-sm-3' id='editShowSizes7' style='display: none'>"
								formControl +=			"<label for='storeSizes' class='control-label'> Sizes</label><br>"
								formControl +=			"<input type='text' name='editSizeS7' id='editSizeS7' value='"+data[i].color7SizeS+"' onchange='updateEditTotals()'><label for='editSizeS7'>:S</label><br>"
								formControl +=			"<input type='text' name='editSizeM7' id='editSizeM7' value='"+data[i].color7SizeM+"' onchange='updateEditTotals()'><label for='editSizeM7'>:M</label><br>"
								formControl +=			"<input type='text' name='editSizeL7' id='editSizeL7' value='"+data[i].color7SizeL+"' onchange='updateEditTotals()'><label for='editSizeL7'>:L</label><br>"
								formControl +=			"<input type='text' name='editSizeXL7' id='editSizeXL7' value='"+data[i].color7SizeXL+"' onchange='updateEditTotals()'><label for='editSizeXL7'>:XL</label><br>"
								formControl +=			"<input type='text' name='editSize2XL7' id='editSize2XL7' value='"+data[i].color7Size2XL+"' onchange='updateEditTotals()'><label for='editSize2XL7'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editSize3XL7' id='editSize3XL7' value='"+data[i].color7Size3XL+"' onchange='updateEditTotals()'><label for='editSize3XL7'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editSize4XL7' id='editSize4XL7' value='"+data[i].color7Size4XL+"' onchange='updateEditTotals()'><label for='editSize4XL7'>:4XL</label><br>"
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
								formControl += "<div class='col-sm-2' id='editShowSub8'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount8' id='editSubCount8' value='"+data[i].color8Total+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList8'>"
								formControl +=		"<div class='col-sm-3' id='editShowSizes8' style='display: none'>"
								formControl +=			"<label for='storeSizes' class='control-label'> Sizes</label><br>"
								formControl +=			"<input type='text' name='editSizeS8' id='editSizeS8' value='"+data[i].color8SizeS+"' onchange='updateEditTotals()'><label for='editSizeS8'>:S</label><br>"
								formControl +=			"<input type='text' name='editSizeM8' id='editSizeM8' value='"+data[i].color8SizeM+"' onchange='updateEditTotals()'><label for='editSizeM8'>:M</label><br>"
								formControl +=			"<input type='text' name='editSizeL8' id='editSizeL8' value='"+data[i].color8SizeL+"' onchange='updateEditTotals()'><label for='editSizeL8'>:L</label><br>"
								formControl +=			"<input type='text' name='editSizeXL8' id='editSizeXL8' value='"+data[i].color8SizeXL+"' onchange='updateEditTotals()'><label for='editSizeXL8'>:XL</label><br>"
								formControl +=			"<input type='text' name='editSize2XL8' id='editSize2XL8' value='"+data[i].color8Size2XL+"' onchange='updateEditTotals()'><label for='editSize2XL8'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editSize3XL8' id='editSize3XL8' value='"+data[i].color8Size3XL+"' onchange='updateEditTotals()'><label for='editSize3XL8'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editSize4XL8' id='editSize4XL8' value='"+data[i].color8Size4XL+"' onchange='updateEditTotals()'><label for='editSize4XL8'>:4XL</label><br>"
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
								formControl += "<div class='col-sm-2' id='editShowSub9'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount9' id='editSubCount9' value='"+data[i].color9Total+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList9'>"
								formControl +=		"<div class='col-sm-3' id='editShowSizes9' style='display: none'>"
								formControl +=			"<label for='storeSizes' class='control-label'> Sizes</label><br>"
								formControl +=			"<input type='text' name='editSizeS9' id='editSizeS9' value='"+data[i].color9SizeS+"' onchange='updateEditTotals()'><label for='editSizeS9'>:S</label><br>"
								formControl +=			"<input type='text' name='editSizeM9' id='editSizeM9' value='"+data[i].color9SizeM+"' onchange='updateEditTotals()'><label for='editSizeM9'>:M</label><br>"
								formControl +=			"<input type='text' name='editSizeL9' id='editSizeL9' value='"+data[i].color9SizeL+"' onchange='updateEditTotals()'><label for='editSizeL9'>:L</label><br>"
								formControl +=			"<input type='text' name='editSizeXL9' id='editSizeXL9' value='"+data[i].color9SizeXL+"' onchange='updateEditTotals()'><label for='editSizeXL9'>:XL</label><br>"
								formControl +=			"<input type='text' name='editSize2XL9' id='editSize2XL9' value='"+data[i].color9Size2XL+"' onchange='updateEditTotals()'><label for='editSize2XL9'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editSize3XL9' id='editSize3XL9' value='"+data[i].color9Size3XL+"' onchange='updateEditTotals()'><label for='editSize3XL9'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editSize4XL9' id='editSize4XL9' value='"+data[i].color9Size4XL+"' onchange='updateEditTotals()'><label for='editSize4XL9'>:4XL</label><br>"
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
								formControl += "<div class='col-sm-2' id='editShowSub10'>"
								formControl += "<p>Total</p>"
								formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount10' id='editSubCount10' value='"+data[i].color10Total+"' onchange='updateEditTotals()'>"
								formControl += "</div>"
								formControl += "</div>"
								formControl += "</div><br>"
								
								formControl += "<div class='row' id='editSubSizeList10'>"
								formControl +=		"<div class='col-sm-3' id='editShowSizes10' style='display: none'>"
								formControl +=			"<label for='storeSizes' class='control-label'> Sizes</label><br>"
								formControl +=			"<input type='text' name='editSizeS10' id='editSizeS10' value='"+data[i].color10SizeS+"' onchange='updateEditTotals()'><label for='editSizeS10'>:S</label><br>"
								formControl +=			"<input type='text' name='editSizeM10' id='editSizeM10' value='"+data[i].color10SizeM+"' onchange='updateEditTotals()'><label for='editSizeM10'>:M</label><br>"
								formControl +=			"<input type='text' name='editSizeL10' id='editSizeL10' value='"+data[i].color10SizeL+"' onchange='updateEditTotals()'><label for='editSizeL10'>:L</label><br>"
								formControl +=			"<input type='text' name='editSizeXL10' id='editSizeXL10' value='"+data[i].color10SizeXL+"' onchange='updateEditTotals()'><label for='editSizeXL10'>:XL</label><br>"
								formControl +=			"<input type='text' name='editSize2XL10' id='editSize2XL10' value='"+data[i].color10Size2XL+"' onchange='updateEditTotals()'><label for='editSize2XL10'>:2XL</label><br>"
								formControl +=			"<input type='text' name='editSize3XL10' id='editSize3XL10' value='"+data[i].color10Size3XL+"' onchange='updateEditTotals()'><label for='editSize3XL10'>:3XL</label><br>"
								formControl +=			"<input type='text' name='editSize4XL10' id='editSize4XL10' value='"+data[i].color10Size4XL+"' onchange='updateEditTotals()'><label for='editSize4XL10'>:4XL</label><br>"
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
							
								if(styleIndex>=1)
									document.getElementById("editShowSizes1").style.display = "block";
									
								if(styleIndex>=2)
									document.getElementById("editShowSizes2").style.display = "block";
									
								if(styleIndex>=3)
									document.getElementById("editShowSizes3").style.display = "block";
									
								if(styleIndex>=4)
									document.getElementById("editShowSizes4").style.display = "block";
									
								if(styleIndex>=5)
									document.getElementById("editShowSizes5").style.display = "block";
									
								if(styleIndex>=6)
									document.getElementById("editShowSizes6").style.display = "block";
									
								if(styleIndex>=7)
									document.getElementById("editShowSizes7").style.display = "block";
									
								if(styleIndex>=8)
									document.getElementById("editShowSizes8").style.display = "block";
									
								if(styleIndex>=9)
									document.getElementById("editShowSizes9").style.display = "block";
									
								if(styleIndex>=10)
									document.getElementById("editShowSizes10").style.display = "block";

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
/* ! REQUIRES VALIDATION ATTEMPT ! */
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
	document.getElementById("editCount").value = 0;
	/*document.getElementById("editCountCork").value = 0;
	document.getElementById("editCountKala").value = 0;
	document.getElementById("editCountGalway").value = 0;*/
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
				formControl += "<div class='col-sm-2' id='editShowSub"+i+"'>"
				formControl += "<p></p>"
				formControl += "<input type='text' class='form-control input-lg required' required='required' name='editSubCount"+i+"' id='editSubCount"+i+"' value='0' onchange='updateEditTotals()'>"
				formControl += "</div>"
				formControl += "</div>"
				formControl += "</div><br>"
				formControl += "<div class='row' id='editSubSizeList"+i+"'>"
				formControl +=		"<div class='col-sm-3' id='editShowSizes"+i+"' style='display: none'>"
				formControl +=			"<label for='storeSizes' class='control-label'>Sizes</label><br>"
				formControl +=			"<input type='text' name='editSizeS"+i+"' id='editSizeS"+i+"' value='0' onchange='updateEditTotals()'><label for='editSizeS"+i+"'>:S</label><br>"
				formControl +=			"<input type='text' name='editSizeM"+i+"' id='editSizeM"+i+"' value='0' onchange='updateEditTotals()'><label for='editSizeM"+i+"'>:M</label><br>"
				formControl +=			"<input type='text' name='editSizeL"+i+"' id='editSizeL"+i+"' value='0' onchange='updateEditTotals()'><label for='editSizeL"+i+"'>:L</label><br>"
				formControl +=			"<input type='text' name='editSizeXL"+i+"' id='editSizeXL"+i+"' value='0' onchange='updateEditTotals()'><label for='editSizeXL"+i+"'>:XL</label><br>"
				formControl +=			"<input type='text' name='editSize2XL"+i+"' id='editSize2XL"+i+"' value='0' onchange='updateEditTotals()'><label for='editSize2XL"+i+"'>:2XL</label><br>"
				formControl +=			"<input type='text' name='editSize3XL"+i+"' id='editSize3XL"+i+"' value='0' onchange='updateEditTotals()'><label for='editSize3XL"+i+"'>:3XL</label><br>"
				formControl +=			"<input type='text' name='editSize4XL"+i+"' id='editSize4XL"+i+"' value='0' onchange='updateEditTotals()'><label for='editSize4XL"+i+"'>:4XL</label><br>"
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
	
	var editShowSub = '';

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
		document.getElementById("editShowSizes").style.display =  "none";
	}
	
	if($('#hasColorsEdit').prop('checked')==true)
	{
		document.getElementById("editAddSubStyle").style.display =  "block";
		
		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;
			//var subStyle = document.getElementById("subStyle").id + currStyle;
			var editShowSizes = document.getElementById("editShowSizes").id + currStyle;
			//var subStyle = document.getElementById("editSubStyle").id + currStyle;
			//var addSubStyle = document.getElementById("editAddSubStyle").id + currStyle;
				
			//document.getElementById(addSubStyle).style.display =  "block";
			if($('#hasSizesEdit').prop('checked')==true)
			{
				document.getElementById(editShowSizes).style.display =  "block";
			}
				
			else if($('#hasSizesEdit').prop('checked')==false)
			{
				document.getElementById(editShowSizes).style.display =  "none";
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
			editShowSu = document.getElementById("editShowSub").id + currStyle;
			//var subStyle = document.getElementById("subStyle").id + currStyle;
			//var addSubStyle = document.getElementById("addSubStyle").id + currStyle;
			
			//document.getElementById(addSubStyle).style.display =  "block";
			document.getElementById(editShowSub).style.display =  "block";
		}
	}
	
	if($('#hasSizesEdit').prop('checked')==false)
	{
		document.getElementById("editShowSizes").style.display =  "none";
		
		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;

			var editSubCount = document.getElementById("editSubCount").id + currStyle;
			document.getElementById(editSubCount).value=0;
		}
		
		for(i=1; i<styleIndex+1; i++)
		{
			currStyle=i;
			//var subStyle = document.getElementById("subStyle").id + currStyle;
			editShowSub = document.getElementById("editShowSub").id + currStyle;
			//var subStyle = document.getElementById("subStyle").id + currStyle;
			//var addSubStyle = document.getElementById("addSubStyle").id + currStyle;
				
			//document.getElementById(addSubStyle).style.display =  "block";

			document.getElementById(editShowSub).style.display =  "block";
		}
	}
	
	if(($('#hasSizesEdit').prop('checked')==true) && ($('#hasColorsEdit').prop('checked')==false))
	{	
		document.getElementById("editShowSizes").style.display =  "block";
	}
	
	if(($('#hasSizesEdit').prop('checked')==false) && ($('#hasColorsEdit').prop('checked')==false))
	{
		document.getElementById("editCount").value = 0;
	}

	updateEditTotals();
}

function updateEditTotals()
{
	var i=0;
	var currStyle=0;

	var editTotal = 0;

	var editCountSizeS = 0;
	var editCountSizeM = 0;
	var editCountSizeL = 0;
	var editCountSizeXL = 0;
	var editCountSize2XL = 0;
	var editCountSize3XL = 0;
	var editCountSize4XL = 0;
	var ediTSizeTotal = 0;

	var editSubCount = 0;
	var editTempTotal = 0;

	if($('#hasSizesEdit').prop('checked')==true&&$('#hasColorsEdit').prop('checked')==true)
	{
		document.getElementById("editCount").value = 0;
			
		for(i=1;i<styleIndex+1;i++)
		{
			currStyle = i;
			editTotal = 0;

			var editSizeS = document.getElementById("editSizeS").id + currStyle; 
			var editSizeM = document.getElementById("editSizeM").id + currStyle; 
			var editSizeL = document.getElementById("editSizeL").id + currStyle; 
			var editSizeXL = document.getElementById("editSizeXL").id + currStyle; 
			var editSize2XL = document.getElementById("editSize2XL").id + currStyle; 
			var editSize3XL = document.getElementById("editSize3XL").id + currStyle; 
			var editSize4XL = document.getElementById("editSize4XL").id + currStyle; 
			editCountSizeS = parseInt(document.getElementById(editSizeS).value);
			editCountSizeM = parseInt(document.getElementById(editSizeM).value);
			editCountSizeL = parseInt(document.getElementById(editSizeL).value);
			editCountSizeXL = parseInt(document.getElementById(editSizeXL).value);
			editCountSize2XL = parseInt(document.getElementById(editSize2XL).value);
			editCountSize3XL = parseInt(document.getElementById(editSize3XL).value);
			editCountSize4XL = parseInt(document.getElementById(editSize4XL).value);
			editSizeTotal = parseInt(editCountSizeS) + parseInt(editCountSizeM) + parseInt(editCountSizeL) + parseInt(editCountSizeXL) + parseInt(editCountSize2XL) + parseInt(editCountSize3XL) + parseInt(editCountSize4XL);
			editSubCount = document.getElementById("editSubCount").id + currStyle;
			
			if($('#hasSizesEdit').prop('checked')==true)
			{
				editTotal += parseInt(editSizeTotal);
				document.getElementById(editSubCount).value = editTotal;
				document.getElementById("editCount").value = parseInt(document.getElementById("editCount").value) + parseInt(document.getElementById(editSubCount).value);
			}
			
			else editSizeTotal = 0;

			var editColorTotal = (document.getElementById("editColorTotal").id + currStyle); 
			//console.log(editColorTotal);
			document.getElementById(editColorTotal).value = editTotal;
		}
	}
	
	if($('#hasSizesEdit').prop('checked')==false&&$('#hasColorsEdit').prop('checked')==true)
	{
		editTempTotal = 0;
			
		for(i=1;i<styleIndex+1;i++)
		{
			currStyle = i;
				
			editColorTotal = document.getElementById("editColorTotal").id + currStyle;
			editTotal = 0;
				
			if($('#inEdit').prop('checked')==true)
			{						
				editSubCount = document.getElementById("editSubCount").id + currStyle;	
				editTotal = parseInt(document.getElementById(editSubCount).value) + editTotal;
				editTempTotal = editTempTotal + parseInt(document.getElementById(editSubCount).value);
			}	

			document.getElementById("editCount").value = editTempTotal;

			document.getElementById(editColorTotal).value = editTotal;
		}
	}
		
	if($('#hasSizesEdit').prop('checked')==true&&$('#hasColorsEdit').prop('checked')==false)
	{		
		editTotal = 0;
			
		editCountSizeS = parseInt(document.getElementById("editSizeS").value);
		editCountSizeM = parseInt(document.getElementById("editSizeM").value);
		editCountSizeL = parseInt(document.getElementById("editSizeL").value);
		editCountSizeXL = parseInt(document.getElementById("editSizeXL").value);
		editCountSize2XL = parseInt(document.getElementById("editSize2XL").value);
		editCountSize3XL = parseInt(document.getElementById("editSize3XL").value);
		editCountSize4XL = parseInt(document.getElementById("editSize4XL").value);
		editSizeTotal = parseInt(editCountSizeS) + parseInt(editCountSizeM) + parseInt(editCountSizeL) + parseInt(editCountSizeXL) + parseInt(editCountSize2XL) + parseInt(editCountSize3XL) + parseInt(editCountSize4XL);
			
		if($('#hasSizesEdit').prop('checked')==true)
		{
			editTotal = parseInt(editSizeTotal);
			document.getElementById("editCount").value = editTotal;
		}

		else document.getElementById("editCount").value = 0;
	}

	if($('#hasSizesEdit').prop('checked')==false&&$('#hasColorsEdit').prop('checked')==false)
	{
		document.getElementById("editCount").value = 0;
	}
}
