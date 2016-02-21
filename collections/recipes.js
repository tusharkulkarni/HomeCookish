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
	name: {
		type: String,
		label: "Name"
	},	
	location: {
		type: [Number],
        decimal: true,
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
    	autoform: {
      		afFieldInput: {
        		type: 'cloudinary'
      		}
    	}
  	},
	telephone: {
    	type: String,
    	autoform: {
      		type: 'intl-tel-input',
      		'class': 'form-control',
      		afFieldInput: {
        		inputOptions: {
          			autoFormat: true,
          			defaultCountry: 'auto'
        		}
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
	},
	deleteRecipe: function(id){
		Recipes.remove(id);
	},
	getLocation: function(){
		var latLng = Geolocation.latLng();			
			var location = "\"[ " + latLng.lng + ", "+ latLng.lat + "]\"";
			console.log("location : " + location);
	}
});

Recipes.attachSchema( RecipeSchema );