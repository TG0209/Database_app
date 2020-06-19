const mongoose = require("mongoose"),
      user     = require("./models/user"),
	  fetch = require("node-fetch")

	function seedDB(){
		user.remove({}, function(err){
				if(err){
					console.log(err);
				}
				else{
				console.log("removed users");
				}
			fetch('https://jsonplaceholder.typicode.com/users')
			  .then(response => response.json())
			  .then(data => {
					data.forEach(function(seed){
						user.create(seed, function(err, user){
							if(err){
									console.log(err)
							} else {
								console.log("added a user");
							}
						});
					});
			})
		});
	}

module.exports = seedDB;
				 
					 