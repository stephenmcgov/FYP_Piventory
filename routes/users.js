var express = require('express');
var router = express.Router();
var User = require('../models/users');
var jwt = require('jsonwebtoken');

/* GET users listing */
router.get('/', function(req, res, next) {
    res.send('user listing');
});

/*
 Creates a JWT
 */
function createJwt(profile) {
    return jwt.sign(profile, 'CSIsTheWorst', {
        expiresIn: '1d'
    });
}

//register
router.post('/register', function(req, res, next){
    var username = req.body.user_name;
    var password = req.body.password;
	var role = req.body.role;
	var setRole;

	/*if(req.body.role)
		setRole = 'admin';
	else setRole = 'staff';*/
	
    // Check if account already exists
    User.findOne({ 'user_name' :  username }, function(err, user)
    {
        if (err)
            res.send(err);
   
        if (user) 
		{
            res.status(401).json({
                "status": "info",
                "body": "Username already taken"
            });
        } 
		
		else 
		{
            // If there is no user with that username create the user
            var newUser = new User();

            // set the user's local credentials
            newUser.user_name = username;
            newUser.password = newUser.generateHash(password);
			newUser.role = role;
			newUser.access_token = createJwt({user_name:username});
            
			newUser.save(function(err, user) 
			{
				if (err)
					throw err;
				
                else res.json({'success' : 'account created'});

            });
        }
    });
});

//login
router.post('/login', function(req, res, next)
{
	var username = req.body.user_name;
    var password = req.body.password;
	var role = '';
    User.findOne({'user_name': username}, function (err, user) 
	{
        // if there are any errors, return the error
        if (err)
            res.send(err);
        
		// If user account found then check the password
        if (user) 
		{
            // Compare passwords
            if (user.validPassword(password)) 
			{
				user.access_token = createJwt({user_name: username});
                user.save();
                //set response cookies for auth privileges
                res.cookie('name', '' + user.user_name);
				res.cookie('role', '' + user.role);
                res.cookie('Authorization', 'Bearer ' + user.access_token);
				res.header('Authorization', 'Bearer ' + user.access_token);
                res.json({'success' : 'loggedIn',name:user.user_name});
            }
            
			else 
			{
                res.status(401).send({
                    "status": "error",
                    "body": "Username or Password does not match"
                });
            }
        }
        
		else
        {
            res.status(401).send({
                "status": "error",
                "body": "Username or Password does not match"
            });
        }
	}); 
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

module.exports = router;