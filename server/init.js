Meteor.startup(function () {

  process.env.MAIL_URL = 'smtp://homecookish@gmail.com:homecookish2016@smtp.gmail.com:587'

Accounts.emailTemplates = {
      from: 'HomeCookish <homecookish@gmail>',
      siteName: 'www.homecookish.com',
      verifyEmail: {
        subject: function(user) {
          return 'Verification email from homecookish.com';
        },
        text: function(user, url) {
          return 'Hi there,\n\n' +
            'Welcome onboard!!! We are happy to have you. \n\nPlease click on the below link to verify your email address and get started with your homecookish journey :) \r\n\n' + url;
        }
      }
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
