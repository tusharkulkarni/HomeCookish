Meteor.startup(function() {
  GoogleMaps.load({
    key: 'AIzaSyB82GHF2DYFngJ3FL1ghrotuWLP6VnVYBQ',
    //key: 'AIzaSyBBOClbEJtsjRUjW_JTH5eVBQPQXVcibSw',
    libraries: 'places'  // also accepts an array if you need more than one
  });
  
});

Template.Menu.onCreated(function() {
	var self = this;  
	self.autorun(function(){		
    var lat = Session.get('lat');
    var long = Session.get('long');
    self.subscribe('recipes', long, lat);
	});
});

Template.Menu.helpers({
	recipes: ()=> {		
		return Recipes.find({inMenu: true});		
	}			
});

//required for cordova call plugin
callSuccess = function(){
  console.log('call done');
  }

callError = function(){
  console.log('Error : verify phone number');
  }

Template.Menu.onRendered(function() {
  this.autorun(function() {
    var lat, long;
    if (GoogleMaps.loaded()) {
        $("input")
      .geocomplete()
      .bind("geocode:result", function(event, result){
        long = result.geometry.location.lng();
        lat = result.geometry.location.lat();   
        console.log("latitude : " + lat + "longitude : "+ long); 
        Session.set('lat', lat);
        Session.set('long', long);
        Meteor.subscribe("recipes", lat, long); 
      });     
    }    
  });
});

/*Template.Menu.events({
  'click a.call-open': function(event) {
    // On Cordova, open phone number in the dialer rather than In-App
    if (Meteor.isCordova) {
      console.log("telephone : " + event.target.href);
      event.preventDefault();
      window.plugins.CallNumber.callNumber(callSuccess, callError,event.target.href,true)
    }
  }
});
*/

Template.MenuItem.events({
  'click .call-click': function() {
    // On Cordova, open phone number in the dialer rather than In-App
    console.log('*********************toggle event begins***********************');

    var recipeObj =  Recipes.findOne({'_id': event.target.id});
    var prevClickedObjs = UserProfile.findOne({'author': Meteor.userId()}).clickedRecipes;
    console.log('prevClickedObjs :');
    console.log(prevClickedObjs);
    console.log('recipeObj :');
    console.log(recipeObj);
/*    if (Meteor.isCordova) {        
        window.plugins.CallNumber.callNumber(callSuccess, callError,event.target.href,true);
    }else{
       window.prompt("Copy to clipboard: Ctrl+C, Enter", recipeObj.telephone);
    }   */ 
     //window.prompt("Copy the phone number", recipeObj.telephone);

    if(prevClickedObjs != undefined){
      console.log('----inside if-----')
      for (var i = prevClickedObjs.length - 1; i >= 0; i--) {
        if(prevClickedObjs[i].recipeId == recipeObj._id){
          console.log(recipeObj._id + ' already present');
          return;
        }
      }
    }
    var clickedRecipe = {};
    var transactionId = new Date().getTime().toString();
    clickedRecipe["recipeName"] = recipeObj.name;   
    clickedRecipe["recipeAuthor"] = recipeObj.author;   
    clickedRecipe["recipeId"] = recipeObj._id;  
    clickedRecipe["transactionId"] =  transactionId;
    
    var tranObj = {};
    tranObj["recipeId"] = recipeObj._id;   
    tranObj["fpId"] = recipeObj.author;   
    tranObj["fcId"] = Meteor.userId();  
    tranObj["tranId"] = transactionId;

    Meteor.call('updateUserProfile', clickedRecipe);
    Meteor.call('insertTransaction', tranObj);    
    console.log('*********************toggle event ends***********************');
    console.log('*********************routing to menu***********************');
/*    if (Meteor.isCordova) { 
        window.prompt("Copy the phone number", recipeObj.telephone);       
        //window.plugins.CallNumber.callNumber(callSuccess, callError,event.target.href,true);        
    }else{
       window.prompt("Copy to clipboard: Ctrl+C, Enter", recipeObj.telephone);
    } */
    window.prompt("Copy to clipboard: Ctrl+C, Enter", recipeObj.telephone);
    FlowRouter.go('/menu');
  }
});

/*
Template.Recipe.events({
  'click .toggle-menu': function(){
    console.log('*********************toggle event begins***********************');
    console.log(event.target.id);
    var recipeId = event.target.id;
    var recipeArray = Session.get('recipes');
    console.log(recipeArray);
    console.log('*********************toggle event begins***********************');
    var dateStr =  '' + new Date().getMonth().toString() +'/'+ new Date().getDate().toString() + '/' + new Date().getFullYear().toString();
    Meteor.call('addRecipe', recipeId, dateStr, recipeArray);
  }
});
*/