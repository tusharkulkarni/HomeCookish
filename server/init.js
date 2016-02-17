Meteor.startup(function () {
	
  //-- Application name
  Accounts.emailTemplates.siteName = 'www.homecookish.com';

  //-- Subject line of the email.
  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Confirm Your Email Address for HomeCookish';
  };

  //-- Email text
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'Thank you for registering.  Please click on the following link to verify your email address: \r\n' + url;
  };

	 Recipes._ensureIndex({"location": "2dsphere"});
	 Meteor.methods({
	 	resendVerificationMail: function (id) {
		console.log('sending Verification mail');
		Accounts.sendVerificationEmail(id);
	  }
	 });	
});
Accounts.config({
	sendVerificationEmail: true, forbidClientAccountCreation: false
}); 
