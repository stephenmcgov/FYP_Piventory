const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const Product = require("../models/products");

//specify how we store a file through multer
//save to upload folder and keep original filename
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    }
});

//limit file type for upload
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

//limit file size for upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//add product function
router.post("/", upload.single('productImage'), (req, res, next) => {
	//console.log(req.body.inCork);
	//need multiple if's to decide on product details
	//if inCork or if hasSizes etc...
	if(req.body.hasSizes)
		var hasS = true;
	else hasS = false;
	
	if(req.body.hasColors)
		var hasC = true;
	else hasC = false;
	
	if(req.body.multiPrice)
		var hasMP = true;
	else hasMP = false;
	//hasSizes must be true to use
			
	//if hasSizes/Colors is false
	if(hasS == false && hasC == false)
	{
		const product = new Product({
			//constant vars (always present)
			_id: new mongoose.Types.ObjectId(),
			name: req.body.name,
			description: req.body.description,
			category: req.body.category,
			productImage: req.file.path,
			numColors: 0,
			
			//constants
	//if masterPrice set else set price by size
			onSale: req.body.onSale,
			masterPrice: req.body.price,
			masterSalePrice: req.body.salePrice,
			priceS: req.body.priceS,
			priceM: req.body.priceM,
			priceL: req.body.priceL,
			priceXL: req.body.priceXL,
			price2XL: req.body.price2XL,
			price3XL: req.body.price3XL,
			price4XL: req.body.price4XL,
			
			salePriceS: req.body.salePriceS,
			salePriceM: req.body.salePriceM,
			salePriceL: req.body.salePriceL,
			salePriceXL: req.body.salePriceXL,
			salePrice2XL: req.body.salePrice2XL,
			salePrice3XL: req.body.salePrice3XL,
			salePrice4XL: req.body.salePrice4XL,
			
			inStoreCork: req.body.inCork,
			inStoreKala: req.body.inKala,
			inStoreGalway: req.body.inGalway,
			inWarehouse: req.body.inWarehouse,

			totalKala: req.body.countKala,
			totalCork: req.body.countCork,
			totalGalway: req.body.countGalway,
			totalWarehouse: req.body.countWarehouse,
			
			cart: "no"
		});
		product
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/management');
			
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
		});
	}
		
	//if has sizes (single price) but not colors 	
	if(hasS == true && hasC == false && hasMP == false)
	{
		const product = new Product({
			//constant vars (always present)
			_id: new mongoose.Types.ObjectId(),
			name: req.body.name,
			description: req.body.description,
			category: req.body.category,
			productImage: req.file.path,
			
			//constants
	//if masterPrice set else set price by size
			onSale: req.body.onSale,
			masterPrice: req.body.price,
			masterSalePrice: req.body.salePrice,
			priceS: req.body.priceS,
			priceM: req.body.priceM,
			priceL: req.body.priceL,
			priceXL: req.body.priceXL,
			price2XL: req.body.price2XL,
			price3XL: req.body.price3XL,
			price4XL: req.body.price4XL,
			
			salePriceS: req.body.salePriceS,
			salePriceM: req.body.salePriceM,
			salePriceL: req.body.salePriceL,
			salePriceXL: req.body.salePriceXL,
			salePrice2XL: req.body.salePrice2XL,
			salePrice3XL: req.body.salePrice3XL,
			salePrice4XL: req.body.salePrice4XL,
			
			numColors: 0,
			hasSizes:req.body.hasSizes,
			WarehouseSizeS:req.body.warehouseSizeS,
			WarehouseSizeM:req.body.warehouseSizeM,
			WarehouseSizeL:req.body.warehouseSizeL,
			WarehouseSizeXL:req.body.warehouseSizeXL,
			WarehouseSize2XL:req.body.warehouseSize2XL,
			WarehouseSize3XL:req.body.warehouseSize3XL,
			WarehouseSize4XL:req.body.warehouseSize4XL,
			
			CorkSizeS:req.body.corkSizeS,
			CorkSizeM:req.body.corkSizeM,
			CorkSizeL:req.body.corkSizeL,
			CorkSizeXL:req.body.corkSizeXL,
			CorkSize2XL:req.body.corkSize2XL,
			CorkSize3XL:req.body.corkSize3XL,
			CorkSize4XL:req.body.corkSize4XL,
			
			KalaSizeS:req.body.kalaSizeS,
			KalaSizeM:req.body.kalaSizeM,
			KalaSizeL:req.body.kalaSizeL,
			KalaSizeXL:req.body.kalaSizeXL,
			KalaSize2XL:req.body.kalaSize2XL,
			KalaSize3XL:req.body.kalaSize3XL,
			KalaSize4XL:req.body.kalaSize4XL,
			
			GalwaySizeS:req.body.galwaySizeS,
			GalwaySizeM:req.body.galwaySizeM,
			GalwaySizeL:req.body.galwaySizeL,
			GalwaySizeXL:req.body.galwaySizeXL,
			GalwaySize2XL:req.body.galwaySize2XL,
			GalwaySize3XL:req.body.galwaySize3XL,
			GalwaySize4XL:req.body.galwaySize4XL,
			
			inStoreCork: req.body.inCork,
			inStoreKala: req.body.inKala,
			inStoreGalway: req.body.inGalway,
			inWarehouse: req.body.inWarehouse,

			totalKala: req.body.countKala,
			totalCork: req.body.countCork,
			totalGalway: req.body.countGalway,
			totalWarehouse: req.body.countWarehouse,
			
			//cart: "no"
		});
		product
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/management');
			
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
		});
	}		
	
	//if has sizes (multi price) but not colors 	
	if(hasS == true && hasC == false && hasMP == true)
	{
		const product = new Product({
			//constant vars (always present)
			_id: new mongoose.Types.ObjectId(),
			name: req.body.name,
			description: req.body.description,
			category: req.body.category,
			productImage: req.file.path,
			
			//constants
	//if masterPrice set else set price by size
			onSale: req.body.onSale,
			masterPrice: req.body.price,
			masterSalePrice: req.body.salePrice,
			priceS: req.body.priceS,
			priceM: req.body.priceM,
			priceL: req.body.priceL,
			priceXL: req.body.priceXL,
			price2XL: req.body.price2XL,
			price3XL: req.body.price3XL,
			price4XL: req.body.price4XL,
			
			salePriceS: req.body.salePriceS,
			salePriceM: req.body.salePriceM,
			salePriceL: req.body.salePriceL,
			salePriceXL: req.body.salePriceXL,
			salePrice2XL: req.body.salePrice2XL,
			salePrice3XL: req.body.salePrice3XL,
			salePrice4XL: req.body.salePrice4XL,
			
			numColors: 0,
			hasSizes:req.body.hasSizes,
			WarehouseSizeS:req.body.warehouseSizeS,
			WarehouseSizeM:req.body.warehouseSizeM,
			WarehouseSizeL:req.body.warehouseSizeL,
			WarehouseSizeXL:req.body.warehouseSizeXL,
			WarehouseSize2XL:req.body.warehouseSize2XL,
			WarehouseSize3XL:req.body.warehouseSize3XL,
			WarehouseSize4XL:req.body.warehouseSize4XL,
			
			CorkSizeS:req.body.corkSizeS,
			CorkSizeM:req.body.corkSizeM,
			CorkSizeL:req.body.corkSizeL,
			CorkSizeXL:req.body.corkSizeXL,
			CorkSize2XL:req.body.corkSize2XL,
			CorkSize3XL:req.body.corkSize3XL,
			CorkSize4XL:req.body.corkSize4XL,
			
			KalaSizeS:req.body.kalaSizeS,
			KalaSizeM:req.body.kalaSizeM,
			KalaSizeL:req.body.kalaSizeL,
			KalaSizeXL:req.body.kalaSizeXL,
			KalaSize2XL:req.body.kalaSize2XL,
			KalaSize3XL:req.body.kalaSize3XL,
			KalaSize4XL:req.body.kalaSize4XL,
			
			GalwaySizeS:req.body.galwaySizeS,
			GalwaySizeM:req.body.galwaySizeM,
			GalwaySizeL:req.body.galwaySizeL,
			GalwaySizeXL:req.body.galwaySizeXL,
			GalwaySize2XL:req.body.galwaySize2XL,
			GalwaySize3XL:req.body.galwaySize3XL,
			GalwaySize4XL:req.body.galwaySize4XL,
			
			inStoreCork: req.body.inCork,
			inStoreKala: req.body.inKala,
			inStoreGalway: req.body.inGalway,
			inWarehouse: req.body.inWarehouse,

			totalKala: req.body.countKala,
			totalCork: req.body.countCork,
			totalGalway: req.body.countGalway,
			totalWarehouse: req.body.countWarehouse,
			
			//cart: "no"
		});
		product
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/management');
			
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
		});
	}	
	
	//if has colors but not sizes
	if(hasS == false && hasC == true)
	{
		const product = new Product({
			//constant vars (always present)
			_id: new mongoose.Types.ObjectId(),
			name: req.body.name,
			description: req.body.description,
			category: req.body.category,
			productImage: req.file.path,
			
			//constants
	//if masterPrice set else set price by size
			onSale: req.body.onSale,
			masterPrice: req.body.price,
			masterSalePrice: req.body.salePrice,
			priceS: req.body.priceS,
			priceM: req.body.priceM,
			priceL: req.body.priceL,
			priceXL: req.body.priceXL,
			price2XL: req.body.price2XL,
			price3XL: req.body.price3XL,
			price4XL: req.body.price4XL,
			
			salePriceS: req.body.salePriceS,
			salePriceM: req.body.salePriceM,
			salePriceL: req.body.salePriceL,
			salePriceXL: req.body.salePriceXL,
			salePrice2XL: req.body.salePrice2XL,
			salePrice3XL: req.body.salePrice3XL,
			salePrice4XL: req.body.salePrice4XL,
			
			numColors: req.body.numSubStyles,
			
			colorCode1: req.body.color1,
			colorCode2: req.body.color2,
			colorCode3: req.body.color3,
			colorCode4: req.body.color4,
			colorCode5: req.body.color5,
			colorCode6: req.body.color6,
			colorCode7: req.body.color7,
			colorCode8: req.body.color8,
			colorCode9: req.body.color9,
			colorCode10: req.body.color10,
			
			color1Total: req.body.colorTotal1,
			color1CorkTotal: req.body.subCountCork1,
			color1KalaTotal: req.body.subCountKala1,
			color1GalwayTotal: req.body.subCountGalway1,
			color1WarehouseTotal: req.body.subCountWarehouse1,
			
			color2Total: req.body.colorTotal2,
			color2CorkTotal: req.body.subCountCork2,
			color2KalaTotal: req.body.subCountKala2,
			color2GalwayTotal: req.body.subCountGalway2,
			color2WarehouseTotal: req.body.subCountWarehouse2,
			
			color3Total: req.body.colorTotal3,
			color3CorkTotal: req.body.subCountCork3,
			color3KalaTotal: req.body.subCountKala3,
			color3GalwayTotal: req.body.subCountGalway3,
			color3WarehouseTotal: req.body.subCountWarehouse3,
			
			color4Total: req.body.colorTotal4,
			color4CorkTotal: req.body.subCountCork4,
			color4KalaTotal: req.body.subCountKala4,
			color4GalwayTotal: req.body.subCountGalway4,
			color4WarehouseTotal: req.body.subCountWarehouse4,
			
			color5Total: req.body.colorTotal5,
			color5CorkTotal: req.body.subCountCork5,
			color5KalaTotal: req.body.subCountKala5,
			color5GalwayTotal: req.body.subCountGalway5,
			color5WarehouseTotal: req.body.subCountWarehouse5,
			
			color6Total: req.body.colorTotal6,
			color6CorkTotal: req.body.subCountCork6,
			color6KalaTotal: req.body.subCountKala6,
			color6GalwayTotal: req.body.subCountGalway6,
			color6WarehouseTotal: req.body.subCountWarehouse6,
			
			color7Total: req.body.colorTotal7,
			color7CorkTotal: req.body.subCountCork7,
			color7KalaTotal: req.body.subCountKala7,
			color7GalwayTotal: req.body.subCountGalway7,
			color7WarehouseTotal: req.body.subCountWarehouse7,
			
			color8Total: req.body.colorTotal8,
			color8CorkTotal: req.body.subCountCork8,
			color8KalaTotal: req.body.subCountKala8,
			color8GalwayTotal: req.body.subCountGalway8,
			color8WarehouseTotal: req.body.subCountWarehouse8,
			
			color9Total: req.body.colorTotal9,
			color9CorkTotal: req.body.subCountCork9,
			color9KalaTotal: req.body.subCountKala9,
			color9GalwayTotal: req.body.subCountGalway9,
			color9WarehouseTotal: req.body.subCountWarehouse9,
			
			color10Total: req.body.colorTotal10,
			color10CorkTotal: req.body.subCountCork10,
			color10KalaTotal: req.body.subCountKala10,
			color10GalwayTotal: req.body.subCountGalway10,
			color10WarehouseTotal: req.body.subCountWarehouse10,
			
			inStoreCork: req.body.inCork,
			inStoreKala: req.body.inKala,
			inStoreGalway: req.body.inGalway,
			inWarehouse: req.body.inWarehouse,

			totalKala: req.body.countKala,
			totalCork: req.body.countCork,
			totalGalway: req.body.countGalway,
			totalWarehouse: req.body.countWarehouse,
			
			cart: "no"
		});
		product
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/management');
			
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
		});
	}		
	
	//if has colors and sizes but single price
	if(hasS == true && hasC == true && hasMP == false)
	{
		const product = new Product({
			//constant vars (always present)
			_id: new mongoose.Types.ObjectId(),
			name: req.body.name,
			description: req.body.description,
			category: req.body.category,
			productImage: req.file.path,
			
			//constants
	//if masterPrice set else set price by size
			onSale: req.body.onSale,
			masterPrice: req.body.price,
			masterSalePrice: req.body.salePrice,
			priceS: req.body.priceS,
			priceM: req.body.priceM,
			priceL: req.body.priceL,
			priceXL: req.body.priceXL,
			price2XL: req.body.price2XL,
			price3XL: req.body.price3XL,
			price4XL: req.body.price4XL,
			
			salePriceS: req.body.salePriceS,
			salePriceM: req.body.salePriceM,
			salePriceL: req.body.salePriceL,
			salePriceXL: req.body.salePriceXL,
			salePrice2XL: req.body.salePrice2XL,
			salePrice3XL: req.body.salePrice3XL,
			salePrice4XL: req.body.salePrice4XL,
			
			hasSizes:req.body.hasSizes,
			numColors: req.body.numSubStyles,
			
			colorCode1: req.body.color1,
			colorCode2: req.body.color2,
			colorCode3: req.body.color3,
			colorCode4: req.body.color4,
			colorCode5: req.body.color5,
			colorCode6: req.body.color6,
			colorCode7: req.body.color7,
			colorCode8: req.body.color8,
			colorCode9: req.body.color9,
			colorCode10: req.body.color10,
			
			color1CorkSizeS:req.body.corkSizeS1,
			color1CorkSizeM:req.body.corkSizeM1,
			color1CorkSizeL:req.body.corkSizeL1,
			color1CorkSizeXL:req.body.corkSizeXL1,
			color1CorkSize2XL:req.body.corkSize2XL1,
			color1CorkSize3XL:req.body.corkSize3XL1,
			color1CorkSize4XL:req.body.corkSize4XL1,
			
			color1KalaSizeS:req.body.kalaSizeS1,
			color1KalaSizeM:req.body.kalaSizeM1,
			color1KalaSizeL:req.body.kalaSizeL1,
			color1KalaSizeXL:req.body.kalaSizeXL1,
			color1KalaSize2XL:req.body.kalaSize2XL1,
			color1KalaSize3XL:req.body.kalaSize3XL1,
			color1KalaSize4XL:req.body.kalaSize4XL1,
			
			color1GalwaySizeS:req.body.galwaySizeS1,
			color1GalwaySizeM:req.body.galwaySizeM1,
			color1GalwaySizeL:req.body.galwaySizeL1,
			color1GalwaySizeXL:req.body.galwaySizeXL1,
			color1GalwaySize2XL:req.body.galwaySize2XL1,
			color1GalwaySize3XL:req.body.galwaySize3XL1,
			color1GalwaySize4XL:req.body.galwaySize4XL1,
			
			color1WarehouseSizeS:req.body.warehouseSizeS1,
			color1WarehouseSizeM:req.body.warehouseSizeM1,
			color1WarehouseSizeL:req.body.warehouseSizeL1,
			color1WarehouseSizeXL:req.body.warehouseSizeXL1,
			color1WarehouseSize2XL:req.body.warehouseSize2XL1,
			color1WarehouseSize3XL:req.body.warehouseSize3XL1,
			color1WarehouseSize4XL:req.body.warehouseSize4XL1,
			
			color1Total: req.body.colorTotal1,
			color1CorkTotal: req.body.subCountCork1,
			color1KalaTotal: req.body.subCountKala1,
			color1GalwayTotal: req.body.subCountGalway1,
			color1WarehouseTotal: req.body.subCountWarehouse1,
			
			color2CorkSizeS:req.body.corkSizeS2,
			color2CorkSizeM:req.body.corkSizeM2,
			color2CorkSizeL:req.body.corkSizeL2,
			color2CorkSizeXL:req.body.corkSizeXL2,
			color2CorkSize2XL:req.body.corkSize2XL2,
			color2CorkSize3XL:req.body.corkSize3XL2,
			color2CorkSize4XL:req.body.corkSize4XL2,
			
			color2KalaSizeS:req.body.kalaSizeS2,
			color2KalaSizeM:req.body.kalaSizeM2,
			color2KalaSizeL:req.body.kalaSizeL2,
			color2KalaSizeXL:req.body.kalaSizeXL2,
			color2KalaSize2XL:req.body.kalaSize2XL2,
			color2KalaSize3XL:req.body.kalaSize3XL2,
			color2KalaSize4XL:req.body.kalaSize4XL2,
			
			color2GalwaySizeS:req.body.galwaySizeS2,
			color2GalwaySizeM:req.body.galwaySizeM2,
			color2GalwaySizeL:req.body.galwaySizeL2,
			color2GalwaySizeXL:req.body.galwaySizeXL2,
			color2GalwaySize2XL:req.body.galwaySize2XL2,
			color2GalwaySize3XL:req.body.galwaySize3XL2,
			color2GalwaySize4XL:req.body.galwaySize4XL2,
			
			color2WarehouseSizeS:req.body.warehouseSizeS2,
			color2WarehouseSizeM:req.body.warehouseSizeM2,
			color2WarehouseSizeL:req.body.warehouseSizeL2,
			color2WarehouseSizeXL:req.body.warehouseSizeXL2,
			color2WarehouseSize2XL:req.body.warehouseSize2XL2,
			color2WarehouseSize3XL:req.body.warehouseSize3XL2,
			color2WarehouseSize4XL:req.body.warehouseSize4XL2,
			
			color2Total: req.body.colorTotal2,
			color2CorkTotal: req.body.subCountCork2,
			color2KalaTotal: req.body.subCountKala2,
			color2GalwayTotal: req.body.subCountGalway2,
			color2WarehouseTotal: req.body.subCountWarehouse2,
			
			color3CorkSizeS:req.body.corkSizeS3,
			color3CorkSizeM:req.body.corkSizeM3,
			color3CorkSizeL:req.body.corkSizeL3,
			color3CorkSizeXL:req.body.corkSizeXL3,
			color3CorkSize2XL:req.body.corkSize2XL3,
			color3CorkSize3XL:req.body.corkSize3XL3,
			color3CorkSize4XL:req.body.corkSize4XL3,
			
			color3KalaSizeS:req.body.kalaSizeS3,
			color3KalaSizeM:req.body.kalaSizeM3,
			color3KalaSizeL:req.body.kalaSizeL3,
			color3KalaSizeXL:req.body.kalaSizeXL3,
			color3KalaSize2XL:req.body.kalaSize2XL3,
			color3KalaSize3XL:req.body.kalaSize3XL3,
			color3KalaSize4XL:req.body.kalaSize4XL3,
			
			color3GalwaySizeS:req.body.galwaySizeS3,
			color3GalwaySizeM:req.body.galwaySizeM3,
			color3GalwaySizeL:req.body.galwaySizeL3,
			color3GalwaySizeXL:req.body.galwaySizeXL3,
			color3GalwaySize2XL:req.body.galwaySize2XL3,
			color3GalwaySize3XL:req.body.galwaySize3XL3,
			color3GalwaySize4XL:req.body.galwaySize4XL3,
			
			color3WarehouseSizeS:req.body.warehouseSizeS3,
			color3WarehouseSizeM:req.body.warehouseSizeM3,
			color3WarehouseSizeL:req.body.warehouseSizeL3,
			color3WarehouseSizeXL:req.body.warehouseSizeXL3,
			color3WarehouseSize2XL:req.body.warehouseSize2XL3,
			color3WarehouseSize3XL:req.body.warehouseSize3XL3,
			color3WarehouseSize4XL:req.body.warehouseSize4XL3,
			
			color3Total: req.body.colorTotal3,
			color3CorkTotal: req.body.subCountCork3,
			color3KalaTotal: req.body.subCountKala3,
			color3GalwayTotal: req.body.subCountGalway3,
			color3WarehouseTotal: req.body.subCountWarehouse3,
			
			color4CorkSizeS:req.body.corkSizeS4,
			color4CorkSizeM:req.body.corkSizeM4,
			color4CorkSizeL:req.body.corkSizeL4,
			color4CorkSizeXL:req.body.corkSizeXL4,
			color4CorkSize2XL:req.body.corkSize2XL4,
			color4CorkSize3XL:req.body.corkSize3XL4,
			color4CorkSize4XL:req.body.corkSize4XL4,
			
			color4KalaSizeS:req.body.kalaSizeS4,
			color4KalaSizeM:req.body.kalaSizeM4,
			color4KalaSizeL:req.body.kalaSizeL4,
			color4KalaSizeXL:req.body.kalaSizeXL4,
			color4KalaSize2XL:req.body.kalaSize2XL4,
			color4KalaSize3XL:req.body.kalaSize3XL4,
			color4KalaSize4XL:req.body.kalaSize4XL4,
			
			color4GalwaySizeS:req.body.galwaySizeS4,
			color4GalwaySizeM:req.body.galwaySizeM4,
			color4GalwaySizeL:req.body.galwaySizeL4,
			color4GalwaySizeXL:req.body.galwaySizeXL4,
			color4GalwaySize2XL:req.body.galwaySize2XL4,
			color4GalwaySize3XL:req.body.galwaySize3XL4,
			color4GalwaySize4XL:req.body.galwaySize4XL4,
			
			color4WarehouseSizeS:req.body.warehouseSizeS4,
			color4WarehouseSizeM:req.body.warehouseSizeM4,
			color4WarehouseSizeL:req.body.warehouseSizeL4,
			color4WarehouseSizeXL:req.body.warehouseSizeXL4,
			color4WarehouseSize2XL:req.body.warehouseSize2XL4,
			color4WarehouseSize3XL:req.body.warehouseSize3XL4,
			color4WarehouseSize4XL:req.body.warehouseSize4XL4,
			
			color4Total: req.body.colorTotal4,
			color4CorkTotal: req.body.subCountCork4,
			color4KalaTotal: req.body.subCountKala4,
			color4GalwayTotal: req.body.subCountGalway4,
			color4WarehouseTotal: req.body.subCountWarehouse4,
			
			color5CorkSizeS:req.body.corkSizeS5,
			color5CorkSizeM:req.body.corkSizeM5,
			color5CorkSizeL:req.body.corkSizeL5,
			color5CorkSizeXL:req.body.corkSizeXL5,
			color5CorkSize2XL:req.body.corkSize2XL5,
			color5CorkSize3XL:req.body.corkSize3XL5,
			color5CorkSize4XL:req.body.corkSize4XL5,
			
			color5KalaSizeS:req.body.kalaSizeS5,
			color5KalaSizeM:req.body.kalaSizeM5,
			color5KalaSizeL:req.body.kalaSizeL5,
			color5KalaSizeXL:req.body.kalaSizeXL5,
			color5KalaSize2XL:req.body.kalaSize2XL5,
			color5KalaSize3XL:req.body.kalaSize3XL5,
			color5KalaSize4XL:req.body.kalaSize4XL5,
			
			color5GalwaySizeS:req.body.galwaySizeS5,
			color5GalwaySizeM:req.body.galwaySizeM5,
			color5GalwaySizeL:req.body.galwaySizeL5,
			color5GalwaySizeXL:req.body.galwaySizeXL5,
			color5GalwaySize2XL:req.body.galwaySize2XL5,
			color5GalwaySize3XL:req.body.galwaySize3XL5,
			color5GalwaySize4XL:req.body.galwaySize4XL5,
			
			color5WarehouseSizeS:req.body.warehouseSizeS5,
			color5WarehouseSizeM:req.body.warehouseSizeM5,
			color5WarehouseSizeL:req.body.warehouseSizeL5,
			color5WarehouseSizeXL:req.body.warehouseSizeXL5,
			color5WarehouseSize2XL:req.body.warehouseSize2XL5,
			color5WarehouseSize3XL:req.body.warehouseSize3XL5,
			color5WarehouseSize4XL:req.body.warehouseSize4XL5,
			
			color5Total: req.body.colorTotal5,
			color5CorkTotal: req.body.subCountCork5,
			color5KalaTotal: req.body.subCountKala5,
			color5GalwayTotal: req.body.subCountGalway5,
			color5WarehouseTotal: req.body.subCountWarehouse5,
			
			color6CorkSizeS:req.body.corkSizeS6,
			color6CorkSizeM:req.body.corkSizeM6,
			color6CorkSizeL:req.body.corkSizeL6,
			color6CorkSizeXL:req.body.corkSizeXL6,
			color6CorkSize2XL:req.body.corkSize2XL6,
			color6CorkSize3XL:req.body.corkSize3XL6,
			color6CorkSize4XL:req.body.corkSize4XL6,
			
			color6KalaSizeS:req.body.kalaSizeS6,
			color6KalaSizeM:req.body.kalaSizeM6,
			color6KalaSizeL:req.body.kalaSizeL6,
			color6KalaSizeXL:req.body.kalaSizeXL6,
			color6KalaSize2XL:req.body.kalaSize2XL6,
			color6KalaSize3XL:req.body.kalaSize3XL6,
			color6KalaSize4XL:req.body.kalaSize4XL6,
			
			color6GalwaySizeS:req.body.galwaySizeS6,
			color6GalwaySizeM:req.body.galwaySizeM6,
			color6GalwaySizeL:req.body.galwaySizeL6,
			color6GalwaySizeXL:req.body.galwaySizeXL6,
			color6GalwaySize2XL:req.body.galwaySize2XL6,
			color6GalwaySize3XL:req.body.galwaySize3XL6,
			color6GalwaySize4XL:req.body.galwaySize4XL6,
			
			color6WarehouseSizeS:req.body.warehouseSizeS6,
			color6WarehouseSizeM:req.body.warehouseSizeM6,
			color6WarehouseSizeL:req.body.warehouseSizeL6,
			color6WarehouseSizeXL:req.body.warehouseSizeXL6,
			color6WarehouseSize2XL:req.body.warehouseSize2XL6,
			color6WarehouseSize3XL:req.body.warehouseSize3XL6,
			color6WarehouseSize4XL:req.body.warehouseSize4XL6,
			
			color6Total: req.body.colorTotal6,
			color6CorkTotal: req.body.subCountCork6,
			color6KalaTotal: req.body.subCountKala6,
			color6GalwayTotal: req.body.subCountGalway6,
			color6WarehouseTotal: req.body.subCountWarehouse6,
			
			color7CorkSizeS:req.body.corkSizeS7,
			color7CorkSizeM:req.body.corkSizeM7,
			color7CorkSizeL:req.body.corkSizeL7,
			color7CorkSizeXL:req.body.corkSizeXL7,
			color7CorkSize2XL:req.body.corkSize2XL7,
			color7CorkSize3XL:req.body.corkSize3XL7,
			color7CorkSize4XL:req.body.corkSize4XL7,
			
			color7KalaSizeS:req.body.kalaSizeS7,
			color7KalaSizeM:req.body.kalaSizeM7,
			color7KalaSizeL:req.body.kalaSizeL7,
			color7KalaSizeXL:req.body.kalaSizeXL7,
			color7KalaSize2XL:req.body.kalaSize2XL7,
			color7KalaSize3XL:req.body.kalaSize3XL7,
			color7KalaSize4XL:req.body.kalaSize4XL7,
			
			color7GalwaySizeS:req.body.galwaySizeS7,
			color7GalwaySizeM:req.body.galwaySizeM7,
			color7GalwaySizeL:req.body.galwaySizeL7,
			color7GalwaySizeXL:req.body.galwaySizeXL7,
			color7GalwaySize2XL:req.body.galwaySize2XL7,
			color7GalwaySize3XL:req.body.galwaySize3XL7,
			color7GalwaySize4XL:req.body.galwaySize4XL7,
			
			color7WarehouseSizeS:req.body.warehouseSizeS7,
			color7WarehouseSizeM:req.body.warehouseSizeM7,
			color7WarehouseSizeL:req.body.warehouseSizeL7,
			color7WarehouseSizeXL:req.body.warehouseSizeXL7,
			color7WarehouseSize2XL:req.body.warehouseSize2XL7,
			color7WarehouseSize3XL:req.body.warehouseSize3XL7,
			color7WarehouseSize4XL:req.body.warehouseSize4XL7,
			
			color7Total: req.body.colorTotal7,
			color7CorkTotal: req.body.subCountCork7,
			color7KalaTotal: req.body.subCountKala7,
			color7GalwayTotal: req.body.subCountGalway7,
			color7WarehouseTotal: req.body.subCountWarehouse7,
			
			color8CorkSizeS:req.body.corkSizeS8,
			color8CorkSizeM:req.body.corkSizeM8,
			color8CorkSizeL:req.body.corkSizeL8,
			color8CorkSizeXL:req.body.corkSizeXL8,
			color8CorkSize2XL:req.body.corkSize2XL8,
			color8CorkSize3XL:req.body.corkSize3XL8,
			color8CorkSize4XL:req.body.corkSize4XL8,
			
			color8KalaSizeS:req.body.kalaSizeS8,
			color8KalaSizeM:req.body.kalaSizeM8,
			color8KalaSizeL:req.body.kalaSizeL8,
			color8KalaSizeXL:req.body.kalaSizeXL8,
			color8KalaSize2XL:req.body.kalaSize2XL8,
			color8KalaSize3XL:req.body.kalaSize3XL8,
			color8KalaSize4XL:req.body.kalaSize4XL8,
			
			color8GalwaySizeS:req.body.galwaySizeS8,
			color8GalwaySizeM:req.body.galwaySizeM8,
			color8GalwaySizeL:req.body.galwaySizeL8,
			color8GalwaySizeXL:req.body.galwaySizeXL8,
			color8GalwaySize2XL:req.body.galwaySize2XL8,
			color8GalwaySize3XL:req.body.galwaySize3XL8,
			color8GalwaySize4XL:req.body.galwaySize4XL8,
			
			color8WarehouseSizeS:req.body.warehouseSizeS8,
			color8WarehouseSizeM:req.body.warehouseSizeM8,
			color8WarehouseSizeL:req.body.warehouseSizeL8,
			color8WarehouseSizeXL:req.body.warehouseSizeXL8,
			color8WarehouseSize2XL:req.body.warehouseSize2XL8,
			color8WarehouseSize3XL:req.body.warehouseSize3XL8,
			color8WarehouseSize4XL:req.body.warehouseSize4XL8,
			
			color8Total: req.body.colorTotal8,
			color8CorkTotal: req.body.subCountCork8,
			color8KalaTotal: req.body.subCountKala8,
			color8GalwayTotal: req.body.subCountGalway8,
			color8WarehouseTotal: req.body.subCountWarehouse8,
			
			color9CorkSizeS:req.body.corkSizeS9,
			color9CorkSizeM:req.body.corkSizeM9,
			color9CorkSizeL:req.body.corkSizeL9,
			color9CorkSizeXL:req.body.corkSizeXL9,
			color9CorkSize2XL:req.body.corkSize2XL9,
			color9CorkSize3XL:req.body.corkSize3XL9,
			color9CorkSize4XL:req.body.corkSize4XL9,
			
			color9KalaSizeS:req.body.kalaSizeS9,
			color9KalaSizeM:req.body.kalaSizeM9,
			color9KalaSizeL:req.body.kalaSizeL9,
			color9KalaSizeXL:req.body.kalaSizeXL9,
			color9KalaSize2XL:req.body.kalaSize2XL9,
			color9KalaSize3XL:req.body.kalaSize3XL9,
			color9KalaSize4XL:req.body.kalaSize4XL9,
			
			color9GalwaySizeS:req.body.galwaySizeS9,
			color9GalwaySizeM:req.body.galwaySizeM9,
			color9GalwaySizeL:req.body.galwaySizeL9,
			color9GalwaySizeXL:req.body.galwaySizeXL9,
			color9GalwaySize2XL:req.body.galwaySize2XL9,
			color9GalwaySize3XL:req.body.galwaySize3XL9,
			color9GalwaySize4XL:req.body.galwaySize4XL9,
			
			color9WarehouseSizeS:req.body.warehouseSizeS9,
			color9WarehouseSizeM:req.body.warehouseSizeM9,
			color9WarehouseSizeL:req.body.warehouseSizeL9,
			color9WarehouseSizeXL:req.body.warehouseSizeXL9,
			color9WarehouseSize2XL:req.body.warehouseSize2XL9,
			color9WarehouseSize3XL:req.body.warehouseSize3XL9,
			color9WarehouseSize4XL:req.body.warehouseSize4XL9,
			
			color9Total: req.body.colorTotal9,
			color9CorkTotal: req.body.subCountCork9,
			color9KalaTotal: req.body.subCountKala9,
			color9GalwayTotal: req.body.subCountGalway9,
			color9WarehouseTotal: req.body.subCountWarehouse9,
			
			color10CorkSizeS:req.body.corkSizeS10,
			color10CorkSizeM:req.body.corkSizeM10,
			color10CorkSizeL:req.body.corkSizeL10,
			color10CorkSizeXL:req.body.corkSizeXL10,
			color10CorkSize2XL:req.body.corkSize2XL10,
			color10CorkSize3XL:req.body.corkSize3XL10,
			color10CorkSize4XL:req.body.corkSize4XL10,
			
			color10KalaSizeS:req.body.kalaSizeS10,
			color10KalaSizeM:req.body.kalaSizeM10,
			color10KalaSizeL:req.body.kalaSizeL10,
			color10KalaSizeXL:req.body.kalaSizeXL10,
			color10KalaSize2XL:req.body.kalaSize2XL10,
			color10KalaSize3XL:req.body.kalaSize3XL10,
			color10KalaSize4XL:req.body.kalaSize4XL10,
			
			color10GalwaySizeS:req.body.galwaySizeS10,
			color10GalwaySizeM:req.body.galwaySizeM10,
			color10GalwaySizeL:req.body.galwaySizeL10,
			color10GalwaySizeXL:req.body.galwaySizeXL10,
			color10GalwaySize2XL:req.body.galwaySize2XL10,
			color10GalwaySize3XL:req.body.galwaySize3XL10,
			color10GalwaySize4XL:req.body.galwaySize4XL10,
			
			color10WarehouseSizeS:req.body.warehouseSizeS10,
			color10WarehouseSizeM:req.body.warehouseSizeM10,
			color10WarehouseSizeL:req.body.warehouseSizeL10,
			color10WarehouseSizeXL:req.body.warehouseSizeXL10,
			color10WarehouseSize2XL:req.body.warehouseSize2XL10,
			color10WarehouseSize3XL:req.body.warehouseSize3XL10,
			color10WarehouseSize4XL:req.body.warehouseSize4XL10,
			
			color10Total: req.body.colorTotal10,
			color10CorkTotal: req.body.subCountCork10,
			color10KalaTotal: req.body.subCountKala10,
			color10GalwayTotal: req.body.subCountGalway10,
			color10WarehouseTotal: req.body.subCountWarehouse10,
			
			inStoreCork: req.body.inCork,
			inStoreKala: req.body.inKala,
			inStoreGalway: req.body.inGalway,
			inWarehouse: req.body.inWarehouse,

			totalKala: req.body.countKala,
			totalCork: req.body.countCork,
			totalGalway: req.body.countGalway,
			totalWarehouse: req.body.countWarehouse,
			
			//cart: "no"
		});
		product
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/management');
			
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
		});
	}		
	
	//if has multi size/color/price
	if(hasS == true && hasC == true && hasMP == true)
	{
		const product = new Product({
			//constant vars (always present)
			_id: new mongoose.Types.ObjectId(),
			name: req.body.name,
			description: req.body.description,
			category: req.body.category,
			productImage: req.file.path,
			
			//constants
	//if masterPrice set else set price by size
			onSale: req.body.onSale,
			masterPrice: req.body.price,
			masterSalePrice: req.body.salePrice,
			priceS: req.body.priceS,
			priceM: req.body.priceM,
			priceL: req.body.priceL,
			priceXL: req.body.priceXL,
			price2XL: req.body.price2XL,
			price3XL: req.body.price3XL,
			price4XL: req.body.price4XL,
			
			salePriceS: req.body.salePriceS,
			salePriceM: req.body.salePriceM,
			salePriceL: req.body.salePriceL,
			salePriceXL: req.body.salePriceXL,
			salePrice2XL: req.body.salePrice2XL,
			salePrice3XL: req.body.salePrice3XL,
			salePrice4XL: req.body.salePrice4XL,
			
			hasSizes:req.body.hasSizes,
			numColors: req.body.numSubStyles,
			
			colorCode1: req.body.color1,
			colorCode2: req.body.color2,
			colorCode3: req.body.color3,
			colorCode4: req.body.color4,
			colorCode5: req.body.color5,
			colorCode6: req.body.color6,
			colorCode7: req.body.color7,
			colorCode8: req.body.color8,
			colorCode9: req.body.color9,
			colorCode10: req.body.color10,
			
			color1CorkSizeS:req.body.corkSizeS1,
			color1CorkSizeM:req.body.corkSizeM1,
			color1CorkSizeL:req.body.corkSizeL1,
			color1CorkSizeXL:req.body.corkSizeXL1,
			color1CorkSize2XL:req.body.corkSize2XL1,
			color1CorkSize3XL:req.body.corkSize3XL1,
			color1CorkSize4XL:req.body.corkSize4XL1,
			
			color1KalaSizeS:req.body.kalaSizeS1,
			color1KalaSizeM:req.body.kalaSizeM1,
			color1KalaSizeL:req.body.kalaSizeL1,
			color1KalaSizeXL:req.body.kalaSizeXL1,
			color1KalaSize2XL:req.body.kalaSize2XL1,
			color1KalaSize3XL:req.body.kalaSize3XL1,
			color1KalaSize4XL:req.body.kalaSize4XL1,
			
			color1GalwaySizeS:req.body.galwaySizeS1,
			color1GalwaySizeM:req.body.galwaySizeM1,
			color1GalwaySizeL:req.body.galwaySizeL1,
			color1GalwaySizeXL:req.body.galwaySizeXL1,
			color1GalwaySize2XL:req.body.galwaySize2XL1,
			color1GalwaySize3XL:req.body.galwaySize3XL1,
			color1GalwaySize4XL:req.body.galwaySize4XL1,
			
			color1WarehouseSizeS:req.body.warehouseSizeS1,
			color1WarehouseSizeM:req.body.warehouseSizeM1,
			color1WarehouseSizeL:req.body.warehouseSizeL1,
			color1WarehouseSizeXL:req.body.warehouseSizeXL1,
			color1WarehouseSize2XL:req.body.warehouseSize2XL1,
			color1WarehouseSize3XL:req.body.warehouseSize3XL1,
			color1WarehouseSize4XL:req.body.warehouseSize4XL1,
			
			color1Total: req.body.colorTotal1,
			color1CorkTotal: req.body.subCountCork1,
			color1KalaTotal: req.body.subCountKala1,
			color1GalwayTotal: req.body.subCountGalway1,
			color1WarehouseTotal: req.body.subCountWarehouse1,
			
			color2CorkSizeS:req.body.corkSizeS2,
			color2CorkSizeM:req.body.corkSizeM2,
			color2CorkSizeL:req.body.corkSizeL2,
			color2CorkSizeXL:req.body.corkSizeXL2,
			color2CorkSize2XL:req.body.corkSize2XL2,
			color2CorkSize3XL:req.body.corkSize3XL2,
			color2CorkSize4XL:req.body.corkSize4XL2,
			
			color2KalaSizeS:req.body.kalaSizeS2,
			color2KalaSizeM:req.body.kalaSizeM2,
			color2KalaSizeL:req.body.kalaSizeL2,
			color2KalaSizeXL:req.body.kalaSizeXL2,
			color2KalaSize2XL:req.body.kalaSize2XL2,
			color2KalaSize3XL:req.body.kalaSize3XL2,
			color2KalaSize4XL:req.body.kalaSize4XL2,
			
			color2GalwaySizeS:req.body.galwaySizeS2,
			color2GalwaySizeM:req.body.galwaySizeM2,
			color2GalwaySizeL:req.body.galwaySizeL2,
			color2GalwaySizeXL:req.body.galwaySizeXL2,
			color2GalwaySize2XL:req.body.galwaySize2XL2,
			color2GalwaySize3XL:req.body.galwaySize3XL2,
			color2GalwaySize4XL:req.body.galwaySize4XL2,
			
			color2WarehouseSizeS:req.body.warehouseSizeS2,
			color2WarehouseSizeM:req.body.warehouseSizeM2,
			color2WarehouseSizeL:req.body.warehouseSizeL2,
			color2WarehouseSizeXL:req.body.warehouseSizeXL2,
			color2WarehouseSize2XL:req.body.warehouseSize2XL2,
			color2WarehouseSize3XL:req.body.warehouseSize3XL2,
			color2WarehouseSize4XL:req.body.warehouseSize4XL2,
			
			color2Total: req.body.colorTotal2,
			color2CorkTotal: req.body.subCountCork2,
			color2KalaTotal: req.body.subCountKala2,
			color2GalwayTotal: req.body.subCountGalway2,
			color2WarehouseTotal: req.body.subCountWarehouse2,
			
			color3CorkSizeS:req.body.corkSizeS3,
			color3CorkSizeM:req.body.corkSizeM3,
			color3CorkSizeL:req.body.corkSizeL3,
			color3CorkSizeXL:req.body.corkSizeXL3,
			color3CorkSize2XL:req.body.corkSize2XL3,
			color3CorkSize3XL:req.body.corkSize3XL3,
			color3CorkSize4XL:req.body.corkSize4XL3,
			
			color3KalaSizeS:req.body.kalaSizeS3,
			color3KalaSizeM:req.body.kalaSizeM3,
			color3KalaSizeL:req.body.kalaSizeL3,
			color3KalaSizeXL:req.body.kalaSizeXL3,
			color3KalaSize2XL:req.body.kalaSize2XL3,
			color3KalaSize3XL:req.body.kalaSize3XL3,
			color3KalaSize4XL:req.body.kalaSize4XL3,
			
			color3GalwaySizeS:req.body.galwaySizeS3,
			color3GalwaySizeM:req.body.galwaySizeM3,
			color3GalwaySizeL:req.body.galwaySizeL3,
			color3GalwaySizeXL:req.body.galwaySizeXL3,
			color3GalwaySize2XL:req.body.galwaySize2XL3,
			color3GalwaySize3XL:req.body.galwaySize3XL3,
			color3GalwaySize4XL:req.body.galwaySize4XL3,
			
			color3WarehouseSizeS:req.body.warehouseSizeS3,
			color3WarehouseSizeM:req.body.warehouseSizeM3,
			color3WarehouseSizeL:req.body.warehouseSizeL3,
			color3WarehouseSizeXL:req.body.warehouseSizeXL3,
			color3WarehouseSize2XL:req.body.warehouseSize2XL3,
			color3WarehouseSize3XL:req.body.warehouseSize3XL3,
			color3WarehouseSize4XL:req.body.warehouseSize4XL3,
			
			color3Total: req.body.colorTotal3,
			color3CorkTotal: req.body.subCountCork3,
			color3KalaTotal: req.body.subCountKala3,
			color3GalwayTotal: req.body.subCountGalway3,
			color3WarehouseTotal: req.body.subCountWarehouse3,
			
			color4CorkSizeS:req.body.corkSizeS4,
			color4CorkSizeM:req.body.corkSizeM4,
			color4CorkSizeL:req.body.corkSizeL4,
			color4CorkSizeXL:req.body.corkSizeXL4,
			color4CorkSize2XL:req.body.corkSize2XL4,
			color4CorkSize3XL:req.body.corkSize3XL4,
			color4CorkSize4XL:req.body.corkSize4XL4,
			
			color4KalaSizeS:req.body.kalaSizeS4,
			color4KalaSizeM:req.body.kalaSizeM4,
			color4KalaSizeL:req.body.kalaSizeL4,
			color4KalaSizeXL:req.body.kalaSizeXL4,
			color4KalaSize2XL:req.body.kalaSize2XL4,
			color4KalaSize3XL:req.body.kalaSize3XL4,
			color4KalaSize4XL:req.body.kalaSize4XL4,
			
			color4GalwaySizeS:req.body.galwaySizeS4,
			color4GalwaySizeM:req.body.galwaySizeM4,
			color4GalwaySizeL:req.body.galwaySizeL4,
			color4GalwaySizeXL:req.body.galwaySizeXL4,
			color4GalwaySize2XL:req.body.galwaySize2XL4,
			color4GalwaySize3XL:req.body.galwaySize3XL4,
			color4GalwaySize4XL:req.body.galwaySize4XL4,
			
			color4WarehouseSizeS:req.body.warehouseSizeS4,
			color4WarehouseSizeM:req.body.warehouseSizeM4,
			color4WarehouseSizeL:req.body.warehouseSizeL4,
			color4WarehouseSizeXL:req.body.warehouseSizeXL4,
			color4WarehouseSize2XL:req.body.warehouseSize2XL4,
			color4WarehouseSize3XL:req.body.warehouseSize3XL4,
			color4WarehouseSize4XL:req.body.warehouseSize4XL4,
			
			color4Total: req.body.colorTotal4,
			color4CorkTotal: req.body.subCountCork4,
			color4KalaTotal: req.body.subCountKala4,
			color4GalwayTotal: req.body.subCountGalway4,
			color4WarehouseTotal: req.body.subCountWarehouse4,
			
			color5CorkSizeS:req.body.corkSizeS5,
			color5CorkSizeM:req.body.corkSizeM5,
			color5CorkSizeL:req.body.corkSizeL5,
			color5CorkSizeXL:req.body.corkSizeXL5,
			color5CorkSize2XL:req.body.corkSize2XL5,
			color5CorkSize3XL:req.body.corkSize3XL5,
			color5CorkSize4XL:req.body.corkSize4XL5,
			
			color5KalaSizeS:req.body.kalaSizeS5,
			color5KalaSizeM:req.body.kalaSizeM5,
			color5KalaSizeL:req.body.kalaSizeL5,
			color5KalaSizeXL:req.body.kalaSizeXL5,
			color5KalaSize2XL:req.body.kalaSize2XL5,
			color5KalaSize3XL:req.body.kalaSize3XL5,
			color5KalaSize4XL:req.body.kalaSize4XL5,
			
			color5GalwaySizeS:req.body.galwaySizeS5,
			color5GalwaySizeM:req.body.galwaySizeM5,
			color5GalwaySizeL:req.body.galwaySizeL5,
			color5GalwaySizeXL:req.body.galwaySizeXL5,
			color5GalwaySize2XL:req.body.galwaySize2XL5,
			color5GalwaySize3XL:req.body.galwaySize3XL5,
			color5GalwaySize4XL:req.body.galwaySize4XL5,
			
			color5WarehouseSizeS:req.body.warehouseSizeS5,
			color5WarehouseSizeM:req.body.warehouseSizeM5,
			color5WarehouseSizeL:req.body.warehouseSizeL5,
			color5WarehouseSizeXL:req.body.warehouseSizeXL5,
			color5WarehouseSize2XL:req.body.warehouseSize2XL5,
			color5WarehouseSize3XL:req.body.warehouseSize3XL5,
			color5WarehouseSize4XL:req.body.warehouseSize4XL5,
			
			color5Total: req.body.colorTotal5,
			color5CorkTotal: req.body.subCountCork5,
			color5KalaTotal: req.body.subCountKala5,
			color5GalwayTotal: req.body.subCountGalway5,
			color5WarehouseTotal: req.body.subCountWarehouse5,
			
			color6CorkSizeS:req.body.corkSizeS6,
			color6CorkSizeM:req.body.corkSizeM6,
			color6CorkSizeL:req.body.corkSizeL6,
			color6CorkSizeXL:req.body.corkSizeXL6,
			color6CorkSize2XL:req.body.corkSize2XL6,
			color6CorkSize3XL:req.body.corkSize3XL6,
			color6CorkSize4XL:req.body.corkSize4XL6,
			
			color6KalaSizeS:req.body.kalaSizeS6,
			color6KalaSizeM:req.body.kalaSizeM6,
			color6KalaSizeL:req.body.kalaSizeL6,
			color6KalaSizeXL:req.body.kalaSizeXL6,
			color6KalaSize2XL:req.body.kalaSize2XL6,
			color6KalaSize3XL:req.body.kalaSize3XL6,
			color6KalaSize4XL:req.body.kalaSize4XL6,
			
			color6GalwaySizeS:req.body.galwaySizeS6,
			color6GalwaySizeM:req.body.galwaySizeM6,
			color6GalwaySizeL:req.body.galwaySizeL6,
			color6GalwaySizeXL:req.body.galwaySizeXL6,
			color6GalwaySize2XL:req.body.galwaySize2XL6,
			color6GalwaySize3XL:req.body.galwaySize3XL6,
			color6GalwaySize4XL:req.body.galwaySize4XL6,
			
			color6WarehouseSizeS:req.body.warehouseSizeS6,
			color6WarehouseSizeM:req.body.warehouseSizeM6,
			color6WarehouseSizeL:req.body.warehouseSizeL6,
			color6WarehouseSizeXL:req.body.warehouseSizeXL6,
			color6WarehouseSize2XL:req.body.warehouseSize2XL6,
			color6WarehouseSize3XL:req.body.warehouseSize3XL6,
			color6WarehouseSize4XL:req.body.warehouseSize4XL6,
			
			color6Total: req.body.colorTotal6,
			color6CorkTotal: req.body.subCountCork6,
			color6KalaTotal: req.body.subCountKala6,
			color6GalwayTotal: req.body.subCountGalway6,
			color6WarehouseTotal: req.body.subCountWarehouse6,
			
			color7CorkSizeS:req.body.corkSizeS7,
			color7CorkSizeM:req.body.corkSizeM7,
			color7CorkSizeL:req.body.corkSizeL7,
			color7CorkSizeXL:req.body.corkSizeXL7,
			color7CorkSize2XL:req.body.corkSize2XL7,
			color7CorkSize3XL:req.body.corkSize3XL7,
			color7CorkSize4XL:req.body.corkSize4XL7,
			
			color7KalaSizeS:req.body.kalaSizeS7,
			color7KalaSizeM:req.body.kalaSizeM7,
			color7KalaSizeL:req.body.kalaSizeL7,
			color7KalaSizeXL:req.body.kalaSizeXL7,
			color7KalaSize2XL:req.body.kalaSize2XL7,
			color7KalaSize3XL:req.body.kalaSize3XL7,
			color7KalaSize4XL:req.body.kalaSize4XL7,
			
			color7GalwaySizeS:req.body.galwaySizeS7,
			color7GalwaySizeM:req.body.galwaySizeM7,
			color7GalwaySizeL:req.body.galwaySizeL7,
			color7GalwaySizeXL:req.body.galwaySizeXL7,
			color7GalwaySize2XL:req.body.galwaySize2XL7,
			color7GalwaySize3XL:req.body.galwaySize3XL7,
			color7GalwaySize4XL:req.body.galwaySize4XL7,
			
			color7WarehouseSizeS:req.body.warehouseSizeS7,
			color7WarehouseSizeM:req.body.warehouseSizeM7,
			color7WarehouseSizeL:req.body.warehouseSizeL7,
			color7WarehouseSizeXL:req.body.warehouseSizeXL7,
			color7WarehouseSize2XL:req.body.warehouseSize2XL7,
			color7WarehouseSize3XL:req.body.warehouseSize3XL7,
			color7WarehouseSize4XL:req.body.warehouseSize4XL7,
			
			color7Total: req.body.colorTotal7,
			color7CorkTotal: req.body.subCountCork7,
			color7KalaTotal: req.body.subCountKala7,
			color7GalwayTotal: req.body.subCountGalway7,
			color7WarehouseTotal: req.body.subCountWarehouse7,
			
			color8CorkSizeS:req.body.corkSizeS8,
			color8CorkSizeM:req.body.corkSizeM8,
			color8CorkSizeL:req.body.corkSizeL8,
			color8CorkSizeXL:req.body.corkSizeXL8,
			color8CorkSize2XL:req.body.corkSize2XL8,
			color8CorkSize3XL:req.body.corkSize3XL8,
			color8CorkSize4XL:req.body.corkSize4XL8,
			
			color8KalaSizeS:req.body.kalaSizeS8,
			color8KalaSizeM:req.body.kalaSizeM8,
			color8KalaSizeL:req.body.kalaSizeL8,
			color8KalaSizeXL:req.body.kalaSizeXL8,
			color8KalaSize2XL:req.body.kalaSize2XL8,
			color8KalaSize3XL:req.body.kalaSize3XL8,
			color8KalaSize4XL:req.body.kalaSize4XL8,
			
			color8GalwaySizeS:req.body.galwaySizeS8,
			color8GalwaySizeM:req.body.galwaySizeM8,
			color8GalwaySizeL:req.body.galwaySizeL8,
			color8GalwaySizeXL:req.body.galwaySizeXL8,
			color8GalwaySize2XL:req.body.galwaySize2XL8,
			color8GalwaySize3XL:req.body.galwaySize3XL8,
			color8GalwaySize4XL:req.body.galwaySize4XL8,
			
			color8WarehouseSizeS:req.body.warehouseSizeS8,
			color8WarehouseSizeM:req.body.warehouseSizeM8,
			color8WarehouseSizeL:req.body.warehouseSizeL8,
			color8WarehouseSizeXL:req.body.warehouseSizeXL8,
			color8WarehouseSize2XL:req.body.warehouseSize2XL8,
			color8WarehouseSize3XL:req.body.warehouseSize3XL8,
			color8WarehouseSize4XL:req.body.warehouseSize4XL8,
			
			color8Total: req.body.colorTotal8,
			color8CorkTotal: req.body.subCountCork8,
			color8KalaTotal: req.body.subCountKala8,
			color8GalwayTotal: req.body.subCountGalway8,
			color8WarehouseTotal: req.body.subCountWarehouse8,
			
			color9CorkSizeS:req.body.corkSizeS9,
			color9CorkSizeM:req.body.corkSizeM9,
			color9CorkSizeL:req.body.corkSizeL9,
			color9CorkSizeXL:req.body.corkSizeXL9,
			color9CorkSize2XL:req.body.corkSize2XL9,
			color9CorkSize3XL:req.body.corkSize3XL9,
			color9CorkSize4XL:req.body.corkSize4XL9,
			
			color9KalaSizeS:req.body.kalaSizeS9,
			color9KalaSizeM:req.body.kalaSizeM9,
			color9KalaSizeL:req.body.kalaSizeL9,
			color9KalaSizeXL:req.body.kalaSizeXL9,
			color9KalaSize2XL:req.body.kalaSize2XL9,
			color9KalaSize3XL:req.body.kalaSize3XL9,
			color9KalaSize4XL:req.body.kalaSize4XL9,
			
			color9GalwaySizeS:req.body.galwaySizeS9,
			color9GalwaySizeM:req.body.galwaySizeM9,
			color9GalwaySizeL:req.body.galwaySizeL9,
			color9GalwaySizeXL:req.body.galwaySizeXL9,
			color9GalwaySize2XL:req.body.galwaySize2XL9,
			color9GalwaySize3XL:req.body.galwaySize3XL9,
			color9GalwaySize4XL:req.body.galwaySize4XL9,
			
			color9WarehouseSizeS:req.body.warehouseSizeS9,
			color9WarehouseSizeM:req.body.warehouseSizeM9,
			color9WarehouseSizeL:req.body.warehouseSizeL9,
			color9WarehouseSizeXL:req.body.warehouseSizeXL9,
			color9WarehouseSize2XL:req.body.warehouseSize2XL9,
			color9WarehouseSize3XL:req.body.warehouseSize3XL9,
			color9WarehouseSize4XL:req.body.warehouseSize4XL9,
			
			color9Total: req.body.colorTotal9,
			color9CorkTotal: req.body.subCountCork9,
			color9KalaTotal: req.body.subCountKala9,
			color9GalwayTotal: req.body.subCountGalway9,
			color9WarehouseTotal: req.body.subCountWarehouse9,
			
			color10CorkSizeS:req.body.corkSizeS10,
			color10CorkSizeM:req.body.corkSizeM10,
			color10CorkSizeL:req.body.corkSizeL10,
			color10CorkSizeXL:req.body.corkSizeXL10,
			color10CorkSize2XL:req.body.corkSize2XL10,
			color10CorkSize3XL:req.body.corkSize3XL10,
			color10CorkSize4XL:req.body.corkSize4XL10,
			
			color10KalaSizeS:req.body.kalaSizeS10,
			color10KalaSizeM:req.body.kalaSizeM10,
			color10KalaSizeL:req.body.kalaSizeL10,
			color10KalaSizeXL:req.body.kalaSizeXL10,
			color10KalaSize2XL:req.body.kalaSize2XL10,
			color10KalaSize3XL:req.body.kalaSize3XL10,
			color10KalaSize4XL:req.body.kalaSize4XL10,
			
			color10GalwaySizeS:req.body.galwaySizeS10,
			color10GalwaySizeM:req.body.galwaySizeM10,
			color10GalwaySizeL:req.body.galwaySizeL10,
			color10GalwaySizeXL:req.body.galwaySizeXL10,
			color10GalwaySize2XL:req.body.galwaySize2XL10,
			color10GalwaySize3XL:req.body.galwaySize3XL10,
			color10GalwaySize4XL:req.body.galwaySize4XL10,
			
			color10WarehouseSizeS:req.body.warehouseSizeS10,
			color10WarehouseSizeM:req.body.warehouseSizeM10,
			color10WarehouseSizeL:req.body.warehouseSizeL10,
			color10WarehouseSizeXL:req.body.warehouseSizeXL10,
			color10WarehouseSize2XL:req.body.warehouseSize2XL10,
			color10WarehouseSize3XL:req.body.warehouseSize3XL10,
			color10WarehouseSize4XL:req.body.warehouseSize4XL10,
			
			color10Total: req.body.colorTotal10,
			color10CorkTotal: req.body.subCountCork10,
			color10KalaTotal: req.body.subCountKala10,
			color10GalwayTotal: req.body.subCountGalway10,
			color10WarehouseTotal: req.body.subCountWarehouse10,
			
			inStoreCork: req.body.inCork,
			inStoreKala: req.body.inKala,
			inStoreGalway: req.body.inGalway,
			inWarehouse: req.body.inWarehouse,

			totalKala: req.body.countKala,
			totalCork: req.body.countCork,
			totalGalway: req.body.countGalway,
			totalWarehouse: req.body.countWarehouse,
			
			//cart: "no"
		});
		product
        .save()
        .then(result => {
            console.log(result);
            res.redirect('/management');
			
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
		});
	}		
});

module.exports = router;