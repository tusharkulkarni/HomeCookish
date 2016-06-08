AutoForm.addHooks('insertUserProfileForm', {
  after: {
    insert: function(error, result) {
      if (error) {
        console.log("Insert Error:", error);
      } else {
        console.log("Document inserted:", result);
        alert('Profile Created!');
        FlowRouter.go('/recipe-book');
    	}
    }
  }
});