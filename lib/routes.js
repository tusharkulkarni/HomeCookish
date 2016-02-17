if(Meteor.isClient){
	Accounts.onLogin(function(){
		console.log("User verified : " + Meteor.user().emails[0].verified);
		if(Meteor.user().emails[0].verified){
			FlowRouter.go('/recipe-book');
		}else{
			FlowRouter.go('/verify-email');
		}
	});

	Accounts.onLogout(function(){
		FlowRouter.go('home');
	});

	
}

FlowRouter.triggers.enter([function(context, redirect){
	if(!Meteor.userId()){
		FlowRouter.go('home');
	}
}]);

FlowRouter.route('/',{
	name: 'home',
	action() {
		if(Meteor.userId() && Meteor.user().emails[0].verified){
			FlowRouter.go('/recipe-book');
		}
		BlazeLayout.render('HomeLayout');
	} 
});

FlowRouter.route('/recipe-book',{
	name: 'recipe-book',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Recipes'});
	}
});

FlowRouter.route('/recipe/:id',{
	name: 'recipe-single',
	action() {
		BlazeLayout.render('MainLayout', {main: 'RecipeSingle'});
	} 
});

FlowRouter.route('/menu', {
	name: 'menu',
	action(){
	BlazeLayout.render('MainLayout', {main: 'Menu'});	
	}
});


FlowRouter.route('/shopping-list', {
	name: 'shopping-list',
	action(){
	BlazeLayout.render('MainLayout', {main: 'ShoppingList'});	
	}
});

FlowRouter.route('/verify-email', {
	name: 'verify-email',
	action(){
	BlazeLayout.render('HomeLayout', {verify: 'VerifyEmail'});	
	}
});

