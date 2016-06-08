Template.OrderConfirmation.events({
 'submit #order-form' : function (event, template) {
   event.preventDefault();

   var selected = template.findAll( "input[type=checkbox]:checked");

   var transactionIds = selected.map(function(item){ return item.value})

   console.log(transactionIds.toString());
   Meteor.call('updateTransaction', transactionIds);
   Meteor.call('clearCalledRecipes');
   BlazeLayout.render('MainLayout', {main: 'Recipes'});

 }
});

Template.OrderConfirmation.helpers({
	calledRecipes: ()=> {		
		return UserProfile.findOne({'author': Meteor.userId()}).clickedRecipes;
	}			
});