Template.Recipe.onCreated(function(){
	this.editMode = new ReactiveVar(false);
});

Template.Recipe.helpers({
	updateRecipeId: function() {
		return this._id;
	},
	//return Reactive var for given template only
	editMode: function(){
		return Template.instance().editMode.get();
	}
});

Template.Recipe.events({
	'click .toggle-menu': function(){
		Meteor.call('toggleMenuItem', this._id,this.inMenu);
	},
	'click .fa-trash': function(){
		Meteor.call('deleteRecipe', this._id)
	},
	//Reactive Var changes: add event , template as parameters
	'click .fa-pencil': function(event, template){
		//Session var is false if its not present, so no need to set default value for editMode. 
		//When we do session.get it will return false.
		template.editMode.set(!template.editMode.get());
		//Session.set('editMode', !Session.get('editMode'))
	}
});