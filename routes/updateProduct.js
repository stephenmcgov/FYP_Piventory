const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/products");

var hasS;
var hasC;
var hasSP;
var hasMP;
var hasSale;
var styleIndex;

//update product function
router.post("/", (req, res, next) => {
		
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

	var inWarehouseEdit = req.body.inWarehouseEdit;
	
			var editWarehouseSizeS=0;
			var editWarehouseSizeM=0;
			var editWarehouseSizeL=0;
			var editWarehouseSizeXL=0;
			var editWarehouseSize2XL=0;
			var editWarehouseSize3XL=0;
			var editWarehouseSize4XL=0;
			
			if(editNumColors>=1)
			{
				var editColorCode1=req.body.editColor1;
				
				var editColor1WarehouseSizeS=req.body.editWarehouseSizeS1;
				var editColor1WarehouseSizeM=req.body.editWarehouseSizeM1;
				var editColor1WarehouseSizeL=req.body.editWarehouseSizeL1;
				var editColor1WarehouseSizeXL=req.body.editWarehouseSizeXL1;
				var editColor1WarehouseSize2XL=req.body.editWarehouseSize2XL1;
				var editColor1WarehouseSize3XL=req.body.editWarehouseSize3XL1;
				var editColor1WarehouseSize4XL=req.body.editWarehouseSize4XL1;
				
				var editColorTotal1= req.body.editColorTotal1;
				var editSubCountWarehouse1= req.body.editSubCountWarehouse1;
			}
			
			else
			{
				var editColorCode1="";
				
				var editColor1WarehouseSizeS=0;
				var editColor1WarehouseSizeM=0;
				var editColor1WarehouseSizeL=0;
				var editColor1WarehouseSizeXL=0;
				var editColor1WarehouseSize2XL=0;
				var editColor1WarehouseSize3XL=0;
				var editColor1WarehouseSize4XL=0;
				
				var editColorTotal1=0;
				var editSubCountWarehouse1=0;
			}
			
			if(styleIndex>=2)
			{
				var editColorCode2=req.body.editColor2;
				
				var editColor2WarehouseSizeS=req.body.editWarehouseSizeS2;
				var editColor2WarehouseSizeM=req.body.editWarehouseSizeM2;
				var editColor2WarehouseSizeL=req.body.editWarehouseSizeL2;
				var editColor2WarehouseSizeXL=req.body.editWarehouseSizeXL2;
				var editColor2WarehouseSize2XL=req.body.editWarehouseSize2XL2;
				var editColor2WarehouseSize3XL=req.body.editWarehouseSize3XL2;
				var editColor2WarehouseSize4XL=req.body.editWarehouseSize4XL2;
				
				var editColorTotal2= req.body.editColorTotal2;
				var editSubCountWarehouse2= req.body.editSubCountWarehouse2;
			}
			
			else
			{
				var editColorCode2="";
				
				var editColor2WarehouseSizeS=0;
				var editColor2WarehouseSizeM=0;
				var editColor2WarehouseSizeL=0;
				var editColor2WarehouseSizeXL=0;
				var editColor2WarehouseSize2XL=0;
				var editColor2WarehouseSize3XL=0;
				var editColor2WarehouseSize4XL=0;
				
				var editColorTotal2=0;
				var editSubCountWarehouse2=0;
			}
			
			if(styleIndex>=3)
			{
				var editColorCode3=req.body.editColor3;
				
				var editColor3WarehouseSizeS=req.body.editWarehouseSizeS3;
				var editColor3WarehouseSizeM=req.body.editWarehouseSizeM3;
				var editColor3WarehouseSizeL=req.body.editWarehouseSizeL3;
				var editColor3WarehouseSizeXL=req.body.editWarehouseSizeXL3;
				var editColor3WarehouseSize2XL=req.body.editWarehouseSize2XL3;
				var editColor3WarehouseSize3XL=req.body.editWarehouseSize3XL3;
				var editColor3WarehouseSize4XL=req.body.editWarehouseSize4XL3;
				
				var editColorTotal3= req.body.editColorTotal3;
				var editSubCountWarehouse3= req.body.editSubCountWarehouse3;
			}
			
			else
			{
				var editColorCode3="";
				
				var editColor3WarehouseSizeS=0;
				var editColor3WarehouseSizeM=0;
				var editColor3WarehouseSizeL=0;
				var editColor3WarehouseSizeXL=0;
				var editColor3WarehouseSize2XL=0;
				var editColor3WarehouseSize3XL=0;
				var editColor3WarehouseSize4XL=0;
				
				var editColorTotal3=0;
				var editSubCountWarehouse3=0;
			}
			
			
			if(styleIndex>=4)
			{
				var editColorCode4=req.body.editColor4;
				
				var editColor4WarehouseSizeS=req.body.editWarehouseSizeS4;
				var editColor4WarehouseSizeM=req.body.editWarehouseSizeM4;
				var editColor4WarehouseSizeL=req.body.editWarehouseSizeL4;
				var editColor4WarehouseSizeXL=req.body.editWarehouseSizeXL4;
				var editColor4WarehouseSize2XL=req.body.editWarehouseSize2XL4;
				var editColor4WarehouseSize3XL=req.body.editWarehouseSize3XL4;
				var editColor4WarehouseSize4XL=req.body.editWarehouseSize4XL4;
				
				var editColorTotal4= req.body.editColorTotal4;
				var editSubCountWarehouse4= req.body.editSubCountWarehouse4;
			}
			
			else
			{
				var editColorCode4="";
				
				var editColor4WarehouseSizeS=0;
				var editColor4WarehouseSizeM=0;
				var editColor4WarehouseSizeL=0;
				var editColor4WarehouseSizeXL=0;
				var editColor4WarehouseSize2XL=0;
				var editColor4WarehouseSize3XL=0;
				var editColor4WarehouseSize4XL=0;
				
				var editColorTotal4=0;
				var editSubCountWarehouse4=0;
			}
			
			if(styleIndex>=5)
			{
				var editColorCode5=req.body.editColor5;
				
				var editColor5WarehouseSizeS=req.body.editWarehouseSizeS5;
				var editColor5WarehouseSizeM=req.body.editWarehouseSizeM5;
				var editColor5WarehouseSizeL=req.body.editWarehouseSizeL5;
				var editColor5WarehouseSizeXL=req.body.editWarehouseSizeXL5;
				var editColor5WarehouseSize2XL=req.body.editWarehouseSize2XL5;
				var editColor5WarehouseSize3XL=req.body.editWarehouseSize3XL5;
				var editColor5WarehouseSize4XL=req.body.editWarehouseSize4XL5;
				
				var editColorTotal5= req.body.editColorTotal5;
				var editSubCountWarehouse5= req.body.editSubCountWarehouse5;
			}
			
			else
			{
				var editColorCode5="";
				
				var editColor5WarehouseSizeS=0;
				var editColor5WarehouseSizeM=0;
				var editColor5WarehouseSizeL=0;
				var editColor5WarehouseSizeXL=0;
				var editColor5WarehouseSize2XL=0;
				var editColor5WarehouseSize3XL=0;
				var editColor5WarehouseSize4XL=0;
				
				var editColorTotal5=0;
				var editSubCountWarehouse5=0;
			}
			
			
			if(styleIndex>=6)
			{
				var editColorCode6=req.body.editColor6;
				
				var editColor6WarehouseSizeS=req.body.editWarehouseSizeS6;
				var editColor6WarehouseSizeM=req.body.editWarehouseSizeM6;
				var editColor6WarehouseSizeL=req.body.editWarehouseSizeL6;
				var editColor6WarehouseSizeXL=req.body.editWarehouseSizeXL6;
				var editColor6WarehouseSize2XL=req.body.editWarehouseSize2XL6;
				var editColor6WarehouseSize3XL=req.body.editWarehouseSize3XL6;
				var editColor6WarehouseSize4XL=req.body.editWarehouseSize4XL6;
				
				var editColorTotal6= req.body.editColorTotal6;
				var editSubCountWarehouse6= req.body.editSubCountWarehouse6;
			}
			
			else
			{
				var editColorCode6="";
				
				var editColor6WarehouseSizeS=0;
				var editColor6WarehouseSizeM=0;
				var editColor6WarehouseSizeL=0;
				var editColor6WarehouseSizeXL=0;
				var editColor6WarehouseSize2XL=0;
				var editColor6WarehouseSize3XL=0;
				var editColor6WarehouseSize4XL=0;
				
				var editColorTotal6=0;
				var editSubCountWarehouse6=0;
			}

			if(styleIndex>=7)
			{
				var editColorCode7=req.body.editColor7;
				
				var editColor7WarehouseSizeS=req.body.editWarehouseSizeS7;
				var editColor7WarehouseSizeM=req.body.editWarehouseSizeM7;
				var editColor7WarehouseSizeL=req.body.editWarehouseSizeL7;
				var editColor7WarehouseSizeXL=req.body.editWarehouseSizeXL7;
				var editColor7WarehouseSize2XL=req.body.editWarehouseSize2XL7;
				var editColor7WarehouseSize3XL=req.body.editWarehouseSize3XL7;
				var editColor7WarehouseSize4XL=req.body.editWarehouseSize4XL7;
				
				var editColorTotal7= req.body.editColorTotal7;
				var editSubCountWarehouse7= req.body.editSubCountWarehouse7;
			}
			
			else
			{
				var editColorCode7="";
				
				var editColor7WarehouseSizeS=0;
				var editColor7WarehouseSizeM=0;
				var editColor7WarehouseSizeL=0;
				var editColor7WarehouseSizeXL=0;
				var editColor7WarehouseSize2XL=0;
				var editColor7WarehouseSize3XL=0;
				var editColor7WarehouseSize4XL=0;
				
				var editColorTotal7=0;
				var editSubCountWarehouse7=0;
			}
			
			if(styleIndex>=8)
			{
				var editColorCode8=req.body.editColor8;
				
				var editColor8WarehouseSizeS=req.body.editWarehouseSizeS8;
				var editColor8WarehouseSizeM=req.body.editWarehouseSizeM8;
				var editColor8WarehouseSizeL=req.body.editWarehouseSizeL8;
				var editColor8WarehouseSizeXL=req.body.editWarehouseSizeXL8;
				var editColor8WarehouseSize2XL=req.body.editWarehouseSize2XL8;
				var editColor8WarehouseSize3XL=req.body.editWarehouseSize3XL8;
				var editColor8WarehouseSize4XL=req.body.editWarehouseSize4XL8;
				
				var editColorTotal8= req.body.editColorTotal8;
				var editSubCountWarehouse8= req.body.editSubCountWarehouse8;
			}
			
			else
			{
				var editColorCode8="";
				
				var editColor8WarehouseSizeS=0;
				var editColor8WarehouseSizeM=0;
				var editColor8WarehouseSizeL=0;
				var editColor8WarehouseSizeXL=0;
				var editColor8WarehouseSize2XL=0;
				var editColor8WarehouseSize3XL=0;
				var editColor8WarehouseSize4XL=0;
				
				var editColorTotal8=0;
				var editSubCountWarehouse8=0;
			}
			
			if(styleIndex>=9)
			{
				var editColorCode9=req.body.editColor9;
				
				var editColor9WarehouseSizeS=req.body.editWarehouseSizeS9;
				var editColor9WarehouseSizeM=req.body.editWarehouseSizeM9;
				var editColor9WarehouseSizeL=req.body.editWarehouseSizeL9;
				var editColor9WarehouseSizeXL=req.body.editWarehouseSizeXL9;
				var editColor9WarehouseSize2XL=req.body.editWarehouseSize2XL9;
				var editColor9WarehouseSize3XL=req.body.editWarehouseSize3XL9;
				var editColor9WarehouseSize4XL=req.body.editWarehouseSize4XL9;
				
				var editColorTotal9= req.body.editColorTotal9;
				var editSubCountWarehouse9= req.body.editSubCountWarehouse9;
			}
			
			else
			{
				var editColorCode9="";
				
				var editColor9WarehouseSizeS=0;
				var editColor9WarehouseSizeM=0;
				var editColor9WarehouseSizeL=0;
				var editColor9WarehouseSizeXL=0;
				var editColor9WarehouseSize2XL=0;
				var editColor9WarehouseSize3XL=0;
				var editColor9WarehouseSize4XL=0;
				
				var editColorTotal9=0;
				var editSubCountWarehouse9=0;
			}
			
			if(styleIndex>=10)
			{
				var editColorCode10=req.body.editColor10;
				
				var editColor10WarehouseSizeS=req.body.editWarehouseSizeS10;
				var editColor10WarehouseSizeM=req.body.editWarehouseSizeM10;
				var editColor10WarehouseSizeL=req.body.editWarehouseSizeL10;
				var editColor10WarehouseSizeXL=req.body.editWarehouseSizeXL10;
				var editColor10WarehouseSize2XL=req.body.editWarehouseSize2XL10;
				var editColor10WarehouseSize3XL=req.body.editWarehouseSize3XL10;
				var editColor10WarehouseSize4XL=req.body.editWarehouseSize4XL10;
				
				var editColorTotal10= req.body.editColorTotal10;
				var editSubCountWarehouse10= req.body.editSubCountWarehouse10;
			}
			
			else
			{
				var editColorCode10="";
				
				var editColor10WarehouseSizeS=0;
				var editColor10WarehouseSizeM=0;
				var editColor10WarehouseSizeL=0;
				var editColor10WarehouseSizeXL=0;
				var editColor10WarehouseSize2XL=0;
				var editColor10WarehouseSize3XL=0;
				var editColor10WarehouseSize4XL=0;
				
				var editColorTotal10=0;
				var editSubCountWarehouse10=0;
			}
			
			var editTotalWarehouse= req.body.editCountWarehouse;
	}
	
	//TF
	if(hasS==true&&hasC==false)
	{

	var hasSizesEdit=req.body.hasSizesEdit;
	var editNumColors=0;
	
	var inWarehouseEdit = req.body.inWarehouseEdit;
	
			var editWarehouseSizeS=req.body.editWarehouseSizeS;
			var editWarehouseSizeM=req.body.editWarehouseSizeM;
			var editWarehouseSizeL=req.body.editWarehouseSizeL;
			var editWarehouseSizeXL=req.body.editWarehouseSizeXL;
			var editWarehouseSize2XL=req.body.editWarehouseSize2XL;
			var editWarehouseSize3XL=req.body.editWarehouseSize3XL;
			var editWarehouseSize4XL=req.body.editWarehouseSize4XL;
			
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
			
			var editColor1WarehouseSizeS=0;
			var editColor1WarehouseSizeM=0;
			var editColor1WarehouseSizeL=0;
			var editColor1WarehouseSizeXL=0;
			var editColor1WarehouseSize2XL=0;
			var editColor1WarehouseSize3XL=0;
			var editColor1WarehouseSize4XL=0;
			
			var editColorTotal1=0;
			var editSubCountWarehouse1=0;
			
			var editColor2WarehouseSizeS=0;
			var editColor2WarehouseSizeM=0;
			var editColor2WarehouseSizeL=0;
			var editColor2WarehouseSizeXL=0;
			var editColor2WarehouseSize2XL=0;
			var editColor2WarehouseSize3XL=0;
			var editColor2WarehouseSize4XL=0;
			
			var editColorTotal2=0;
			var editSubCountWarehouse2=0;
			
			var editColor3WarehouseSizeS=0;
			var editColor3WarehouseSizeM=0;
			var editColor3WarehouseSizeL=0;
			var editColor3WarehouseSizeXL=0;
			var editColor3WarehouseSize2XL=0;
			var editColor3WarehouseSize3XL=0;
			var editColor3WarehouseSize4XL=0;
			
			var editColorTotal3=0;
			var editSubCountWarehouse3=0;
			
			var editColor4WarehouseSizeS=0;
			var editColor4WarehouseSizeM=0;
			var editColor4WarehouseSizeL=0;
			var editColor4WarehouseSizeXL=0;
			var editColor4WarehouseSize2XL=0;
			var editColor4WarehouseSize3XL=0;
			var editColor4WarehouseSize4XL=0;
			
			var editColorTotal4=0;
			var editSubCountWarehouse4=0;
			
			var editColor5WarehouseSizeS=0;
			var editColor5WarehouseSizeM=0;
			var editColor5WarehouseSizeL=0;
			var editColor5WarehouseSizeXL=0;
			var editColor5WarehouseSize2XL=0;
			var editColor5WarehouseSize3XL=0;
			var editColor5WarehouseSize4XL=0;
			
			var editColorTotal5=0;
			var editSubCountWarehouse5=0;
			
			var editColor6WarehouseSizeS=0;
			var editColor6WarehouseSizeM=0;
			var editColor6WarehouseSizeL=0;
			var editColor6WarehouseSizeXL=0;
			var editColor6WarehouseSize2XL=0;
			var editColor6WarehouseSize3XL=0;
			var editColor6WarehouseSize4XL=0;
			
			var editColorTotal6=0;
			var editSubCountWarehouse6=0;
			
			var editColor7WarehouseSizeS=0;
			var editColor7WarehouseSizeM=0;
			var editColor7WarehouseSizeL=0;
			var editColor7WarehouseSizeXL=0;
			var editColor7WarehouseSize2XL=0;
			var editColor7WarehouseSize3XL=0;
			var editColor7WarehouseSize4XL=0;
			
			var editColorTotal7=0;
			var editSubCountWarehouse7=0;
			
			var editColor8WarehouseSizeS=0;
			var editColor8WarehouseSizeM=0;
			var editColor8WarehouseSizeL=0;
			var editColor8WarehouseSizeXL=0;
			var editColor8WarehouseSize2XL=0;
			var editColor8WarehouseSize3XL=0;
			var editColor8WarehouseSize4XL=0;
			
			var editColorTotal8=0;
			var editSubCountWarehouse8=0;
			
			var editColor9WarehouseSizeS=0;
			var editColor9WarehouseSizeM=0;
			var editColor9WarehouseSizeL=0;
			var editColor9WarehouseSizeXL=0;
			var editColor9WarehouseSize2XL=0;
			var editColor9WarehouseSize3XL=0;
			var editColor9WarehouseSize4XL=0;
			
			var editColorTotal9=0;
			var editSubCountWarehouse9=0;
			
			var editColor10WarehouseSizeS=0;
			var editColor10WarehouseSizeM=0;
			var editColor10WarehouseSizeL=0;
			var editColor10WarehouseSizeXL=0;
			var editColor10WarehouseSize2XL=0;
			var editColor10WarehouseSize3XL=0;
			var editColor10WarehouseSize4XL=0;
			
			var editColorTotal10=0;
			var editSubCountWarehouse10=0;
			
			var editTotalWarehouse= req.body.editCountWarehouse;
	}
	
	//FT
	if(hasS==false&&hasC==true)
	{

	var hasSizesEdit=req.body.hasSizesEdit;
	var editNumColors=req.body.editNumSubStyles;
	
	var inWarehouseEdit = req.body.inWarehouseEdit;
			
			var editWarehouseSizeS=0;
			var editWarehouseSizeM=0;
			var editWarehouseSizeL=0;
			var editWarehouseSizeXL=0;
			var editWarehouseSize2XL=0;
			var editWarehouseSize3XL=0;
			var editWarehouseSize4XL=0;
			
			if(styleIndex>=1)
			{		
				var editColorCode1=req.body.editColor1;
				var editColorTotal1= req.body.editColorTotal1;
				var editSubCountWarehouse1= req.body.editSubCountWarehouse1;
			}
			
			else
			{
				var editColorCode1="";
				var editColorTotal1=0;
				var editSubCountWarehouse1=0;
			}
			
			if(styleIndex>=2)
			{			
				var editColorCode2=req.body.editColor2;
				var editColorTotal2= req.body.editColorTotal2;
				var editSubCountWarehouse2= req.body.editSubCountWarehouse2;
			}
			
			else
			{
				var editColorCode2="";
				var editColorTotal2=0;
				var editSubCountWarehouse2=0;
			}
			
			if(styleIndex>=3)
			{				
				var editColorCode3=req.body.editColor3;
				var editColorTotal3= req.body.editColorTotal3;
				var editSubCountWarehouse3= req.body.editSubCountWarehouse3;
			}
			
			else
			{
				var editColorCode3="";
				var editColorTotal3=0;
				var editSubCountWarehouse3=0;
			}
			
			if(styleIndex>=4)
			{				
				var editColorCode4=req.body.editColor4;
				var editColorTotal4= req.body.editColorTotal4;
				var editSubCountWarehouse4= req.body.editSubCountWarehouse4;
			}
			
			else
			{
				var editColorCode4="";
				var editColorTotal4=0;
				var editSubCountWarehouse4=0;
			}
			
			if(styleIndex>=5)
			{				
				var editColorCode5=req.body.editColor5;
				var editColorTotal5= req.body.editColorTotal5;
				var editSubCountWarehouse5= req.body.editSubCountWarehouse5;
			}
			
			else
			{
				var editColorCode5="";
				var editColorTotal5=0;
				var editSubCountWarehouse5=0;
			}
			
			if(styleIndex>=6)
			{				
				var editColorCode6=req.body.editColor6;
				var editColorTotal6= req.body.editColorTotal6;
				var editSubCountWarehouse6= req.body.editSubCountWarehouse6;
			}
			
			else
			{
				var editColorCode6="";
				var editColorTotal6=0;
				var editSubCountWarehouse6=0;
			}
			
			if(styleIndex>=7)
			{				
				var editColorCode7=req.body.editColor7;
				var editColorTotal7= req.body.editColorTotal7;
				var editSubCountWarehouse7= req.body.editSubCountWarehouse7;
			}
			
			else
			{
				var editColorCode7="";
				var editColorTotal7=0;
				var editSubCountWarehouse7=0;
			}
			
			if(styleIndex>=8)
			{				
				var editColorCode8=req.body.editColor8;
				var editColorTotal8= req.body.editColorTotal8;
				var editSubCountWarehouse8= req.body.editSubCountWarehouse8;
			}
			
			else
			{
				var editColorCode8="";
				var editColorTotal8=0;
				var editSubCountWarehouse8=0;
			}
			
			if(styleIndex>=9)
			{				
				var editColorCode9=req.body.editColor9;
				var editColorTotal9= req.body.editColorTotal9;
				var editSubCountWarehouse9= req.body.editSubCountWarehouse9;
			}
			
			else
			{
				var editColorCode9="";
				var editColorTotal9=0;
				var editSubCountWarehouse9=0;
			}
			
			if(styleIndex>=10)
			{				
				var editColorCode10=req.body.editColor10;
				var editColorTotal10= req.body.editColorTotal10;
				var editSubCountWarehouse10= req.body.editSubCountWarehouse10;
			}
			
			else
			{
				var editColorCode10="";
				var editColorTotal10=0;
				var editSubCountWarehouse10=0;
			}
			
			var editColor1WarehouseSizeS=0;
			var editColor1WarehouseSizeM=0;
			var editColor1WarehouseSizeL=0;
			var editColor1WarehouseSizeXL=0;
			var editColor1WarehouseSize2XL=0;
			var editColor1WarehouseSize3XL=0;
			var editColor1WarehouseSize4XL=0;

			var editColor2WarehouseSizeS=0;
			var editColor2WarehouseSizeM=0;
			var editColor2WarehouseSizeL=0;
			var editColor2WarehouseSizeXL=0;
			var editColor2WarehouseSize2XL=0;
			var editColor2WarehouseSize3XL=0;
			var editColor2WarehouseSize4XL=0;
			
			var editColor3WarehouseSizeS=0;
			var editColor3WarehouseSizeM=0;
			var editColor3WarehouseSizeL=0;
			var editColor3WarehouseSizeXL=0;
			var editColor3WarehouseSize2XL=0;
			var editColor3WarehouseSize3XL=0;
			var editColor3WarehouseSize4XL=0;
			
			var editColor4WarehouseSizeS=0;
			var editColor4WarehouseSizeM=0;
			var editColor4WarehouseSizeL=0;
			var editColor4WarehouseSizeXL=0;
			var editColor4WarehouseSize2XL=0;
			var editColor4WarehouseSize3XL=0;
			var editColor4WarehouseSize4XL=0;

			var editColor5WarehouseSizeS=0;
			var editColor5WarehouseSizeM=0;
			var editColor5WarehouseSizeL=0;
			var editColor5WarehouseSizeXL=0;
			var editColor5WarehouseSize2XL=0;
			var editColor5WarehouseSize3XL=0;
			var editColor5WarehouseSize4XL=0;
			
			var editColor6WarehouseSizeS=0;
			var editColor6WarehouseSizeM=0;
			var editColor6WarehouseSizeL=0;
			var editColor6WarehouseSizeXL=0;
			var editColor6WarehouseSize2XL=0;
			var editColor6WarehouseSize3XL=0;
			var editColor6WarehouseSize4XL=0;
			
			var editColor7WarehouseSizeS=0;
			var editColor7WarehouseSizeM=0;
			var editColor7WarehouseSizeL=0;
			var editColor7WarehouseSizeXL=0;
			var editColor7WarehouseSize2XL=0;
			var editColor7WarehouseSize3XL=0;
			var editColor7WarehouseSize4XL=0;
			
			var editColor8WarehouseSizeS=0;
			var editColor8WarehouseSizeM=0;
			var editColor8WarehouseSizeL=0;
			var editColor8WarehouseSizeXL=0;
			var editColor8WarehouseSize2XL=0;
			var editColor8WarehouseSize3XL=0;
			var editColor8WarehouseSize4XL=0;
			
			var editColor9WarehouseSizeS=0;
			var editColor9WarehouseSizeM=0;
			var editColor9WarehouseSizeL=0;
			var editColor9WarehouseSizeXL=0;
			var editColor9WarehouseSize2XL=0;
			var editColor9WarehouseSize3XL=0;
			var editColor9WarehouseSize4XL=0;
			
			var editColor10WarehouseSizeS=0;
			var editColor10WarehouseSizeM=0;
			var editColor10WarehouseSizeL=0;
			var editColor10WarehouseSizeXL=0;
			var editColor10WarehouseSize2XL=0;
			var editColor10WarehouseSize3XL=0;
			var editColor10WarehouseSize4XL=0;
			
			var editTotalWarehouse= req.body.editCountWarehouse;
	}
	
	//FF
	if(hasS==false&&hasC==false)
	{

	var hasSizesEdit=req.body.hasSizesEdit;
	var editNumColors=0;

	var inWarehouseEdit = req.body.inWarehouseEdit;
			
			var editWarehouseSizeS=0;
			var editWarehouseSizeM=0;
			var editWarehouseSizeL=0;
			var editWarehouseSizeXL=0;
			var editWarehouseSize2XL=0;
			var editWarehouseSize3XL=0;
			var editWarehouseSize4XL=0;
			
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
			
			var editColor1WarehouseSizeS=0;
			var editColor1WarehouseSizeM=0;
			var editColor1WarehouseSizeL=0;
			var editColor1WarehouseSizeXL=0;
			var editColor1WarehouseSize2XL=0;
			var editColor1WarehouseSize3XL=0;
			var editColor1WarehouseSize4XL=0;
			
			var editColorTotal1=0;
			var editSubCountWarehouse1=0;
			
			var editColor2WarehouseSizeS=0;
			var editColor2WarehouseSizeM=0;
			var editColor2WarehouseSizeL=0;
			var editColor2WarehouseSizeXL=0;
			var editColor2WarehouseSize2XL=0;
			var editColor2WarehouseSize3XL=0;
			var editColor2WarehouseSize4XL=0;
			
			var editColorTotal2=0;
			var editSubCountWarehouse2=0;
			
			var editColor3WarehouseSizeS=0;
			var editColor3WarehouseSizeM=0;
			var editColor3WarehouseSizeL=0;
			var editColor3WarehouseSizeXL=0;
			var editColor3WarehouseSize2XL=0;
			var editColor3WarehouseSize3XL=0;
			var editColor3WarehouseSize4XL=0;
			
			var editColorTotal3=0;
			var editSubCountWarehouse3=0;
			
			var editColor4WarehouseSizeS=0;
			var editColor4WarehouseSizeM=0;
			var editColor4WarehouseSizeL=0;
			var editColor4WarehouseSizeXL=0;
			var editColor4WarehouseSize2XL=0;
			var editColor4WarehouseSize3XL=0;
			var editColor4WarehouseSize4XL=0;
			
			var editColorTotal4=0;
			var editSubCountWarehouse4=0;
			
			var editColor5WarehouseSizeS=0;
			var editColor5WarehouseSizeM=0;
			var editColor5WarehouseSizeL=0;
			var editColor5WarehouseSizeXL=0;
			var editColor5WarehouseSize2XL=0;
			var editColor5WarehouseSize3XL=0;
			var editColor5WarehouseSize4XL=0;
			
			var editColorTotal5=0;
			var editSubCountWarehouse5=0;
			
			var editColor6WarehouseSizeS=0;
			var editColor6WarehouseSizeM=0;
			var editColor6WarehouseSizeL=0;
			var editColor6WarehouseSizeXL=0;
			var editColor6WarehouseSize2XL=0;
			var editColor6WarehouseSize3XL=0;
			var editColor6WarehouseSize4XL=0;
			
			var editColorTotal6=0;
			var editSubCountWarehouse6=0;
			
			var editColor7WarehouseSizeS=0;
			var editColor7WarehouseSizeM=0;
			var editColor7WarehouseSizeL=0;
			var editColor7WarehouseSizeXL=0;
			var editColor7WarehouseSize2XL=0;
			var editColor7WarehouseSize3XL=0;
			var editColor7WarehouseSize4XL=0;
			
			var editColorTotal7=0;
			var editSubCountWarehouse7=0;

			var editColor8WarehouseSizeS=0;
			var editColor8WarehouseSizeM=0;
			var editColor8WarehouseSizeL=0;
			var editColor8WarehouseSizeXL=0;
			var editColor8WarehouseSize2XL=0;
			var editColor8WarehouseSize3XL=0;
			var editColor8WarehouseSize4XL=0;
			
			var editColorTotal8=0;
			var editSubCountWarehouse8=0;
			
			var editColor9WarehouseSizeS=0;
			var editColor9WarehouseSizeM=0;
			var editColor9WarehouseSizeL=0;
			var editColor9WarehouseSizeXL=0;
			var editColor9WarehouseSize2XL=0;
			var editColor9WarehouseSize3XL=0;
			var editColor9WarehouseSize4XL=0;
			
			var editColorTotal9=0;
			var editSubCountWarehouse9=0;
			
			var editColor10WarehouseSizeS=0;
			var editColor10WarehouseSizeM=0;
			var editColor10WarehouseSizeL=0;
			var editColor10WarehouseSizeXL=0;
			var editColor10WarehouseSize2XL=0;
			var editColor10WarehouseSize3XL=0;
			var editColor10WarehouseSize4XL=0;
			
			var editColorTotal10=0;
			var editSubCountWarehouse10=0;
			
			var editTotalWarehouse= req.body.editCountWarehouse;
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
		
			'WarehouseSizeS': editWarehouseSizeS,
			'WarehouseSizeM': editWarehouseSizeM,
			'WarehouseSizeL': editWarehouseSizeL,
			'WarehouseSizeXL': editWarehouseSizeXL,
			'WarehouseSize2XL': editWarehouseSize2XL,
			'WarehouseSize3XL': editWarehouseSize3XL,
			'WarehouseSize4XL': editWarehouseSize4XL,

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
			
			'color1WarehouseSizeS':editColor1WarehouseSizeS,
			'color1WarehouseSizeM':editColor1WarehouseSizeM,
			'color1WarehouseSizeL':editColor1WarehouseSizeL,
			'color1WarehouseSizeXL':editColor1WarehouseSizeXL,
			'color1WarehouseSize2XL':editColor1WarehouseSize2XL,
			'color1WarehouseSize3XL':editColor1WarehouseSize3XL,
			'color1WarehouseSize4XL':editColor1WarehouseSize4XL,
			
			'color1Total': editColorTotal1,
			'color1WarehouseTotal': editSubCountWarehouse1,
			
			'color2WarehouseSizeS':editColor2WarehouseSizeS,
			'color2WarehouseSizeM':editColor2WarehouseSizeM,
			'color2WarehouseSizeL':editColor2WarehouseSizeL,
			'color2WarehouseSizeXL':editColor2WarehouseSizeXL,
			'color2WarehouseSize2XL':editColor2WarehouseSize2XL,
			'color2WarehouseSize3XL':editColor2WarehouseSize3XL,
			'color2WarehouseSize4XL':editColor2WarehouseSize4XL,
			
			'color2Total': editColorTotal2,
			'color2WarehouseTotal': editSubCountWarehouse2,
			
			'color3WarehouseSizeS':editColor3WarehouseSizeS,
			'color3WarehouseSizeM':editColor3WarehouseSizeM,
			'color3WarehouseSizeL':editColor3WarehouseSizeL,
			'color3WarehouseSizeXL':editColor3WarehouseSizeXL,
			'color3WarehouseSize2XL':editColor3WarehouseSize2XL,
			'color3WarehouseSize3XL':editColor3WarehouseSize3XL,
			'color3WarehouseSize4XL':editColor3WarehouseSize4XL,
			
			'color3Total': editColorTotal3,
			'color3WarehouseTotal': editSubCountWarehouse3,
		
			'color4WarehouseSizeS':editColor4WarehouseSizeS,
			'color4WarehouseSizeM':editColor4WarehouseSizeM,
			'color4WarehouseSizeL':editColor4WarehouseSizeL,
			'color4WarehouseSizeXL':editColor4WarehouseSizeXL,
			'color4WarehouseSize2XL':editColor4WarehouseSize2XL,
			'color4WarehouseSize3XL':editColor4WarehouseSize3XL,
			'color4WarehouseSize4XL':editColor4WarehouseSize4XL,
			
			'color4Total': editColorTotal4,
			'color4WarehouseTotal': editSubCountWarehouse4,

			'color5WarehouseSizeS':editColor5WarehouseSizeS,
			'color5WarehouseSizeM':editColor5WarehouseSizeM,
			'color5WarehouseSizeL':editColor5WarehouseSizeL,
			'color5WarehouseSizeXL':editColor5WarehouseSizeXL,
			'color5WarehouseSize2XL':editColor5WarehouseSize2XL,
			'color5WarehouseSize3XL':editColor5WarehouseSize3XL,
			'color5WarehouseSize4XL':editColor5WarehouseSize4XL,

			'color5Total': editColorTotal5,
			'color5WarehouseTotal': editSubCountWarehouse5,

			'color6WarehouseSizeS':editColor6WarehouseSizeS,
			'color6WarehouseSizeM':editColor6WarehouseSizeM,
			'color6WarehouseSizeL':editColor6WarehouseSizeL,
			'color6WarehouseSizeXL':editColor6WarehouseSizeXL,
			'color6WarehouseSize2XL':editColor6WarehouseSize2XL,
			'color6WarehouseSize3XL':editColor6WarehouseSize3XL,
			'color6WarehouseSize4XL':editColor6WarehouseSize4XL,
			
			'color6Total': editColorTotal6,
			'color6WarehouseTotal': editSubCountWarehouse6,
			
			'color7WarehouseSizeS':editColor7WarehouseSizeS,
			'color7WarehouseSizeM':editColor7WarehouseSizeM,
			'color7WarehouseSizeL':editColor7WarehouseSizeL,
			'color7WarehouseSizeXL':editColor7WarehouseSizeXL,
			'color7WarehouseSize2XL':editColor7WarehouseSize2XL,
			'color7WarehouseSize3XL':editColor7WarehouseSize3XL,
			'color7WarehouseSize4XL':editColor7WarehouseSize4XL,
			
			'color7Total': editColorTotal7,
			'color7WarehouseTotal': editSubCountWarehouse7,
		
			'color8WarehouseSizeS':editColor8WarehouseSizeS,
			'color8WarehouseSizeM':editColor8WarehouseSizeM,
			'color8WarehouseSizeL':editColor8WarehouseSizeL,
			'color8WarehouseSizeXL':editColor8WarehouseSizeXL,
			'color8WarehouseSize2XL':editColor8WarehouseSize2XL,
			'color8WarehouseSize3XL':editColor8WarehouseSize3XL,
			'color8WarehouseSize4XL':editColor8WarehouseSize4XL,
			
			'color8Total': editColorTotal8,
			'color8WarehouseTotal': editSubCountWarehouse8,
			
			'color9WarehouseSizeS':editColor9WarehouseSizeS,
			'color9WarehouseSizeM':editColor9WarehouseSizeM,
			'color9WarehouseSizeL':editColor9WarehouseSizeL,
			'color9WarehouseSizeXL':editColor9WarehouseSizeXL,
			'color9WarehouseSize2XL':editColor9WarehouseSize2XL,
			'color9WarehouseSize3XL':editColor9WarehouseSize3XL,
			'color9WarehouseSize4XL':editColor9WarehouseSize4XL,
			
			'color9Total': editColorTotal9,
			'color9WarehouseTotal': editSubCountWarehouse9,

			'color10WarehouseSizeS':editColor10WarehouseSizeS,
			'color10WarehouseSizeM':editColor10WarehouseSizeS,
			'color10WarehouseSizeL':editColor10WarehouseSizeL,
			'color10WarehouseSizeXL':editColor10WarehouseSizeXL,
			'color10WarehouseSize2XL':editColor10WarehouseSize2XL,
			'color10WarehouseSize3XL':editColor10WarehouseSize3XL,
			'color10WarehouseSize4XL':editColor10WarehouseSize4XL,

			'color10Total': editColorTotal10,
			'color10WarehouseTotal': editSubCountWarehouse10,

			'inWarehouse': inWarehouseEdit,
			'totalWarehouse': editTotalWarehouse,
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
