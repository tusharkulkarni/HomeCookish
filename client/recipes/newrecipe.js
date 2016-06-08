Template.NewRecipe.events({
	'click .fa-close': function(){
		Session.set('newRecipe', false);
	}
});


AutoForm.addHooks('insertRecipeForm', {
  	after: {
    	insert: function(error, result) {
	      	if (error) {
	        	console.log("Insert Error:", error);
	      	} else {
	        	        	
	        	var recipe = Recipes.findOne({'_id': result});
	        	console.log('printing fetched Recipe :');
	        	console.log(recipe);
            	var recipeObj = {};
            	
            	recipeObj["fpId"] = recipe.author;
            	recipeObj["recipeId"] = recipe._id;
            	recipeObj["recipeName"] = recipe.name;
            	recipeObj["price"] = recipe.price;

            	console.log('Recipe Obj : ');
            	console.log(recipeObj);
            	            	
            	Meteor.call('insertRecipe', recipeObj);
	        	//FlowRouter.go('recipe');
	        	//Router.go('listCalendars');  // or whatever your list route is called
	    	}
    	}
    }
});