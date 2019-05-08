var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
let https = require('https')
//var bodyParser = require('body-parser');
var logger = require('morgan');

// url handling libraries
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev')); // logger thing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const API_KEY = "8336312db61f9939c8814bed57dbc8b7"
const TEMP = `{"count": 30, "recipes": [{"publisher": "The Pioneer Woman", "f2f_url": "http://food2fork.com/view/47025", "title": "Pasta with Pesto Cream Sauce", "source_url": "http://thepioneerwoman.com/cooking/2011/06/pasta-with-pesto-cream-sauce/", "recipe_id": "47025", "image_url": "http://static.food2fork.com/pestoa0e7.jpg", "social_rank": 100.0, "publisher_url": "http://thepioneerwoman.com"}, {"publisher": "101 Cookbooks", "f2f_url": "http://food2fork.com/view/47923", "title": "Double Broccoli Quinoa", "source_url": "http://www.101cookbooks.com/archives/double-broccoli-quinoa-recipe.html", "recipe_id": "47923", "image_url": "http://static.food2fork.com/broccoli_pesto_quinoa4c75.jpg", "social_rank": 100.0, "publisher_url": "http://www.101cookbooks.com"}, {"publisher": "The Pioneer Woman", "f2f_url": "http://food2fork.com/view/47032", "title": "Shrimp Scampi", "source_url": "http://thepioneerwoman.com/cooking/2011/04/16-minute-meal-shrimp-scampi/", "recipe_id": "47032", "image_url": "http://static.food2fork.com/scampibf5a.jpg", "social_rank": 100.0, "publisher_url": "http://thepioneerwoman.com"}, {"publisher": "The Pioneer Woman", "f2f_url": "http://food2fork.com/view/47233", "title": "Pastor Ryan\u2019s Bolognese Sauce", "source_url": "http://thepioneerwoman.com/cooking/2009/05/ryans-bolognese-sauce/", "recipe_id": "47233", "image_url": "http://static.food2fork.com/3544277679_04bcd3011b51c3.jpg", "social_rank": 100.0, "publisher_url": "http://thepioneerwoman.com"}, {"publisher": "The Pioneer Woman", "f2f_url": "http://food2fork.com/view/8f3e73", "title": "The Best Lasagna Ever", "source_url": "http://thepioneerwoman.com/cooking/2007/06/the_best_lasagn/", "recipe_id": "8f3e73", "image_url": "http://static.food2fork.com/387114468_aafd1be3404a2f.jpg", "social_rank": 100.0, "publisher_url": "http://thepioneerwoman.com"}, {"publisher": "101 Cookbooks", "f2f_url": "http://food2fork.com/view/47744", "title": "How to Make Pesto like an Italian Grandmother", "source_url": "http://www.101cookbooks.com/archives/001570.html", "recipe_id": "47744", "image_url": "http://static.food2fork.com/pesto_ultimate07f8b3.jpg", "social_rank": 100.0, "publisher_url": "http://www.101cookbooks.com"}, {"publisher": "What's Gaby Cooking", "f2f_url": "http://food2fork.com/view/99b1c6", "title": "Strawberry Basil Lemonade", "source_url": "http://whatsgabycooking.com/strawberry-basil-lemonade/", "recipe_id": "99b1c6", "image_url": "http://static.food2fork.com/strawberrylemonadecopy77b6.jpg", "social_rank": 100.0, "publisher_url": "http://whatsgabycooking.com"}, {"publisher": "All Recipes", "f2f_url": "http://food2fork.com/view/4851", "title": "Broiled Tilapia Parmesan", "source_url": "http://allrecipes.com/Recipe/Broiled-Tilapia-Parmesan/Detail.aspx", "recipe_id": "4851", "image_url": "http://static.food2fork.com/97848b3b5.jpg", "social_rank": 99.99999999999993, "publisher_url": "http://allrecipes.com"}, {"publisher": "Closet Cooking", "f2f_url": "http://food2fork.com/view/35186", "title": "Caprese Grilled Cheese Sandwich", "source_url": "http://www.closetcooking.com/2011/09/caprese-grilled-cheese-sandwich.html", "recipe_id": "35186", "image_url": "http://static.food2fork.com/Caprese2BGrilled2BCheese2BSandwich2B5002B21616ce448f5.jpg", "social_rank": 99.99999999999993, "publisher_url": "http://closetcooking.com"}, {"publisher": "All Recipes", "f2f_url": "http://food2fork.com/view/34678", "title": "World\u2019s Best Lasagna", "source_url": "http://allrecipes.com/Recipe/Worlds-Best-Lasagna/Detail.aspx", "recipe_id": "34678", "image_url": "http://static.food2fork.com/3242749be.jpg", "social_rank": 99.9999999999999, "publisher_url": "http://allrecipes.com"}, {"publisher": "All Recipes", "f2f_url": "http://food2fork.com/view/4500", "title": "Braised Balsamic Chicken", "source_url": "http://allrecipes.com/Recipe/Braised-Balsamic-Chicken/Detail.aspx", "recipe_id": "4500", "image_url": "http://static.food2fork.com/532125a2ff.jpg", "social_rank": 99.99999999999856, "publisher_url": "http://allrecipes.com"}, {"publisher": "The Pioneer Woman", "f2f_url": "http://food2fork.com/view/47023", "title": "Spicy Pasta Salad with Smoked Gouda, Tomatoes, and Basil", "source_url": "http://thepioneerwoman.com/cooking/2011/06/spicy-pasta-salad-with-smoked-gouda-tomatoes-and-basil/", "recipe_id": "47023", "image_url": "http://static.food2fork.com/5842229930_73a968f08e_zab23.jpg", "social_rank": 99.99999999999517, "publisher_url": "http://thepioneerwoman.com"}, {"publisher": "All Recipes", "f2f_url": "http://food2fork.com/view/2495", "title": "Baked Honey Mustard Chicken", "source_url": "http://allrecipes.com/Recipe/Baked-Honey-Mustard-Chicken/Detail.aspx", "recipe_id": "2495", "image_url": "http://static.food2fork.com/2334b48b.jpg", "social_rank": 99.99999999999491, "publisher_url": "http://allrecipes.com"}, {"publisher": "Simply Recipes", "f2f_url": "http://food2fork.com/view/37083", "title": "Tomato Pie", "source_url": "http://www.simplyrecipes.com/recipes/tomato_pie/", "recipe_id": "37083", "image_url": "http://static.food2fork.com/tomatopiea300x20065a14ff3.jpg", "social_rank": 99.99999999999436, "publisher_url": "http://simplyrecipes.com"}, {"publisher": "The Pioneer Woman", "f2f_url": "http://food2fork.com/view/46943", "title": "Seafood Pasta", "source_url": "http://thepioneerwoman.com/cooking/2012/03/seafood-pasta/", "recipe_id": "46943", "image_url": "http://static.food2fork.com/seafoodpasta5075.jpg", "social_rank": 99.99999999999329, "publisher_url": "http://thepioneerwoman.com"}, {"publisher": "The Pioneer Woman", "f2f_url": "http://food2fork.com/view/47019", "title": "Caprese Salad", "source_url": "http://thepioneerwoman.com/cooking/2011/06/caprese-salad/", "recipe_id": "47019", "image_url": "http://static.food2fork.com/capresefc49.jpg", "social_rank": 99.99999999999116, "publisher_url": "http://thepioneerwoman.com"}, {"publisher": "Steamy Kitchen", "f2f_url": "http://food2fork.com/view/48364", "title": "Vietnamese Pho: Beef Noodle Soup Recipe", "source_url": "http://www.steamykitchen.com/271-vietnamese-beef-noodle-soup-pho.html", "recipe_id": "48364", "image_url": "http://static.food2fork.com/vietnamesephorecipe2200x150b8fd.jpg", "social_rank": 99.99999999999105, "publisher_url": "http://www.steamykitchen.com"}, {"publisher": "Simply Recipes", "f2f_url": "http://food2fork.com/view/36339", "title": "Fresh Basil Pesto", "source_url": "http://www.simplyrecipes.com/recipes/fresh_basil_pesto/", "recipe_id": "36339", "image_url": "http://static.food2fork.com/basilpesto266x200571ec1ba.jpg", "social_rank": 99.99999999993436, "publisher_url": "http://simplyrecipes.com"}, {"publisher": "Two Peas and Their Pod", "f2f_url": "http://food2fork.com/view/5cc4a8", "title": "Quinoa Salad with Asparagus, Peas, Avocados & Lemon Basil Dressing", "source_url": "http://www.twopeasandtheirpod.com/quinoa-salad-with-asparagus-peas-avocado-lemon-basil-dressing/", "recipe_id": "5cc4a8", "image_url": "http://static.food2fork.com/SpringQuinoaSalad3ba71.jpg", "social_rank": 99.99999999993314, "publisher_url": "http://www.twopeasandtheirpod.com"}, {"publisher": "Two Peas and Their Pod", "f2f_url": "http://food2fork.com/view/4c833e", "title": "Caprese Garlic Bread", "source_url": "http://www.twopeasandtheirpod.com/caprese-garlic-bread/", "recipe_id": "4c833e", "image_url": "http://static.food2fork.com/CapreseGarlicBread12b5a4.jpg", "social_rank": 99.99999999991466, "publisher_url": "http://www.twopeasandtheirpod.com"}, {"publisher": "All Recipes", "f2f_url": "http://food2fork.com/view/4386", "title": "Boilermaker Tailgate Chili", "source_url": "http://allrecipes.com/Recipe/Boilermaker-Tailgate-Chili/Detail.aspx", "recipe_id": "4386", "image_url": "http://static.food2fork.com/890638f7df.jpg", "social_rank": 99.9999999994656, "publisher_url": "http://allrecipes.com"}, {"publisher": "The Pioneer Woman", "f2f_url": "http://food2fork.com/view/46923", "title": "Tortilla Rollups", "source_url": "http://thepioneerwoman.com/cooking/2012/05/tortilla-rollups/", "recipe_id": "46923", "image_url": "http://static.food2fork.com/rollupscf15.jpg", "social_rank": 99.99999999876846, "publisher_url": "http://thepioneerwoman.com"}, {"publisher": "Two Peas and Their Pod", "f2f_url": "http://food2fork.com/view/54392", "title": "Parmesan Crusted Pesto Grilled Cheese Sandwich", "source_url": "http://www.twopeasandtheirpod.com/parmesan-crusted-pesto-grilled-cheese-sandwich/", "recipe_id": "54392", "image_url": "http://static.food2fork.com/parmesancrustedpestogrilledcheese5a41.jpg", "social_rank": 99.9999999987193, "publisher_url": "http://www.twopeasandtheirpod.com"}, {"publisher": "Simply Recipes", "f2f_url": "http://food2fork.com/view/35852", "title": "Bruschetta with Tomato and Basil", "source_url": "http://www.simplyrecipes.com/recipes/bruschetta_with_tomato_and_basil/", "recipe_id": "35852", "image_url": "http://static.food2fork.com/bruschetta266x200addfba9a.jpg", "social_rank": 99.999999998408, "publisher_url": "http://simplyrecipes.com"}, {"publisher": "My Baking Addiction", "f2f_url": "http://food2fork.com/view/2ec050", "title": "Pizza Dip", "source_url": "http://www.mybakingaddiction.com/pizza-dip/", "recipe_id": "2ec050", "image_url": "http://static.food2fork.com/PizzaDip21of14f05.jpg", "social_rank": 99.99999999826605, "publisher_url": "http://www.mybakingaddiction.com"}, {"publisher": "Closet Cooking", "f2f_url": "http://food2fork.com/view/35401", "title": "Lasagna Soup", "source_url": "http://www.closetcooking.com/2012/01/lasagna-soup.html", "recipe_id": "35401", "image_url": "http://static.food2fork.com/Lasagna2BSoup2B5002B050668ba78b8.jpg", "social_rank": 99.99999999740096, "publisher_url": "http://closetcooking.com"}, {"publisher": "Closet Cooking", "f2f_url": "http://food2fork.com/view/35616", "title": "Sweet Chili Chicken Quesadilla", "source_url": "http://www.closetcooking.com/2012/05/sweet-chili-chicken-quesadilla.html", "recipe_id": "35616", "image_url": "http://static.food2fork.com/Sweet2BChili2BChicken2BQuesadilla2B5002B459829a2ca63.jpg", "social_rank": 99.99999999645584, "publisher_url": "http://closetcooking.com"}, {"publisher": "All Recipes", "f2f_url": "http://food2fork.com/view/29769", "title": "Spaghetti Squash I", "source_url": "http://allrecipes.com/Recipe/Spaghetti-Squash-I/Detail.aspx", "recipe_id": "29769", "image_url": "http://static.food2fork.com/189677e8a.jpg", "social_rank": 99.99999999639877, "publisher_url": "http://allrecipes.com"}, {"publisher": "The Pioneer Woman", "f2f_url": "http://food2fork.com/view/46932", "title": "Bruschetta Chicken", "source_url": "http://thepioneerwoman.com/cooking/2012/04/bruschetta-chicken/", "recipe_id": "46932", "image_url": "http://static.food2fork.com/bruschafa5.jpg", "social_rank": 99.99999999597819, "publisher_url": "http://thepioneerwoman.com"}, {"publisher": "Chow", "f2f_url": "http://food2fork.com/view/3633b2", "title": "Vietnamese-Style Summer Rolls with Peanut Sauce Recipe", "source_url": "http://www.chow.com/recipes/10641-vietnamese-style-summer-rolls-with-peanut-sauce", "recipe_id": "3633b2", "image_url": "http://static.food2fork.com/10641_RecipeImage_620x413_vietnamese_summer_rolls53fd.jpg", "social_rank": 99.99999999345741, "publisher_url": "http://www.chow.com"}]}`

function sendResponse(ingredientData, res) {
	console.log("SEND RESPONSE")
	// build basic webpage, rendering will be on client
	var page = '<html><head><title>Assignment 4</title><meta charset="utf-8"/>' +
	           '<script src="jquery-1.11.3.js"></script>' +
	           '<script src="javascripts/recipes.js"></script>' +
               '<link href="stylesheets/style.css" rel="stylesheet" type="text/css" /></head>' +
				'<body>' +
					'<div id=main>' +
						'<form id="myForm" action="/recipes" method="post">' +
								'Enter an Ingredient: <input name="ingredient"  id="myInput"><br>' +
								'<input type="submit" value="Submit">' +
						'</form>' +
						'<div id="items"></div>'
	if (ingredientData) {
		page += '<div id="data">' + ingredientData + '</div>'
	}
	page += '</div></body></html>'
	res.end(page);
}

function getRecipes(ingredients, res, callback){
	console.log(typeof callback)
	//You need to provide an appid with your request.
	//Many API services now require that clients register for an app id.

	console.log("GET RECIPES")
	
	const options = {
	 host: 'www.food2fork.com',
	 path: `/api/search?q=${ingredients}&key=${API_KEY}`
	}

	https.request(options, function(apiResponse){
		parseData(apiResponse, res, callback)
	}).end()
} 

function parseData(ingredientsResponse, res, callback) {
  console.log("PARSE DATA")
  let ingredientData = ''
  ingredientsResponse.on('data', function(chunk) {
    ingredientData += chunk
  })
  ingredientsResponse.on('end', function() {
    callback(ingredientData, res)
  })
}

app.post("/recipes", function (req, res, next) {
	// looks like req already parses it for us
	console.log(req.body)
	let ingredients = req.body.ingredient
	// temp json

	// UNCOMMENT AFTER DONE
	getRecipes(ingredients, res, function(data, res) {res.send(data)})
	//res.send(TEMP) // remove after done
})

// GET recipes enterd by url, serve page with JSON attached
app.get("/recipes", function (req, res, next) {
	let ingredients = req.query.ingredients
	// we found something
	if (ingredients) { // create page
		console.log("Params: " + ingredients)
		// placeholder
		//responseObj.ingredient = ingredients

		// UNCOMMENT AFTER DONE
		getRecipes(ingredients, res, function(data, res) {sendResponse(data, res)})
		//sendResponse(TEMP, res) // remove after done
	} else {
		console.log("At index")
		next()
	}
})

app.use("/recipes", express.static(path.join(__dirname, 'public')))

// redirection
app.get("/recipes.html", function (req, res, next) {
	res.redirect('/recipes')
})
app.get("/", function (req, res, next) {
	res.redirect('/recipes')
})
app.get("/index.html", function (req, res, next) {
	res.redirect('/recipes')
})
app.get("", function (req, res, next) {
	res.redirect('/recipes')
})
// serve all the static files in the /public directory in the project root.
app.use(express.static(path.join(__dirname, 'public')));

// attempt to get any recipes
//app.use("/", indexRouter);
//app.use('/test', indexRouter);
//app.use('/users', usersRouter);

// anything going past here is 404
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
