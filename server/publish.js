Meteor.publish('recipes', function(lat, lon){
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

Meteor.publish('recipes', function(){	
	return Recipes.find({author: this.userId});
});

Meteor.publish('singleRecipes', function(id){
	check(id, String);
	return Recipes.find({_id: id});
});