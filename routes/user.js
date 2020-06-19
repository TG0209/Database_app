const express = require("express"),
 	  router  = express.Router()
	  seedDB  = require("../seeds"),
	  user    = require("../models/user")
	

// index route add databse
router.get("/",function(req,res){
	seedDB();
	res.redirect("/users");
	
});

// home route display database
router.get("/users",function(req,res){
	user.find({},function(err,allusers){
		if(err){
			console.log(err);
		}
		else{
			res.render("users",{user:allusers});
		}
	});
});

// form to add new user
router.get("/users/new",function(req,res){
	res.render("new");	
});

// add new user to database
router.post("/users",function(req,res){
	 const name =  req.body.name;
  	 const username =  req.body.username;
     const  email = req.body.email;
  	 const  address = {
		street: req.body.street,
		suite: req.body.suite,
		city: req.body.city,
		zipcode: req.body.zipcode,
		geo: {
			  lat: req.body.lat,
			  lng: req.body.lng,
			}
  		};
  	const phone = req.body.phone;
  	const website = req.body.website;
    const company = {
		name: req.body.company,
		catchPhrase: req.body.catchPhrase,
		bs: req.body.bs,
  	};
	var obj = {name:name,username:username,email:email,address:address,phone:phone,website:website,company:company};
	user.create(obj,function(err,users){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/users");	
		}
	});
	
	
});

// delete whole database
router.delete("/users/dump",function(req,res){
	user.deleteMany({}, function(err){
            if(err){
                console.log(err);
            }
			else{
            	res.redirect("/users");
			}
	});
});

// delete user by id 
router.delete("/users/:useradd",function(req,res){
	user.findByIdAndRemove(req.params.useradd,req.body.user,function(err,deleteuser){
		if(err){
			res.redirect("/users");
		}
		else{
			res.redirect("/users");
		}
	});
});

// show information of each user
router.get("/users/:userid",function(req,res){
		user.findById(req.params.userid,function(err,aboutuser){
		if(err){
			console.log(err);
		}else{
			res.render("show",{user:aboutuser});
		}
	});
});

module.exports = router;
