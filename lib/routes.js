if(Meteor.isClient){
	Accounts.onLogin(function(){
		console.log("User verified : " + Meteor.user().emails[0].verified);
		if(Meteor.user().emails[0].verified){
			//console.log('Meteor.userId(): '+Meteor.userId());
			console.log('***********inside onLogin()******************')	
			console.log('***********calling insertActiveUsers******************')
			var user = UserProfile.findOne({'author': Meteor.userId()})
			console.log('====user====');
			console.log(user);
			Meteor.call('insertActiveUser',user)	;	 
			FlowRouter.go('/register');
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
		GAnalytics.pageview();
		if (Meteor.userId()) {
			//if(Meteor.user().emails[0].verified){	
			//	console.log("User verified : routing to recipe-book");	
			if(Meteor.loggingIn()){
				FlowRouter.go('/login-page');
			}else{
				if(Meteor.user().emails[0].verified){
					console.log(Meteor.user());
					console.log("User verified : routing to recipe-book");
					FlowRouter.go('/recipe-book');
				}else{
					console.log("User not verified : routing to verify-email");
					FlowRouter.go('/verify-email');
				}
			}
			//	console.log("User not verified : routing to verify-email");
			//	
			}
		
		BlazeLayout.render('HomeLayout');
	} 
});

FlowRouter.route('/register',{
	name: 'register',
	action() {
		console.log('register reoute ->userId : ' + Meteor.userId())
		
		userAccount = UserProfile.find({'author': Meteor.userId()}).count();
		if(userAccount == 1){
			console.log('*******Routing to Recipes page********');
			FlowRouter.go('/recipe-book');						
		}else{
			console.log('*******Routing to Settings page User Profile Creation********');
			BlazeLayout.render('MainLayout', {main: 'SettingsFirst'});
		}
	}
});

FlowRouter.route('/recipe-book',{
	name: 'recipe-book',
	action() {
		GAnalytics.pageview();
		clickedRecipes = UserProfile.findOne({'author': Meteor.userId()}).clickedRecipes;

		if(clickedRecipes == undefined){
			console.log('undefined');
			BlazeLayout.render('MainLayout', {main: 'Recipes'});
		}else{
			console.log('===============clickedRecipes==============');
			console.log(clickedRecipes);
			console.log('=============================');
			BlazeLayout.render('MainLayout', {main: 'OrderConfirmation'});
		}
	}
});

FlowRouter.route('/recipe/:id',{
	name: 'recipe-single',
	action() {
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'RecipeSingle'});
	} 
});

FlowRouter.route('/menu', {
	name: 'menu',
	action(){
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'Menu'});	
	}
});


FlowRouter.route('/shopping-list', {
	name: 'shopping-list',
	action(){
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'ShoppingList'});	
	}
});

FlowRouter.route('/verify-email', {
	name: 'verify-email',
	action(){
		GAnalytics.pageview();
		BlazeLayout.render('HomeLayout', {verify: 'VerifyEmail'});	
	}
});

FlowRouter.route('/login-page', {
	name: 'login-page',
	action(){
		GAnalytics.pageview();
		BlazeLayout.render('HomeLayout', {verify: 'LoginPage'});	
	}
});
