Recipes = new Mongo.Collection('recipes');


Recipes.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function(userId, doc){
		return !!userId;
	}
});

RecipeSchema = new SimpleSchema({
	/*userDetails: {
		type: String,
		optional: true,
		autoform:{
			type:"hidden"
		}
	},*/
	username: {
		type: String,
		optional: true,
		autoValue: function(){
			var usr = UserProfile.findOne({'author': Meteor.userId()}).name;
			console.log("usr : "+usr);
			return usr
		},
		autoform: {
			type: "hidden"
		},
		label: "Name"
	},
	telephone: {
		type: String,
		optional: true,	
		autoValue: function(){
			var tel = UserProfile.findOne({'author': Meteor.userId()}).telephone;
			console.log("tel : "+tel);
			return tel
		},	
		autoform: {
			type: "hidden"
		},
		label: "Name"
	},
	name: {
		type: String,
		label: "Name of the Dish"
	},	
	location: {
		type: [Number],
        decimal: true,
        label: "Where would you like to provide this dish?",
        autoform:{
            type: 'map',
            afFieldInput:{
                    geolocation: true,
                    searchBox: true,
                    autolocate: true,
                    reverse: true
                }
            }
	},
	image: {
    	type: String,
    	label: "Select image for dish",
    	optional: true,
    	autoform: {
      		afFieldInput: {
        		type: 'cloudinary'
      		}
    	}
  	},
	
	
	desc: {
		type: String,
		label: "Description"
	},

	ingredients: {
		type: String,
		label: "Ingredients"
	},
	
	price: {
		type: String,
		label: "Price"
	},
	

	inMenu: {
		type: Boolean,
		defaultValue: false,
		optional: true,
		autoform:{
			type:"hidden"
		}
	},
	author: {
		type: String,
		label: "Author",
		autoValue: function(){
			return this.userId
		},
		autoform: {
			type: "hidden"
		}
	},
	createdAt:{
		type: Date,
		label: "Created At",
		autoValue: function(){
			return new Date()
		},
		autoform: {
			type: "hidden"
		}
	}	
});

Meteor.methods({
	toggleMenuItem: function(id, currentState){
		Recipes.update(id, {
			$set: {
				inMenu: !currentState
			}
		});
		if(Recipes.findOne(id).inMenu){
			var provider = {};
			provider['userId'] = Meteor.userId();
			provider['recipeId'] = id;
			Meteor.call('insertActiveFp',provider);
		}else{
			console.log('removeRecipe');
		}
	},
	deleteRecipe: function(id){
		Recipes.remove(id);
	},
	getLocation: function(){
		var latLng = Geolocation.latLng();			
			var location = "\"[ " + latLng.lng + ", "+ latLng.lat + "]\"";
			console.log("location : " + location);
	}
	/*,
	updateRecipe: function(){
		console.log('*************updateRecipe begins***************');
		console.log("Meteor.userId() : "+Meteor.userId());
		var rec =  Recipes.findOne({'author': Meteor.userId()}) ;
		console.log("rec : "+rec);
		var usr = UserProfile.findOne({'author': Meteor.userId()});
		console.log("usr : "+usr);
				
		//console.log('****************updating recipe*********************'); 
        //var dynamicItem = {};       	   	
    	//dynamicItem["userDetails"] = userId;        	
    	//Recipes.update({_id: recipeId}, { $set: dynamicItem});
    
    	console.log('****************update complete*********************'); 

   }*/
});



Recipes.attachSchema( RecipeSchema );
