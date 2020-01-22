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
	
	var inStoreCorkEdit = req.body.inCorkEdit;
	var inStoreKalaEdit = req.body.inKalaEdit;
	var inStoreGalwayEdit = req.body.inGalwayEdit;
	var inWarehouseEdit = req.body.inWarehouseEdit;
	
			var editWarehouseSizeS=0;
			var editWarehouseSizeM=0;
			var editWarehouseSizeL=0;
			var editWarehouseSizeXL=0;
			var editWarehouseSize2XL=0;
			var editWarehouseSize3XL=0;
			var editWarehouseSize4XL=0;
			
			var editCorkSizeS=0;
			var editCorkSizeM=0;
			var editCorkSizeL=0;
			var editCorkSizeXL=0;
			var editCorkSize2XL=0;
			var editCorkSize3XL=0;
			var editCorkSize4XL=0;
			
			var editKalaSizeS=0;
			var editKalaSizeM=0;
			var editKalaSizeL=0;
			var editKalaSizeXL=0;
			var editKalaSize2XL=0;
			var editKalaSize3XL=0;
			var editKalaSize4XL=0;
			
			var editGalwaySizeS=0;
			var editGalwaySizeM=0;
			var editGalwaySizeL=0;
			var editGalwaySizeXL=0;
			var editGalwaySize2XL=0;
			var editGalwaySize3XL=0;
			var editGalwaySize4XL=0;
			
			if(editNumColors>=1)
			{
				var editColorCode1=req.body.editColor1;
				
				var editColor1CorkSizeS=req.body.editCorkSizeS1;
				var editColor1CorkSizeM=req.body.editCorkSizeM1;
				var editColor1CorkSizeL=req.body.editCorkSizeL1;
				var editColor1CorkSizeXL=req.body.editCorkSizeXL1;
				var editColor1CorkSize2XL=req.body.editCorkSize2XL1;
				var editColor1CorkSize3XL=req.body.editCorkSize3XL1;
				var editColor1CorkSize4XL=req.body.editCorkSize4XL1;
				
				var editColor1KalaSizeS=req.body.editKalaSizeS1;
				var editColor1KalaSizeM=req.body.editKalaSizeM1;
				var editColor1KalaSizeL=req.body.editKalaSizeL1;
				var editColor1KalaSizeXL=req.body.editKalaSizeXL1;
				var editColor1KalaSize2XL=req.body.editKalaSize2XL1;
				var editColor1KalaSize3XL=req.body.editKalaSize3XL1;
				var editColor1KalaSize4XL=req.body.editKalaSize4XL1;
				
				var editColor1GalwaySizeS=req.body.editGalwaySizeS1;
				var editColor1GalwaySizeM=req.body.editGalwaySizeM1;
				var editColor1GalwaySizeL=req.body.editGalwaySizeL1;
				var editColor1GalwaySizeXL=req.body.editGalwaySizeXL1;
				var editColor1GalwaySize2XL=req.body.editGalwaySize2XL1;
				var editColor1GalwaySize3XL=req.body.editGalwaySize3XL1;
				var editColor1GalwaySize4XL=req.body.editGalwaySize4XL1;
				
				var editColor1WarehouseSizeS=req.body.editWarehouseSizeS1;
				var editColor1WarehouseSizeM=req.body.editWarehouseSizeM1;
				var editColor1WarehouseSizeL=req.body.editWarehouseSizeL1;
				var editColor1WarehouseSizeXL=req.body.editWarehouseSizeXL1;
				var editColor1WarehouseSize2XL=req.body.editWarehouseSize2XL1;
				var editColor1WarehouseSize3XL=req.body.editWarehouseSize3XL1;
				var editColor1WarehouseSize4XL=req.body.editWarehouseSize4XL1;
				
				var editColorTotal1= req.body.editColorTotal1;
				var editSubCountCork1= req.body.editSubCountCork1;
				var editSubCountKala1= req.body.editSubCountKala1;
				var editSubCountGalway1= req.body.editSubCountGalway1;
				var editSubCountWarehouse1= req.body.editSubCountWarehouse1;
			}
			
			else
			{
				var editColorCode1="";
				
				var editColor1CorkSizeS=0;
				var editColor1CorkSizeM=0;
				var editColor1CorkSizeL=0;
				var editColor1CorkSizeXL=0;
				var editColor1CorkSize2XL=0;
				var editColor1CorkSize3XL=0;
				var editColor1CorkSize4XL=0;
				
				var editColor1KalaSizeS=0;
				var editColor1KalaSizeM=0;
				var editColor1KalaSizeL=0;
				var editColor1KalaSizeXL=0;
				var editColor1KalaSize2XL=0;
				var editColor1KalaSize3XL=0;
				var editColor1KalaSize4XL=0;
				
				var editColor1GalwaySizeS=0;
				var editColor1GalwaySizeM=0;
				var editColor1GalwaySizeL=0;
				var editColor1GalwaySizeXL=0;
				var editColor1GalwaySize2XL=0;
				var editColor1GalwaySize3XL=0;
				var editColor1GalwaySize4XL=0;
				
				var editColor1WarehouseSizeS=0;
				var editColor1WarehouseSizeM=0;
				var editColor1WarehouseSizeL=0;
				var editColor1WarehouseSizeXL=0;
				var editColor1WarehouseSize2XL=0;
				var editColor1WarehouseSize3XL=0;
				var editColor1WarehouseSize4XL=0;
				
				var editColorTotal1=0;
				var editSubCountCork1=0;
				var editSubCountKala1=0;
				var editSubCountGalway1=0;
				var editSubCountWarehouse1=0;
			}
			
			if(styleIndex>=2)
			{
				var editColorCode2=req.body.editColor2;
				
				var editColor2CorkSizeS=req.body.editCorkSizeS2;
				var editColor2CorkSizeM=req.body.editCorkSizeM2;
				var editColor2CorkSizeL=req.body.editCorkSizeL2;
				var editColor2CorkSizeXL=req.body.editCorkSizeXL2;
				var editColor2CorkSize2XL=req.body.editCorkSize2XL2;
				var editColor2CorkSize3XL=req.body.editCorkSize3XL2;
				var editColor2CorkSize4XL=req.body.editCorkSize4XL2;
				
				var editColor2KalaSizeS=req.body.editKalaSizeS2;
				var editColor2KalaSizeM=req.body.editKalaSizeM2;
				var editColor2KalaSizeL=req.body.editKalaSizeL2;
				var editColor2KalaSizeXL=req.body.editKalaSizeXL2;
				var editColor2KalaSize2XL=req.body.editKalaSize2XL2;
				var editColor2KalaSize3XL=req.body.editKalaSize3XL2;
				var editColor2KalaSize4XL=req.body.editKalaSize4XL2;
				
				var editColor2GalwaySizeS=req.body.editGalwaySizeS2;
				var editColor2GalwaySizeM=req.body.editGalwaySizeM2;
				var editColor2GalwaySizeL=req.body.editGalwaySizeL2;
				var editColor2GalwaySizeXL=req.body.editGalwaySizeXL2;
				var editColor2GalwaySize2XL=req.body.editGalwaySize2XL2;
				var editColor2GalwaySize3XL=req.body.editGalwaySize3XL2;
				var editColor2GalwaySize4XL=req.body.editGalwaySize4XL2;
				
				var editColor2WarehouseSizeS=req.body.editWarehouseSizeS2;
				var editColor2WarehouseSizeM=req.body.editWarehouseSizeM2;
				var editColor2WarehouseSizeL=req.body.editWarehouseSizeL2;
				var editColor2WarehouseSizeXL=req.body.editWarehouseSizeXL2;
				var editColor2WarehouseSize2XL=req.body.editWarehouseSize2XL2;
				var editColor2WarehouseSize3XL=req.body.editWarehouseSize3XL2;
				var editColor2WarehouseSize4XL=req.body.editWarehouseSize4XL2;
				
				var editColorTotal2= req.body.editColorTotal2;
				var editSubCountCork2= req.body.editSubCountCork2;
				var editSubCountKala2= req.body.editSubCountKala2;
				var editSubCountGalway2= req.body.editSubCountGalway2;
				var editSubCountWarehouse2= req.body.editSubCountWarehouse2;
			}
			
			else
			{
				var editColorCode2="";
				
				var editColor2CorkSizeS=0;
				var editColor2CorkSizeM=0;
				var editColor2CorkSizeL=0;
				var editColor2CorkSizeXL=0;
				var editColor2CorkSize2XL=0;
				var editColor2CorkSize3XL=0;
				var editColor2CorkSize4XL=0;
				
				var editColor2KalaSizeS=0;
				var editColor2KalaSizeM=0;
				var editColor2KalaSizeL=0;
				var editColor2KalaSizeXL=0;
				var editColor2KalaSize2XL=0;
				var editColor2KalaSize3XL=0;
				var editColor2KalaSize4XL=0;
				
				var editColor2GalwaySizeS=0;
				var editColor2GalwaySizeM=0;
				var editColor2GalwaySizeL=0;
				var editColor2GalwaySizeXL=0;
				var editColor2GalwaySize2XL=0;
				var editColor2GalwaySize3XL=0;
				var editColor2GalwaySize4XL=0;
				
				var editColor2WarehouseSizeS=0;
				var editColor2WarehouseSizeM=0;
				var editColor2WarehouseSizeL=0;
				var editColor2WarehouseSizeXL=0;
				var editColor2WarehouseSize2XL=0;
				var editColor2WarehouseSize3XL=0;
				var editColor2WarehouseSize4XL=0;
				
				var editColorTotal2=0;
				var editSubCountCork2=0;
				var editSubCountKala2=0;
				var editSubCountGalway2=0;
				var editSubCountWarehouse2=0;
			}
			
			if(styleIndex>=3)
			{
				var editColorCode3=req.body.editColor3;
				
				var editColor3CorkSizeS=req.body.editCorkSizeS3;
				var editColor3CorkSizeM=req.body.editCorkSizeM3;
				var editColor3CorkSizeL=req.body.editCorkSizeL3;
				var editColor3CorkSizeXL=req.body.editCorkSizeXL3;
				var editColor3CorkSize2XL=req.body.editCorkSize2XL3;
				var editColor3CorkSize3XL=req.body.editCorkSize3XL3;
				var editColor3CorkSize4XL=req.body.editCorkSize4XL3;
				
				var editColor3KalaSizeS=req.body.editKalaSizeS3;
				var editColor3KalaSizeM=req.body.editKalaSizeM3;
				var editColor3KalaSizeL=req.body.editKalaSizeL3;
				var editColor3KalaSizeXL=req.body.editKalaSizeXL3;
				var editColor3KalaSize2XL=req.body.editKalaSize2XL3;
				var editColor3KalaSize3XL=req.body.editKalaSize3XL3;
				var editColor3KalaSize4XL=req.body.editKalaSize4XL3;
				
				var editColor3GalwaySizeS=req.body.editGalwaySizeS3;
				var editColor3GalwaySizeM=req.body.editGalwaySizeM3;
				var editColor3GalwaySizeL=req.body.editGalwaySizeL3;
				var editColor3GalwaySizeXL=req.body.editGalwaySizeXL3;
				var editColor3GalwaySize2XL=req.body.editGalwaySize2XL3;
				var editColor3GalwaySize3XL=req.body.editGalwaySize3XL3;
				var editColor3GalwaySize4XL=req.body.editGalwaySize4XL3;
				
				var editColor3WarehouseSizeS=req.body.editWarehouseSizeS3;
				var editColor3WarehouseSizeM=req.body.editWarehouseSizeM3;
				var editColor3WarehouseSizeL=req.body.editWarehouseSizeL3;
				var editColor3WarehouseSizeXL=req.body.editWarehouseSizeXL3;
				var editColor3WarehouseSize2XL=req.body.editWarehouseSize2XL3;
				var editColor3WarehouseSize3XL=req.body.editWarehouseSize3XL3;
				var editColor3WarehouseSize4XL=req.body.editWarehouseSize4XL3;
				
				var editColorTotal3= req.body.editColorTotal3;
				var editSubCountCork3= req.body.editSubCountCork3;
				var editSubCountKala3= req.body.editSubCountKala3;
				var editSubCountGalway3= req.body.editSubCountGalway3;
				var editSubCountWarehouse3= req.body.editSubCountWarehouse3;
			}
			
			else
			{
				var editColorCode3="";
				
				var editColor3CorkSizeS=0;
				var editColor3CorkSizeM=0;
				var editColor3CorkSizeL=0;
				var editColor3CorkSizeXL=0;
				var editColor3CorkSize2XL=0;
				var editColor3CorkSize3XL=0;
				var editColor3CorkSize4XL=0;
				
				var editColor3KalaSizeS=0;
				var editColor3KalaSizeM=0;
				var editColor3KalaSizeL=0;
				var editColor3KalaSizeXL=0;
				var editColor3KalaSize2XL=0;
				var editColor3KalaSize3XL=0;
				var editColor3KalaSize4XL=0;
				
				var editColor3GalwaySizeS=0;
				var editColor3GalwaySizeM=0;
				var editColor3GalwaySizeL=0;
				var editColor3GalwaySizeXL=0;
				var editColor3GalwaySize2XL=0;
				var editColor3GalwaySize3XL=0;
				var editColor3GalwaySize4XL=0;
				
				var editColor3WarehouseSizeS=0;
				var editColor3WarehouseSizeM=0;
				var editColor3WarehouseSizeL=0;
				var editColor3WarehouseSizeXL=0;
				var editColor3WarehouseSize2XL=0;
				var editColor3WarehouseSize3XL=0;
				var editColor3WarehouseSize4XL=0;
				
				var editColorTotal3=0;
				var editSubCountCork3=0;
				var editSubCountKala3=0;
				var editSubCountGalway3=0;
				var editSubCountWarehouse3=0;
			}
			
			
			if(styleIndex>=4)
			{
				var editColorCode4=req.body.editColor4;
				
				var editColor4CorkSizeS=req.body.editCorkSizeS4;
				var editColor4CorkSizeM=req.body.editCorkSizeM4;
				var editColor4CorkSizeL=req.body.editCorkSizeL4;
				var editColor4CorkSizeXL=req.body.editCorkSizeXL4;
				var editColor4CorkSize2XL=req.body.editCorkSize2XL4;
				var editColor4CorkSize3XL=req.body.editCorkSize3XL4;
				var editColor4CorkSize4XL=req.body.editCorkSize4XL4;
				
				var editColor4KalaSizeS=req.body.editKalaSizeS4;
				var editColor4KalaSizeM=req.body.editKalaSizeM4;
				var editColor4KalaSizeL=req.body.editKalaSizeL4;
				var editColor4KalaSizeXL=req.body.editKalaSizeXL4;
				var editColor4KalaSize2XL=req.body.editKalaSize2XL4;
				var editColor4KalaSize3XL=req.body.editKalaSize3XL4;
				var editColor4KalaSize4XL=req.body.editKalaSize4XL4;
				
				var editColor4GalwaySizeS=req.body.editGalwaySizeS4;
				var editColor4GalwaySizeM=req.body.editGalwaySizeM4;
				var editColor4GalwaySizeL=req.body.editGalwaySizeL4;
				var editColor4GalwaySizeXL=req.body.editGalwaySizeXL4;
				var editColor4GalwaySize2XL=req.body.editGalwaySize2XL4;
				var editColor4GalwaySize3XL=req.body.editGalwaySize3XL4;
				var editColor4GalwaySize4XL=req.body.editGalwaySize4XL4;
				
				var editColor4WarehouseSizeS=req.body.editWarehouseSizeS4;
				var editColor4WarehouseSizeM=req.body.editWarehouseSizeM4;
				var editColor4WarehouseSizeL=req.body.editWarehouseSizeL4;
				var editColor4WarehouseSizeXL=req.body.editWarehouseSizeXL4;
				var editColor4WarehouseSize2XL=req.body.editWarehouseSize2XL4;
				var editColor4WarehouseSize3XL=req.body.editWarehouseSize3XL4;
				var editColor4WarehouseSize4XL=req.body.editWarehouseSize4XL4;
				
				var editColorTotal4= req.body.editColorTotal4;
				var editSubCountCork4= req.body.editSubCountCork4;
				var editSubCountKala4= req.body.editSubCountKala4;
				var editSubCountGalway4= req.body.editSubCountGalway4;
				var editSubCountWarehouse4= req.body.editSubCountWarehouse4;
			}
			
			else
			{
				var editColorCode4="";
				
				var editColor4CorkSizeS=0;
				var editColor4CorkSizeM=0;
				var editColor4CorkSizeL=0;
				var editColor4CorkSizeXL=0;
				var editColor4CorkSize2XL=0;
				var editColor4CorkSize3XL=0;
				var editColor4CorkSize4XL=0;
				
				var editColor4KalaSizeS=0;
				var editColor4KalaSizeM=0;
				var editColor4KalaSizeL=0;
				var editColor4KalaSizeXL=0;
				var editColor4KalaSize2XL=0;
				var editColor4KalaSize3XL=0;
				var editColor4KalaSize4XL=0;
				
				var editColor4GalwaySizeS=0;
				var editColor4GalwaySizeM=0;
				var editColor4GalwaySizeL=0;
				var editColor4GalwaySizeXL=0;
				var editColor4GalwaySize2XL=0;
				var editColor4GalwaySize3XL=0;
				var editColor4GalwaySize4XL=0;
				
				var editColor4WarehouseSizeS=0;
				var editColor4WarehouseSizeM=0;
				var editColor4WarehouseSizeL=0;
				var editColor4WarehouseSizeXL=0;
				var editColor4WarehouseSize2XL=0;
				var editColor4WarehouseSize3XL=0;
				var editColor4WarehouseSize4XL=0;
				
				var editColorTotal4=0;
				var editSubCountCork4=0;
				var editSubCountKala4=0;
				var editSubCountGalway4=0;
				var editSubCountWarehouse4=0;
			}
			
			if(styleIndex>=5)
			{
				var editColorCode5=req.body.editColor5;
				
				var editColor5CorkSizeS=req.body.editCorkSizeS5;
				var editColor5CorkSizeM=req.body.editCorkSizeM5;
				var editColor5CorkSizeL=req.body.editCorkSizeL5;
				var editColor5CorkSizeXL=req.body.editCorkSizeXL5;
				var editColor5CorkSize2XL=req.body.editCorkSize2XL5;
				var editColor5CorkSize3XL=req.body.editCorkSize3XL5;
				var editColor5CorkSize4XL=req.body.editCorkSize4XL5;
				
				var editColor5KalaSizeS=req.body.editKalaSizeS5;
				var editColor5KalaSizeM=req.body.editKalaSizeM5;
				var editColor5KalaSizeL=req.body.editKalaSizeL5;
				var editColor5KalaSizeXL=req.body.editKalaSizeXL5;
				var editColor5KalaSize2XL=req.body.editKalaSize2XL5;
				var editColor5KalaSize3XL=req.body.editKalaSize3XL5;
				var editColor5KalaSize4XL=req.body.editKalaSize4XL5;
				
				var editColor5GalwaySizeS=req.body.editGalwaySizeS5;
				var editColor5GalwaySizeM=req.body.editGalwaySizeM5;
				var editColor5GalwaySizeL=req.body.editGalwaySizeL5;
				var editColor5GalwaySizeXL=req.body.editGalwaySizeXL5;
				var editColor5GalwaySize2XL=req.body.editGalwaySize2XL5;
				var editColor5GalwaySize3XL=req.body.editGalwaySize3XL5;
				var editColor5GalwaySize4XL=req.body.editGalwaySize4XL5;
				
				var editColor5WarehouseSizeS=req.body.editWarehouseSizeS5;
				var editColor5WarehouseSizeM=req.body.editWarehouseSizeM5;
				var editColor5WarehouseSizeL=req.body.editWarehouseSizeL5;
				var editColor5WarehouseSizeXL=req.body.editWarehouseSizeXL5;
				var editColor5WarehouseSize2XL=req.body.editWarehouseSize2XL5;
				var editColor5WarehouseSize3XL=req.body.editWarehouseSize3XL5;
				var editColor5WarehouseSize4XL=req.body.editWarehouseSize4XL5;
				
				var editColorTotal5= req.body.editColorTotal5;
				var editSubCountCork5= req.body.editSubCountCork5;
				var editSubCountKala5= req.body.editSubCountKala5;
				var editSubCountGalway5= req.body.editSubCountGalway5;
				var editSubCountWarehouse5= req.body.editSubCountWarehouse5;
			}
			
			else
			{
				var editColorCode5="";
				
				var editColor5CorkSizeS=0;
				var editColor5CorkSizeM=0;
				var editColor5CorkSizeL=0;
				var editColor5CorkSizeXL=0;
				var editColor5CorkSize2XL=0;
				var editColor5CorkSize3XL=0;
				var editColor5CorkSize4XL=0;
				
				var editColor5KalaSizeS=0;
				var editColor5KalaSizeM=0;
				var editColor5KalaSizeL=0;
				var editColor5KalaSizeXL=0;
				var editColor5KalaSize2XL=0;
				var editColor5KalaSize3XL=0;
				var editColor5KalaSize4XL=0;
				
				var editColor5GalwaySizeS=0;
				var editColor5GalwaySizeM=0;
				var editColor5GalwaySizeL=0;
				var editColor5GalwaySizeXL=0;
				var editColor5GalwaySize2XL=0;
				var editColor5GalwaySize3XL=0;
				var editColor5GalwaySize4XL=0;
				
				var editColor5WarehouseSizeS=0;
				var editColor5WarehouseSizeM=0;
				var editColor5WarehouseSizeL=0;
				var editColor5WarehouseSizeXL=0;
				var editColor5WarehouseSize2XL=0;
				var editColor5WarehouseSize3XL=0;
				var editColor5WarehouseSize4XL=0;
				
				var editColorTotal5=0;
				var editSubCountCork5=0;
				var editSubCountKala5=0;
				var editSubCountGalway5=0;
				var editSubCountWarehouse5=0;
			}
			
			
			if(styleIndex>=6)
			{
				var editColorCode6=req.body.editColor6;
				
				var editColor6CorkSizeS=req.body.editCorkSizeS6;
				var editColor6CorkSizeM=req.body.editCorkSizeM6;
				var editColor6CorkSizeL=req.body.editCorkSizeL6;
				var editColor6CorkSizeXL=req.body.editCorkSizeXL6;
				var editColor6CorkSize2XL=req.body.editCorkSize2XL6;
				var editColor6CorkSize3XL=req.body.editCorkSize3XL6;
				var editColor6CorkSize4XL=req.body.editCorkSize4XL6;
				
				var editColor6KalaSizeS=req.body.editKalaSizeS6;
				var editColor6KalaSizeM=req.body.editKalaSizeM6;
				var editColor6KalaSizeL=req.body.editKalaSizeL6;
				var editColor6KalaSizeXL=req.body.editKalaSizeXL6;
				var editColor6KalaSize2XL=req.body.editKalaSize2XL6;
				var editColor6KalaSize3XL=req.body.editKalaSize3XL6;
				var editColor6KalaSize4XL=req.body.editKalaSize4XL6;
				
				var editColor6GalwaySizeS=req.body.editGalwaySizeS6;
				var editColor6GalwaySizeM=req.body.editGalwaySizeM6;
				var editColor6GalwaySizeL=req.body.editGalwaySizeL6;
				var editColor6GalwaySizeXL=req.body.editGalwaySizeXL6;
				var editColor6GalwaySize2XL=req.body.editGalwaySize2XL6;
				var editColor6GalwaySize3XL=req.body.editGalwaySize3XL6;
				var editColor6GalwaySize4XL=req.body.editGalwaySize4XL6;
				
				var editColor6WarehouseSizeS=req.body.editWarehouseSizeS6;
				var editColor6WarehouseSizeM=req.body.editWarehouseSizeM6;
				var editColor6WarehouseSizeL=req.body.editWarehouseSizeL6;
				var editColor6WarehouseSizeXL=req.body.editWarehouseSizeXL6;
				var editColor6WarehouseSize2XL=req.body.editWarehouseSize2XL6;
				var editColor6WarehouseSize3XL=req.body.editWarehouseSize3XL6;
				var editColor6WarehouseSize4XL=req.body.editWarehouseSize4XL6;
				
				var editColorTotal6= req.body.editColorTotal6;
				var editSubCountCork6= req.body.editSubCountCork6;
				var editSubCountKala6= req.body.editSubCountKala6;
				var editSubCountGalway6= req.body.editSubCountGalway6;
				var editSubCountWarehouse6= req.body.editSubCountWarehouse6;
			}
			
			else
			{
				var editColorCode6="";
				
				var editColor6CorkSizeS=0;
				var editColor6CorkSizeM=0;
				var editColor6CorkSizeL=0;
				var editColor6CorkSizeXL=0;
				var editColor6CorkSize2XL=0;
				var editColor6CorkSize3XL=0;
				var editColor6CorkSize4XL=0;
				
				var editColor6KalaSizeS=0;
				var editColor6KalaSizeM=0;
				var editColor6KalaSizeL=0;
				var editColor6KalaSizeXL=0;
				var editColor6KalaSize2XL=0;
				var editColor6KalaSize3XL=0;
				var editColor6KalaSize4XL=0;
				
				var editColor6GalwaySizeS=0;
				var editColor6GalwaySizeM=0;
				var editColor6GalwaySizeL=0;
				var editColor6GalwaySizeXL=0;
				var editColor6GalwaySize2XL=0;
				var editColor6GalwaySize3XL=0;
				var editColor6GalwaySize4XL=0;
				
				var editColor6WarehouseSizeS=0;
				var editColor6WarehouseSizeM=0;
				var editColor6WarehouseSizeL=0;
				var editColor6WarehouseSizeXL=0;
				var editColor6WarehouseSize2XL=0;
				var editColor6WarehouseSize3XL=0;
				var editColor6WarehouseSize4XL=0;
				
				var editColorTotal6=0;
				var editSubCountCork6=0;
				var editSubCountKala6=0;
				var editSubCountGalway6=0;
				var editSubCountWarehouse6=0;
			}

			if(styleIndex>=7)
			{
				var editColorCode7=req.body.editColor7;
				
				var editColor7CorkSizeS=req.body.editCorkSizeS7;
				var editColor7CorkSizeM=req.body.editCorkSizeM7;
				var editColor7CorkSizeL=req.body.editCorkSizeL7;
				var editColor7CorkSizeXL=req.body.editCorkSizeXL7;
				var editColor7CorkSize2XL=req.body.editCorkSize2XL7;
				var editColor7CorkSize3XL=req.body.editCorkSize3XL7;
				var editColor7CorkSize4XL=req.body.editCorkSize4XL7;
				
				var editColor7KalaSizeS=req.body.editKalaSizeS7;
				var editColor7KalaSizeM=req.body.editKalaSizeM7;
				var editColor7KalaSizeL=req.body.editKalaSizeL7;
				var editColor7KalaSizeXL=req.body.editKalaSizeXL7;
				var editColor7KalaSize2XL=req.body.editKalaSize2XL7;
				var editColor7KalaSize3XL=req.body.editKalaSize3XL7;
				var editColor7KalaSize4XL=req.body.editKalaSize4XL7;
				
				var editColor7GalwaySizeS=req.body.editGalwaySizeS7;
				var editColor7GalwaySizeM=req.body.editGalwaySizeM7;
				var editColor7GalwaySizeL=req.body.editGalwaySizeL7;
				var editColor7GalwaySizeXL=req.body.editGalwaySizeXL7;
				var editColor7GalwaySize2XL=req.body.editGalwaySize2XL7;
				var editColor7GalwaySize3XL=req.body.editGalwaySize3XL7;
				var editColor7GalwaySize4XL=req.body.editGalwaySize4XL7;
				
				var editColor7WarehouseSizeS=req.body.editWarehouseSizeS7;
				var editColor7WarehouseSizeM=req.body.editWarehouseSizeM7;
				var editColor7WarehouseSizeL=req.body.editWarehouseSizeL7;
				var editColor7WarehouseSizeXL=req.body.editWarehouseSizeXL7;
				var editColor7WarehouseSize2XL=req.body.editWarehouseSize2XL7;
				var editColor7WarehouseSize3XL=req.body.editWarehouseSize3XL7;
				var editColor7WarehouseSize4XL=req.body.editWarehouseSize4XL7;
				
				var editColorTotal7= req.body.editColorTotal7;
				var editSubCountCork7= req.body.editSubCountCork7;
				var editSubCountKala7= req.body.editSubCountKala7;
				var editSubCountGalway7= req.body.editSubCountGalway7;
				var editSubCountWarehouse7= req.body.editSubCountWarehouse7;
			}
			
			else
			{
				var editColorCode7="";
				
				var editColor7CorkSizeS=0;
				var editColor7CorkSizeM=0;
				var editColor7CorkSizeL=0;
				var editColor7CorkSizeXL=0;
				var editColor7CorkSize2XL=0;
				var editColor7CorkSize3XL=0;
				var editColor7CorkSize4XL=0;
				
				var editColor7KalaSizeS=0;
				var editColor7KalaSizeM=0;
				var editColor7KalaSizeL=0;
				var editColor7KalaSizeXL=0;
				var editColor7KalaSize2XL=0;
				var editColor7KalaSize3XL=0;
				var editColor7KalaSize4XL=0;
				
				var editColor7GalwaySizeS=0;
				var editColor7GalwaySizeM=0;
				var editColor7GalwaySizeL=0;
				var editColor7GalwaySizeXL=0;
				var editColor7GalwaySize2XL=0;
				var editColor7GalwaySize3XL=0;
				var editColor7GalwaySize4XL=0;
				
				var editColor7WarehouseSizeS=0;
				var editColor7WarehouseSizeM=0;
				var editColor7WarehouseSizeL=0;
				var editColor7WarehouseSizeXL=0;
				var editColor7WarehouseSize2XL=0;
				var editColor7WarehouseSize3XL=0;
				var editColor7WarehouseSize4XL=0;
				
				var editColorTotal7=0;
				var editSubCountCork7=0;
				var editSubCountKala7=0;
				var editSubCountGalway7=0;
				var editSubCountWarehouse7=0;
			}
			
			if(styleIndex>=8)
			{
				var editColorCode8=req.body.editColor8;
				
				var editColor8CorkSizeS=req.body.editCorkSizeS8;
				var editColor8CorkSizeM=req.body.editCorkSizeM8;
				var editColor8CorkSizeL=req.body.editCorkSizeL8;
				var editColor8CorkSizeXL=req.body.editCorkSizeXL8;
				var editColor8CorkSize2XL=req.body.editCorkSize2XL8;
				var editColor8CorkSize3XL=req.body.editCorkSize3XL8;
				var editColor8CorkSize4XL=req.body.editCorkSize4XL8;
				
				var editColor8KalaSizeS=req.body.editKalaSizeS8;
				var editColor8KalaSizeM=req.body.editKalaSizeM8;
				var editColor8KalaSizeL=req.body.editKalaSizeL8;
				var editColor8KalaSizeXL=req.body.editKalaSizeXL8;
				var editColor8KalaSize2XL=req.body.editKalaSize2XL8;
				var editColor8KalaSize3XL=req.body.editKalaSize3XL8;
				var editColor8KalaSize4XL=req.body.editKalaSize4XL8;
				
				var editColor8GalwaySizeS=req.body.editGalwaySizeS8;
				var editColor8GalwaySizeM=req.body.editGalwaySizeM8;
				var editColor8GalwaySizeL=req.body.editGalwaySizeL8;
				var editColor8GalwaySizeXL=req.body.editGalwaySizeXL8;
				var editColor8GalwaySize2XL=req.body.editGalwaySize2XL8;
				var editColor8GalwaySize3XL=req.body.editGalwaySize3XL8;
				var editColor8GalwaySize4XL=req.body.editGalwaySize4XL8;
				
				var editColor8WarehouseSizeS=req.body.editWarehouseSizeS8;
				var editColor8WarehouseSizeM=req.body.editWarehouseSizeM8;
				var editColor8WarehouseSizeL=req.body.editWarehouseSizeL8;
				var editColor8WarehouseSizeXL=req.body.editWarehouseSizeXL8;
				var editColor8WarehouseSize2XL=req.body.editWarehouseSize2XL8;
				var editColor8WarehouseSize3XL=req.body.editWarehouseSize3XL8;
				var editColor8WarehouseSize4XL=req.body.editWarehouseSize4XL8;
				
				var editColorTotal8= req.body.editColorTotal8;
				var editSubCountCork8= req.body.editSubCountCork8;
				var editSubCountKala8= req.body.editSubCountKala8;
				var editSubCountGalway8= req.body.editSubCountGalway8;
				var editSubCountWarehouse8= req.body.editSubCountWarehouse8;
			}
			
			else
			{
				var editColorCode8="";
				
				var editColor8CorkSizeS=0;
				var editColor8CorkSizeM=0;
				var editColor8CorkSizeL=0;
				var editColor8CorkSizeXL=0;
				var editColor8CorkSize2XL=0;
				var editColor8CorkSize3XL=0;
				var editColor8CorkSize4XL=0;
				
				var editColor8KalaSizeS=0;
				var editColor8KalaSizeM=0;
				var editColor8KalaSizeL=0;
				var editColor8KalaSizeXL=0;
				var editColor8KalaSize2XL=0;
				var editColor8KalaSize3XL=0;
				var editColor8KalaSize4XL=0;
				
				var editColor8GalwaySizeS=0;
				var editColor8GalwaySizeM=0;
				var editColor8GalwaySizeL=0;
				var editColor8GalwaySizeXL=0;
				var editColor8GalwaySize2XL=0;
				var editColor8GalwaySize3XL=0;
				var editColor8GalwaySize4XL=0;
				
				var editColor8WarehouseSizeS=0;
				var editColor8WarehouseSizeM=0;
				var editColor8WarehouseSizeL=0;
				var editColor8WarehouseSizeXL=0;
				var editColor8WarehouseSize2XL=0;
				var editColor8WarehouseSize3XL=0;
				var editColor8WarehouseSize4XL=0;
				
				var editColorTotal8=0;
				var editSubCountCork8=0;
				var editSubCountKala8=0;
				var editSubCountGalway8=0;
				var editSubCountWarehouse8=0;
			}
			
			if(styleIndex>=9)
			{
				var editColorCode9=req.body.editColor9;
				
				var editColor9CorkSizeS=req.body.editCorkSizeS9;
				var editColor9CorkSizeM=req.body.editCorkSizeM9;
				var editColor9CorkSizeL=req.body.editCorkSizeL9;
				var editColor9CorkSizeXL=req.body.editCorkSizeXL9;
				var editColor9CorkSize2XL=req.body.editCorkSize2XL9;
				var editColor9CorkSize3XL=req.body.editCorkSize3XL9;
				var editColor9CorkSize4XL=req.body.editCorkSize4XL9;
				
				var editColor9KalaSizeS=req.body.editKalaSizeS9;
				var editColor9KalaSizeM=req.body.editKalaSizeM9;
				var editColor9KalaSizeL=req.body.editKalaSizeL9;
				var editColor9KalaSizeXL=req.body.editKalaSizeXL9;
				var editColor9KalaSize2XL=req.body.editKalaSize2XL9;
				var editColor9KalaSize3XL=req.body.editKalaSize3XL9;
				var editColor9KalaSize4XL=req.body.editKalaSize4XL9;
				
				var editColor9GalwaySizeS=req.body.editGalwaySizeS9;
				var editColor9GalwaySizeM=req.body.editGalwaySizeM9;
				var editColor9GalwaySizeL=req.body.editGalwaySizeL9;
				var editColor9GalwaySizeXL=req.body.editGalwaySizeXL9;
				var editColor9GalwaySize2XL=req.body.editGalwaySize2XL9;
				var editColor9GalwaySize3XL=req.body.editGalwaySize3XL9;
				var editColor9GalwaySize4XL=req.body.editGalwaySize4XL9;
				
				var editColor9WarehouseSizeS=req.body.editWarehouseSizeS9;
				var editColor9WarehouseSizeM=req.body.editWarehouseSizeM9;
				var editColor9WarehouseSizeL=req.body.editWarehouseSizeL9;
				var editColor9WarehouseSizeXL=req.body.editWarehouseSizeXL9;
				var editColor9WarehouseSize2XL=req.body.editWarehouseSize2XL9;
				var editColor9WarehouseSize3XL=req.body.editWarehouseSize3XL9;
				var editColor9WarehouseSize4XL=req.body.editWarehouseSize4XL9;
				
				var editColorTotal9= req.body.editColorTotal9;
				var editSubCountCork9= req.body.editSubCountCork9;
				var editSubCountKala9= req.body.editSubCountKala9;
				var editSubCountGalway9= req.body.editSubCountGalway9;
				var editSubCountWarehouse9= req.body.editSubCountWarehouse9;
			}
			
			else
			{
				var editColorCode9="";
				
				var editColor9CorkSizeS=0;
				var editColor9CorkSizeM=0;
				var editColor9CorkSizeL=0;
				var editColor9CorkSizeXL=0;
				var editColor9CorkSize2XL=0;
				var editColor9CorkSize3XL=0;
				var editColor9CorkSize4XL=0;
				
				var editColor9KalaSizeS=0;
				var editColor9KalaSizeM=0;
				var editColor9KalaSizeL=0;
				var editColor9KalaSizeXL=0;
				var editColor9KalaSize2XL=0;
				var editColor9KalaSize3XL=0;
				var editColor9KalaSize4XL=0;
				
				var editColor9GalwaySizeS=0;
				var editColor9GalwaySizeM=0;
				var editColor9GalwaySizeL=0;
				var editColor9GalwaySizeXL=0;
				var editColor9GalwaySize2XL=0;
				var editColor9GalwaySize3XL=0;
				var editColor9GalwaySize4XL=0;
				
				var editColor9WarehouseSizeS=0;
				var editColor9WarehouseSizeM=0;
				var editColor9WarehouseSizeL=0;
				var editColor9WarehouseSizeXL=0;
				var editColor9WarehouseSize2XL=0;
				var editColor9WarehouseSize3XL=0;
				var editColor9WarehouseSize4XL=0;
				
				var editColorTotal9=0;
				var editSubCountCork9=0;
				var editSubCountKala9=0;
				var editSubCountGalway9=0;
				var editSubCountWarehouse9=0;
			}
			
			if(styleIndex>=10)
			{
				var editColorCode10=req.body.editColor10;
				
				var editColor10CorkSizeS=req.body.editCorkSizeS10;
				var editColor10CorkSizeM=req.body.editCorkSizeM10;
				var editColor10CorkSizeL=req.body.editCorkSizeL10;
				var editColor10CorkSizeXL=req.body.editCorkSizeXL10;
				var editColor10CorkSize2XL=req.body.editCorkSize2XL10;
				var editColor10CorkSize3XL=req.body.editCorkSize3XL10;
				var editColor10CorkSize4XL=req.body.editCorkSize4XL10;
				
				var editColor10KalaSizeS=req.body.editKalaSizeS10;
				var editColor10KalaSizeM=req.body.editKalaSizeM10;
				var editColor10KalaSizeL=req.body.editKalaSizeL10;
				var editColor10KalaSizeXL=req.body.editKalaSizeXL10;
				var editColor10KalaSize2XL=req.body.editKalaSize2XL10;
				var editColor10KalaSize3XL=req.body.editKalaSize3XL10;
				var editColor10KalaSize4XL=req.body.editKalaSize4XL10;
				
				var editColor10GalwaySizeS=req.body.editGalwaySizeS10;
				var editColor10GalwaySizeM=req.body.editGalwaySizeM10;
				var editColor10GalwaySizeL=req.body.editGalwaySizeL10;
				var editColor10GalwaySizeXL=req.body.editGalwaySizeXL10;
				var editColor10GalwaySize2XL=req.body.editGalwaySize2XL10;
				var editColor10GalwaySize3XL=req.body.editGalwaySize3XL10;
				var editColor10GalwaySize4XL=req.body.editGalwaySize4XL10;
				
				var editColor10WarehouseSizeS=req.body.editWarehouseSizeS10;
				var editColor10WarehouseSizeM=req.body.editWarehouseSizeM10;
				var editColor10WarehouseSizeL=req.body.editWarehouseSizeL10;
				var editColor10WarehouseSizeXL=req.body.editWarehouseSizeXL10;
				var editColor10WarehouseSize2XL=req.body.editWarehouseSize2XL10;
				var editColor10WarehouseSize3XL=req.body.editWarehouseSize3XL10;
				var editColor10WarehouseSize4XL=req.body.editWarehouseSize4XL10;
				
				var editColorTotal10= req.body.editColorTotal10;
				var editSubCountCork10= req.body.editSubCountCork10;
				var editSubCountKala10= req.body.editSubCountKala10;
				var editSubCountGalway10= req.body.editSubCountGalway10;
				var editSubCountWarehouse10= req.body.editSubCountWarehouse10;
			}
			
			else
			{
				var editColorCode10="";
				
				var editColor10CorkSizeS=0;
				var editColor10CorkSizeM=0;
				var editColor10CorkSizeL=0;
				var editColor10CorkSizeXL=0;
				var editColor10CorkSize2XL=0;
				var editColor10CorkSize3XL=0;
				var editColor10CorkSize4XL=0;
				
				var editColor10KalaSizeS=0;
				var editColor10KalaSizeM=0;
				var editColor10KalaSizeL=0;
				var editColor10KalaSizeXL=0;
				var editColor10KalaSize2XL=0;
				var editColor10KalaSize3XL=0;
				var editColor10KalaSize4XL=0;
				
				var editColor10GalwaySizeS=0;
				var editColor10GalwaySizeM=0;
				var editColor10GalwaySizeL=0;
				var editColor10GalwaySizeXL=0;
				var editColor10GalwaySize2XL=0;
				var editColor10GalwaySize3XL=0;
				var editColor10GalwaySize4XL=0;
				
				var editColor10WarehouseSizeS=0;
				var editColor10WarehouseSizeM=0;
				var editColor10WarehouseSizeL=0;
				var editColor10WarehouseSizeXL=0;
				var editColor10WarehouseSize2XL=0;
				var editColor10WarehouseSize3XL=0;
				var editColor10WarehouseSize4XL=0;
				
				var editColorTotal10=0;
				var editSubCountCork10=0;
				var editSubCountKala10=0;
				var editSubCountGalway10=0;
				var editSubCountWarehouse10=0;
			}
			
			var editTotalKala= req.body.editCountKala;
			var editTotalCork= req.body.editCountCork;
			var editTotalGalway= req.body.editCountGalway;
			var editTotalWarehouse= req.body.editCountWarehouse;
	}
	
	//TF
	if(hasS==true&&hasC==false)
	{

	var hasSizesEdit=req.body.hasSizesEdit;
	var editNumColors=0;
	
	var inStoreCorkEdit = req.body.inCorkEdit;
	var inStoreKalaEdit = req.body.inKalaEdit;
	var inStoreGalwayEdit = req.body.inGalwayEdit;
	var inWarehouseEdit = req.body.inWarehouseEdit;
	
			var editWarehouseSizeS=req.body.editWarehouseSizeS;
			var editWarehouseSizeM=req.body.editWarehouseSizeM;
			var editWarehouseSizeL=req.body.editWarehouseSizeL;
			var editWarehouseSizeXL=req.body.editWarehouseSizeXL;
			var editWarehouseSize2XL=req.body.editWarehouseSize2XL;
			var editWarehouseSize3XL=req.body.editWarehouseSize3XL;
			var editWarehouseSize4XL=req.body.editWarehouseSize4XL;
			
			var editCorkSizeS=req.body.editCorkSizeS;
			var editCorkSizeM=req.body.editCorkSizeM;
			var editCorkSizeL=req.body.editCorkSizeL;
			var editCorkSizeXL=req.body.editCorkSizeXL;
			var editCorkSize2XL=req.body.editCorkSize2XL;
			var editCorkSize3XL=req.body.editCorkSize3XL;
			var editCorkSize4XL=req.body.editCorkSize4XL;
			
			var editKalaSizeS=req.body.editKalaSizeS;
			var editKalaSizeM=req.body.editKalaSizeM;
			var editKalaSizeL=req.body.editKalaSizeL;
			var editKalaSizeXL=req.body.editKalaSizeXL;
			var editKalaSize2XL=req.body.editKalaSize2XL;
			var editKalaSize3XL=req.body.editKalaSize3XL;
			var editKalaSize4XL=req.body.editKalaSize4XL;
			
			var editGalwaySizeS=req.body.editGalwaySizeS;
			var editGalwaySizeM=req.body.editGalwaySizeM;
			var editGalwaySizeL=req.body.editGalwaySizeL;
			var editGalwaySizeXL=req.body.editGalwaySizeXL;
			var editGalwaySize2XL=req.body.editGalwaySize2XL;
			var editGalwaySize3XL=req.body.editGalwaySize3XL;
			var editGalwaySize4XL=req.body.editGalwaySize4XL;
			
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
			
			var editColor1CorkSizeS=0;
			var editColor1CorkSizeM=0;
			var editColor1CorkSizeL=0;
			var editColor1CorkSizeXL=0;
			var editColor1CorkSize2XL=0;
			var editColor1CorkSize3XL=0;
			var editColor1CorkSize4XL=0;
			
			var editColor1KalaSizeS=0;
			var editColor1KalaSizeM=0;
			var editColor1KalaSizeL=0;
			var editColor1KalaSizeXL=0;
			var editColor1KalaSize2XL=0;
			var editColor1KalaSize3XL=0;
			var editColor1KalaSize4XL=0;
			
			var editColor1GalwaySizeS=0;
			var editColor1GalwaySizeM=0;
			var editColor1GalwaySizeL=0;
			var editColor1GalwaySizeXL=0;
			var editColor1GalwaySize2XL=0;
			var editColor1GalwaySize3XL=0;
			var editColor1GalwaySize4XL=0;
			
			var editColor1WarehouseSizeS=0;
			var editColor1WarehouseSizeM=0;
			var editColor1WarehouseSizeL=0;
			var editColor1WarehouseSizeXL=0;
			var editColor1WarehouseSize2XL=0;
			var editColor1WarehouseSize3XL=0;
			var editColor1WarehouseSize4XL=0;
			
			var editColorTotal1=0;
			var editSubCountCork1=0;
			var editSubCountKala1=0;
			var editSubCountGalway1=0;
			var editSubCountWarehouse1=0;
			
			var editColor2CorkSizeS=0;
			var editColor2CorkSizeM=0;
			var editColor2CorkSizeL=0;
			var editColor2CorkSizeXL=0;
			var editColor2CorkSize2XL=0;
			var editColor2CorkSize3XL=0;
			var editColor2CorkSize4XL=0;
			
			var editColor2KalaSizeS=0;
			var editColor2KalaSizeM=0;
			var editColor2KalaSizeL=0;
			var editColor2KalaSizeXL=0;
			var editColor2KalaSize2XL=0;
			var editColor2KalaSize3XL=0;
			var editColor2KalaSize4XL=0;
			
			var editColor2GalwaySizeS=0;
			var editColor2GalwaySizeM=0;
			var editColor2GalwaySizeL=0;
			var editColor2GalwaySizeXL=0;
			var editColor2GalwaySize2XL=0;
			var editColor2GalwaySize3XL=0;
			var editColor2GalwaySize4XL=0;
			
			var editColor2WarehouseSizeS=0;
			var editColor2WarehouseSizeM=0;
			var editColor2WarehouseSizeL=0;
			var editColor2WarehouseSizeXL=0;
			var editColor2WarehouseSize2XL=0;
			var editColor2WarehouseSize3XL=0;
			var editColor2WarehouseSize4XL=0;
			
			var editColorTotal2=0;
			var editSubCountCork2=0;
			var editSubCountKala2=0;
			var editSubCountGalway2=0;
			var editSubCountWarehouse2=0;
			
			var editColor3CorkSizeS=0;
			var editColor3CorkSizeM=0;
			var editColor3CorkSizeL=0;
			var editColor3CorkSizeXL=0;
			var editColor3CorkSize2XL=0;
			var editColor3CorkSize3XL=0;
			var editColor3CorkSize4XL=0;
			
			var editColor3KalaSizeS=0;
			var editColor3KalaSizeM=0;
			var editColor3KalaSizeL=0;
			var editColor3KalaSizeXL=0;
			var editColor3KalaSize2XL=0;
			var editColor3KalaSize3XL=0;
			var editColor3KalaSize4XL=0;
			
			var editColor3GalwaySizeS=0;
			var editColor3GalwaySizeM=0;
			var editColor3GalwaySizeL=0;
			var editColor3GalwaySizeXL=0;
			var editColor3GalwaySize2XL=0;
			var editColor3GalwaySize3XL=0;
			var editColor3GalwaySize4XL=0;
			
			var editColor3WarehouseSizeS=0;
			var editColor3WarehouseSizeM=0;
			var editColor3WarehouseSizeL=0;
			var editColor3WarehouseSizeXL=0;
			var editColor3WarehouseSize2XL=0;
			var editColor3WarehouseSize3XL=0;
			var editColor3WarehouseSize4XL=0;
			
			var editColorTotal3=0;
			var editSubCountCork3=0;
			var editSubCountKala3=0;
			var editSubCountGalway3=0;
			var editSubCountWarehouse3=0;
			
			var editColor4CorkSizeS=0;
			var editColor4CorkSizeM=0;
			var editColor4CorkSizeL=0;
			var editColor4CorkSizeXL=0;
			var editColor4CorkSize2XL=0;
			var editColor4CorkSize3XL=0;
			var editColor4CorkSize4XL=0;
			
			var editColor4KalaSizeS=0;
			var editColor4KalaSizeM=0;
			var editColor4KalaSizeL=0;
			var editColor4KalaSizeXL=0;
			var editColor4KalaSize2XL=0;
			var editColor4KalaSize3XL=0;
			var editColor4KalaSize4XL=0;
			
			var editColor4GalwaySizeS=0;
			var editColor4GalwaySizeM=0;
			var editColor4GalwaySizeL=0;
			var editColor4GalwaySizeXL=0;
			var editColor4GalwaySize2XL=0;
			var editColor4GalwaySize3XL=0;
			var editColor4GalwaySize4XL=0;
			
			var editColor4WarehouseSizeS=0;
			var editColor4WarehouseSizeM=0;
			var editColor4WarehouseSizeL=0;
			var editColor4WarehouseSizeXL=0;
			var editColor4WarehouseSize2XL=0;
			var editColor4WarehouseSize3XL=0;
			var editColor4WarehouseSize4XL=0;
			
			var editColorTotal4=0;
			var editSubCountCork4=0;
			var editSubCountKala4=0;
			var editSubCountGalway4=0;
			var editSubCountWarehouse4=0;
			
			var editColor5CorkSizeS=0;
			var editColor5CorkSizeM=0;
			var editColor5CorkSizeL=0;
			var editColor5CorkSizeXL=0;
			var editColor5CorkSize2XL=0;
			var editColor5CorkSize3XL=0;
			var editColor5CorkSize4XL=0;
			
			var editColor5KalaSizeS=0;
			var editColor5KalaSizeM=0;
			var editColor5KalaSizeL=0;
			var editColor5KalaSizeXL=0;
			var editColor5KalaSize2XL=0;
			var editColor5KalaSize3XL=0;
			var editColor5KalaSize4XL=0;
			
			var editColor5GalwaySizeS=0;
			var editColor5GalwaySizeM=0;
			var editColor5GalwaySizeL=0;
			var editColor5GalwaySizeXL=0;
			var editColor5GalwaySize2XL=0;
			var editColor5GalwaySize3XL=0;
			var editColor5GalwaySize4XL=0;
			
			var editColor5WarehouseSizeS=0;
			var editColor5WarehouseSizeM=0;
			var editColor5WarehouseSizeL=0;
			var editColor5WarehouseSizeXL=0;
			var editColor5WarehouseSize2XL=0;
			var editColor5WarehouseSize3XL=0;
			var editColor5WarehouseSize4XL=0;
			
			var editColorTotal5=0;
			var editSubCountCork5=0;
			var editSubCountKala5=0;
			var editSubCountGalway5=0;
			var editSubCountWarehouse5=0;
			
			var editColor6CorkSizeS=0;
			var editColor6CorkSizeM=0;
			var editColor6CorkSizeL=0;
			var editColor6CorkSizeXL=0;
			var editColor6CorkSize2XL=0;
			var editColor6CorkSize3XL=0;
			var editColor6CorkSize4XL=0;
			
			var editColor6KalaSizeS=0;
			var editColor6KalaSizeM=0;
			var editColor6KalaSizeL=0;
			var editColor6KalaSizeXL=0;
			var editColor6KalaSize2XL=0;
			var editColor6KalaSize3XL=0;
			var editColor6KalaSize4XL=0;
			
			var editColor6GalwaySizeS=0;
			var editColor6GalwaySizeM=0;
			var editColor6GalwaySizeL=0;
			var editColor6GalwaySizeXL=0;
			var editColor6GalwaySize2XL=0;
			var editColor6GalwaySize3XL=0;
			var editColor6GalwaySize4XL=0;
			
			var editColor6WarehouseSizeS=0;
			var editColor6WarehouseSizeM=0;
			var editColor6WarehouseSizeL=0;
			var editColor6WarehouseSizeXL=0;
			var editColor6WarehouseSize2XL=0;
			var editColor6WarehouseSize3XL=0;
			var editColor6WarehouseSize4XL=0;
			
			var editColorTotal6=0;
			var editSubCountCork6=0;
			var editSubCountKala6=0;
			var editSubCountGalway6=0;
			var editSubCountWarehouse6=0;
			
			var editColor7CorkSizeS=0;
			var editColor7CorkSizeM=0;
			var editColor7CorkSizeL=0;
			var editColor7CorkSizeXL=0;
			var editColor7CorkSize2XL=0;
			var editColor7CorkSize3XL=0;
			var editColor7CorkSize4XL=0;
			
			var editColor7KalaSizeS=0;
			var editColor7KalaSizeM=0;
			var editColor7KalaSizeL=0;
			var editColor7KalaSizeXL=0;
			var editColor7KalaSize2XL=0;
			var editColor7KalaSize3XL=0;
			var editColor7KalaSize4XL=0;
			
			var editColor7GalwaySizeS=0;
			var editColor7GalwaySizeM=0;
			var editColor7GalwaySizeL=0;
			var editColor7GalwaySizeXL=0;
			var editColor7GalwaySize2XL=0;
			var editColor7GalwaySize3XL=0;
			var editColor7GalwaySize4XL=0;
			
			var editColor7WarehouseSizeS=0;
			var editColor7WarehouseSizeM=0;
			var editColor7WarehouseSizeL=0;
			var editColor7WarehouseSizeXL=0;
			var editColor7WarehouseSize2XL=0;
			var editColor7WarehouseSize3XL=0;
			var editColor7WarehouseSize4XL=0;
			
			var editColorTotal7=0;
			var editSubCountCork7=0;
			var editSubCountKala7=0;
			var editSubCountGalway7=0;
			var editSubCountWarehouse7=0;
			
			var editColor8CorkSizeS=0;
			var editColor8CorkSizeM=0;
			var editColor8CorkSizeL=0;
			var editColor8CorkSizeXL=0;
			var editColor8CorkSize2XL=0;
			var editColor8CorkSize3XL=0;
			var editColor8CorkSize4XL=0;
			
			var editColor8KalaSizeS=0;
			var editColor8KalaSizeM=0;
			var editColor8KalaSizeL=0;
			var editColor8KalaSizeXL=0;
			var editColor8KalaSize2XL=0;
			var editColor8KalaSize3XL=0;
			var editColor8KalaSize4XL=0;
			
			var editColor8GalwaySizeS=0;
			var editColor8GalwaySizeM=0;
			var editColor8GalwaySizeL=0;
			var editColor8GalwaySizeXL=0;
			var editColor8GalwaySize2XL=0;
			var editColor8GalwaySize3XL=0;
			var editColor8GalwaySize4XL=0;
			
			var editColor8WarehouseSizeS=0;
			var editColor8WarehouseSizeM=0;
			var editColor8WarehouseSizeL=0;
			var editColor8WarehouseSizeXL=0;
			var editColor8WarehouseSize2XL=0;
			var editColor8WarehouseSize3XL=0;
			var editColor8WarehouseSize4XL=0;
			
			var editColorTotal8=0;
			var editSubCountCork8=0;
			var editSubCountKala8=0;
			var editSubCountGalway8=0;
			var editSubCountWarehouse8=0;
			
			var editColor9CorkSizeS=0;
			var editColor9CorkSizeM=0;
			var editColor9CorkSizeL=0;
			var editColor9CorkSizeXL=0;
			var editColor9CorkSize2XL=0;
			var editColor9CorkSize3XL=0;
			var editColor9CorkSize4XL=0;
			
			var editColor9KalaSizeS=0;
			var editColor9KalaSizeM=0;
			var editColor9KalaSizeL=0;
			var editColor9KalaSizeXL=0;
			var editColor9KalaSize2XL=0;
			var editColor9KalaSize3XL=0;
			var editColor9KalaSize4XL=0;
			
			var editColor9GalwaySizeS=0;
			var editColor9GalwaySizeM=0;
			var editColor9GalwaySizeL=0;
			var editColor9GalwaySizeXL=0;
			var editColor9GalwaySize2XL=0;
			var editColor9GalwaySize3XL=0;
			var editColor9GalwaySize4XL=0;
			
			var editColor9WarehouseSizeS=0;
			var editColor9WarehouseSizeM=0;
			var editColor9WarehouseSizeL=0;
			var editColor9WarehouseSizeXL=0;
			var editColor9WarehouseSize2XL=0;
			var editColor9WarehouseSize3XL=0;
			var editColor9WarehouseSize4XL=0;
			
			var editColorTotal9=0;
			var editSubCountCork9=0;
			var editSubCountKala9=0;
			var editSubCountGalway9=0;
			var editSubCountWarehouse9=0;
			
			var editColor10CorkSizeS=0;
			var editColor10CorkSizeM=0;
			var editColor10CorkSizeL=0;
			var editColor10CorkSizeXL=0;
			var editColor10CorkSize2XL=0;
			var editColor10CorkSize3XL=0;
			var editColor10CorkSize4XL=0;
			
			var editColor10KalaSizeS=0;
			var editColor10KalaSizeM=0;
			var editColor10KalaSizeL=0;
			var editColor10KalaSizeXL=0;
			var editColor10KalaSize2XL=0;
			var editColor10KalaSize3XL=0;
			var editColor10KalaSize4XL=0;
			
			var editColor10GalwaySizeS=0;
			var editColor10GalwaySizeM=0;
			var editColor10GalwaySizeL=0;
			var editColor10GalwaySizeXL=0;
			var editColor10GalwaySize2XL=0;
			var editColor10GalwaySize3XL=0;
			var editColor10GalwaySize4XL=0;
			
			var editColor10WarehouseSizeS=0;
			var editColor10WarehouseSizeM=0;
			var editColor10WarehouseSizeL=0;
			var editColor10WarehouseSizeXL=0;
			var editColor10WarehouseSize2XL=0;
			var editColor10WarehouseSize3XL=0;
			var editColor10WarehouseSize4XL=0;
			
			var editColorTotal10=0;
			var editSubCountCork10=0;
			var editSubCountKala10=0;
			var editSubCountGalway10=0;
			var editSubCountWarehouse10=0;
			
			var editTotalKala= req.body.editCountKala;
			var editTotalCork= req.body.editCountCork;
			var editTotalGalway= req.body.editCountGalway;
			var editTotalWarehouse= req.body.editCountWarehouse;
	}
	
	//FT
	if(hasS==false&&hasC==true)
	{

	var hasSizesEdit=req.body.hasSizesEdit;
	var editNumColors=req.body.editNumSubStyles;
	
	var inStoreCorkEdit = req.body.inCorkEdit;
	var inStoreKalaEdit = req.body.inKalaEdit;
	var inStoreGalwayEdit = req.body.inGalwayEdit;
	var inWarehouseEdit = req.body.inWarehouseEdit;
			
			var editWarehouseSizeS=0;
			var editWarehouseSizeM=0;
			var editWarehouseSizeL=0;
			var editWarehouseSizeXL=0;
			var editWarehouseSize2XL=0;
			var editWarehouseSize3XL=0;
			var editWarehouseSize4XL=0;
			
			var editCorkSizeS=0;
			var editCorkSizeM=0;
			var editCorkSizeL=0;
			var editCorkSizeXL=0;
			var editCorkSize2XL=0;
			var editCorkSize3XL=0;
			var editCorkSize4XL=0;
			
			var editKalaSizeS=0;
			var editKalaSizeM=0;
			var editKalaSizeL=0;
			var editKalaSizeXL=0;
			var editKalaSize2XL=0;
			var editKalaSize3XL=0;
			var editKalaSize4XL=0;
			
			var editGalwaySizeS=0;
			var editGalwaySizeM=0;
			var editGalwaySizeL=0;
			var editGalwaySizeXL=0;
			var editGalwaySize2XL=0;
			var editGalwaySize3XL=0;
			var editGalwaySize4XL=0;
			
			if(styleIndex>=1)
			{		
				var editColorCode1=req.body.editColor1;
				var editColorTotal1= req.body.editColorTotal1;
				var editSubCountCork1= req.body.editSubCountCork1;
				var editSubCountKala1= req.body.editSubCountKala1;
				var editSubCountGalway1= req.body.editSubCountGalway1;
				var editSubCountWarehouse1= req.body.editSubCountWarehouse1;
			}
			
			else
			{
				var editColorCode1="";
				var editColorTotal1=0;
				var editSubCountCork1=0;
				var editSubCountKala1=0;
				var editSubCountGalway1=0;
				var editSubCountWarehouse1=0;
			}
			
			if(styleIndex>=2)
			{			
				var editColorCode2=req.body.editColor2;
				var editColorTotal2= req.body.editColorTotal2;
				var editSubCountCork2= req.body.editSubCountCork2;
				var editSubCountKala2= req.body.editSubCountKala2;
				var editSubCountGalway2= req.body.editSubCountGalway2;
				var editSubCountWarehouse2= req.body.editSubCountWarehouse2;
			}
			
			else
			{
				var editColorCode2="";
				var editColorTotal2=0;
				var editSubCountCork2=0;
				var editSubCountKala2=0;
				var editSubCountGalway2=0;
				var editSubCountWarehouse2=0;
			}
			
			if(styleIndex>=3)
			{				
				var editColorCode3=req.body.editColor3;
				var editColorTotal3= req.body.editColorTotal3;
				var editSubCountCork3= req.body.editSubCountCork3;
				var editSubCountKala3= req.body.editSubCountKala3;
				var editSubCountGalway3= req.body.editSubCountGalway3;
				var editSubCountWarehouse3= req.body.editSubCountWarehouse3;
			}
			
			else
			{
				var editColorCode3="";
				var editColorTotal3=0;
				var editSubCountCork3=0;
				var editSubCountKala3=0;
				var editSubCountGalway3=0;
				var editSubCountWarehouse3=0;
			}
			
			if(styleIndex>=4)
			{				
				var editColorCode4=req.body.editColor4;
				var editColorTotal4= req.body.editColorTotal4;
				var editSubCountCork4= req.body.editSubCountCork4;
				var editSubCountKala4= req.body.editSubCountKala4;
				var editSubCountGalway4= req.body.editSubCountGalway4;
				var editSubCountWarehouse4= req.body.editSubCountWarehouse4;
			}
			
			else
			{
				var editColorCode4="";
				var editColorTotal4=0;
				var editSubCountCork4=0;
				var editSubCountKala4=0;
				var editSubCountGalway4=0;
				var editSubCountWarehouse4=0;
			}
			
			if(styleIndex>=5)
			{				
				var editColorCode5=req.body.editColor5;
				var editColorTotal5= req.body.editColorTotal5;
				var editSubCountCork5= req.body.editSubCountCork5;
				var editSubCountKala5= req.body.editSubCountKala5;
				var editSubCountGalway5= req.body.editSubCountGalway5;
				var editSubCountWarehouse5= req.body.editSubCountWarehouse5;
			}
			
			else
			{
				var editColorCode5="";
				var editColorTotal5=0;
				var editSubCountCork5=0;
				var editSubCountKala5=0;
				var editSubCountGalway5=0;
				var editSubCountWarehouse5=0;
			}
			
			if(styleIndex>=6)
			{				
				var editColorCode6=req.body.editColor6;
				var editColorTotal6= req.body.editColorTotal6;
				var editSubCountCork6= req.body.editSubCountCork6;
				var editSubCountKala6= req.body.editSubCountKala6;
				var editSubCountGalway6= req.body.editSubCountGalway6;
				var editSubCountWarehouse6= req.body.editSubCountWarehouse6;
			}
			
			else
			{
				var editColorCode6="";
				var editColorTotal6=0;
				var editSubCountCork6=0;
				var editSubCountKala6=0;
				var editSubCountGalway6=0;
				var editSubCountWarehouse6=0;
			}
			
			if(styleIndex>=7)
			{				
				var editColorCode7=req.body.editColor7;
				var editColorTotal7= req.body.editColorTotal7;
				var editSubCountCork7= req.body.editSubCountCork7;
				var editSubCountKala7= req.body.editSubCountKala7;
				var editSubCountGalway7= req.body.editSubCountGalway7;
				var editSubCountWarehouse7= req.body.editSubCountWarehouse7;
			}
			
			else
			{
				var editColorCode7="";
				var editColorTotal7=0;
				var editSubCountCork7=0;
				var editSubCountKala7=0;
				var editSubCountGalway7=0;
				var editSubCountWarehouse7=0;
			}
			
			if(styleIndex>=8)
			{				
				var editColorCode8=req.body.editColor8;
				var editColorTotal8= req.body.editColorTotal8;
				var editSubCountCork8= req.body.editSubCountCork8;
				var editSubCountKala8= req.body.editSubCountKala8;
				var editSubCountGalway8= req.body.editSubCountGalway8;
				var editSubCountWarehouse8= req.body.editSubCountWarehouse8;
			}
			
			else
			{
				var editColorCode8="";
				var editColorTotal8=0;
				var editSubCountCork8=0;
				var editSubCountKala8=0;
				var editSubCountGalway8=0;
				var editSubCountWarehouse8=0;
			}
			
			if(styleIndex>=9)
			{				
				var editColorCode9=req.body.editColor9;
				var editColorTotal9= req.body.editColorTotal9;
				var editSubCountCork9= req.body.editSubCountCork9;
				var editSubCountKala9= req.body.editSubCountKala9;
				var editSubCountGalway9= req.body.editSubCountGalway9;
				var editSubCountWarehouse9= req.body.editSubCountWarehouse9;
			}
			
			else
			{
				var editColorCode9="";
				var editColorTotal9=0;
				var editSubCountCork9=0;
				var editSubCountKala9=0;
				var editSubCountGalway9=0;
				var editSubCountWarehouse9=0;
			}
			
			if(styleIndex>=10)
			{				
				var editColorCode10=req.body.editColor10;
				var editColorTotal10= req.body.editColorTotal10;
				var editSubCountCork10= req.body.editSubCountCork10;
				var editSubCountKala10= req.body.editSubCountKala10;
				var editSubCountGalway10= req.body.editSubCountGalway10;
				var editSubCountWarehouse10= req.body.editSubCountWarehouse10;
			}
			
			else
			{
				var editColorCode10="";
				var editColorTotal10=0;
				var editSubCountCork10=0;
				var editSubCountKala10=0;
				var editSubCountGalway10=0;
				var editSubCountWarehouse10=0;
			}
			
			var editColor1CorkSizeS=0;
			var editColor1CorkSizeM=0;
			var editColor1CorkSizeL=0;
			var editColor1CorkSizeXL=0;
			var editColor1CorkSize2XL=0;
			var editColor1CorkSize3XL=0;
			var editColor1CorkSize4XL=0;
			
			var editColor1KalaSizeS=0;
			var editColor1KalaSizeM=0;
			var editColor1KalaSizeL=0;
			var editColor1KalaSizeXL=0;
			var editColor1KalaSize2XL=0;
			var editColor1KalaSize3XL=0;
			var editColor1KalaSize4XL=0;
			
			var editColor1GalwaySizeS=0;
			var editColor1GalwaySizeM=0;
			var editColor1GalwaySizeL=0;
			var editColor1GalwaySizeXL=0;
			var editColor1GalwaySize2XL=0;
			var editColor1GalwaySize3XL=0;
			var editColor1GalwaySize4XL=0;
			
			var editColor1WarehouseSizeS=0;
			var editColor1WarehouseSizeM=0;
			var editColor1WarehouseSizeL=0;
			var editColor1WarehouseSizeXL=0;
			var editColor1WarehouseSize2XL=0;
			var editColor1WarehouseSize3XL=0;
			var editColor1WarehouseSize4XL=0;

			var editColor2CorkSizeS=0;
			var editColor2CorkSizeM=0;
			var editColor2CorkSizeL=0;
			var editColor2CorkSizeXL=0;
			var editColor2CorkSize2XL=0;
			var editColor2CorkSize3XL=0;
			var editColor2CorkSize4XL=0;
			
			var editColor2KalaSizeS=0;
			var editColor2KalaSizeM=0;
			var editColor2KalaSizeL=0;
			var editColor2KalaSizeXL=0;
			var editColor2KalaSize2XL=0;
			var editColor2KalaSize3XL=0;
			var editColor2KalaSize4XL=0;
			
			var editColor2GalwaySizeS=0;
			var editColor2GalwaySizeM=0;
			var editColor2GalwaySizeL=0;
			var editColor2GalwaySizeXL=0;
			var editColor2GalwaySize2XL=0;
			var editColor2GalwaySize3XL=0;
			var editColor2GalwaySize4XL=0;
			
			var editColor2WarehouseSizeS=0;
			var editColor2WarehouseSizeM=0;
			var editColor2WarehouseSizeL=0;
			var editColor2WarehouseSizeXL=0;
			var editColor2WarehouseSize2XL=0;
			var editColor2WarehouseSize3XL=0;
			var editColor2WarehouseSize4XL=0;

			var editColor3CorkSizeS=0;
			var editColor3CorkSizeM=0;
			var editColor3CorkSizeL=0;
			var editColor3CorkSizeXL=0;
			var editColor3CorkSize2XL=0;
			var editColor3CorkSize3XL=0;
			var editColor3CorkSize4XL=0;
			
			var editColor3KalaSizeS=0;
			var editColor3KalaSizeM=0;
			var editColor3KalaSizeL=0;
			var editColor3KalaSizeXL=0;
			var editColor3KalaSize2XL=0;
			var editColor3KalaSize3XL=0;
			var editColor3KalaSize4XL=0;
			
			var editColor3GalwaySizeS=0;
			var editColor3GalwaySizeM=0;
			var editColor3GalwaySizeL=0;
			var editColor3GalwaySizeXL=0;
			var editColor3GalwaySize2XL=0;
			var editColor3GalwaySize3XL=0;
			var editColor3GalwaySize4XL=0;
			
			var editColor3WarehouseSizeS=0;
			var editColor3WarehouseSizeM=0;
			var editColor3WarehouseSizeL=0;
			var editColor3WarehouseSizeXL=0;
			var editColor3WarehouseSize2XL=0;
			var editColor3WarehouseSize3XL=0;
			var editColor3WarehouseSize4XL=0;

			var editColor4CorkSizeS=0;
			var editColor4CorkSizeM=0;
			var editColor4CorkSizeL=0;
			var editColor4CorkSizeXL=0;
			var editColor4CorkSize2XL=0;
			var editColor4CorkSize3XL=0;
			var editColor4CorkSize4XL=0;
			
			var editColor4KalaSizeS=0;
			var editColor4KalaSizeM=0;
			var editColor4KalaSizeL=0;
			var editColor4KalaSizeXL=0;
			var editColor4KalaSize2XL=0;
			var editColor4KalaSize3XL=0;
			var editColor4KalaSize4XL=0;
			
			var editColor4GalwaySizeS=0;
			var editColor4GalwaySizeM=0;
			var editColor4GalwaySizeL=0;
			var editColor4GalwaySizeXL=0;
			var editColor4GalwaySize2XL=0;
			var editColor4GalwaySize3XL=0;
			var editColor4GalwaySize4XL=0;
			
			var editColor4WarehouseSizeS=0;
			var editColor4WarehouseSizeM=0;
			var editColor4WarehouseSizeL=0;
			var editColor4WarehouseSizeXL=0;
			var editColor4WarehouseSize2XL=0;
			var editColor4WarehouseSize3XL=0;
			var editColor4WarehouseSize4XL=0;

			var editColor5CorkSizeS=0;
			var editColor5CorkSizeM=0;
			var editColor5CorkSizeL=0;
			var editColor5CorkSizeXL=0;
			var editColor5CorkSize2XL=0;
			var editColor5CorkSize3XL=0;
			var editColor5CorkSize4XL=0;
			
			var editColor5KalaSizeS=0;
			var editColor5KalaSizeM=0;
			var editColor5KalaSizeL=0;
			var editColor5KalaSizeXL=0;
			var editColor5KalaSize2XL=0;
			var editColor5KalaSize3XL=0;
			var editColor5KalaSize4XL=0;
			
			var editColor5GalwaySizeS=0;
			var editColor5GalwaySizeM=0;
			var editColor5GalwaySizeL=0;
			var editColor5GalwaySizeXL=0;
			var editColor5GalwaySize2XL=0;
			var editColor5GalwaySize3XL=0;
			var editColor5GalwaySize4XL=0;
			
			var editColor5WarehouseSizeS=0;
			var editColor5WarehouseSizeM=0;
			var editColor5WarehouseSizeL=0;
			var editColor5WarehouseSizeXL=0;
			var editColor5WarehouseSize2XL=0;
			var editColor5WarehouseSize3XL=0;
			var editColor5WarehouseSize4XL=0;

			var editColor6CorkSizeS=0;
			var editColor6CorkSizeM=0;
			var editColor6CorkSizeL=0;
			var editColor6CorkSizeXL=0;
			var editColor6CorkSize2XL=0;
			var editColor6CorkSize3XL=0;
			var editColor6CorkSize4XL=0;
			
			var editColor6KalaSizeS=0;
			var editColor6KalaSizeM=0;
			var editColor6KalaSizeL=0;
			var editColor6KalaSizeXL=0;
			var editColor6KalaSize2XL=0;
			var editColor6KalaSize3XL=0;
			var editColor6KalaSize4XL=0;
			
			var editColor6GalwaySizeS=0;
			var editColor6GalwaySizeM=0;
			var editColor6GalwaySizeL=0;
			var editColor6GalwaySizeXL=0;
			var editColor6GalwaySize2XL=0;
			var editColor6GalwaySize3XL=0;
			var editColor6GalwaySize4XL=0;
			
			var editColor6WarehouseSizeS=0;
			var editColor6WarehouseSizeM=0;
			var editColor6WarehouseSizeL=0;
			var editColor6WarehouseSizeXL=0;
			var editColor6WarehouseSize2XL=0;
			var editColor6WarehouseSize3XL=0;
			var editColor6WarehouseSize4XL=0;

			var editColor7CorkSizeS=0;
			var editColor7CorkSizeM=0;
			var editColor7CorkSizeL=0;
			var editColor7CorkSizeXL=0;
			var editColor7CorkSize2XL=0;
			var editColor7CorkSize3XL=0;
			var editColor7CorkSize4XL=0;
			
			var editColor7KalaSizeS=0;
			var editColor7KalaSizeM=0;
			var editColor7KalaSizeL=0;
			var editColor7KalaSizeXL=0;
			var editColor7KalaSize2XL=0;
			var editColor7KalaSize3XL=0;
			var editColor7KalaSize4XL=0;
			
			var editColor7GalwaySizeS=0;
			var editColor7GalwaySizeM=0;
			var editColor7GalwaySizeL=0;
			var editColor7GalwaySizeXL=0;
			var editColor7GalwaySize2XL=0;
			var editColor7GalwaySize3XL=0;
			var editColor7GalwaySize4XL=0;
			
			var editColor7WarehouseSizeS=0;
			var editColor7WarehouseSizeM=0;
			var editColor7WarehouseSizeL=0;
			var editColor7WarehouseSizeXL=0;
			var editColor7WarehouseSize2XL=0;
			var editColor7WarehouseSize3XL=0;
			var editColor7WarehouseSize4XL=0;

			var editColor8CorkSizeS=0;
			var editColor8CorkSizeM=0;
			var editColor8CorkSizeL=0;
			var editColor8CorkSizeXL=0;
			var editColor8CorkSize2XL=0;
			var editColor8CorkSize3XL=0;
			var editColor8CorkSize4XL=0;
			
			var editColor8KalaSizeS=0;
			var editColor8KalaSizeM=0;
			var editColor8KalaSizeL=0;
			var editColor8KalaSizeXL=0;
			var editColor8KalaSize2XL=0;
			var editColor8KalaSize3XL=0;
			var editColor8KalaSize4XL=0;
			
			var editColor8GalwaySizeS=0;
			var editColor8GalwaySizeM=0;
			var editColor8GalwaySizeL=0;
			var editColor8GalwaySizeXL=0;
			var editColor8GalwaySize2XL=0;
			var editColor8GalwaySize3XL=0;
			var editColor8GalwaySize4XL=0;
			
			var editColor8WarehouseSizeS=0;
			var editColor8WarehouseSizeM=0;
			var editColor8WarehouseSizeL=0;
			var editColor8WarehouseSizeXL=0;
			var editColor8WarehouseSize2XL=0;
			var editColor8WarehouseSize3XL=0;
			var editColor8WarehouseSize4XL=0;

			var editColor9CorkSizeS=0;
			var editColor9CorkSizeM=0;
			var editColor9CorkSizeL=0;
			var editColor9CorkSizeXL=0;
			var editColor9CorkSize2XL=0;
			var editColor9CorkSize3XL=0;
			var editColor9CorkSize4XL=0;
			
			var editColor9KalaSizeS=0;
			var editColor9KalaSizeM=0;
			var editColor9KalaSizeL=0;
			var editColor9KalaSizeXL=0;
			var editColor9KalaSize2XL=0;
			var editColor9KalaSize3XL=0;
			var editColor9KalaSize4XL=0;
			
			var editColor9GalwaySizeS=0;
			var editColor9GalwaySizeM=0;
			var editColor9GalwaySizeL=0;
			var editColor9GalwaySizeXL=0;
			var editColor9GalwaySize2XL=0;
			var editColor9GalwaySize3XL=0;
			var editColor9GalwaySize4XL=0;
			
			var editColor9WarehouseSizeS=0;
			var editColor9WarehouseSizeM=0;
			var editColor9WarehouseSizeL=0;
			var editColor9WarehouseSizeXL=0;
			var editColor9WarehouseSize2XL=0;
			var editColor9WarehouseSize3XL=0;
			var editColor9WarehouseSize4XL=0;

			var editColor10CorkSizeS=0;
			var editColor10CorkSizeM=0;
			var editColor10CorkSizeL=0;
			var editColor10CorkSizeXL=0;
			var editColor10CorkSize2XL=0;
			var editColor10CorkSize3XL=0;
			var editColor10CorkSize4XL=0;
			
			var editColor10KalaSizeS=0;
			var editColor10KalaSizeM=0;
			var editColor10KalaSizeL=0;
			var editColor10KalaSizeXL=0;
			var editColor10KalaSize2XL=0;
			var editColor10KalaSize3XL=0;
			var editColor10KalaSize4XL=0;
			
			var editColor10GalwaySizeS=0;
			var editColor10GalwaySizeM=0;
			var editColor10GalwaySizeL=0;
			var editColor10GalwaySizeXL=0;
			var editColor10GalwaySize2XL=0;
			var editColor10GalwaySize3XL=0;
			var editColor10GalwaySize4XL=0;
			
			var editColor10WarehouseSizeS=0;
			var editColor10WarehouseSizeM=0;
			var editColor10WarehouseSizeL=0;
			var editColor10WarehouseSizeXL=0;
			var editColor10WarehouseSize2XL=0;
			var editColor10WarehouseSize3XL=0;
			var editColor10WarehouseSize4XL=0;
			
			var editTotalKala= req.body.editCountKala;
			var editTotalCork= req.body.editCountCork;
			var editTotalGalway= req.body.editCountGalway;
			var editTotalWarehouse= req.body.editCountWarehouse;
	}
	
	//FF
	if(hasS==false&&hasC==false)
	{

	var hasSizesEdit=req.body.hasSizesEdit;
	var editNumColors=0;
	
	var inStoreCorkEdit = req.body.inCorkEdit;
	var inStoreKalaEdit = req.body.inKalaEdit;
	var inStoreGalwayEdit = req.body.inGalwayEdit;
	var inWarehouseEdit = req.body.inWarehouseEdit;
			
			var editWarehouseSizeS=0;
			var editWarehouseSizeM=0;
			var editWarehouseSizeL=0;
			var editWarehouseSizeXL=0;
			var editWarehouseSize2XL=0;
			var editWarehouseSize3XL=0;
			var editWarehouseSize4XL=0;
			
			var editCorkSizeS=0;
			var editCorkSizeM=0;
			var editCorkSizeL=0;
			var editCorkSizeXL=0;
			var editCorkSize2XL=0;
			var editCorkSize3XL=0;
			var editCorkSize4XL=0;
			
			var editKalaSizeS=0;
			var editKalaSizeM=0;
			var editKalaSizeL=0;
			var editKalaSizeXL=0;
			var editKalaSize2XL=0;
			var editKalaSize3XL=0;
			var editKalaSize4XL=0;
			
			var editGalwaySizeS=0;
			var editGalwaySizeM=0;
			var editGalwaySizeL=0;
			var editGalwaySizeXL=0;
			var editGalwaySize2XL=0;
			var editGalwaySize3XL=0;
			var editGalwaySize4XL=0;
			
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
			
			var editColor1CorkSizeS=0;
			var editColor1CorkSizeM=0;
			var editColor1CorkSizeL=0;
			var editColor1CorkSizeXL=0;
			var editColor1CorkSize2XL=0;
			var editColor1CorkSize3XL=0;
			var editColor1CorkSize4XL=0;
			
			var editColor1KalaSizeS=0;
			var editColor1KalaSizeM=0;
			var editColor1KalaSizeL=0;
			var editColor1KalaSizeXL=0;
			var editColor1KalaSize2XL=0;
			var editColor1KalaSize3XL=0;
			var editColor1KalaSize4XL=0;
			
			var editColor1GalwaySizeS=0;
			var editColor1GalwaySizeM=0;
			var editColor1GalwaySizeL=0;
			var editColor1GalwaySizeXL=0;
			var editColor1GalwaySize2XL=0;
			var editColor1GalwaySize3XL=0;
			var editColor1GalwaySize4XL=0;
			
			var editColor1WarehouseSizeS=0;
			var editColor1WarehouseSizeM=0;
			var editColor1WarehouseSizeL=0;
			var editColor1WarehouseSizeXL=0;
			var editColor1WarehouseSize2XL=0;
			var editColor1WarehouseSize3XL=0;
			var editColor1WarehouseSize4XL=0;
			
			var editColorTotal1=0;
			var editSubCountCork1=0;
			var editSubCountKala1=0;
			var editSubCountGalway1=0;
			var editSubCountWarehouse1=0;
			
			var editColor2CorkSizeS=0;
			var editColor2CorkSizeM=0;
			var editColor2CorkSizeL=0;
			var editColor2CorkSizeXL=0;
			var editColor2CorkSize2XL=0;
			var editColor2CorkSize3XL=0;
			var editColor2CorkSize4XL=0;
			
			var editColor2KalaSizeS=0;
			var editColor2KalaSizeM=0;
			var editColor2KalaSizeL=0;
			var editColor2KalaSizeXL=0;
			var editColor2KalaSize2XL=0;
			var editColor2KalaSize3XL=0;
			var editColor2KalaSize4XL=0;
			
			var editColor2GalwaySizeS=0;
			var editColor2GalwaySizeM=0;
			var editColor2GalwaySizeL=0;
			var editColor2GalwaySizeXL=0;
			var editColor2GalwaySize2XL=0;
			var editColor2GalwaySize3XL=0;
			var editColor2GalwaySize4XL=0;
			
			var editColor2WarehouseSizeS=0;
			var editColor2WarehouseSizeM=0;
			var editColor2WarehouseSizeL=0;
			var editColor2WarehouseSizeXL=0;
			var editColor2WarehouseSize2XL=0;
			var editColor2WarehouseSize3XL=0;
			var editColor2WarehouseSize4XL=0;
			
			var editColorTotal2=0;
			var editSubCountCork2=0;
			var editSubCountKala2=0;
			var editSubCountGalway2=0;
			var editSubCountWarehouse2=0;
			
			var editColor3CorkSizeS=0;
			var editColor3CorkSizeM=0;
			var editColor3CorkSizeL=0;
			var editColor3CorkSizeXL=0;
			var editColor3CorkSize2XL=0;
			var editColor3CorkSize3XL=0;
			var editColor3CorkSize4XL=0;
			
			var editColor3KalaSizeS=0;
			var editColor3KalaSizeM=0;
			var editColor3KalaSizeL=0;
			var editColor3KalaSizeXL=0;
			var editColor3KalaSize2XL=0;
			var editColor3KalaSize3XL=0;
			var editColor3KalaSize4XL=0;
			
			var editColor3GalwaySizeS=0;
			var editColor3GalwaySizeM=0;
			var editColor3GalwaySizeL=0;
			var editColor3GalwaySizeXL=0;
			var editColor3GalwaySize2XL=0;
			var editColor3GalwaySize3XL=0;
			var editColor3GalwaySize4XL=0;
			
			var editColor3WarehouseSizeS=0;
			var editColor3WarehouseSizeM=0;
			var editColor3WarehouseSizeL=0;
			var editColor3WarehouseSizeXL=0;
			var editColor3WarehouseSize2XL=0;
			var editColor3WarehouseSize3XL=0;
			var editColor3WarehouseSize4XL=0;
			
			var editColorTotal3=0;
			var editSubCountCork3=0;
			var editSubCountKala3=0;
			var editSubCountGalway3=0;
			var editSubCountWarehouse3=0;
			
			var editColor4CorkSizeS=0;
			var editColor4CorkSizeM=0;
			var editColor4CorkSizeL=0;
			var editColor4CorkSizeXL=0;
			var editColor4CorkSize2XL=0;
			var editColor4CorkSize3XL=0;
			var editColor4CorkSize4XL=0;
			
			var editColor4KalaSizeS=0;
			var editColor4KalaSizeM=0;
			var editColor4KalaSizeL=0;
			var editColor4KalaSizeXL=0;
			var editColor4KalaSize2XL=0;
			var editColor4KalaSize3XL=0;
			var editColor4KalaSize4XL=0;
			
			var editColor4GalwaySizeS=0;
			var editColor4GalwaySizeM=0;
			var editColor4GalwaySizeL=0;
			var editColor4GalwaySizeXL=0;
			var editColor4GalwaySize2XL=0;
			var editColor4GalwaySize3XL=0;
			var editColor4GalwaySize4XL=0;
			
			var editColor4WarehouseSizeS=0;
			var editColor4WarehouseSizeM=0;
			var editColor4WarehouseSizeL=0;
			var editColor4WarehouseSizeXL=0;
			var editColor4WarehouseSize2XL=0;
			var editColor4WarehouseSize3XL=0;
			var editColor4WarehouseSize4XL=0;
			
			var editColorTotal4=0;
			var editSubCountCork4=0;
			var editSubCountKala4=0;
			var editSubCountGalway4=0;
			var editSubCountWarehouse4=0;
			
			var editColor5CorkSizeS=0;
			var editColor5CorkSizeM=0;
			var editColor5CorkSizeL=0;
			var editColor5CorkSizeXL=0;
			var editColor5CorkSize2XL=0;
			var editColor5CorkSize3XL=0;
			var editColor5CorkSize4XL=0;
			
			var editColor5KalaSizeS=0;
			var editColor5KalaSizeM=0;
			var editColor5KalaSizeL=0;
			var editColor5KalaSizeXL=0;
			var editColor5KalaSize2XL=0;
			var editColor5KalaSize3XL=0;
			var editColor5KalaSize4XL=0;
			
			var editColor5GalwaySizeS=0;
			var editColor5GalwaySizeM=0;
			var editColor5GalwaySizeL=0;
			var editColor5GalwaySizeXL=0;
			var editColor5GalwaySize2XL=0;
			var editColor5GalwaySize3XL=0;
			var editColor5GalwaySize4XL=0;
			
			var editColor5WarehouseSizeS=0;
			var editColor5WarehouseSizeM=0;
			var editColor5WarehouseSizeL=0;
			var editColor5WarehouseSizeXL=0;
			var editColor5WarehouseSize2XL=0;
			var editColor5WarehouseSize3XL=0;
			var editColor5WarehouseSize4XL=0;
			
			var editColorTotal5=0;
			var editSubCountCork5=0;
			var editSubCountKala5=0;
			var editSubCountGalway5=0;
			var editSubCountWarehouse5=0;
			
			var editColor6CorkSizeS=0;
			var editColor6CorkSizeM=0;
			var editColor6CorkSizeL=0;
			var editColor6CorkSizeXL=0;
			var editColor6CorkSize2XL=0;
			var editColor6CorkSize3XL=0;
			var editColor6CorkSize4XL=0;
			
			var editColor6KalaSizeS=0;
			var editColor6KalaSizeM=0;
			var editColor6KalaSizeL=0;
			var editColor6KalaSizeXL=0;
			var editColor6KalaSize2XL=0;
			var editColor6KalaSize3XL=0;
			var editColor6KalaSize4XL=0;
			
			var editColor6GalwaySizeS=0;
			var editColor6GalwaySizeM=0;
			var editColor6GalwaySizeL=0;
			var editColor6GalwaySizeXL=0;
			var editColor6GalwaySize2XL=0;
			var editColor6GalwaySize3XL=0;
			var editColor6GalwaySize4XL=0;
			
			var editColor6WarehouseSizeS=0;
			var editColor6WarehouseSizeM=0;
			var editColor6WarehouseSizeL=0;
			var editColor6WarehouseSizeXL=0;
			var editColor6WarehouseSize2XL=0;
			var editColor6WarehouseSize3XL=0;
			var editColor6WarehouseSize4XL=0;
			
			var editColorTotal6=0;
			var editSubCountCork6=0;
			var editSubCountKala6=0;
			var editSubCountGalway6=0;
			var editSubCountWarehouse6=0;
			
			var editColor7CorkSizeS=0;
			var editColor7CorkSizeM=0;
			var editColor7CorkSizeL=0;
			var editColor7CorkSizeXL=0;
			var editColor7CorkSize2XL=0;
			var editColor7CorkSize3XL=0;
			var editColor7CorkSize4XL=0;
			
			var editColor7KalaSizeS=0;
			var editColor7KalaSizeM=0;
			var editColor7KalaSizeL=0;
			var editColor7KalaSizeXL=0;
			var editColor7KalaSize2XL=0;
			var editColor7KalaSize3XL=0;
			var editColor7KalaSize4XL=0;
			
			var editColor7GalwaySizeS=0;
			var editColor7GalwaySizeM=0;
			var editColor7GalwaySizeL=0;
			var editColor7GalwaySizeXL=0;
			var editColor7GalwaySize2XL=0;
			var editColor7GalwaySize3XL=0;
			var editColor7GalwaySize4XL=0;
			
			var editColor7WarehouseSizeS=0;
			var editColor7WarehouseSizeM=0;
			var editColor7WarehouseSizeL=0;
			var editColor7WarehouseSizeXL=0;
			var editColor7WarehouseSize2XL=0;
			var editColor7WarehouseSize3XL=0;
			var editColor7WarehouseSize4XL=0;
			
			var editColorTotal7=0;
			var editSubCountCork7=0;
			var editSubCountKala7=0;
			var editSubCountGalway7=0;
			var editSubCountWarehouse7=0;
			
			var editColor8CorkSizeS=0;
			var editColor8CorkSizeM=0;
			var editColor8CorkSizeL=0;
			var editColor8CorkSizeXL=0;
			var editColor8CorkSize2XL=0;
			var editColor8CorkSize3XL=0;
			var editColor8CorkSize4XL=0;
			
			var editColor8KalaSizeS=0;
			var editColor8KalaSizeM=0;
			var editColor8KalaSizeL=0;
			var editColor8KalaSizeXL=0;
			var editColor8KalaSize2XL=0;
			var editColor8KalaSize3XL=0;
			var editColor8KalaSize4XL=0;
			
			var editColor8GalwaySizeS=0;
			var editColor8GalwaySizeM=0;
			var editColor8GalwaySizeL=0;
			var editColor8GalwaySizeXL=0;
			var editColor8GalwaySize2XL=0;
			var editColor8GalwaySize3XL=0;
			var editColor8GalwaySize4XL=0;
			
			var editColor8WarehouseSizeS=0;
			var editColor8WarehouseSizeM=0;
			var editColor8WarehouseSizeL=0;
			var editColor8WarehouseSizeXL=0;
			var editColor8WarehouseSize2XL=0;
			var editColor8WarehouseSize3XL=0;
			var editColor8WarehouseSize4XL=0;
			
			var editColorTotal8=0;
			var editSubCountCork8=0;
			var editSubCountKala8=0;
			var editSubCountGalway8=0;
			var editSubCountWarehouse8=0;
			
			var editColor9CorkSizeS=0;
			var editColor9CorkSizeM=0;
			var editColor9CorkSizeL=0;
			var editColor9CorkSizeXL=0;
			var editColor9CorkSize2XL=0;
			var editColor9CorkSize3XL=0;
			var editColor9CorkSize4XL=0;
			
			var editColor9KalaSizeS=0;
			var editColor9KalaSizeM=0;
			var editColor9KalaSizeL=0;
			var editColor9KalaSizeXL=0;
			var editColor9KalaSize2XL=0;
			var editColor9KalaSize3XL=0;
			var editColor9KalaSize4XL=0;
			
			var editColor9GalwaySizeS=0;
			var editColor9GalwaySizeM=0;
			var editColor9GalwaySizeL=0;
			var editColor9GalwaySizeXL=0;
			var editColor9GalwaySize2XL=0;
			var editColor9GalwaySize3XL=0;
			var editColor9GalwaySize4XL=0;
			
			var editColor9WarehouseSizeS=0;
			var editColor9WarehouseSizeM=0;
			var editColor9WarehouseSizeL=0;
			var editColor9WarehouseSizeXL=0;
			var editColor9WarehouseSize2XL=0;
			var editColor9WarehouseSize3XL=0;
			var editColor9WarehouseSize4XL=0;
			
			var editColorTotal9=0;
			var editSubCountCork9=0;
			var editSubCountKala9=0;
			var editSubCountGalway9=0;
			var editSubCountWarehouse9=0;
			
			var editColor10CorkSizeS=0;
			var editColor10CorkSizeM=0;
			var editColor10CorkSizeL=0;
			var editColor10CorkSizeXL=0;
			var editColor10CorkSize2XL=0;
			var editColor10CorkSize3XL=0;
			var editColor10CorkSize4XL=0;
			
			var editColor10KalaSizeS=0;
			var editColor10KalaSizeM=0;
			var editColor10KalaSizeL=0;
			var editColor10KalaSizeXL=0;
			var editColor10KalaSize2XL=0;
			var editColor10KalaSize3XL=0;
			var editColor10KalaSize4XL=0;
			
			var editColor10GalwaySizeS=0;
			var editColor10GalwaySizeM=0;
			var editColor10GalwaySizeL=0;
			var editColor10GalwaySizeXL=0;
			var editColor10GalwaySize2XL=0;
			var editColor10GalwaySize3XL=0;
			var editColor10GalwaySize4XL=0;
			
			var editColor10WarehouseSizeS=0;
			var editColor10WarehouseSizeM=0;
			var editColor10WarehouseSizeL=0;
			var editColor10WarehouseSizeXL=0;
			var editColor10WarehouseSize2XL=0;
			var editColor10WarehouseSize3XL=0;
			var editColor10WarehouseSize4XL=0;
			
			var editColorTotal10=0;
			var editSubCountCork10=0;
			var editSubCountKala10=0;
			var editSubCountGalway10=0;
			var editSubCountWarehouse10=0;
			
			var editTotalKala= req.body.editCountKala;
			var editTotalCork= req.body.editCountCork;
			var editTotalGalway= req.body.editCountGalway;
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
			
			'CorkSizeS': editCorkSizeS,
			'CorkSizeM': editCorkSizeM,
			'CorkSizeL': editCorkSizeL,
			'CorkSizeXL': editCorkSizeXL,
			'CorkSize2XL': editCorkSize2XL,
			'CorkSize3XL': editCorkSize3XL,
			'CorkSize4XL': editCorkSize4XL,
			
			'KalaSizeS': editKalaSizeS,
			'KalaSizeM': editKalaSizeM,
			'KalaSizeL': editKalaSizeL,
			'KalaSizeXL': editKalaSizeXL,
			'KalaSize2XL': editKalaSize2XL,
			'KalaSize3XL': editKalaSize3XL,
			'KalaSize4XL': editKalaSize4XL,
			
			'GalwaySizeS': editGalwaySizeS,
			'GalwaySizeM': editGalwaySizeM,
			'GalwaySizeL': editGalwaySizeL,
			'GalwaySizeXL': editGalwaySizeXL,
			'GalwaySize2XL': editGalwaySize2XL,
			'GalwaySize3XL': editGalwaySize3XL,
			'GalwaySize4XL': editGalwaySize4XL,
			
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
			
			'color1CorkSizeS':editColor1CorkSizeS,
			'color1CorkSizeM':editColor1CorkSizeM,
			'color1CorkSizeL':editColor1CorkSizeL,
			'color1CorkSizeXL':editColor1CorkSizeXL,
			'color1CorkSize2XL':editColor1CorkSize2XL,
			'color1CorkSize3XL':editColor1CorkSize3XL,
			'color1CorkSize4XL':editColor1CorkSize4XL,
			
			'color1KalaSizeS':editColor1KalaSizeS,
			'color1KalaSizeM':editColor1KalaSizeM,
			'color1KalaSizeL':editColor1KalaSizeL,
			'color1KalaSizeXL':editColor1KalaSizeXL,
			'color1KalaSize2XL':editColor1KalaSize2XL,
			'color1KalaSize3XL':editColor1KalaSize3XL,
			'color1KalaSize4XL':editColor1KalaSize4XL,
			
			'color1GalwaySizeS':editColor1GalwaySizeS,
			'color1GalwaySizeM':editColor1GalwaySizeM,
			'color1GalwaySizeL':editColor1GalwaySizeL,
			'color1GalwaySizeXL':editColor1GalwaySizeXL,
			'color1GalwaySize2XL':editColor1GalwaySize2XL,
			'color1GalwaySize3XL':editColor1GalwaySize3XL,
			'color1GalwaySize4XL':editColor1GalwaySize4XL,
			
			'color1WarehouseSizeS':editColor1WarehouseSizeS,
			'color1WarehouseSizeM':editColor1WarehouseSizeM,
			'color1WarehouseSizeL':editColor1WarehouseSizeL,
			'color1WarehouseSizeXL':editColor1WarehouseSizeXL,
			'color1WarehouseSize2XL':editColor1WarehouseSize2XL,
			'color1WarehouseSize3XL':editColor1WarehouseSize3XL,
			'color1WarehouseSize4XL':editColor1WarehouseSize4XL,
			
			'color1Total': editColorTotal1,
			'color1CorkTotal': editSubCountCork1,
			'color1KalaTotal': editSubCountKala1,
			'color1GalwayTotal': editSubCountGalway1,
			'color1WarehouseTotal': editSubCountWarehouse1,
			
			'color2CorkSizeS':editColor2CorkSizeS,
			'color2CorkSizeM':editColor2CorkSizeM,
			'color2CorkSizeL':editColor2CorkSizeL,
			'color2CorkSizeXL':editColor2CorkSizeXL,
			'color2CorkSize2XL':editColor2CorkSize2XL,
			'color2CorkSize3XL':editColor2CorkSize3XL,
			'color2CorkSize4XL':editColor2CorkSize4XL,
			
			'color2KalaSizeS':editColor2KalaSizeS,
			'color2KalaSizeM':editColor2KalaSizeM,
			'color2KalaSizeL':editColor2KalaSizeL,
			'color2KalaSizeXL':editColor2KalaSizeXL,
			'color2KalaSize2XL':editColor2KalaSize2XL,
			'color2KalaSize3XL':editColor2KalaSize3XL,
			'color2KalaSize4XL':editColor2KalaSize4XL,
			
			'color2GalwaySizeS':editColor2GalwaySizeS,
			'color2GalwaySizeM':editColor2GalwaySizeM,
			'color2GalwaySizeL':editColor2GalwaySizeL,
			'color2GalwaySizeXL':editColor2GalwaySizeXL,
			'color2GalwaySize2XL':editColor2GalwaySize2XL,
			'color2GalwaySize3XL':editColor2GalwaySize3XL,
			'color2GalwaySize4XL':editColor2GalwaySize4XL,
			
			'color2WarehouseSizeS':editColor2WarehouseSizeS,
			'color2WarehouseSizeM':editColor2WarehouseSizeM,
			'color2WarehouseSizeL':editColor2WarehouseSizeL,
			'color2WarehouseSizeXL':editColor2WarehouseSizeXL,
			'color2WarehouseSize2XL':editColor2WarehouseSize2XL,
			'color2WarehouseSize3XL':editColor2WarehouseSize3XL,
			'color2WarehouseSize4XL':editColor2WarehouseSize4XL,
			
			'color2Total': editColorTotal2,
			'color2CorkTotal': editSubCountCork2,
			'color2KalaTotal': editSubCountKala2,
			'color2GalwayTotal': editSubCountGalway2,
			'color2WarehouseTotal': editSubCountWarehouse2,
			
			'color3CorkSizeS':editColor3CorkSizeS,
			'color3CorkSizeM':editColor3CorkSizeM,
			'color3CorkSizeL':editColor3CorkSizeL,
			'color3CorkSizeXL':editColor3CorkSizeXL,
			'color3CorkSize2XL':editColor3CorkSize2XL,
			'color3CorkSize3XL':editColor3CorkSize3XL,
			'color3CorkSize4XL':editColor3CorkSize4XL,
			
			'color3KalaSizeS':editColor3KalaSizeS,
			'color3KalaSizeM':editColor3KalaSizeM,
			'color3KalaSizeL':editColor3KalaSizeL,
			'color3KalaSizeXL':editColor3KalaSizeXL,
			'color3KalaSize2XL':editColor3KalaSize2XL,
			'color3KalaSize3XL':editColor3KalaSize3XL,
			'color3KalaSize4XL':editColor3KalaSize4XL,
			
			'color3GalwaySizeS':editColor3GalwaySizeS,
			'color3GalwaySizeM':editColor3GalwaySizeM,
			'color3GalwaySizeL':editColor3GalwaySizeL,
			'color3GalwaySizeXL':editColor3GalwaySizeXL,
			'color3GalwaySize2XL':editColor3GalwaySize2XL,
			'color3GalwaySize3XL':editColor3GalwaySize3XL,
			'color3GalwaySize4XL':editColor3GalwaySize4XL,
			
			'color3WarehouseSizeS':editColor3WarehouseSizeS,
			'color3WarehouseSizeM':editColor3WarehouseSizeM,
			'color3WarehouseSizeL':editColor3WarehouseSizeL,
			'color3WarehouseSizeXL':editColor3WarehouseSizeXL,
			'color3WarehouseSize2XL':editColor3WarehouseSize2XL,
			'color3WarehouseSize3XL':editColor3WarehouseSize3XL,
			'color3WarehouseSize4XL':editColor3WarehouseSize4XL,
			
			'color3Total': editColorTotal3,
			'color3CorkTotal': editSubCountCork3,
			'color3KalaTotal': editSubCountKala3,
			'color3GalwayTotal': editSubCountGalway3,
			'color3WarehouseTotal': editSubCountWarehouse3,
			
			'color4CorkSizeS':editColor4CorkSizeS,
			'color4CorkSizeM':editColor4CorkSizeM,
			'color4CorkSizeL':editColor4CorkSizeL,
			'color4CorkSizeXL':editColor4CorkSizeXL,
			'color4CorkSize2XL':editColor4CorkSize2XL,
			'color4CorkSize3XL':editColor4CorkSize3XL,
			'color4CorkSize4XL':editColor4CorkSize4XL,
			
			'color4KalaSizeS':editColor4KalaSizeS,
			'color4KalaSizeM':editColor4KalaSizeM,
			'color4KalaSizeL':editColor4KalaSizeL,
			'color4KalaSizeXL':editColor4KalaSizeXL,
			'color4KalaSize2XL':editColor4KalaSize2XL,
			'color4KalaSize3XL':editColor4KalaSize3XL,
			'color4KalaSize4XL':editColor4KalaSize4XL,
			
			'color4GalwaySizeS':editColor4GalwaySizeS,
			'color4GalwaySizeM':editColor4GalwaySizeM,
			'color4GalwaySizeL':editColor4GalwaySizeL,
			'color4GalwaySizeXL':editColor4GalwaySizeXL,
			'color4GalwaySize2XL':editColor4GalwaySize2XL,
			'color4GalwaySize3XL':editColor4GalwaySize3XL,
			'color4GalwaySize4XL':editColor4GalwaySize4XL,
		
			'color4WarehouseSizeS':editColor4WarehouseSizeS,
			'color4WarehouseSizeM':editColor4WarehouseSizeM,
			'color4WarehouseSizeL':editColor4WarehouseSizeL,
			'color4WarehouseSizeXL':editColor4WarehouseSizeXL,
			'color4WarehouseSize2XL':editColor4WarehouseSize2XL,
			'color4WarehouseSize3XL':editColor4WarehouseSize3XL,
			'color4WarehouseSize4XL':editColor4WarehouseSize4XL,
			
			'color4Total': editColorTotal4,
			'color4CorkTotal': editSubCountCork4,
			'color4KalaTotal': editSubCountKala4,
			'color4GalwayTotal': editSubCountGalway4,
			'color4WarehouseTotal': editSubCountWarehouse4,
		
			'color5CorkSizeS':editColor5CorkSizeS,
			'color5CorkSizeM':editColor5CorkSizeM,
			'color5CorkSizeL':editColor5CorkSizeL,
			'color5CorkSizeXL':editColor5CorkSizeXL,
			'color5CorkSize2XL':editColor5CorkSize2XL,
			'color5CorkSize3XL':editColor5CorkSize3XL,
			'color5CorkSize4XL':editColor5CorkSize4XL,
			
			'color5KalaSizeS':editColor5KalaSizeS,
			'color5KalaSizeM':editColor5KalaSizeM,
			'color5KalaSizeL':editColor5KalaSizeL,
			'color5KalaSizeXL':editColor5KalaSizeXL,
			'color5KalaSize2XL':editColor5KalaSize2XL,
			'color5KalaSize3XL':editColor5KalaSize3XL,
			'color5KalaSize4XL':editColor5KalaSize4XL,
			
			'color5GalwaySizeS':editColor5GalwaySizeS,
			'color5GalwaySizeM':editColor5GalwaySizeM,
			'color5GalwaySizeL':editColor5GalwaySizeL,
			'color5GalwaySizeXL':editColor5GalwaySizeXL,
			'color5GalwaySize2XL':editColor5GalwaySize2XL,
			'color5GalwaySize3XL':editColor5GalwaySize3XL,
			'color5GalwaySize4XL':editColor5GalwaySize4XL,
			
			'color5WarehouseSizeS':editColor5WarehouseSizeS,
			'color5WarehouseSizeM':editColor5WarehouseSizeM,
			'color5WarehouseSizeL':editColor5WarehouseSizeL,
			'color5WarehouseSizeXL':editColor5WarehouseSizeXL,
			'color5WarehouseSize2XL':editColor5WarehouseSize2XL,
			'color5WarehouseSize3XL':editColor5WarehouseSize3XL,
			'color5WarehouseSize4XL':editColor5WarehouseSize4XL,
			
			'color5Total': editColorTotal5,
			'color5CorkTotal': editSubCountCork5,
			'color5KalaTotal': editSubCountKala5,
			'color5GalwayTotal': editSubCountGalway5,
			'color5WarehouseTotal': editSubCountWarehouse5,
		
			'color6CorkSizeS':editColor6CorkSizeS,
			'color6CorkSizeM':editColor6CorkSizeM,
			'color6CorkSizeL':editColor6CorkSizeL,
			'color6CorkSizeXL':editColor6CorkSizeXL,
			'color6CorkSize2XL':editColor6CorkSize2XL,
			'color6CorkSize3XL':editColor6CorkSize3XL,
			'color6CorkSize4XL':editColor6CorkSize4XL,
			
			'color6KalaSizeS':editColor6KalaSizeS,
			'color6KalaSizeM':editColor6KalaSizeM,
			'color6KalaSizeL':editColor6KalaSizeL,
			'color6KalaSizeXL':editColor6KalaSizeXL,
			'color6KalaSize2XL':editColor6KalaSize2XL,
			'color6KalaSize3XL':editColor6KalaSize3XL,
			'color6KalaSize4XL':editColor6KalaSize4XL,
			
			'color6GalwaySizeS':editColor6GalwaySizeS,
			'color6GalwaySizeM':editColor6GalwaySizeM,
			'color6GalwaySizeL':editColor6GalwaySizeL,
			'color6GalwaySizeXL':editColor6GalwaySizeXL,
			'color6GalwaySize2XL':editColor6GalwaySize2XL,
			'color6GalwaySize3XL':editColor6GalwaySize3XL,
			'color6GalwaySize4XL':editColor6GalwaySize4XL,
			
			'color6WarehouseSizeS':editColor6WarehouseSizeS,
			'color6WarehouseSizeM':editColor6WarehouseSizeM,
			'color6WarehouseSizeL':editColor6WarehouseSizeL,
			'color6WarehouseSizeXL':editColor6WarehouseSizeXL,
			'color6WarehouseSize2XL':editColor6WarehouseSize2XL,
			'color6WarehouseSize3XL':editColor6WarehouseSize3XL,
			'color6WarehouseSize4XL':editColor6WarehouseSize4XL,
			
			'color6Total': editColorTotal6,
			'color6CorkTotal': editSubCountCork6,
			'color6KalaTotal': editSubCountKala6,
			'color6GalwayTotal': editSubCountGalway6,
			'color6WarehouseTotal': editSubCountWarehouse6,
			
			'color7CorkSizeS':editColor7CorkSizeS,
			'color7CorkSizeM':editColor7CorkSizeM,
			'color7CorkSizeL':editColor7CorkSizeL,
			'color7CorkSizeXL':editColor7CorkSizeXL,
			'color7CorkSize2XL':editColor7CorkSize2XL,
			'color7CorkSize3XL':editColor7CorkSize3XL,
			'color7CorkSize4XL':editColor7CorkSize4XL,
		
			'color7KalaSizeS':editColor7KalaSizeS,
			'color7KalaSizeM':editColor7KalaSizeM,
			'color7KalaSizeL':editColor7KalaSizeL,
			'color7KalaSizeXL':editColor7KalaSizeXL,
			'color7KalaSize2XL':editColor7KalaSize2XL,
			'color7KalaSize3XL':editColor7KalaSize3XL,
			'color7KalaSize4XL':editColor7KalaSize4XL,
			
			'color7GalwaySizeS':editColor7GalwaySizeS,
			'color7GalwaySizeM':editColor7GalwaySizeM,
			'color7GalwaySizeL':editColor7GalwaySizeL,
			'color7GalwaySizeXL':editColor7GalwaySizeXL,
			'color7GalwaySize2XL':editColor7GalwaySize2XL,
			'color7GalwaySize3XL':editColor7GalwaySize3XL,
			'color7GalwaySize4XL':editColor7GalwaySize4XL,
			
			'color7WarehouseSizeS':editColor7WarehouseSizeS,
			'color7WarehouseSizeM':editColor7WarehouseSizeM,
			'color7WarehouseSizeL':editColor7WarehouseSizeL,
			'color7WarehouseSizeXL':editColor7WarehouseSizeXL,
			'color7WarehouseSize2XL':editColor7WarehouseSize2XL,
			'color7WarehouseSize3XL':editColor7WarehouseSize3XL,
			'color7WarehouseSize4XL':editColor7WarehouseSize4XL,
			
			'color7Total': editColorTotal7,
			'color7CorkTotal': editSubCountCork7,
			'color7KalaTotal': editSubCountKala7,
			'color7GalwayTotal': editSubCountGalway7,
			'color7WarehouseTotal': editSubCountWarehouse7,
			
			'color8CorkSizeS':editColor8CorkSizeS,
			'color8CorkSizeM':editColor8CorkSizeM,
			'color8CorkSizeL':editColor8CorkSizeL,
			'color8CorkSizeXL':editColor8CorkSizeXL,
			'color8CorkSize2XL':editColor8CorkSize2XL,
			'color8CorkSize3XL':editColor8CorkSize3XL,
			'color8CorkSize4XL':editColor8CorkSize4XL,
			
			'color8KalaSizeS':editColor8KalaSizeS,
			'color8KalaSizeM':editColor8KalaSizeM,
			'color8KalaSizeL':editColor8KalaSizeL,
			'color8KalaSizeXL':editColor8KalaSizeXL,
			'color8KalaSize2XL':editColor8KalaSize2XL,
			'color8KalaSize3XL':editColor8KalaSize3XL,
			'color8KalaSize4XL':editColor8KalaSize4XL,
			
			'color8GalwaySizeS':editColor8GalwaySizeS,
			'color8GalwaySizeM':editColor8GalwaySizeM,
			'color8GalwaySizeL':editColor8GalwaySizeL,
			'color8GalwaySizeXL':editColor8GalwaySizeXL,
			'color8GalwaySize2XL':editColor8GalwaySize2XL,
			'color8GalwaySize3XL':editColor8GalwaySize3XL,
			'color8GalwaySize4XL':editColor8GalwaySize4XL,
		
			'color8WarehouseSizeS':editColor8WarehouseSizeS,
			'color8WarehouseSizeM':editColor8WarehouseSizeM,
			'color8WarehouseSizeL':editColor8WarehouseSizeL,
			'color8WarehouseSizeXL':editColor8WarehouseSizeXL,
			'color8WarehouseSize2XL':editColor8WarehouseSize2XL,
			'color8WarehouseSize3XL':editColor8WarehouseSize3XL,
			'color8WarehouseSize4XL':editColor8WarehouseSize4XL,
			
			'color8Total': editColorTotal8,
			'color8CorkTotal': editSubCountCork8,
			'color8KalaTotal': editSubCountKala8,
			'color8GalwayTotal': editSubCountGalway8,
			'color8WarehouseTotal': editSubCountWarehouse8,
			
			'color9CorkSizeS':editColor9CorkSizeS,
			'color9CorkSizeM':editColor9CorkSizeM,
			'color9CorkSizeL':editColor9CorkSizeL,
			'color9CorkSizeXL':editColor9CorkSizeXL,
			'color9CorkSize2XL':editColor9CorkSize2XL,
			'color9CorkSize3XL':editColor9CorkSize3XL,
			'color9CorkSize4XL':editColor9CorkSize4XL,
			
			'color9KalaSizeS':editColor9KalaSizeS,
			'color9KalaSizeM':editColor9KalaSizeM,
			'color9KalaSizeL':editColor9KalaSizeL,
			'color9KalaSizeXL':editColor9KalaSizeXL,
			'color9KalaSize2XL':editColor9KalaSize2XL,
			'color9KalaSize3XL':editColor9KalaSize3XL,
			'color9KalaSize4XL':editColor9KalaSize4XL,
			
			'color9GalwaySizeS':editColor9GalwaySizeS,
			'color9GalwaySizeM':editColor9GalwaySizeM,
			'color9GalwaySizeL':editColor9GalwaySizeL,
			'color9GalwaySizeXL':editColor9GalwaySizeXL,
			'color9GalwaySize2XL':editColor9GalwaySize2XL,
			'color9GalwaySize3XL':editColor9GalwaySize3XL,
			'color9GalwaySize4XL':editColor9GalwaySize4XL,
			
			'color9WarehouseSizeS':editColor9WarehouseSizeS,
			'color9WarehouseSizeM':editColor9WarehouseSizeM,
			'color9WarehouseSizeL':editColor9WarehouseSizeL,
			'color9WarehouseSizeXL':editColor9WarehouseSizeXL,
			'color9WarehouseSize2XL':editColor9WarehouseSize2XL,
			'color9WarehouseSize3XL':editColor9WarehouseSize3XL,
			'color9WarehouseSize4XL':editColor9WarehouseSize4XL,
			
			'color9Total': editColorTotal9,
			'color9CorkTotal': editSubCountCork9,
			'color9KalaTotal': editSubCountKala9,
			'color9GalwayTotal': editSubCountGalway9,
			'color9WarehouseTotal': editSubCountWarehouse9,
			
			'color10CorkSizeS':editColor10CorkSizeS,
			'color10CorkSizeM':editColor10CorkSizeS,
			'color10CorkSizeL':editColor10CorkSizeL,
			'color10CorkSizeXL':editColor10CorkSizeXL,
			'color10CorkSize2XL':editColor10CorkSize2XL,
			'color10CorkSize3XL':editColor10CorkSize3XL,
			'color10CorkSize4XL':editColor10CorkSize4XL,
			
			'color10KalaSizeS':editColor10KalaSizeS,
			'color10KalaSizeM':editColor10KalaSizeS,
			'color10KalaSizeL':editColor10KalaSizeL,
			'color10KalaSizeXL':editColor10KalaSizeXL,
			'color10KalaSize2XL':editColor10KalaSize2XL,
			'color10KalaSize3XL':editColor10KalaSize3XL,
			'color10KalaSize4XL':editColor10KalaSize4XL,
			
			'color10GalwaySizeS':editColor10GalwaySizeS,
			'color10GalwaySizeM':editColor10GalwaySizeS,
			'color10GalwaySizeL':editColor10GalwaySizeL,
			'color10GalwaySizeXL':editColor10GalwaySizeXL,
			'color10GalwaySize2XL':editColor10GalwaySize2XL,
			'color10GalwaySize3XL':editColor10GalwaySize3XL,
			'color10GalwaySize4XL':editColor10GalwaySize4XL,
			
			'color10WarehouseSizeS':editColor10WarehouseSizeS,
			'color10WarehouseSizeM':editColor10WarehouseSizeS,
			'color10WarehouseSizeL':editColor10WarehouseSizeL,
			'color10WarehouseSizeXL':editColor10WarehouseSizeXL,
			'color10WarehouseSize2XL':editColor10WarehouseSize2XL,
			'color10WarehouseSize3XL':editColor10WarehouseSize3XL,
			'color10WarehouseSize4XL':editColor10WarehouseSize4XL,
			
			'color10Total': editColorTotal10,
			'color10CorkTotal': editSubCountCork10,
			'color10KalaTotal': editSubCountKala10,
			'color10GalwayTotal': editSubCountGalway10,
			'color10WarehouseTotal': editSubCountWarehouse10,
			
			'inStoreCork': inStoreCorkEdit,
			'inStoreKala': inStoreKalaEdit,
			'inStoreGalway': inStoreGalwayEdit,
			'inWarehouse': inWarehouseEdit,

			'totalKala': editTotalKala,
			'totalCork': editTotalCork,
			'totalGalway': editTotalGalway,
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
