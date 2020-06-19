const express        = require("express"),
	  app            = express(),
	  mongoose       = require("mongoose"),
	  user           = require("./models/user"),
	  methodOverride = require("method-override"),
	  bodyParser     = require("body-parser"),
	  PORT           = process.env.PORT || 3000


const user_route   = require("./routes/user")
    
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);


mongoose.connect("mongodb+srv://yelpcamp:tushar@cluster0-ktyjf.mongodb.net/users?retryWrites=true&w=majority", {useNewUrlParser: true,
 useCreateIndex : true});


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use("/", user_route);


app.listen(PORT,function(){
	console.log("sever started!!");
});