const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/products");
const { check, validationResult } = require('express-validator');

var hasS;
var hasC;
var hasSP;
var hasMP;
var hasSale;
var styleIndex;

//update product function
router.post("/", [
	//perform validation
	//couple with pre-regex func?

	//check("x").not().isEmpty() for value presence
	//chase strings with .trim().escape()
	check("name").exists().not().isEmpty().trim().escape(),
	check("editCategory").exists().not().isEmpty().trim().escape(),
	check("editDescription").trim().escape(),
	check("hasSizesEdit").trim().escape(),
	check("editColorCode1").trim().escape(),
	check("editColorCode2").trim().escape(),
	check("editColorCode3").trim().escape(),
	check("editColorCode4").trim().escape(),
	check("editColorCode5").trim().escape(),
	check("editColorCode6").trim().escape(),
	check("editColorCode7").trim().escape(),
	check("editColorCode8").trim().escape(),
	check("editColorCode9").trim().escape(),
	check("editColorCode10").trim().escape(),
	check("hasSizesEdit").trim().escape(),
	check("hasColorsEdit").trim().escape(),
	check("editMultiPrice").trim().escape(),
	check("editSinglePrice").trim().escape()
], (req, res, next) => {
		
	//true constants	
	var editName= req.body.editName;
	var editDescription= req.body.editDescription;
	var editCategory= req.body.editCategory;
	
	//include cases: if sizes, if colors->for x colors, etc...
	//need to include all vars to prevent update stall
	//set empty vars to default of "" or 0

	//setup case vars	
	if(req.body.hasSizesEdit=='on')
		hasS = true;
	else hasS = false;
			
	if(req.body.hasColorsEdit=='on')
	{
		hasC = true;
		styleIndex = req.body.editNumSubStyles;
	}
	else hasC = false;
			
	if(req.body.editMultiPrice=='on')
	{
		hasMP = true;
		hasSP = false;
	}
	else if(req.body.editSinglePrice=='on')
	{
		hasMP = false;	
		hasSP = true;
	}		
	else
	{
		hasMP = false;	
		hasSP = false;
	}	
	
	if(req.body.editOnSale=='on')
	{
		hasSale = true;
	}
	else hasSale = false;
		
	if(hasSale==true)
		var onSale = req.body.editOnSale;
	
	//price cases
	if(hasSP==true&&hasMP==false)
	{
		var masterPrice= req.body.editPrice;
		var editPriceS= 0;
		var editPriceM= 0;
		var editPriceL= 0;
		var editPriceXL= 0;
		var editPrice2XL= 0;
		var editPrice3XL= 0;
		var editPrice4XL= 0;
		
		var masterSalePrice= req.body.editSalePrice;
		var editSalePriceS= 0;
		var editSalePriceM= 0;
		var editSalePriceL= 0;
		var editSalePriceXL= 0;
		var editSalePrice2XL= 0;
		var editSalePrice3XL= 0;
		var editSalePrice4XL= 0;
	}
		
	if(hasSP==false&&hasMP==true)
	{
		var masterPrice=0;
		var editPriceS= req.body.editPriceS;
		var editPriceM= req.body.editPriceM;
		var editPriceL= req.body.editPriceL;
		var editPriceXL= req.body.editPriceXL;
		var editPrice2XL= req.body.editPrice2XL;
		var editPrice3XL= req.body.editPrice3XL;
		var editPrice4XL= req.body.editPrice4XL;
		
		var masterSalePrice=0;
		var editSalePriceS= req.body.editSalePriceS;
		var editSalePriceM= req.body.editSalePriceM;
		var editSalePriceL= req.body.editSalePriceL;
		var editSalePriceXL= req.body.editSalePriceXL;
		var editSalePrice2XL= req.body.editSalePrice2XL;
		var editSalePrice3XL= req.body.editSalePrice3XL;
		var editSalePrice4XL= req.body.editSalePrice4XL;
	}	
	
	if(hasSP==false&&hasMP==false)
	{
		var masterPrice= 0;
		var editPriceS= 0;
		var editPriceM= 0;
		var editPriceL= 0;
		var editPriceXL= 0;
		var editPrice2XL= 0;
		var editPrice3XL= 0;
		var editPrice4XL= 0;
		
		var masterSalePrice= 0;
		var editSalePriceS= 0;
		var editSalePriceM= 0;
		var editSalePriceL= 0;
		var editSalePriceXL= 0;
		var editSalePrice2XL= 0;
		var editSalePrice3XL= 0;
		var editSalePrice4XL= 0;
	}
	
	//new set of cases
	//TT
	if(hasS==true&&hasC==true)
	{
		
	var hasSizesEdit=req.body.hasSizesEdit;
	var editNumColors=req.body.editNumSubStyles;
	
			var editSizeS=0;
			var editSizeM=0;
			var editSizeL=0;
			var editSizeXL=0;
			var editSize2XL=0;
			var editSize3XL=0;
			var editSize4XL=0;
			
			if(editNumColors>=1)
			{
				var editColorCode1=req.body.editColor1;
				
				var editColor1SizeS=req.body.editSizeS1;
				var editColor1SizeM=req.body.editSizeM1;
				var editColor1SizeL=req.body.editSizeL1;
				var editColor1SizeXL=req.body.editSizeXL1;
				var editColor1Size2XL=req.body.editSize2XL1;
				var editColor1Size3XL=req.body.editSize3XL1;
				var editColor1Size4XL=req.body.editSize4XL1;
				
				var editColorTotal1= req.body.editColorTotal1;
				var editSubCount1= req.body.editSubCount1;
			}
			
			else
			{
				var editColorCode1="";
				
				var editColor1SizeS=0;
				var editColor1SizeM=0;
				var editColor1SizeL=0;
				var editColor1SizeXL=0;
				var editColor1Size2XL=0;
				var editColor1Size3XL=0;
				var editColor1Size4XL=0;
				
				var editColorTotal1=0;
				var editSubCount1=0;
			}
			
			if(styleIndex>=2)
			{
				var editColorCode2=req.body.editColor2;
				
				var editColor2SizeS=req.body.editSizeS2;
				var editColor2SizeM=req.body.editSizeM2;
				var editColor2SizeL=req.body.editSizeL2;
				var editColor2SizeXL=req.body.editSizeXL2;
				var editColor2Size2XL=req.body.editSize2XL2;
				var editColor2Size3XL=req.body.editSize3XL2;
				var editColor2Size4XL=req.body.editSize4XL2;
				
				var editColorTotal2= req.body.editColorTotal2;
			}
			
			else
			{
				var editColorCode2="";
				
				var editColor2SizeS=0;
				var editColor2SizeM=0;
				var editColor2SizeL=0;
				var editColor2SizeXL=0;
				var editColor2Size2XL=0;
				var editColor2Size3XL=0;
				var editColor2Size4XL=0;
				
				var editColorTotal2=0;
			}
			
			if(styleIndex>=3)
			{
				var editColorCode3=req.body.editColor3;
				
				var editColor3SizeS=req.body.editSizeS3;
				var editColor3SizeM=req.body.editSizeM3;
				var editColor3SizeL=req.body.editSizeL3;
				var editColor3SizeXL=req.body.editSizeXL3;
				var editColor3Size2XL=req.body.editSize2XL3;
				var editColor3Size3XL=req.body.editSize3XL3;
				var editColor3Size4XL=req.body.editSize4XL3;
				
				var editColorTotal3= req.body.editColorTotal3;
			}
			
			else
			{
				var editColorCode3="";
				
				var editColor3SizeS=0;
				var editColor3SizeM=0;
				var editColor3SizeL=0;
				var editColor3SizeXL=0;
				var editColor3Size2XL=0;
				var editColor3Size3XL=0;
				var editColor3Size4XL=0;
				
				var editColorTotal3=0;
			}
			
			
			if(styleIndex>=4)
			{
				var editColorCode4=req.body.editColor4;
				
				var editColor4SizeS=req.body.editSizeS4;
				var editColor4SizeM=req.body.editSizeM4;
				var editColor4SizeL=req.body.editSizeL4;
				var editColor4SizeXL=req.body.editSizeXL4;
				var editColor4Size2XL=req.body.editSize2XL4;
				var editColor4Size3XL=req.body.editSize3XL4;
				var editColor4Size4XL=req.body.editSize4XL4;
				
				var editColorTotal4= req.body.editColorTotal4;
			}
			
			else
			{
				var editColorCode4="";
				
				var editColor4SizeS=0;
				var editColor4SizeM=0;
				var editColor4SizeL=0;
				var editColor4SizeXL=0;
				var editColor4Size2XL=0;
				var editColor4Size3XL=0;
				var editColor4Size4XL=0;
				
				var editColorTotal4=0;
			}
			
			if(styleIndex>=5)
			{
				var editColorCode5=req.body.editColor5;
				
				var editColor5SizeS=req.body.editSizeS5;
				var editColor5SizeM=req.body.editSizeM5;
				var editColor5SizeL=req.body.editSizeL5;
				var editColor5SizeXL=req.body.editSizeXL5;
				var editColor5Size2XL=req.body.editSize2XL5;
				var editColor5Size3XL=req.body.editSize3XL5;
				var editColor5Size4XL=req.body.editSize4XL5;
				
				var editColorTotal5= req.body.editColorTotal5;
			}
			
			else
			{
				var editColorCode5="";
				
				var editColor5SizeS=0;
				var editColor5SizeM=0;
				var editColor5SizeL=0;
				var editColor5SizeXL=0;
				var editColor5Size2XL=0;
				var editColor5Size3XL=0;
				var editColor5Size4XL=0;
				
				var editColorTotal5=0;
			}
			
			
			if(styleIndex>=6)
			{
				var editColorCode6=req.body.editColor6;
				
				var editColor6SizeS=req.body.editSizeS6;
				var editColor6SizeM=req.body.editSizeM6;
				var editColor6SizeL=req.body.editSizeL6;
				var editColor6SizeXL=req.body.editSizeXL6;
				var editColor6Size2XL=req.body.editSize2XL6;
				var editColor6Size3XL=req.body.editSize3XL6;
				var editColor6Size4XL=req.body.editSize4XL6;
				
				var editColorTotal6= req.body.editColorTotal6;
			}
			
			else
			{
				var editColorCode6="";
				
				var editColor6SizeS=0;
				var editColor6SizeM=0;
				var editColor6SizeL=0;
				var editColor6SizeXL=0;
				var editColor6Size2XL=0;
				var editColor6Size3XL=0;
				var editColor6Size4XL=0;
				
				var editColorTotal6=0;
			}

			if(styleIndex>=7)
			{
				var editColorCode7=req.body.editColor7;
				
				var editColor7SizeS=req.body.editSizeS7;
				var editColor7SizeM=req.body.editSizeM7;
				var editColor7SizeL=req.body.editSizeL7;
				var editColor7SizeXL=req.body.editSizeXL7;
				var editColor7Size2XL=req.body.editSize2XL7;
				var editColor7Size3XL=req.body.editSize3XL7;
				var editColor7Size4XL=req.body.editSize4XL7;
				
				var editColorTotal7= req.body.editColorTotal7;
			}
			
			else
			{
				var editColorCode7="";
				
				var editColor7SizeS=0;
				var editColor7SizeM=0;
				var editColor7SizeL=0;
				var editColor7SizeXL=0;
				var editColor7Size2XL=0;
				var editColor7Size3XL=0;
				var editColor7Size4XL=0;
				
				var editColorTotal7=0;
			}
			
			if(styleIndex>=8)
			{
				var editColorCode8=req.body.editColor8;
				
				var editColor8SizeS=req.body.editSizeS8;
				var editColor8SizeM=req.body.editSizeM8;
				var editColor8SizeL=req.body.editSizeL8;
				var editColor8SizeXL=req.body.editSizeXL8;
				var editColor8Size2XL=req.body.editSize2XL8;
				var editColor8Size3XL=req.body.editSize3XL8;
				var editColor8Size4XL=req.body.editSize4XL8;
				
				var editColorTotal8= req.body.editColorTotal8;
			}
			
			else
			{
				var editColorCode8="";
				
				var editColor8SizeS=0;
				var editColor8SizeM=0;
				var editColor8SizeL=0;
				var editColor8SizeXL=0;
				var editColor8Size2XL=0;
				var editColor8Size3XL=0;
				var editColor8Size4XL=0;
				
				var editColorTotal8=0;
			}
			
			if(styleIndex>=9)
			{
				var editColorCode9=req.body.editColor9;
				
				var editColor9SizeS=req.body.editSizeS9;
				var editColor9SizeM=req.body.editSizeM9;
				var editColor9SizeL=req.body.editSizeL9;
				var editColor9SizeXL=req.body.editSizeXL9;
				var editColor9Size2XL=req.body.editSize2XL9;
				var editColor9Size3XL=req.body.editSize3XL9;
				var editColor9Size4XL=req.body.editSize4XL9;
				
				var editColorTotal9= req.body.editColorTotal9;
			}
			
			else
			{
				var editColorCode9="";
				
				var editColor9SizeS=0;
				var editColor9SizeM=0;
				var editColor9SizeL=0;
				var editColor9SizeXL=0;
				var editColor9Size2XL=0;
				var editColor9Size3XL=0;
				var editColor9Size4XL=0;
				
				var editColorTotal9=0;
			}
			
			if(styleIndex>=10)
			{
				var editColorCode10=req.body.editColor10;
				
				var editColor10SizeS=req.body.editSizeS10;
				var editColor10SizeM=req.body.editSizeM10;
				var editColor10SizeL=req.body.editSizeL10;
				var editColor10SizeXL=req.body.editSizeXL10;
				var editColor10Size2XL=req.body.editSize2XL10;
				var editColor10Size3XL=req.body.editSize3XL10;
				var editColor10Size4XL=req.body.editSize4XL10;
				
				var editColorTotal10= req.body.editColorTotal10;
			}
			
			else
			{
				var editColorCode10="";
				
				var editColor10SizeS=0;
				var editColor10SizeM=0;
				var editColor10SizeL=0;
				var editColor10SizeXL=0;
				var editColor10Size2XL=0;
				var editColor10Size3XL=0;
				var editColor10Size4XL=0;
				
				var editColorTotal10=0;
			}
			
			var editTotal= req.body.editCount;
	}
	
	//TF
	if(hasS==true&&hasC==false)
	{

	var hasSizesEdit=req.body.hasSizesEdit;
	var editNumColors=0;
	
			var editSizeS=req.body.editSizeS;
			var editSizeM=req.body.editSizeM;
			var editSizeL=req.body.editSizeL;
			var editSizeXL=req.body.editSizeXL;
			var editSize2XL=req.body.editSize2XL;
			var editSize3XL=req.body.editSize3XL;
			var editSize4XL=req.body.editSize4XL;
			
			var editColorCode1="";
			var editColorCode2="";
			var editColorCode3="";
			var editColorCode4="";
			var editColorCode5="";
			var editColorCode6="";
			var editColorCode7="";
			var editColorCode8="";
			var editColorCode9="";
			var editColorCode10="";
			
			var editColor1SizeS=0;
			var editColor1SizeM=0;
			var editColor1SizeL=0;
			var editColor1SizeXL=0;
			var editColor1Size2XL=0;
			var editColor1Size3XL=0;
			var editColor1Size4XL=0;
			
			var editColorTotal1=0;
			
			var editColor2SizeS=0;
			var editColor2SizeM=0;
			var editColor2SizeL=0;
			var editColor2SizeXL=0;
			var editColor2Size2XL=0;
			var editColor2Size3XL=0;
			var editColor2Size4XL=0;
			
			var editColorTotal2=0;
			
			var editColor3SizeS=0;
			var editColor3SizeM=0;
			var editColor3SizeL=0;
			var editColor3SizeXL=0;
			var editColor3Size2XL=0;
			var editColor3Size3XL=0;
			var editColor3Size4XL=0;
			
			var editColorTotal3=0;
			
			var editColor4SizeS=0;
			var editColor4SizeM=0;
			var editColor4SizeL=0;
			var editColor4SizeXL=0;
			var editColor4Size2XL=0;
			var editColor4Size3XL=0;
			var editColor4Size4XL=0;
			
			var editColorTotal4=0;
			
			var editColor5SizeS=0;
			var editColor5SizeM=0;
			var editColor5SizeL=0;
			var editColor5SizeXL=0;
			var editColor5Size2XL=0;
			var editColor5Size3XL=0;
			var editColor5Size4XL=0;
			
			var editColorTotal5=0;
			
			var editColor6SizeS=0;
			var editColor6SizeM=0;
			var editColor6SizeL=0;
			var editColor6SizeXL=0;
			var editColor6Size2XL=0;
			var editColor6Size3XL=0;
			var editColor6Size4XL=0;
			
			var editColorTotal6=0;
			
			var editColor7SizeS=0;
			var editColor7SizeM=0;
			var editColor7SizeL=0;
			var editColor7SizeXL=0;
			var editColor7Size2XL=0;
			var editColor7Size3XL=0;
			var editColor7Size4XL=0;
			
			var editColorTotal7=0;
			
			var editColor8SizeS=0;
			var editColor8SizeM=0;
			var editColor8SizeL=0;
			var editColor8SizeXL=0;
			var editColor8Size2XL=0;
			var editColor8Size3XL=0;
			var editColor8Size4XL=0;
			
			var editColorTotal8=0;
			
			var editColor9SizeS=0;
			var editColor9SizeM=0;
			var editColor9SizeL=0;
			var editColor9SizeXL=0;
			var editColor9Size2XL=0;
			var editColor9Size3XL=0;
			var editColor9Size4XL=0;
			
			var editColorTotal9=0;
			
			var editColor10SizeS=0;
			var editColor10SizeM=0;
			var editColor10SizeL=0;
			var editColor10SizeXL=0;
			var editColor10Size2XL=0;
			var editColor10Size3XL=0;
			var editColor10Size4XL=0;
			
			var editColorTotal10=0;
			
			var editTotal= req.body.editCount;
	}
	
	//FT
	if(hasS==false&&hasC==true)
	{

	var hasSizesEdit=req.body.hasSizesEdit;
	var editNumColors=req.body.editNumSubStyles;
			
			var editSizeS=0;
			var editSizeM=0;
			var editSizeL=0;
			var editSizeXL=0;
			var editSize2XL=0;
			var editSize3XL=0;
			var editSize4XL=0;
			
			if(styleIndex>=1)
			{		
				var editColorCode1=req.body.editColor1;
				var editColorTotal1= req.body.editColorTotal1;
			}
			
			else
			{
				var editColorCode1="";
				var editColorTotal1=0;
			}
			
			if(styleIndex>=2)
			{			
				var editColorCode2=req.body.editColor2;
				var editColorTotal2= req.body.editColorTotal2;
			}
			
			else
			{
				var editColorCode2="";
				var editColorTotal2=0;
			}
			
			if(styleIndex>=3)
			{				
				var editColorCode3=req.body.editColor3;
				var editColorTotal3= req.body.editColorTotal3;
			}
			
			else
			{
				var editColorCode3="";
				var editColorTotal3=0;
			}
			
			if(styleIndex>=4)
			{				
				var editColorCode4=req.body.editColor4;
				var editColorTotal4= req.body.editColorTotal4;
			}
			
			else
			{
				var editColorCode4="";
				var editColorTotal4=0;
			}
			
			if(styleIndex>=5)
			{				
				var editColorCode5=req.body.editColor5;
				var editColorTotal5= req.body.editColorTotal5;
			}
			
			else
			{
				var editColorCode5="";
				var editColorTotal5=0;
			}
			
			if(styleIndex>=6)
			{				
				var editColorCode6=req.body.editColor6;
				var editColorTotal6= req.body.editColorTotal6;
			}
			
			else
			{
				var editColorCode6="";
				var editColorTotal6=0;
			}
			
			if(styleIndex>=7)
			{				
				var editColorCode7=req.body.editColor7;
				var editColorTotal7= req.body.editColorTotal7;
			}
			
			else
			{
				var editColorCode7="";
				var editColorTotal7=0;
			}
			
			if(styleIndex>=8)
			{				
				var editColorCode8=req.body.editColor8;
				var editColorTotal8= req.body.editColorTotal8;
			}
			
			else
			{
				var editColorCode8="";
				var editColorTotal8=0;
			}
			
			if(styleIndex>=9)
			{				
				var editColorCode9=req.body.editColor9;
				var editColorTotal9= req.body.editColorTotal9;
			}
			
			else
			{
				var editColorCode9="";
				var editColorTotal9=0;
			}
			
			if(styleIndex>=10)
			{				
				var editColorCode10=req.body.editColor10;
				var editColorTotal10= req.body.editColorTotal10;
			}
			
			else
			{
				var editColorCode10="";
				var editColorTotal10=0;
			}
			
			var editColor1SizeS=0;
			var editColor1SizeM=0;
			var editColor1SizeL=0;
			var editColor1SizeXL=0;
			var editColor1Size2XL=0;
			var editColor1Size3XL=0;
			var editColor1Size4XL=0;

			var editColor2SizeS=0;
			var editColor2SizeM=0;
			var editColor2SizeL=0;
			var editColor2SizeXL=0;
			var editColor2Size2XL=0;
			var editColor2Size3XL=0;
			var editColor2Size4XL=0;
			
			var editColor3SizeS=0;
			var editColor3SizeM=0;
			var editColor3SizeL=0;
			var editColor3SizeXL=0;
			var editColor3Size2XL=0;
			var editColor3Size3XL=0;
			var editColor3Size4XL=0;
			
			var editColor4SizeS=0;
			var editColor4SizeM=0;
			var editColor4SizeL=0;
			var editColor4SizeXL=0;
			var editColor4Size2XL=0;
			var editColor4Size3XL=0;
			var editColor4Size4XL=0;

			var editColor5SizeS=0;
			var editColor5SizeM=0;
			var editColor5SizeL=0;
			var editColor5SizeXL=0;
			var editColor5Size2XL=0;
			var editColor5Size3XL=0;
			var editColor5Size4XL=0;
			
			var editColor6SizeS=0;
			var editColor6SizeM=0;
			var editColor6SizeL=0;
			var editColor6SizeXL=0;
			var editColor6Size2XL=0;
			var editColor6Size3XL=0;
			var editColor6Size4XL=0;
			
			var editColor7SizeS=0;
			var editColor7SizeM=0;
			var editColor7SizeL=0;
			var editColor7SizeXL=0;
			var editColor7Size2XL=0;
			var editColor7Size3XL=0;
			var editColor7Size4XL=0;
			
			var editColor8SizeS=0;
			var editColor8SizeM=0;
			var editColor8SizeL=0;
			var editColor8SizeXL=0;
			var editColor8Size2XL=0;
			var editColor8Size3XL=0;
			var editColor8Size4XL=0;
			
			var editColor9SizeS=0;
			var editColor9SizeM=0;
			var editColor9SizeL=0;
			var editColor9SizeXL=0;
			var editColor9Size2XL=0;
			var editColor9Size3XL=0;
			var editColor9Size4XL=0;
			
			var editColor10SizeS=0;
			var editColor10SizeM=0;
			var editColor10SizeL=0;
			var editColor10SizeXL=0;
			var editColor10Size2XL=0;
			var editColor10Size3XL=0;
			var editColor10Size4XL=0;
			
			var editTotal = req.body.editCount;
	}
	
	//FF
	if(hasS==false&&hasC==false)
	{

	var hasSizesEdit=req.body.hasSizesEdit;
	var editNumColors=0;
			
			var editSizeS=0;
			var editSizeM=0;
			var editSizeL=0;
			var editSizeXL=0;
			var editSize2XL=0;
			var editSize3XL=0;
			var editSize4XL=0;
			
			var editColorCode1="";
			var editColorCode2="";
			var editColorCode3="";
			var editColorCode4="";
			var editColorCode5="";
			var editColorCode6="";
			var editColorCode7="";
			var editColorCode8="";
			var editColorCode9="";
			var editColorCode10="";
			
			var editColor1SizeS=0;
			var editColor1SizeM=0;
			var editColor1SizeL=0;
			var editColor1SizeXL=0;
			var editColor1Size2XL=0;
			var editColor1Size3XL=0;
			var editColor1Size4XL=0;
			
			var editColorTotal1=0;
			
			var editColor2SizeS=0;
			var editColor2SizeM=0;
			var editColor2SizeL=0;
			var editColor2SizeXL=0;
			var editColor2Size2XL=0;
			var editColor2Size3XL=0;
			var editColor2Size4XL=0;
			
			var editColorTotal2=0;
			
			var editColor3SizeS=0;
			var editColor3SizeM=0;
			var editColor3SizeL=0;
			var editColor3SizeXL=0;
			var editColor3Size2XL=0;
			var editColor3Size3XL=0;
			var editColor3Size4XL=0;
			
			var editColorTotal3=0;
			
			var editColor4SizeS=0;
			var editColor4SizeM=0;
			var editColor4SizeL=0;
			var editColor4SizeXL=0;
			var editColor4Size2XL=0;
			var editColor4Size3XL=0;
			var editColor4Size4XL=0;
			
			var editColorTotal4=0;
			
			var editColor5SizeS=0;
			var editColor5SizeM=0;
			var editColor5SizeL=0;
			var editColor5SizeXL=0;
			var editColor5Size2XL=0;
			var editColor5Size3XL=0;
			var editColor5Size4XL=0;
			
			var editColorTotal5=0;
			
			var editColor6SizeS=0;
			var editColor6SizeM=0;
			var editColor6SizeL=0;
			var editColor6SizeXL=0;
			var editColor6Size2XL=0;
			var editColor6Size3XL=0;
			var editColor6Size4XL=0;
			
			var editColorTotal6=0;
			
			var editColor7SizeS=0;
			var editColor7SizeM=0;
			var editColor7SizeL=0;
			var editColor7SizeXL=0;
			var editColor7Size2XL=0;
			var editColor7Size3XL=0;
			var editColor7Size4XL=0;
			
			var editColorTotal7=0;

			var editColor8SizeS=0;
			var editColor8SizeM=0;
			var editColor8SizeL=0;
			var editColor8SizeXL=0;
			var editColor8Size2XL=0;
			var editColor8Size3XL=0;
			var editColor8Size4XL=0;
			
			var editColorTotal8=0;
			
			var editColor9SizeS=0;
			var editColor9SizeM=0;
			var editColor9SizeL=0;
			var editColor9SizeXL=0;
			var editColor9Size2XL=0;
			var editColor9Size3XL=0;
			var editColor9Size4XL=0;
			
			var editColorTotal9=0;
			
			var editColor10SizeS=0;
			var editColor10SizeM=0;
			var editColor10SizeL=0;
			var editColor10SizeXL=0;
			var editColor10Size2XL=0;
			var editColor10Size3XL=0;
			var editColor10Size4XL=0;
			
			var editColorTotal10=0;
			var editSubCount10=0;
			
			var editTotal= req.body.editCount;
	}
	
    console.log("routes function");
    console.log(req.body);

		Product.find({name: req.body.editName}).updateOne({	
			//full list of vars included to prevent update stall
			'name': editName,
			'description': editDescription,
			'category': editCategory,
			
			'hasSizes': hasSizesEdit,
			'numColors': editNumColors,
			
			'onSale': onSale,
			'masterPrice': masterPrice,
			'priceS': editPriceS,
			'priceM': editPriceM,
			'priceL': editPriceL,
			'priceXL': editPriceXL,
			'price2XL': editPrice2XL,
			'price3XL': editPrice3XL,
			'price4XL': editPrice4XL,
			
			'masterSalePrice': masterSalePrice,
			'salePriceS': editSalePriceS,
			'salePriceM': editSalePriceM,
			'salePriceL': editSalePriceL,
			'salePriceXL': editSalePriceXL,
			'salePrice2XL': editSalePrice2XL,
			'salePrice3XL': editSalePrice3XL,
			'salePrice4XL': editSalePrice4XL,
		
			'sizeS': editSizeS,
			'sizeM': editSizeM,
			'sizeL': editSizeL,
			'sizeXL': editSizeXL,
			'size2XL': editSize2XL,
			'size3XL': editSize3XL,
			'size4XL': editSize4XL,

			'colorCode1': editColorCode1,
			'colorCode2': editColorCode2,
			'colorCode3': editColorCode3,
			'colorCode4': editColorCode4,
			'colorCode5': editColorCode5,
			'colorCode6': editColorCode6,
			'colorCode7': editColorCode7,
			'colorCode8': editColorCode8,
			'colorCode9': editColorCode9,
			'colorCode10': editColorCode10,
			
			'color1SizeS':editColor1SizeS,
			'color1SizeM':editColor1SizeM,
			'color1SizeL':editColor1SizeL,
			'color1SizeXL':editColor1SizeXL,
			'color1Size2XL':editColor1Size2XL,
			'color1Size3XL':editColor1Size3XL,
			'color1Size4XL':editColor1Size4XL,
			
			'color1Total': editColorTotal1,
			
			'color2SizeS':editColor2SizeS,
			'color2SizeM':editColor2SizeM,
			'color2SizeL':editColor2SizeL,
			'color2SizeXL':editColor2SizeXL,
			'color2Size2XL':editColor2Size2XL,
			'color2Size3XL':editColor2Size3XL,
			'color2Size4XL':editColor2Size4XL,
			
			'color2Total': editColorTotal2,
			
			'color3SizeS':editColor3SizeS,
			'color3SizeM':editColor3SizeM,
			'color3SizeL':editColor3SizeL,
			'color3SizeXL':editColor3SizeXL,
			'color3Size2XL':editColor3Size2XL,
			'color3Size3XL':editColor3Size3XL,
			'color3Size4XL':editColor3Size4XL,
			
			'color3Total': editColorTotal3,
		
			'color4SizeS':editColor4SizeS,
			'color4SizeM':editColor4SizeM,
			'color4SizeL':editColor4SizeL,
			'color4SizeXL':editColor4SizeXL,
			'color4Size2XL':editColor4Size2XL,
			'color4Size3XL':editColor4Size3XL,
			'color4Size4XL':editColor4Size4XL,
			
			'color4Total': editColorTotal4,

			'color5SizeS':editColor5SizeS,
			'color5SizeM':editColor5SizeM,
			'color5SizeL':editColor5SizeL,
			'color5SizeXL':editColor5SizeXL,
			'color5Size2XL':editColor5Size2XL,
			'color5Size3XL':editColor5Size3XL,
			'color5Size4XL':editColor5Size4XL,

			'color5Total': editColorTotal5,

			'color6SizeS':editColor6SizeS,
			'color6SizeM':editColor6SizeM,
			'color6SizeL':editColor6SizeL,
			'color6SizeXL':editColor6SizeXL,
			'color6Size2XL':editColor6Size2XL,
			'color6Size3XL':editColor6Size3XL,
			'color6Size4XL':editColor6Size4XL,
			
			'color6Total': editColorTotal6,
			
			'color7SizeS':editColor7SizeS,
			'color7SizeM':editColor7SizeM,
			'color7SizeL':editColor7SizeL,
			'color7SizeXL':editColor7SizeXL,
			'color7Size2XL':editColor7Size2XL,
			'color7Size3XL':editColor7Size3XL,
			'color7Size4XL':editColor7Size4XL,
			
			'color7Total': editColorTotal7,
		
			'color8SizeS':editColor8SizeS,
			'color8SizeM':editColor8SizeM,
			'color8SizeL':editColor8SizeL,
			'color8SizeXL':editColor8SizeXL,
			'color8Size2XL':editColor8Size2XL,
			'color8Size3XL':editColor8Size3XL,
			'color8Size4XL':editColor8Size4XL,
			
			'color8Total': editColorTotal8,
			
			'color9SizeS':editColor9SizeS,
			'color9SizeM':editColor9SizeM,
			'color9SizeL':editColor9SizeL,
			'color9SizeXL':editColor9SizeXL,
			'color9Size2XL':editColor9Size2XL,
			'color9Size3XL':editColor9Size3XL,
			'color9Size4XL':editColor9Size4XL,
			
			'color9Total': editColorTotal9,

			'color10SizeS':editColor10SizeS,
			'color10SizeM':editColor10SizeM,
			'color10SizeL':editColor10SizeL,
			'color10SizeXL':editColor10SizeXL,
			'color10Size2XL':editColor10Size2XL,
			'color10Size3XL':editColor10Size3XL,
			'color10Size4XL':editColor10Size4XL,

			'color10Total': editColorTotal10,

			'total': editTotal,
		})
			.exec()
			.then(doc => {
				console.log(styleIndex);
				console.log("From database", doc);
				res.redirect('/management');
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({error: err});
			});
});

module.exports = router;
