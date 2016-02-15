Meteor.publish('recipes', function(lat, lon){
	console.log("latitude : " + lat);

	if(lat){
		console.log("inside if");
	return Recipes.find( { location :
                         		{ $near :
                           			{ $geometry :
                              			{ type : "Point" ,
                                		coordinates : [lat, lon] 
                                		} ,
                             			$maxDistance : 10000
                         			} 
                         		} 
                        	} );
	}else{
	return Recipes.find({});
	}
});

Meteor.publish('singleRecipes', function(id){
	check(id, String);
	return Recipes.find({_id: id});
});