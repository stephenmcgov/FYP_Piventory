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
			
			inWarehouse: req.body.inWarehouse,
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
			
			inWarehouse: req.body.inWarehouse,
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
			
			inWarehouse: req.body.inWarehouse,
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
			color1WarehouseTotal: req.body.subCountWarehouse1,
			
			color2Total: req.body.colorTotal2,
			color2WarehouseTotal: req.body.subCountWarehouse2,
			
			color3Total: req.body.colorTotal3,
			color3WarehouseTotal: req.body.subCountWarehouse3,
			
			color4Total: req.body.colorTotal4,
			color4WarehouseTotal: req.body.subCountWarehouse4,
			
			color5Total: req.body.colorTotal5,
			color5WarehouseTotal: req.body.subCountWarehouse5,
			
			color6Total: req.body.colorTotal6,
			color6WarehouseTotal: req.body.subCountWarehouse6,
			
			color7Total: req.body.colorTotal7,
			color7WarehouseTotal: req.body.subCountWarehouse7,
			
			color8Total: req.body.colorTotal8,
			color8WarehouseTotal: req.body.subCountWarehouse8,
			
			color9Total: req.body.colorTotal9,
			color9WarehouseTotal: req.body.subCountWarehouse9,
			
			color10Total: req.body.colorTotal10,
			color10WarehouseTotal: req.body.subCountWarehouse10,
			
			inWarehouse: req.body.inWarehouse,
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
			
			color1WarehouseSizeS:req.body.warehouseSizeS1,
			color1WarehouseSizeM:req.body.warehouseSizeM1,
			color1WarehouseSizeL:req.body.warehouseSizeL1,
			color1WarehouseSizeXL:req.body.warehouseSizeXL1,
			color1WarehouseSize2XL:req.body.warehouseSize2XL1,
			color1WarehouseSize3XL:req.body.warehouseSize3XL1,
			color1WarehouseSize4XL:req.body.warehouseSize4XL1,
			
			color1Total: req.body.colorTotal1,
			color1WarehouseTotal: req.body.subCountWarehouse1,
			
			color2WarehouseSizeS:req.body.warehouseSizeS2,
			color2WarehouseSizeM:req.body.warehouseSizeM2,
			color2WarehouseSizeL:req.body.warehouseSizeL2,
			color2WarehouseSizeXL:req.body.warehouseSizeXL2,
			color2WarehouseSize2XL:req.body.warehouseSize2XL2,
			color2WarehouseSize3XL:req.body.warehouseSize3XL2,
			color2WarehouseSize4XL:req.body.warehouseSize4XL2,
			
			color2Total: req.body.colorTotal2,
			color2WarehouseTotal: req.body.subCountWarehouse2,
			
			color3WarehouseSizeS:req.body.warehouseSizeS3,
			color3WarehouseSizeM:req.body.warehouseSizeM3,
			color3WarehouseSizeL:req.body.warehouseSizeL3,
			color3WarehouseSizeXL:req.body.warehouseSizeXL3,
			color3WarehouseSize2XL:req.body.warehouseSize2XL3,
			color3WarehouseSize3XL:req.body.warehouseSize3XL3,
			color3WarehouseSize4XL:req.body.warehouseSize4XL3,
			
			color3Total: req.body.colorTotal3,
			color3WarehouseTotal: req.body.subCountWarehouse3,
			
			color4WarehouseSizeS:req.body.warehouseSizeS4,
			color4WarehouseSizeM:req.body.warehouseSizeM4,
			color4WarehouseSizeL:req.body.warehouseSizeL4,
			color4WarehouseSizeXL:req.body.warehouseSizeXL4,
			color4WarehouseSize2XL:req.body.warehouseSize2XL4,
			color4WarehouseSize3XL:req.body.warehouseSize3XL4,
			color4WarehouseSize4XL:req.body.warehouseSize4XL4,
			
			color4Total: req.body.colorTotal4,
			color4WarehouseTotal: req.body.subCountWarehouse4,
			
			color5WarehouseSizeS:req.body.warehouseSizeS5,
			color5WarehouseSizeM:req.body.warehouseSizeM5,
			color5WarehouseSizeL:req.body.warehouseSizeL5,
			color5WarehouseSizeXL:req.body.warehouseSizeXL5,
			color5WarehouseSize2XL:req.body.warehouseSize2XL5,
			color5WarehouseSize3XL:req.body.warehouseSize3XL5,
			color5WarehouseSize4XL:req.body.warehouseSize4XL5,
			
			color5Total: req.body.colorTotal5,
			color5WarehouseTotal: req.body.subCountWarehouse5,
			
			color6WarehouseSizeS:req.body.warehouseSizeS6,
			color6WarehouseSizeM:req.body.warehouseSizeM6,
			color6WarehouseSizeL:req.body.warehouseSizeL6,
			color6WarehouseSizeXL:req.body.warehouseSizeXL6,
			color6WarehouseSize2XL:req.body.warehouseSize2XL6,
			color6WarehouseSize3XL:req.body.warehouseSize3XL6,
			color6WarehouseSize4XL:req.body.warehouseSize4XL6,
			
			color6Total: req.body.colorTotal6,
			color6WarehouseTotal: req.body.subCountWarehouse6,
			
			color7WarehouseSizeS:req.body.warehouseSizeS7,
			color7WarehouseSizeM:req.body.warehouseSizeM7,
			color7WarehouseSizeL:req.body.warehouseSizeL7,
			color7WarehouseSizeXL:req.body.warehouseSizeXL7,
			color7WarehouseSize2XL:req.body.warehouseSize2XL7,
			color7WarehouseSize3XL:req.body.warehouseSize3XL7,
			color7WarehouseSize4XL:req.body.warehouseSize4XL7,
			
			color7Total: req.body.colorTotal7,
			color7WarehouseTotal: req.body.subCountWarehouse7,
			
			color8WarehouseSizeS:req.body.warehouseSizeS8,
			color8WarehouseSizeM:req.body.warehouseSizeM8,
			color8WarehouseSizeL:req.body.warehouseSizeL8,
			color8WarehouseSizeXL:req.body.warehouseSizeXL8,
			color8WarehouseSize2XL:req.body.warehouseSize2XL8,
			color8WarehouseSize3XL:req.body.warehouseSize3XL8,
			color8WarehouseSize4XL:req.body.warehouseSize4XL8,
			
			color8Total: req.body.colorTotal8,
			color8WarehouseTotal: req.body.subCountWarehouse8,
			
			color9WarehouseSizeS:req.body.warehouseSizeS9,
			color9WarehouseSizeM:req.body.warehouseSizeM9,
			color9WarehouseSizeL:req.body.warehouseSizeL9,
			color9WarehouseSizeXL:req.body.warehouseSizeXL9,
			color9WarehouseSize2XL:req.body.warehouseSize2XL9,
			color9WarehouseSize3XL:req.body.warehouseSize3XL9,
			color9WarehouseSize4XL:req.body.warehouseSize4XL9,
			
			color9Total: req.body.colorTotal9,
			color9WarehouseTotal: req.body.subCountWarehouse9,
			
			color10WarehouseSizeS:req.body.warehouseSizeS10,
			color10WarehouseSizeM:req.body.warehouseSizeM10,
			color10WarehouseSizeL:req.body.warehouseSizeL10,
			color10WarehouseSizeXL:req.body.warehouseSizeXL10,
			color10WarehouseSize2XL:req.body.warehouseSize2XL10,
			color10WarehouseSize3XL:req.body.warehouseSize3XL10,
			color10WarehouseSize4XL:req.body.warehouseSize4XL10,
			
			color10Total: req.body.colorTotal10,
			color10WarehouseTotal: req.body.subCountWarehouse10,
			
			inWarehouse: req.body.inWarehouse,
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
			
			color1WarehouseSizeS:req.body.warehouseSizeS1,
			color1WarehouseSizeM:req.body.warehouseSizeM1,
			color1WarehouseSizeL:req.body.warehouseSizeL1,
			color1WarehouseSizeXL:req.body.warehouseSizeXL1,
			color1WarehouseSize2XL:req.body.warehouseSize2XL1,
			color1WarehouseSize3XL:req.body.warehouseSize3XL1,
			color1WarehouseSize4XL:req.body.warehouseSize4XL1,
			
			color1Total: req.body.colorTotal1,
			color1WarehouseTotal: req.body.subCountWarehouse1,
			
			color2WarehouseSizeS:req.body.warehouseSizeS2,
			color2WarehouseSizeM:req.body.warehouseSizeM2,
			color2WarehouseSizeL:req.body.warehouseSizeL2,
			color2WarehouseSizeXL:req.body.warehouseSizeXL2,
			color2WarehouseSize2XL:req.body.warehouseSize2XL2,
			color2WarehouseSize3XL:req.body.warehouseSize3XL2,
			color2WarehouseSize4XL:req.body.warehouseSize4XL2,
			
			color2Total: req.body.colorTotal2,
			color2WarehouseTotal: req.body.subCountWarehouse2,
			
			color3WarehouseSizeS:req.body.warehouseSizeS3,
			color3WarehouseSizeM:req.body.warehouseSizeM3,
			color3WarehouseSizeL:req.body.warehouseSizeL3,
			color3WarehouseSizeXL:req.body.warehouseSizeXL3,
			color3WarehouseSize2XL:req.body.warehouseSize2XL3,
			color3WarehouseSize3XL:req.body.warehouseSize3XL3,
			color3WarehouseSize4XL:req.body.warehouseSize4XL3,
			
			color3Total: req.body.colorTotal3,
			color3WarehouseTotal: req.body.subCountWarehouse3,
			
			color4WarehouseSizeS:req.body.warehouseSizeS4,
			color4WarehouseSizeM:req.body.warehouseSizeM4,
			color4WarehouseSizeL:req.body.warehouseSizeL4,
			color4WarehouseSizeXL:req.body.warehouseSizeXL4,
			color4WarehouseSize2XL:req.body.warehouseSize2XL4,
			color4WarehouseSize3XL:req.body.warehouseSize3XL4,
			color4WarehouseSize4XL:req.body.warehouseSize4XL4,
			
			color4Total: req.body.colorTotal4,
			color4WarehouseTotal: req.body.subCountWarehouse4,
			
			color5WarehouseSizeS:req.body.warehouseSizeS5,
			color5WarehouseSizeM:req.body.warehouseSizeM5,
			color5WarehouseSizeL:req.body.warehouseSizeL5,
			color5WarehouseSizeXL:req.body.warehouseSizeXL5,
			color5WarehouseSize2XL:req.body.warehouseSize2XL5,
			color5WarehouseSize3XL:req.body.warehouseSize3XL5,
			color5WarehouseSize4XL:req.body.warehouseSize4XL5,
			
			color5Total: req.body.colorTotal5,
			color5WarehouseTotal: req.body.subCountWarehouse5,
			
			color6WarehouseSizeS:req.body.warehouseSizeS6,
			color6WarehouseSizeM:req.body.warehouseSizeM6,
			color6WarehouseSizeL:req.body.warehouseSizeL6,
			color6WarehouseSizeXL:req.body.warehouseSizeXL6,
			color6WarehouseSize2XL:req.body.warehouseSize2XL6,
			color6WarehouseSize3XL:req.body.warehouseSize3XL6,
			color6WarehouseSize4XL:req.body.warehouseSize4XL6,
			
			color6Total: req.body.colorTotal6,
			color6WarehouseTotal: req.body.subCountWarehouse6,
			
			color7WarehouseSizeS:req.body.warehouseSizeS7,
			color7WarehouseSizeM:req.body.warehouseSizeM7,
			color7WarehouseSizeL:req.body.warehouseSizeL7,
			color7WarehouseSizeXL:req.body.warehouseSizeXL7,
			color7WarehouseSize2XL:req.body.warehouseSize2XL7,
			color7WarehouseSize3XL:req.body.warehouseSize3XL7,
			color7WarehouseSize4XL:req.body.warehouseSize4XL7,
			
			color7Total: req.body.colorTotal7,
			color7WarehouseTotal: req.body.subCountWarehouse7,
			
			color8WarehouseSizeS:req.body.warehouseSizeS8,
			color8WarehouseSizeM:req.body.warehouseSizeM8,
			color8WarehouseSizeL:req.body.warehouseSizeL8,
			color8WarehouseSizeXL:req.body.warehouseSizeXL8,
			color8WarehouseSize2XL:req.body.warehouseSize2XL8,
			color8WarehouseSize3XL:req.body.warehouseSize3XL8,
			color8WarehouseSize4XL:req.body.warehouseSize4XL8,
			
			color8Total: req.body.colorTotal8,
			color8WarehouseTotal: req.body.subCountWarehouse8,
			
			color9WarehouseSizeS:req.body.warehouseSizeS9,
			color9WarehouseSizeM:req.body.warehouseSizeM9,
			color9WarehouseSizeL:req.body.warehouseSizeL9,
			color9WarehouseSizeXL:req.body.warehouseSizeXL9,
			color9WarehouseSize2XL:req.body.warehouseSize2XL9,
			color9WarehouseSize3XL:req.body.warehouseSize3XL9,
			color9WarehouseSize4XL:req.body.warehouseSize4XL9,
			
			color9Total: req.body.colorTotal9,
			color9WarehouseTotal: req.body.subCountWarehouse9,
			
			color10WarehouseSizeS:req.body.warehouseSizeS10,
			color10WarehouseSizeM:req.body.warehouseSizeM10,
			color10WarehouseSizeL:req.body.warehouseSizeL10,
			color10WarehouseSizeXL:req.body.warehouseSizeXL10,
			color10WarehouseSize2XL:req.body.warehouseSize2XL10,
			color10WarehouseSize3XL:req.body.warehouseSize3XL10,
			color10WarehouseSize4XL:req.body.warehouseSize4XL10,
			
			color10Total: req.body.colorTotal10,
			color10WarehouseTotal: req.body.subCountWarehouse10,
			
			inWarehouse: req.body.inWarehouse,
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