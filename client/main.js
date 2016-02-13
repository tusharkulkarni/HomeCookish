Template.HomeLayout.onRendered(function () {
    if (Meteor.isCordova 
        && typeof navigator !== 'undefined' 
        && navigator.splashscreen) 
    {
        setTimeout(function () {
            navigator.splashscreen.hide();
        }, 100);
    }
});