Template.VerifyEmail.events({
  'click a.verify-email': function(event) {    
      console.log("Sending Verification link.");
      Meteor.call('resendVerificationMail', Meteor.userId());
      window.alert("Mail sent to " + Meteor.user().emails[0].address);
    }
});
