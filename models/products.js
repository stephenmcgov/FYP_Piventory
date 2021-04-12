var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var productSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { 
		type: String,
		required: true
	 },
	productImage: { type: String },
	category: { 
		type: String,
		required: true
	},
    description: {
		type: String
	},
	
	hasSizes: { type: String },
	//hasColors: {type:String},
	//hasPrice: {type:String},
	onSale: { type: String },
	
    masterPrice: {
		type: Number,
		min: 0
	},
	masterSalePrice: {
		type: Number,
		min: 0
	},
	priceS: {
		type: Number,
		min: 0
	},
	priceM: {
		type: Number,
		min: 0
	},
	priceL: {
		type: Number,
		min: 0
	},
	priceXL: {
		type: Number,
		min: 0
	},
	price2XL: {
		type: Number,
		min: 0
	},
	price3XL: {
		type: Number,
		min: 0
	},
	price4XL: {
		type: Number,
		min: 0
	},
	salePriceS: {
		type: Number,
		min: 0
	},
	salePriceM: {
		type: Number,
		min: 0
	},
	salePriceL: {
		type: Number,
		min: 0
	},
	salePriceXL: {
		type: Number,
		min: 0
	},
	salePrice2XL: {
		type: Number,
		min: 0
	},
	salePrice3XL: {
		type: Number,
		min: 0
	},
	salePrice4XL: {
		type: Number,
		min: 0
	},
	
	sizeS:{
		type: Number,
		min: 0
	},
	sizeM:{
		type: Number,
		min: 0
	},
	sizeL:{
		type: Number,
		min: 0
	},
	sizeXL:{
		type: Number,
		min: 0
	},
	size2XL:{
		type: Number,
		min: 0
	},
	size3XL:{
		type: Number,
		min: 0
	},
	size4XL:{
		type: Number,
		min: 0
	},
	
	numColors: {
		type: Number,
		min: 0
	},
	
	colorCode1: { type:String },
	colorCode2: { type:String },
	colorCode3: { type:String },
	colorCode4: { type:String },
	colorCode5: { type:String },
	colorCode6: { type:String },
	colorCode7: { type:String },
	colorCode8: { type:String },
	colorCode9: { type:String },
	colorCode10: { type:String },

	color1SizeS:{
		type: Number,
		min: 0
	},
	color1SizeM:{
		type: Number,
		min: 0
	},
	color1SizeL:{
		type: Number,
		min: 0
	},
	color1SizeXL:{
		type: Number,
		min: 0
	},
	color1Size2XL:{
		type: Number,
		min: 0
	},
	color1Size3XL:{
		type: Number,
		min: 0
	},
	color1Size4XL:{
		type: Number,
		min: 0
	},
	color1Total: {
		type:Number,
		min: 0
	},

	color2SizeS:{
		type: Number,
		min: 0
	},
	color2SizeM:{
		type: Number,
		min: 0
	},
	color2SizeL:{
		type: Number,
		min: 0
	},
	color2SizeXL:{
		type: Number,
		min: 0
	},
	color2Size2XL:{
		type: Number,
		min: 0
	},
	color2Size3XL:{
		type: Number,
		min: 0
	},
	color2Size4XL:{
		type: Number,
		min: 0
	},
	color2Total: {
		type:Number,
		min: 0
	},

	color3SizeS:{
		type: Number,
		min: 0
	},
	color3SizeM:{
		type: Number,
		min: 0
	},
	color3SizeL:{
		type: Number,
		min: 0
	},
	color3SizeXL:{
		type: Number,
		min: 0
	},
	color3Size2XL:{
		type: Number,
		min: 0
	},
	color3Size3XL:{
		type: Number,
		min: 0
	},
	color3Size4XL:{
		type: Number,
		min: 0
	},
	color3Total: {
		type:Number,
		min: 0
	},

	color4SizeS:{
		type: Number,
		min: 0
	},
	color4SizeM:{
		type: Number,
		min: 0
	},
	color4SizeL:{
		type: Number,
		min: 0
	},
	color4SizeXL:{
		type: Number,
		min: 0
	},
	color4Size2XL:{
		type: Number,
		min: 0
	},
	color4Size3XL:{
		type: Number,
		min: 0
	},
	color4Size4XL:{
		type: Number,
		min: 0
	},
	color4Total: {
		type:Number,
		min: 0
	},

	color5SizeS:{
		type: Number,
		min: 0
	},
	color5SizeM:{
		type: Number,
		min: 0
	},
	color5SizeL:{
		type: Number,
		min: 0
	},
	color5SizeXL:{
		type: Number,
		min: 0
	},
	color5Size2XL:{
		type: Number,
		min: 0
	},
	color5Size3XL:{
		type: Number,
		min: 0
	},
	color5Size4XL:{
		type: Number,
		min: 0
	},
	color5Total: {
		type:Number,
		min: 0
	},

	color6SizeS:{
		type: Number,
		min: 0
	},
	color6SizeM:{
		type: Number,
		min: 0
	},
	color6SizeL:{
		type: Number,
		min: 0
	},
	color6SizeXL:{
		type: Number,
		min: 0
	},
	color6Size2XL:{
		type: Number,
		min: 0
	},
	color6Size3XL:{
		type: Number,
		min: 0
	},
	color6Size4XL:{
		type: Number,
		min: 0
	},
	color6Total: {
		type:Number,
		min: 0
	},

	color7SizeS:{
		type: Number,
		min: 0
	},
	color7SizeM:{
		type: Number,
		min: 0
	},
	color7SizeL:{
		type: Number,
		min: 0
	},
	color7SizeXL:{
		type: Number,
		min: 0
	},
	color7Size2XL:{
		type: Number,
		min: 0
	},
	color7Size3XL:{
		type: Number,
		min: 0
	},
	color7Size4XL:{
		type: Number,
		min: 0
	},
	color7Total: {
		type:Number,
		min: 0
	},

	color8SizeS:{
		type: Number,
		min: 0
	},
	color8SizeM:{
		type: Number,
		min: 0
	},
	color8SizeL:{
		type: Number,
		min: 0
	},
	color8SizeXL:{
		type: Number,
		min: 0
	},
	color8Size2XL:{
		type: Number,
		min: 0
	},
	color8Size3XL:{
		type: Number,
		min: 0
	},
	color8Size4XL:{
		type: Number,
		min: 0
	},
	color8Total: {
		type:Number,
		min: 0
	},

	color9SizeS:{
		type: Number,
		min: 0
	},
	color9SizeM:{
		type: Number,
		min: 0
	},
	color9SizeL:{
		type: Number,
		min: 0
	},
	color9SizeXL:{
		type: Number,
		min: 0
	},
	color9Size2XL:{
		type: Number,
		min: 0
	},
	color9Size3XL:{
		type: Number,
		min: 0
	},
	color9Size4XL:{
		type: Number,
		min: 0
	},
	color9Total: {
		type:Number,
		min: 0
	},

	color10SizeS:{
		type: Number,
		min: 0
	},
	color10SizeM:{
		type: Number,
		min: 0
	},
	color10SizeL:{
		type: Number,
		min: 0
	},
	color10SizeXL:{
		type: Number,
		min: 0
	},
	color10Size2XL:{
		type: Number,
		min: 0
	},
	color10Size3XL:{
		type: Number,
		min: 0
	},
	color10Size4XL:{
		type: Number,
		min: 0
	},
	color10Total: {
		type:Number,
		min: 0
	},

	total: {
		type: Number,
		required: true,
		min: 0
	},
});

module.exports = mongoose.model('Product', productSchema);