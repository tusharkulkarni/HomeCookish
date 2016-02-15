Meteor.startup(function() {
  GoogleMaps.load({
    key: 'AIzaSyBBOClbEJtsjRUjW_JTH5eVBQPQXVcibSw',
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
		return Recipes.find();		
	}			
});

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
