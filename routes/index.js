var express = require('express');
var session = require('express-session');
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var User = require('../models/users');
var Product = require('../models/products');
var Report = require('../models/reports');
var Store = require('../models/stores');
var jwt = require('jsonwebtoken');

/*---NAV FUNCTIONS---*/

//!NEED TO USE VERIFY JWT ON EVERY ROUTE!
/* Verifies a JWT */
function verifyJwt(jwtString) {
    var value = jwt.verify(jwtString, 'YouCan(Not)Connect');
    return value;
}

/* GET backend page. Restricted to logged in users */
router.get('/management', function (req, res, next) {
    try {
		var decodedCookie = req.cookies.role;
        var jwtString = req.cookies.Authorization.split(" ");
        //console.log(decodedCookie);
        var profile = verifyJwt(jwtString[1]);
		if (profile) 
		{
			if(decodedCookie=='admin')
            {res.render('management', {title: 'Management'});}
			
			else if(decodedCookie=='staff')
			{res.send('Restricted to Admin');}
        }
    } catch (err) {
        res.render('index',{title: 'Login'});
		//console.log(document.cookie);
    }
});

/* GET home page */
router.get('/', function (req, res, next) {
    res.render('home', {title: 'Welcome'});
});

/* GET catalogue page */
router.get('/catalogue', function (req, res, next) {
    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            res.render('catalogue', {title: 'Catalogue'});
        }
    } catch (err) {
        res.render('index',{title: 'Login'});
    }
});

/* GET reports page */
router.get('/reports', function (req, res, next) {
    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            res.render('reports', {title: 'Reports'});
        }
    } catch (err) {
        res.render('index',{title: 'Login'});
    }
});

/* GET login page */
router.get('/index', function (req, res, next) {
    res.render('index', {title: 'Login'});
});

/* GET register page */
//!CHANGE TO STAFF MANAGEMENT!
router.get('/register', function (req, res, next) {
	
    var sess;
    sess=req.session;
    console.log("Session: "+sess);
    /*
    if(sess.role=='admin')
		{res.render('register', {title: 'Register'});}
    
    else if(sess.role=='staff')
		{res.send('Restricted to Admin');}*/
    
	
    var decodedCookie = req.cookies.role;
	if(decodedCookie=='admin')
		{res.render('register', {title: 'Register'});}
			
	else if(decodedCookie=='staff')
		{res.send('Restricted to Admin');}
})

router.get('/getUsers', function (req, res, next) {
    User.find({}, {user_name:1,role:1}, function (err, users) {
        if (err)
            res.send(err);
        res.json(users);
    });
})

/*---PRODUCT FUNCTIONS---*/

/*---GET All Products---*/
//Retrieves products from the database 
router.get('/getProducts', function (req, res, next) {
    Product.find({}, function (err, products) {
        if (err)
            res.send(err);
        res.json(products);
    });
})

/*GET Single Product---*/
// Find products with name "variable" parameter :name.
//variable name gets the parameter . Product.find({"name": name} is the query
router.get('/getName/:name', function (req, res, next) {
    var name = req.params.name;

    //find the name in database
    Product.find({"name": name}, function (err, products) {
        if (err)
            res.send(err);
        res.json(products);
    });
});

/*---GET Category List---*/
// Find products with category "variable" parameter :category.
router.get('/getCategory/:category', function (req, res, next) {
    var categ = req.params.category;

    //find the name in database
    Product.find({"category": categ}, function (err, products) {
        if (err)
            res.send(err);
        res.json(products);
    });
});

// Find products with store "variable" parameter :store
//!Need to change to return results for store picked where stock greater than 0!
router.get('/getStore/:storeName', function (req, res, next) {
    var store = req.params.storeName;

	/*if(store=='Cork')
	{
		//find the name in database
		Product.find({"inStoreCork": 'on'}, function (err, products) {
			if (err)
				res.send(err);
			res.json(products);
		});
	}
	
	if(store=='Kala')
	{
		//find the name in database
		Product.find({"inStoreKala": 'on'}, function (err, products) {
			if (err)
				res.send(err);
			res.json(products);
		});
	}*/
	
	if(store=='Galway')
	{
		//find the name in database
		Product.find({"inStoreGalway": 'on'}, function (err, products) {
			if (err)
				res.send(err);
			res.json(products);
		});
	}
});

/*---GET Stores List---*/
//Retrieves stores from the database
router.get('/getStores', function (req, res, next) {
    Store.find({}, function (err, stores) {
        if (err)
            res.send(err);
        res.json(stores);
    });
})

/*---GET Reports List---*/
//Retrieves reports from the database
router.get('/getReports', function (req, res, next) {
    Report.find({}, function (err, reports) {
        if (err)
            res.send(err);
        res.json(reports);
    });
})

//DO NOT REMOVE
module.exports = router;
