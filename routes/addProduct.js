const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const Product = require("../models/products");
//const validator = require('express-validator');
const {check, validationResult} = require('express-validator');

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
router.post("/", upload.single('productImage'), [	
		//check("total").isNumeric()
	],
	(req, res) => {
	/*const errors = validationResult(req);
    console.log(req.body);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res.status(422).jsonp(errors.array());
	} */

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
			
			total: req.body.countTotal,
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
			sizeS:req.body.sizeS,
			sizeM:req.body.sizeM,
			sizeL:req.body.sizeL,
			sizeXL:req.body.sizeXL,
			size2XL:req.body.size2XL,
			size3XL:req.body.size3XL,
			size4XL:req.body.size4XL,
			
			total: parseInt(req.body.countTotal),
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
			sizeS:req.body.sizeS,
			sizeM:req.body.sizeM,
			sizeL:req.body.sizeL,
			sizeXL:req.body.sizeXL,
			size2XL:req.body.size2XL,
			size3XL:req.body.size3XL,
			size4XL:req.body.size4XL,

			total: parseInt(req.body.countTotal),
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
			color2Total: req.body.colorTotal2,	
			color3Total: req.body.colorTotal3,
			color4Total: req.body.colorTotal4,
			color5Total: req.body.colorTotal5,
			color6Total: req.body.colorTotal6,
			color7Total: req.body.colorTotal7,
			color8Total: req.body.colorTotal8,
			color9Total: req.body.colorTotal9,
			color10Total: req.body.colorTotal10,

			total: parseInt(req.body.countTotal),
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
			
			color1SizeS:req.body.sizeS1,
			color1SizeM:req.body.sizeM1,
			color1SizeL:req.body.sizeL1,
			color1SizeXL:req.body.sizeXL1,
			color1Size2XL:req.body.size2XL1,
			color1Size3XL:req.body.size3XL1,
			color1Size4XL:req.body.size4XL1,
			
			color1Total: req.body.colorTotal1,

			color2SizeS:req.body.sizeS2,
			color2SizeM:req.body.sSizeM2,
			colorSizeL:req.body.sizeL2,
			colorSizeXL:req.body.sizeXL2,
			color2Size2XL:req.body.size2XL2,
			color2Size3XL:req.body.size3XL2,
			color2Size4XL:req.body.size4XL2,
			
			color2Total: req.body.colorTotal2,
			
			color3SizeS:req.body.sizeS3,
			color3SizeM:req.body.sizeM3,
			color3SizeL:req.body.sizeL3,
			color3SizeXL:req.body.sizeXL3,
			color3Size2XL:req.body.size2XL3,
			color3Size3XL:req.body.size3XL3,
			color3Size4XL:req.body.size4XL3,
			
			color3Total: req.body.colorTotal3,
			
			color4SizeS:req.body.sizeS4,
			color4SizeM:req.body.sizeM4,
			color4SizeL:req.body.sizeL4,
			color4SizeXL:req.body.sizeXL4,
			color4Size2XL:req.body.size2XL4,
			color4Size3XL:req.body.size3XL4,
			color4Size4XL:req.body.size4XL4,
			
			color4Total: req.body.colorTotal4,
			
			color5SizeS:req.body.sizeS5,
			color5SizeM:req.body.sizeM5,
			color5SizeL:req.body.sizeL5,
			color5SizeXL:req.body.sizeXL5,
			color5Size2XL:req.body.size2XL5,
			color5Size3XL:req.body.size3XL5,
			color5Size4XL:req.body.size4XL5,
			
			color5Total: req.body.colorTotal5,

			color6SizeS:req.body.sizeS6,
			color6SizeM:req.body.sizeM6,
			color6SizeL:req.body.sizeL6,
			color6SizeXL:req.body.sizeXL6,
			color6Size2XL:req.body.size2XL6,
			color6Size3XL:req.body.size3XL6,
			color6Size4XL:req.body.size4XL6,
			
			color6Total: req.body.colorTotal6,
			
			color7SizeS:req.body.sizeS7,
			color7SizeM:req.body.sizeM7,
			color7SizeL:req.body.sizeL7,
			color7SizeXL:req.body.sizeXL7,
			color7Size2XL:req.body.size2XL7,
			color7Size3XL:req.body.size3XL7,
			color7Size4XL:req.body.size4XL7,
			
			color7Total: req.body.colorTotal7,
			
			color8SizeS:req.body.sizeS8,
			color8SizeM:req.body.sizeM8,
			color8SizeL:req.body.sizeL8,
			color8SizeXL:req.body.sizeXL8,
			color8Size2XL:req.body.size2XL8,
			color8Size3XL:req.body.size3XL8,
			color8Size4XL:req.body.size4XL8,
			
			color8Total: req.body.colorTotal8,
			
			color9SizeS:req.body.sizeS9,
			color9SizeM:req.body.sizeM9,
			color9SizeL:req.body.sizeL9,
			color9SizeXL:req.body.sizeXL9,
			color9Size2XL:req.body.size2XL9,
			color9Size3XL:req.body.size3XL9,
			color9Size4XL:req.body.size4XL9,
			
			color9Total: req.body.colorTotal9,
			
			color10SizeS:req.body.sizeS10,
			color10SizeM:req.body.sizeM10,
			color10SizeL:req.body.sizeL10,
			color10SizeXL:req.body.sizeXL10,
			color10Size2XL:req.body.size2XL10,
			color10Size3XL:req.body.size3XL10,
			color10Size4XL:req.body.size4XL10,
			
			color10Total: req.body.colorTotal10,
			
			total: parseInt(req.body.countTotal),
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
			
			color1SizeS:req.body.sizeS1,
			color1SizeM:req.body.sizeM1,
			color1SizeL:req.body.sizeL1,
			color1SizeXL:req.body.sizeXL1,
			color1Size2XL:req.body.size2XL1,
			color1Size3XL:req.body.size3XL1,
			color1Size4XL:req.body.size4XL1,
			
			color1Total: req.body.colorTotal1,
			
			color2SizeS:req.body.sizeS2,
			color2SizeM:req.body.sizeM2,
			color2SizeL:req.body.sizeL2,
			color2SizeXL:req.body.sizeXL2,
			color2Size2XL:req.body.size2XL2,
			color2Size3XL:req.body.size3XL2,
			color2Size4XL:req.body.size4XL2,
			
			color2Total: req.body.colorTotal2,
			
			color3SizeS:req.body.sizeS3,
			color3SizeM:req.body.sizeM3,
			color3SizeL:req.body.sizeL3,
			color3SizeXL:req.body.sizeXL3,
			color3Size2XL:req.body.size2XL3,
			color3Size3XL:req.body.size3XL3,
			color3Size4XL:req.body.size4XL3,
			
			color3Total: req.body.colorTotal3,

			color4SizeS:req.body.sizeS4,
			color4SizeM:req.body.sizeM4,
			color4SizeL:req.body.sizeL4,
			color4SizeXL:req.body.sizeXL4,
			color4Size2XL:req.body.size2XL4,
			color4Size3XL:req.body.size3XL4,
			color4Size4XL:req.body.size4XL4,
			
			color4Total: req.body.colorTotal4,

			color5SizeS:req.body.sizeS5,
			color5SizeM:req.body.sizeM5,
			color5SizeL:req.body.sizeL5,
			color5SizeXL:req.body.sizeXL5,
			color5Size2XL:req.body.size2XL5,
			color5Size3XL:req.body.size3XL5,
			color5Size4XL:req.body.size4XL5,
			
			color5Total: req.body.colorTotal5,

			color6SizeS:req.body.sizeS6,
			color6SizeM:req.body.sizeM6,
			color6SizeL:req.body.sizeL6,
			color6SizeXL:req.body.sizeXL6,
			color6Size2XL:req.body.size2XL6,
			color6Size3XL:req.body.size3XL6,
			color6Size4XL:req.body.size4XL6,
			
			color6Total: req.body.colorTotal6,

			color7SizeS:req.body.sizeS7,
			color7SizeM:req.body.sizeM7,
			color7SizeL:req.body.sizeL7,
			color7SizeXL:req.body.sizeXL7,
			color7Size2XL:req.body.size2XL7,
			color7Size3XL:req.body.size3XL7,
			color7Size4XL:req.body.size4XL7,
			
			color7Total: req.body.colorTotal7,

			color8SizeS:req.body.sizeS8,
			color8SizeM:req.body.sizeM8,
			color8SizeL:req.body.sizeL8,
			color8SizeXL:req.body.sizeXL8,
			color8Size2XL:req.body.size2XL8,
			color8Size3XL:req.body.size3XL8,
			color8Size4XL:req.body.size4XL8,
			
			color8Total: req.body.colorTotal8,
			
			color9SizeS:req.body.sizeS9,
			color9SizeM:req.body.sizeM9,
			color9SizeL:req.body.sizeL9,
			color9SizeXL:req.body.sizeXL9,
			color9Size2XL:req.body.size2XL9,
			color9Size3XL:req.body.size3XL9,
			color9Size4XL:req.body.size4XL9,
			
			color9Total: req.body.colorTotal9,
			
			color10SizeS:req.body.sizeS10,
			color10SizeM:req.body.sizeM10,
			color10SizeL:req.body.sizeL10,
			color10SizeXL:req.body.sizeXL10,
			color10Size2XL:req.body.size2XL10,
			color10Size3XL:req.body.size3XL10,
			color10Size4XL:req.body.size4XL10,
			
			color10Total: req.body.colorTotal10,
			
			total: parseInt(req.body.countTotal),
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