Template.Recipes.onCreated(function() {
	var self = this;
	self.autorun(function(){
		self.subscribe('personalRecipes');
		self.subscribe('userProfiles');
	});
});

Template.Recipes.helpers({
	recipes: ()=> {
		return Recipes.find({});
	}
});

Template.Recipes.events({
	'click .new-recipe': ()=>{
		Session.set('newRecipe', true);
	}
});