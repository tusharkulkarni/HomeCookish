Meteor.publish('recipes', function(lat, lon){
	console.log("latitude : " + lat);

	if(lat){		

	
	return Recipes.find( { $and: [ { inMenu: true },
								{ location :
                         			{ $near :
                           				{ $geometry :
                              				{ type : "Point" ,
                                			coordinates : [lat, lon] 
                                			} ,
                             			$maxDistance : 10000
                         				} 
                         			} 
                         		}
                         		]
                        	} );
	}else{
	return Recipes.find({});
	}
});

Meteor.publish('singleRecipes', function(id){
	check(id, String);
	return Recipes.find({_id: id});
});