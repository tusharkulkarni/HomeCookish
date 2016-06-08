UserProfile = new Mongo.Collection('userProfiles');


UserProfile.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function(userId, doc){
		return !!userId;
	}
});

ClickedRecipe = new SimpleSchema({
	transactionId: {
		type: String,
		autoform:{
			type:"hidden"
		}	
	},
	recipeName: {
		type: String,
		autoform:{
			type:"hidden"
		}
	},
	recipeAuthor: {
		type: String,
		autoform:{
			type:"hidden"
		}
	},
	recipeId: {
		type: String,
		autoform:{
			type:"hidden"
		}	
	}
})


UserSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
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
	clickedRecipes:{
		type: [ClickedRecipe],
		autoform: {
			type: "hidden"
		},
		optional: true
	}
});

Meteor.methods({
	updateUserProfile: function(clickedRecipe){
		console.log('*************updateUserProfile begins***************');		
		if(!(clickedRecipe == undefined || clickedRecipe == null)){			
			var oldClickedRecipes = UserProfile.findOne({'author': Meteor.userId()});
	
	        if(oldClickedRecipes == undefined){
	        	console.log('******initialize clickedRecipe array******');         	       	
	        	UserProfile.update({author : this.userId}, { $set: clickedRecipe});
	        }else{
	    	console.log('****************updating clickedRecipe array*********************'); 		    	     	
	    	UserProfile.update({author : this.userId}, { $push: { "clickedRecipes": clickedRecipe  }});
	    	}
	    }else{
	    	console.log('clickedRecipe is blank');
	    }
	    console.log('*************updateUserProfile ends***************');
   },
	clearCalledRecipes: function(){
		UserProfile.update({ author : this.userId }, { $unset: { clickedRecipes: [] } })
		
	}
});


UserProfile.attachSchema( UserSchema );
