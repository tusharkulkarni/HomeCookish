Meteor.startup(function () {
	 Recipes._ensureIndex({"location": "2dsphere"});	
});